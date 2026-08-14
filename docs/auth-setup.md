# Auth setup — Neon Console steps (stage 3)

Console work only the author can do. Verified against the live Neon docs and probed
against this project's own auth endpoint on 2026-08-14, not recalled from memory.

**Auth base URL** (not a secret — it ships in `index.html`):

```
https://ep-flat-tooth-ay7zxkh2.neonauth.c-5.us-east-2.aws.neon.tech/neondb/auth
```

## Already done — Managed Better Auth is provisioned

It did not need enabling. Probed directly:

| Request | Result | Means |
|---|---|---|
| `GET /ok` | `200 {"ok":true}` | the auth service is live |
| `GET /get-session` | `200 null` | session endpoint works, nobody signed in |
| `POST /sign-up/email` | `400 MISSING_ORIGIN` | email/password route exists and is enabled |
| `POST /sign-in/social` `{provider:"google"}` | reached the callback check | Google is on, using Neon's shared dev credentials |

`400 MISSING_ORIGIN` is curl not sending an `Origin` header, not a misconfiguration. A
disabled route returns `404` — `/session` and `/sign-in/social` on `GET` both do.

## 1. Trusted domains — done ✅

Console → **Auth** → **Configuration** tab → **Domains**. Add, with protocol and no
trailing slash:

```
https://rlomelino1.github.io
```

Probed on 2026-08-14, before this was set:

| `callbackURL` sent to `/sign-in/social` | Result |
|---|---|
| `http://localhost:8080/` | passes the trust check (Allow Localhost is on by default) |
| `http://localhost:5173/` | passes |
| `https://rlomelino1.github.io/Riftbound-deck-builder/` | **`403 INVALID_CALLBACKURL`** |

So OAuth works from a dev machine and fails on the live site — the exact shape of bug
that gets found late. The origin is `https://rlomelino1.github.io`; the trailing
`/Riftbound-deck-builder/` is a path and is not part of the trusted-domain entry.

**Leave "Allow Localhost" on while building; turn it off when stage 4 ships.** The
production checklist calls for disabling it.

## 2. Google OAuth credentials — done ✅

Set on 2026-08-14 from `OAUTH_CLIENT_ID` / `OAUTH_CLIENT_SECRET` in the gitignored
`.env`, via the API call at the end of this section. Provider moved from
`type: shared` to `type: standard`. The steps below are kept for when the credentials
need rotating.

**Google Cloud Console** — <https://console.cloud.google.com/>

1. Create (or pick) a project.
2. **APIs & Services** → **OAuth consent screen**. External. App name is what users
   see on the consent dialog — "Riftbound Deckbuilder". Add the support and developer
   contact email. Publish it, or it stays in Testing and only allow-listed accounts can
   sign in.
3. **APIs & Services** → **Credentials** → **Create credentials** → **OAuth client ID**
   → application type **Web application**.
4. **Authorized redirect URIs** — add exactly:

   ```
   https://ep-flat-tooth-ay7zxkh2.neonauth.c-5.us-east-2.aws.neon.tech/neondb/auth/callback/google
   ```

   This is the **auth base URL + `/callback/google`**. It is *not* the app's URL. The
   docs call this out specifically because getting it wrong is the common failure: the
   app's own `callbackURL` is where the user lands *after* OAuth and is governed by
   trusted domains (step 1), not by Google.

5. **Authorized JavaScript origins** — add both:

   ```
   https://rlomelino1.github.io
   http://localhost:8080
   ```

6. Copy the Client ID and Client Secret.

**Neon Console** — the Auth settings are **scoped to a branch**, which is what makes
them hard to find from the project-level nav. This project's branch is `production`
(`br-still-flower-ayrpe3fm`), so the page is:

```
https://console.neon.tech/app/projects/falling-star-08784661/branches/br-still-flower-ayrpe3fm/auth
```

Paste **Client ID** and **Client Secret** for Google there.

### Or set it over the API

Equivalent, and avoids hunting the UI. Verified against Neon's OpenAPI spec
(`NeonAuthUpdateOAuthProviderRequest`):

```
PATCH /api/v2/projects/{project_id}/branches/{branch_id}/auth/oauth_providers/google
{ "client_id": "...", "client_secret": "..." }
```

Both fields are optional on their own — omitting one keeps the stored value. `PATCH`
with `{}` is a no-op that returns current state, which is a safe way to read it back
(`GET` on this path is `405`).

The secret belongs in the Neon Console or in gitignored `.env`, never in `index.html`
and never in a commit.

## 3. Custom SMTP sender

Current state, read from the API:

```json
{"type":"shared","sender_email":"auth@mail.myneon.app","sender_name":"Neon Auth"}
```

**These fields are not invented — they are credentials issued by a third-party mail
service.** Neon does not send the mail itself; it hands it to an SMTP server you have
an account on. It is the same six values as `spring.mail.*` in a Spring
`application.properties`, and they come from the provider's dashboard, not from
imagination.

| Field | Where it comes from |
|---|---|
| `host` | the provider's SMTP hostname, e.g. `smtp.gmail.com` |
| `port` | `587` (STARTTLS submission) unless the provider says otherwise |
| `username` | the login the provider issues — often the account address |
| `password` | an **app password / SMTP key generated by the provider**, never the account's own login password |
| `sender_email` | the `From:` address users will see |
| `sender_name` | display name — `Riftbound Deckbuilder` |

### Gmail route (no domain, no DNS)

1. Create a **new** Gmail account for this project. No existing personal or work
   address is used here.
2. Turn on 2-Step Verification — Google will not issue an app password without it.
3. Google Account → **Security** → **2-Step Verification** → **App passwords**.
   Generate one; you get 16 characters. Strip the spaces.
4. `host smtp.gmail.com` · `port 587` · `username` and `sender_email` are the new
   address · `password` is the 16-character app password.

500 messages/day, and deliverability is good because Google really is the sender.

### API equivalent

Verified against the OpenAPI spec (`StandardEmailServer`). The variant is
**`standard`**, not `smtp` or `custom` — those are rejected as unknown types:

```
PATCH /api/v2/projects/{project_id}/branches/{branch_id}/auth/email_provider
{ "type": "standard", "host": "smtp.gmail.com", "port": 587,
  "username": "...", "password": "...",
  "sender_email": "...", "sender_name": "Riftbound Deckbuilder" }
```

`{"type":"shared"}` switches back to Neon's sender.

See `docs/BLOCKED.md` for the open choice of provider.

## 4. Email verification is OFF by default

The production checklist states it plainly: *"Email verification is not enabled by
default."* This matters beyond security — **it decides whether stage 4's hard case
exists at all.**

- **Verification off**: sign-up completes in the same tab. The session arrives on a
  button click, and merge-on-signup is straightforward.
- **Verification on**: sign-up sends a mail, the user leaves, clicks the link, and the
  session arrives on a **fresh page load** — the case `CLAUDE.md` flags as the
  nasty one.

Stage 4 is being written to handle the fresh-page-load case regardless, because the
setting can be flipped in the console at any time and the code must not silently depend
on it being off.

Recommended: turn it on. Anyone can sign up otherwise, and this is a public URL.

## 5. Application name — already set

`GET /branches/{branch_id}/auth` returns `"name":"Riftbound deck builder"`, not the
project ID. Nothing to do.

## Reading current state without touching anything

```
GET  /api/v2/projects/{project_id}/branches/{branch_id}/auth
GET  /api/v2/projects/{project_id}/branches/{branch_id}/auth/oauth_providers
GET  /api/v2/projects/{project_id}/branches/{branch_id}/auth/email_provider
```

Also readable: `/auth/domains`, `/auth/email_and_password`, `/auth/allow_localhost`.

## Verified state — 2026-08-14, end of setup

| Setting | Value |
|---|---|
| `auth_provider` | `better_auth`, app name `Riftbound deck builder` |
| `domains` | `https://rlomelino1.github.io` ✅ |
| `oauth_providers` | `google`, `type: standard` (project's own credentials) ✅ |
| `email_and_password` | `enabled: true` |
| `email_verification_method` | **`otp`** |
| `require_email_verification` | `false` |
| `send_verification_email_on_sign_up` | `false` |
| `allow_localhost` | `true` — turn off when stage 4 ships |
| `email_provider` | `shared` (`auth@mail.myneon.app`) — pending a sender choice |

Google OAuth confirmed working from the production origin. `POST /sign-in/social`
with the Pages `callbackURL` returned `200` (previously `403 INVALID_CALLBACKURL`), and
following the init redirect lands on `accounts.google.com/o/oauth2/v2/auth` carrying
this project's `client_id` and
`redirect_uri=<auth base>/callback/google`, scope `email profile openid`.

The one thing not verifiable from outside: whether that redirect URI is registered on
the Google Cloud client. If it is not, Google shows `redirect_uri_mismatch` on the first
real sign-in — it cannot fail any earlier than that.

### Verification is OTP, not a link — and it does not remove the stage 4 hard case

`email_verification_method: otp` means the user types a 6-digit code in the same tab, so
no "leave the tab, click a link, land in a fresh page load". Neon's docs note that
verification *links* require a custom email provider, so switching senders could change
this.

Stage 4 still has to handle a session arriving on a fresh page load, because
**Google sign-in is itself a full-page redirect away and back.** That path exists no
matter how email verification is configured.

## Sources

- <https://neon.com/docs/auth/overview>
- <https://neon.com/docs/auth/production-checklist>
- <https://neon.com/docs/auth/guides/setup-oauth>
- <https://neon.com/docs/auth/guides/configure-domains>
- <https://neon.com/docs/auth/guides/customize-emails>

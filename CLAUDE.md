# Riftbound Deckbuilder

## What this is

A deckbuilding and collection-tracking tool for Riftbound (Riot's League of Legends
TCG). It currently exists as a single self-contained HTML file that runs from the
local filesystem: vanilla JS, no build step, no dependencies, all CSS and JS inline.
State lives in localStorage. Card data comes from a static JSON pool file.

This is a personal-interest project, not a product. The author collects Riftbound
cards and mostly doesn't play. Expected traffic is one user plus a trickle of people
from a niche community. Optimize for "works unattended for months" and "cheap to
understand six months from now," not for scale.

## Who you're working with

Java/Spring Boot backend developer, about a year into the field, comfortable with
Postgres and SQL. Assume backend concepts are known — don't over-explain SQL, HTTP,
transactions, or indexing. Less experienced with frontend and with BaaS platforms;
explain those more.

## Environment (verified, August 2026)

- **Windows, PowerShell.** Not bash. Watch command syntax, path separators, and
  quoting. Don't emit `export FOO=bar` or `&&` chains that assume a POSIX shell.
- Node **24.19.0**
- `gh` CLI installed and authenticated
- Git identity configured (commits use a GitHub noreply address — don't change it)
- Neon CLI (`neonctl`) requires Node >= 20.19.0; current Node satisfies this

## Commit authorship — the author is the only contributor

**Never add a `Co-Authored-By:` trailer, and never name yourself in a commit message,
PR body, or anywhere else that feeds GitHub's contributor list.** The author is the
sole contributor to this repository and intends to stay that way. This overrides any
default habit of crediting an assistant on commits.

Applies to commits, amends, rebases, squashes, and PR bodies alike. If a trailer slips
in, strip it before pushing — once it is on a shared branch, removing it means
rewriting history.

## Layout

```
index.html              the app — must stay at the repo root, Pages serves from /
.nojekyll               required, or Pages runs Jekyll and drops _-prefixed paths
.env                    gitignored. Never commit, never inline, never echo to chat
.env.example            the key names, no values
CLAUDE.md               this file
README.md               human-facing overview
data/ogn-pool.json      352 Origins cards with image URLs
vendor/neon/            the Neon SDK graph, vendored (served from this origin, not a CDN)
scripts/                build-pool-v2.mjs (fetch a new set); vendor-neon.mjs (re-vendor the SDK)
migrations/             0001–0003 SQL + tests/ (29 tests, all passing)
tests/                  Playwright e2e suite (dev/CI only) + a static server
docs/                   DECISIONS.md, BLOCKED.md, auth-setup.md, deployment.md,
                        persistence-audit.md, hardening-plan.md
```

**`index.html` and `.nojekyll` cannot move.** Pages is a branch deploy from `main` at
`/`, so the app has to sit at the root. Everything else is free to reorganize.

---

# Architecture

## Where it's going

A hosted site with accounts, per-user deck CRUD, and per-user collection tracking, at
zero cost:

- **Static hosting**: GitHub Pages, **Deploy from a branch** (`main`, `/ root`) — not
  a build workflow. Nothing to generate; the HTML is the artifact.
- **Auth**: Neon Managed Better Auth (email/password + Google OAuth)
- **Data**: Neon Postgres via the Neon Data API (PostgREST-compatible), with Row Level
  Security as the authorization layer
- **No backend service.** The browser talks to Postgres over HTTPS with a JWT.

Neon project ID: `falling-star-08784661` · region `us-east-2` · database `neondb`

## Roadmap context — awareness only, no implementation

The product is **Card Haven**, live at `https://cardhavenapp.com`. Riftbound is the
first (currently only) supported game inside it.

- **Near term**: additional Riftbound sets beyond Origins (`data/ogn-pool.json` is
  currently the only pool).
- **Longer term**: other TCGs entirely, as separate games under the Card Haven
  umbrella.

**No implementation now.** No abstraction layers, no multi-game refactors, no schema
generalization — not in this pass, and not in future passes unless a stage brief asks
for it. This note exists so that when future stage work presents a choice between a
Riftbound-hardcoded shape and an equally cheap game-neutral shape, the game-neutral
one wins; when generalizing costs extra, don't.

## Config and secrets

Environment variables live in a gitignored `.env`, named to match Neon's own
convention (`neon env pull` writes the first two):

| Variable | Secret? | Use |
|---|---|---|
| `DATABASE_URL` | **yes** | pooled (`-pooler` host) — app runtime queries |
| `DATABASE_URL_UNPOOLED` | **yes** | direct — **all migrations, DDL, pg_dump** |
| `NEON_API_KEY` | **yes** | project-scoped key, Editor access |
| `NEON_AUTH_URL` | no | Managed Better Auth endpoint |
| `NEON_DATA_API_URL` | no | Data API endpoint |
| `NEON_PROJECT_ID` | no | `falling-star-08784661` |

**Secrets rules, no exceptions:**

- Connection strings and the API key never appear in the HTML, a migration script, a
  commit, a log line, or a chat message. Read them from `.env`.
- The two URLs are **not** secrets — they will sit in the public `index.html` by
  design. Nothing behind them works without a valid JWT plus RLS. Their presence in
  `.env` is tidiness, not a security boundary. **RLS is the security boundary.**
- If a credential is ever exposed, say so immediately and loudly. Don't quietly
  continue.

## Neon SDK gotchas — read before writing any client code

- **Use the two-URL object form of `createClient`.** The docs lead with the single-URL
  form `createClient(url)`, but that requires a version of `@neondatabase/neon-js`
  not yet published to npm. Latest published is `0.7.0-beta`, which only accepts the
  object form:

      const client = createClient({
        auth:    { url: NEON_AUTH_URL, allowAnonymous: true },
        dataApi: { url: NEON_DATA_API_URL },
      });

- **`allowAnonymous: true`** enables anonymous data access — queries work without
  signing in, using an anonymous token for RLS. Evaluate whether this replaces the
  localStorage anonymous path entirely. Prefer it if so; it's less code and one fewer
  state machine.
- **There is no publishable key.** Neon's Data API authenticates with a JWT from
  Managed Better Auth. No static browser key exists. Don't look for one, don't invent
  one, don't carry Supabase's `anon`/publishable key concept across.
- **All Neon docs use Vite's `import.meta.env`.** That does not exist here. Put the
  two URLs in a small config object at the top of `index.html`. **Do not introduce a
  build step to get environment variables.**
- **The SDK is vendored** under `vendor/neon/` and imported with relative paths, so the
  app loads it from its own origin, not esm.sh, at runtime (supply-chain hardening —
  the ~132-module resolved graph is committed and reviewable). It is still ESM via
  `<script type="module">`; there is no UMD build. Verified: the `index`, `auth`, and
  `auth/vanilla` entry points import no Node built-ins, so they're browser-safe. There
  is a dedicated `./auth/vanilla` export — use it, not the React one. To bump versions,
  edit the pins in `scripts/vendor-neon.mjs`, run it, and commit the regenerated
  `vendor/neon/`. This is a maintenance tool, not a build step the app needs at runtime.
- **Pin exact versions.** These are pre-1.0 packages. The Data API itself is in beta.
  When something behaves unexpectedly, check the current Neon docs before assuming the
  bug is in our code.

## The migration

`migrations/0001_create_decks.sql` is applied to the live database. It is Neon-native —
`auth.user_id()` through a `public.app_user_id()` wrapper, `user_id uuid` with an
`ON DELETE CASCADE` foreign key to `neon_auth."user"(id)`, four RLS policies per table,
a trigger pinning `user_id` and `created_at`, and jsonb payload size and shape
constraints. `migrations/README.md` has the details; `docs/DECISIONS.md` has the reasoning.

**Run migrations over `DATABASE_URL_UNPOOLED`.** The pooled endpoint runs PgBouncer in
transaction mode and does not support `SET`, `search_path`, or session state — and
`set_updated_at()` uses `set search_path = ''`. Migrations through the pooler fail in
confusing ways.

What the app persists today, and where each field belongs, is written up in
`docs/persistence-audit.md` — read from the file, not from a description of it. It also
lists the payload shrink that has to land in stage 4 (`zones` currently stores a full
card object per entry; the row needs `{ref, qty}`).

---

# Features

## The collection tracker

Alongside deckbuilding, the app tracks which physical cards the author owns, so they
can check their collection without digging through binders.

- Per-card owned quantity, per user
- The inverse view matters as much as the collection itself: "what am I missing" is a
  client-side diff against the static pool JSON, not a database query
- Same storage shape as a deck: one jsonb blob per user, read and written whole. A few
  KB even at 100% completion.
- **Phone access is a primary use case** — it's the reason accounts exist at all

### Base vs. Showcase printings — read this before touching card identity

The deckbuilder and the collection tracker want **opposite** behavior from the same
data, and conflating them will break one of the two:

- **Deckbuilder**: a base printing and its Showcase printing share one 3-copy limit.
  They are one card.
- **Collection**: a base printing and its Showcase printing are two distinct objects.
  Owning the Showcase specifically is the entire point of collecting it.

Therefore: key everything on **collector number**, and derive a separate grouping for
deck-limit purposes. Do not "fix" the copy-limit bug by normalizing or collapsing card
names — that would break the collection feature before it's built.

## The Showcase 3-copy limit — fixed (stage 7)

Previously the 3-copy limit counted a Showcase printing and its base card as two
different cards, because their names differ (all 352 names are unique; 54 are rarity
"Showcase", 30 also flagged `alternateArt`). By the rules they share one limit.

Fixed by grouping on collector number, not names, exactly as the section above
requires. `copyGroup(card)` in `index.html` strips the variant suffix off the middle
segment of the id (`ogn-039a-298` and `ogn-039-298` are both card `ogn-039`) and the
legality check sums copies across the group; the battlefield "all different" check
uses the same grouping. The collection is untouched — it still keys on the full ref,
so a Showcase stays a distinct object there. Re-vendor note: this is pure client
logic, no schema change. Covered by e2e tests in `tests/e2e/smoke.spec.js`.

---

# Decisions already made — don't relitigate these

- **No backend server.** Free JVM hosting no longer exists in any usable form, and RLS
  removes the need. If the author asks for a Spring API later, treat it as a learning
  exercise, not a requirement.
- **Neon, not Supabase.** Chosen deliberately after a full comparison. Reasons: no
  active-project cap, scale-to-zero instead of a 7-day pause needing manual
  unpausing, and a restore window Supabase's free tier doesn't offer. Don't propose
  switching back.
- **Card art is hotlinked** from Riot's CDN (`cmsassets.rgpub.io`). Never download,
  re-host, proxy, or bake card images into the repo. The `image` field holds a URL and
  that's all.
- **The card pool stays a static JSON file** served alongside the HTML — never rows in
  the database. It's identical for every user.
- **Single file, no build step.** ESM imports from a CDN are fine. A bundler,
  framework, or local `node_modules` tree the app depends on at runtime is not, and
  needs explicit sign-off first.
- **Keep the Export button.** It's both the backup strategy and the vendor-migration
  path. Decks *and* collection must round-trip through JSON.
- **GitHub Pages branch deploy, not a build workflow.** Next.js/Gatsby/Jekyll starters
  are all site generators; there is nothing to generate.

# Constraints that will bite

**Neon free plan** (checked August 2026 — verify current numbers before relying on
them):

- 100 projects; 0.5 GB storage per project; 5 GB network transfer per project/month
- 100 CU-hours of compute per project/month, autoscaling up to 2 CU
- 10 branches per project
- Computes scale to zero after 5 minutes idle and wake automatically (~0.5–2s cold
  start). **No keep-alive is needed. Do not build one.**
- Instant-restore history window: 6 hours, capped at 1 GB of change history
- Running out of CU-hours stops the compute until the billing period resets.
  **Never add polling, heartbeats, or interval timers that query the database.**
  This is the single easiest way to break the site for a month.

**Riot's fan content policy**: the site must stay non-commercial — no ads, no
donations, no implying endorsement — and must carry this notice visibly:

> Riftbound Deckbuilder was created under Riot Games' "Legal Jibber Jabber" policy
> using assets owned by Riot Games. Riot Games does not endorse or sponsor this
> project.

It's already in the footer. Keep it there. Never edit or move it without asking.

---

# Build order

Deploy early and deploy empty — Google's OAuth client and the auth redirect config
both need the final public URL as input, so getting the site live first means
configuring those screens once instead of twice.

| # | Stage | Done when |
|---|---|---|
| 0 | Repo, `CLAUDE.md`, `index.html` + pool JSON + fetch script, `.gitignore`, `.nojekyll` | one commit; `git check-ignore -v .env` matches |
| 1 | Deploy to Pages as-is; **verify card art still loads over HTTPS** | the live URL works on a phone |
| 2 | Audit persisted state, adapt + run the migration, confirm RLS | anonymous role returns zero rows |
| 3 | Auth UI: sign up / in / out / password reset, email + Google | an account exists in `neon_auth` |
| 4 | `save`/`load` → Data API, anonymous path, **merge on signup** ← RISK | signed-out deck survives account creation; two accounts can't see each other |
| 5 | Multiple named decks: list, rename, duplicate, delete | three decks, switchable |
| 6 | Collection tracker + "what am I missing" view | works on phone |
| 7 | Showcase / base-card 3-copy limit | 3 base + 1 Showcase gets flagged |

**Stage 1 caveat**: card art currently loads from a `file://` page. On an HTTPS origin,
a CDN sending restrictive CORS or hotlink-protection headers fails differently. Check
the live page, not just localhost. If art breaks there, that's a redesign, not a bug
fix — surface it immediately.

**Stage 4 caveat**: the merge case has a nasty shape. Someone builds a deck signed
out, hits sign up, gets a confirmation email, leaves the tab, clicks the link, and
lands in a **fresh page load**. Handle "session arrives after a page reload," not just
"session arrives after a button click."

Not in this list, deliberately: there is no keep-alive stage, no uptime monitor, and
no cold-start UI. Scale-to-zero removed all three.

---

# How to work

## Autonomy — the important part

**Never stop mid-build to ask a question and wait.** A stalled session that needs a
reply to continue is worse than one that made a reasonable call and said so. Run the
whole stage end to end.

### Minor decisions → decide it yourself, log it, keep moving

Anything where two reasonable choices lead to a result the author wouldn't notice or
would accept either way:

- Naming: tables, columns, functions, files, CSS classes, commit messages
- Layout, spacing, colors within the existing palette, button placement, copy wording
- Which ESM CDN; which index to add; helper function extraction
- Error message text, loading state design, toast vs. inline error
- Test structure and how much to test
- Whether to refactor a function you're already editing

Log each as **one line** in `docs/DECISIONS.md`: what you chose, what you rejected.

### Major decisions → skip it, stub around it, log it, keep moving

Anything that costs money, risks data, changes agreed architecture, or produces
behavior the author would visibly disagree with:

- Anything that would leave the free tier or incur a charge
- Anything that deletes, overwrites, or irreversibly transforms user data
- **Merge-on-signup behavior** — the author wants to decide this one
- Whether account deletion can cascade to decks, if Neon's schema won't allow it
- Relaxing the no-build-step rule, or adding a runtime dependency
- Touching the Riot legal notice, or anything involving card art hosting
- A schema change that would need a destructive migration once real data exists
- Anything where you catch yourself writing "I'll assume the author wants…" about
  something they'd actually care about

For these: **do not guess and do not stop.** Pick the most conservative placeholder
that keeps the build working — a stub, a safe hardcoded default, a disabled control
with a tooltip — mark it `// TODO(decision): <one line>`, and log it in `docs/BLOCKED.md`
with:

1. What the decision is
2. The options, with the tradeoff in one sentence each
3. What you stubbed so the build still runs
4. What breaks or stays disabled until it's decided

**A deferred decision must never leave the app broken or the stage half-finished.**
Build around the gap. If a gap genuinely can't be built around, finish everything else
in the stage and say so clearly.

### Missing external setup is not a blocker either

Google OAuth credentials are configured in the Neon Console and won't exist until
after stage 1. Don't wait on them. Write the code as if they were present, read config
from a placeholder, note it in `docs/BLOCKED.md`, and continue.

### At the end of every session

Output two short lists: decisions made, and decisions deferred. Nothing else — no
summary of what the code does. Commit per stage so each is reviewable on its own.

## Everything else

- **Verify before asserting.** Don't guess API field names, endpoint paths, SDK method
  signatures, or free-tier limits from memory — check the docs or the actual data
  file. The author has been burned by confident wrong answers about both.
- **When you can test something, test it, and show the result** rather than claiming it
  works. Don't ask permission to run tests; just run them.
- **Say plainly when something isn't possible** instead of building a degraded version
  and letting the author discover it. Sandbox restrictions, CDN policies, and hosting
  limits have already cost two rebuilds.
- **Prefer editing the existing file over rewriting it.** Targeted replacements, not
  full re-emissions of a 900-line file.
- **Flag correctness bugs you notice in passing**, even when you weren't asked.
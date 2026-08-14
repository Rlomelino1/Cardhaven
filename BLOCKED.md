# Blocked / deferred decisions

Each entry: the decision, the options, what was stubbed, what stays broken until it's decided.

---

## 1. `ogn-pool.json` and `build-pool-v2.mjs` are not in the repo

**What it is.** `docs/CLAUDE.md` lists both as repo files. Neither exists on disk, and
neither is in the baseline commit. The author has said the pool JSON will be supplied
later.

**Options.**
- Wait for the real file — correct data, and the author already has it.
- Reconstruct the pool by re-running a fetch script — the fetch script is *also* missing, and guessing at Riot's API shape would produce wrong data silently.

**What was stubbed.** Nothing in the app. `index.html` loads its pool through a manual
file-import picker, so it runs and deploys with no pool file present. The stage 1
requirement "verify card art still loads over HTTPS" was met by testing a real Riot CDN
asset directly rather than through the pool — see `docs/deployment.md`.

**What stays broken until it's decided.** Nothing structural. When `ogn-pool.json`
lands it gets its own PR. A follow-up change can then switch the app from manual import
to fetching the pool from its own origin, which is small and self-contained.

---

## 2. `supabase/migrations/*_create_decks.sql` does not exist either

**What it is.** `docs/CLAUDE.md` says to *adapt* a Supabase-shaped migration that was
"tested against real Postgres with a simulated auth layer and 14 adversarial cases",
and warns against rewriting it. That file is not in the repository.

**Options.**
- Wait for it — but stage 2 is the whole point of this session and everything after it is blocked.
- Write the described design fresh — risks losing details the original encoded that the doc does not mention.

**What was stubbed.** Nothing is stubbed; `migrations/0001_create_decks.sql` implements
the design the doc describes — jsonb payload, size and shape constraints, four RLS
policies per table, trigger pinning `user_id` and `created_at`, `set_updated_at()` with
`set search_path = ''` — and is applied and passing 24 tests.

**What stays broken until it's decided.** Nothing runtime. The open question is whether
the original file encoded constraints this one does not. If it turns up, diff it against
`migrations/0001_create_decks.sql` rather than replacing it — this one is already applied
to the live database.

---

## 3. Card images are ~800 KB each; the CDN will resize them for free

**What it is.** Not a blocker — a finding, logged here because acting on it needs
sign-off. `docs/CLAUDE.md` classes "anything involving card art hosting" as a decision
the author makes.

Riot serves these assets through Sanity's image CDN, which honours query parameters.
Measured against a live asset:

| URL | Type | Size |
|---|---|---|
| `...744x1039.png?accountingTag=RB` (what the app requests today) | png | **818 KB** |
| `...&w=240` | png | 115 KB |
| `...&w=240&fm=webp` | webp | **15 KB** |
| `...&w=480&fm=webp&q=80` | webp | 41 KB |

The grid renders 48 tiles per page at ~112 px wide. It is currently downloading roughly
**38 MB per page of results** to display them at a seventh of their native size. Phone
access is a primary use case, and this is the app's entire data cost.

**Options.**
- Append `&w=240&fm=webp` to the grid thumbnail URL and keep the full-size original in the card modal — ~53× less data, no visible quality loss at tile size.
- Leave it — simplest, costs the user bandwidth on every page.

**Why it is not done.** It changes how card art is requested. It is still a hotlink to
Riot's own CDN — nothing downloaded, re-hosted, proxied, or baked into the repo, so it
stays inside the standing rule — but it is close enough to the line that it is the
author's call.

**What stays broken until it's decided.** Nothing. The app works; it is just heavy.

---

## 4. Merge-on-signup behaviour (stage 4 — flagged early, not yet reached)

`docs/CLAUDE.md` reserves this one for the author. Nothing in stages 0–2 depends on it.
Recorded now so it is not rediscovered late: the schema constrains none of the options
(overwrite, merge, or keep both as two decks), because a deck is one jsonb blob and
stage 5 makes decks per-user-many anyway.

---

## Resolved — was expected to block, did not

**Account deletion cascade.** `docs/CLAUDE.md` anticipated that Neon might not permit
`ON DELETE CASCADE` to its identity table, and called an explicit cleanup path a real
requirement if so. It does permit it. `neondb_owner` holds `REFERENCES` on
`neon_auth."user"` through membership in the `neon_auth` role, the foreign key was
accepted, and test **C10** confirms deleting an account removes that user's decks *and*
settings. No sweep job, no scheduled cleanup, nothing that polls the database — which
matters, because the free plan's CU-hour budget rules those out.

One residual risk, recorded rather than designed around: `neon_auth` is Neon's schema.
If a future Managed Better Auth change recreates that table, an inbound foreign key
could block it or be dropped. Nothing except the cascade depends on the constraint —
ownership is enforced by trigger and isolation by RLS, both of which hold without it.

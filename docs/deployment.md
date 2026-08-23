# Deployment (stage 1)

**Live URL:** <https://cardhavenapp.com> — custom domain since August 2026; the
original Pages URL, `https://rlomelino1.github.io/Riftbound-deck-builder/`,
redirects there. (Mentions of the old URL further down are records of what was
verified at stage 1, on the old origin.)

## How it is configured

Branch deploy, not a build workflow — per the standing decision in `CLAUDE.md`.

```
POST /repos/Rlomelino1/Riftbound-deck-builder/pages
  source[branch]=main
  source[path]=/
```

The API reports `"build_type": "legacy"`, which is GitHub's name for
*Deploy from a branch*. `"https_enforced": true`. There is no workflow file in the repo
and none is needed; `index.html` is the artifact.

`.nojekyll` is present at the root so Pages skips Jekyll and does not drop
underscore-prefixed paths.

## Custom domain (August 2026)

The site moved to `https://cardhavenapp.com`, with `https://www.cardhavenapp.com`
redirecting to the apex. Configuration as it now exists:

- **Registrar / DNS**: GoDaddy, DNS managed there (nameservers
  `ns37.domaincontrol.com` / `ns38.domaincontrol.com`).
- **Apex `cardhavenapp.com`**: four A records to GitHub Pages —
  `185.199.108.153`, `185.199.109.153`, `185.199.110.153`, `185.199.111.153`.
- **`www`**: CNAME → `rlomelino1.github.io`.
- **Repo**: a `CNAME` file containing `cardhavenapp.com` sits at the repo root.
  GitHub committed it when the domain was claimed. **Do not delete, rename, or
  edit it** — removing it un-claims the domain and takes the site down.
- **HTTPS**: enforced on the custom domain.
- **Auth**: `https://cardhavenapp.com` and `https://www.cardhavenapp.com` are
  registered in Neon Auth trusted domains and Google OAuth authorized JavaScript
  origins — details in `docs/auth-setup.md`.

## Verified

| Check | Result |
|---|---|
| Site responds | `200`, `text/html; charset=utf-8`, 31,797 bytes |
| HTTPS enforced | yes |
| Pages build | `status: built`, commit `002b27f`, no error |
| Pasted UI chrome gone from the live page | `grep "Created by you"` → 0 matches |

## Card art over HTTPS — the stage 1 caveat

`CLAUDE.md` flags this as a redesign risk: art that loads from a `file://` page can
fail from an HTTPS origin if the CDN sends restrictive CORS or hotlink-protection
headers.

**It does not fail.** Tested against a live asset on Riot's CDN
(`cmsassets.rgpub.io`, Sanity-backed):

| Request | Result |
|---|---|
| No `Referer` — what the page actually sends, given `<meta name="referrer" content="no-referrer">` and per-image `referrerpolicy="no-referrer"` | `200`, `image/png`, 818,848 bytes |
| `Referer: https://rlomelino1.github.io/...` — hotlink-protection probe | `200`, identical bytes |
| `Origin:` header set | `200`; no `Access-Control-Allow-Origin` in the response |

No hotlink protection and no referer sniffing. The absent CORS header is irrelevant
here: `<img>` loads are not CORS-gated. It would only matter for `fetch()` or for
reading pixels back through a canvas, neither of which the app does.

`Cache-Control: public, max-age=30471273` — roughly a year, so repeat views are free.

**Conclusion: no redesign needed.** Hotlinking works from the Pages origin exactly as it
does from `file://`.

The test used a real asset hash rather than the app's own pool, because `data/ogn-pool.json`
was not in the repo at the time ("Pool files" under Resolved in `docs/BLOCKED.md`; it is
in the repo now). URL shape:

```
https://cmsassets.rgpub.io/sanity/images/dsfx7636/game_data_live/{HASH}-744x1039.png?accountingTag=RB
```

One thing that surfaced while testing: those images are **818 KB each** and the grid
renders 48 of them at ~112 px wide. The same CDN returns a 240 px WebP of the same asset
in **15 KB**. Since settled — see "Thumbnail sizing" under Resolved in `docs/BLOCKED.md`;
grid tiles now request the WebP.

## Data footprint (stage 9)

Pages serves everything in the repo, so the card data *is* deployed. What is on the
wire, and when:

| File(s) | Size | Fetched |
|---|---|---|
| `index.html` | 216 KB | every load |
| `vendor/neon/bundle.mjs` | 658 KB, 135 KB gzipped, one request | every load |
| `vendor/neon/*.mjs` (132) | 976 KB | never — audit trail only |
| `data/ogn-pool.json` + `data/sfd-pool.json` | 435 KB | every load **while Riftbound is the active game** |
| `data/pokemon/sets.json` | 47 KB | on Pokémon activation |
| `data/pokemon/search-index.json` | 2.07 MB | on Pokémon activation |
| `data/pokemon/{set}-pool.json` × 174 | 6.76 MB total, 2–116 KB each | **one at a time**, when that set is opened |
| **repo total for card data** | **9.3 MB** | never all at once |

The 174 per-set pools are the point of the lazy design: a Pokémon session fetches the
manifest, the index, and the one or two sets actually looked at — roughly 2.2 MB, behind
an ETag, then nothing. Loading all of them would be 6.76 MB per visit and would still be
the wrong shape, because 20,444 tiles is not a page.

The search index is not deferred past game activation, and that is deliberate rather
than an oversight: a 60-card deck spans many sets, only the open set's pool is in memory,
and deck rows plus the copy limit resolve through the index. Without it a saved deck
renders as sixty unresolved entries. It is fetched once and kept in memory.

Card art is hotlinked and counts against nobody's budget here — see the CDN section
above for Riot, and `images.pokemontcg.io` / `images.scrydex.com` for Pokémon. Both
Pokémon hosts are in the page's CSP `img-src`; **`raw.githubusercontent.com` is not**, and
must not be — it is read by `scripts/build-pokemon-pools.mjs` at vendoring time and never
by the page. `tests/e2e/pokemon.spec.js` asserts nothing reaches it at runtime.

Nothing here touches the Neon budgets: pool files are static assets on Pages, not rows.

## Not done, deliberately

No keep-alive, no uptime monitor, no cold-start UI, and nothing that polls. Neon's
scale-to-zero removes the need, and the free plan's CU-hour budget makes polling the
fastest way to take the site down for a month.

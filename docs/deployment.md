# Deployment (stage 1)

**Live URL:** <https://rlomelino1.github.io/Riftbound-deck-builder/>

## How it is configured

Branch deploy, not a build workflow — per the standing decision in `docs/CLAUDE.md`.

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

## Verified

| Check | Result |
|---|---|
| Site responds | `200`, `text/html; charset=utf-8`, 31,797 bytes |
| HTTPS enforced | yes |
| Pages build | `status: built`, commit `002b27f`, no error |
| Pasted UI chrome gone from the live page | `grep "Created by you"` → 0 matches |

## Card art over HTTPS — the stage 1 caveat

`docs/CLAUDE.md` flags this as a redesign risk: art that loads from a `file://` page can
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

The test used a real asset hash rather than the app's own pool, because `ogn-pool.json`
is not in the repo yet (`BLOCKED.md` §1). URL shape:

```
https://cmsassets.rgpub.io/sanity/images/dsfx7636/game_data_live/{HASH}-744x1039.png?accountingTag=RB
```

One thing that surfaced while testing: those images are **818 KB each** and the grid
renders 48 of them at ~112 px wide. The same CDN returns a 240 px WebP of the same asset
in **15 KB**. That is logged as `BLOCKED.md` §3 — it changes how card art is requested,
which is the author's call.

## Not done, deliberately

No keep-alive, no uptime monitor, no cold-start UI, and nothing that polls. Neon's
scale-to-zero removes the need, and the free plan's CU-hour budget makes polling the
fastest way to take the site down for a month.

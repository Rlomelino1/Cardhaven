# vendor/neon

The Neon auth + Data API SDK, vendored so the app loads it from its own origin
instead of a transforming CDN at runtime. Two kinds of file live here, and only
one of them is loaded.

| | what it is | loaded by the page? |
|---|---|---|
| `bundle.mjs` | the graph below, bundled and tree-shaken into one file | **yes — this is the only one** |
| everything else (132 `.mjs`) | the resolved esm.sh module graph, one file per module | no |

## Why both

`bundle.mjs` is what runs. Measured over HTTP/2, which is what GitHub Pages
serves: the 132-file graph costs 232 KB across 132 requests and the auth module
reports at 10.6s on a slow-3G profile, while the bundle is 135 KB in one request
and reports at 7.0s. First paint and time-to-cards are unchanged either way —
the card pool wins that race regardless — so this buys nothing for a visitor who
never signs in, and about 3.6 seconds for one who is already signed in and
waiting for their decks.

The individual modules stay committed because they are the audit trail. A version
bump can then be reviewed file-by-file against what esm.sh actually served, which
one generated 670 KB file cannot show. They are served by Pages (everything in
the repo is) but nothing fetches them.

## Regenerating

```
node scripts/vendor-neon.mjs                 # re-resolve the graph, rewrite both
node scripts/vendor-neon.mjs --bundle-only   # rebuild bundle.mjs only, no network
```

`--bundle-only` exists because re-vendoring resolves the graph fresh and can pull
newer transitive builds, which would land an SDK change inside a diff that was
meant to be about something else. It is also how you check that the committed
bundle really is the committed modules: rebuild and confirm nothing changed.

esbuild is fetched by `npx` at a pinned version when the script runs. It is not a
build step and not a dependency of the app — the output is a static file
committed to the repo, and nothing runs esbuild to serve, test or deploy the
page. It replaces esm.sh's own bundling pass with a pinned local one, so the
transformation that produces the shipped bytes is ours rather than a CDN's.

## What tree-shaking removes, and why that is safe

The bundle contains 78 of the 132 modules. The 54 it leaves out are dominated by
45 `jose` modules — the JWE/JWS/JWT sign, verify, encrypt and key-import surface.
None of it is reachable from the SDK's own public exports: building the bundle
with `export *` from all three entries instead of the four names the page imports
keeps only 5 more modules (`base64url`, `decode_protected_header`, `jwt_decode`
and two helpers), and still drops every one of the crypto entry points. So the
browser was downloading and evaluating that code for nothing.

The names the bundle exposes are listed in `ENTRIES[].expose` in
`scripts/vendor-neon.mjs`, and they mirror `index.html`'s import. Adding an import
without adding it there fails the page immediately, and the e2e suite says so.

Verified, on the bundle and on the 132-file graph side by side: a real sign-in
attempt against the live auth endpoint produces the same request
(`POST /neondb/auth/sign-in/email`), the same status, and the same message, so
the proxy path resolution, better-fetch, zod validation and URL building all
behave identically. A *successful* sign-in cannot be verified locally at all —
the auth service rejects a local origin before it gets that far — so it was
checked on production after deploying: signing in works, and an invalid account
is refused with a 401 on credentials rather than the 403 on origin that a local
run gets. Nothing here is an open question.

# GoatCounter

`count.js` is GoatCounter's page-view script, copied unmodified from
<https://gc.zgo.at/count.js> on 2026-10-15 (ISC license, header kept in the file).

It is served from our own origin so the Content-Security-Policy can keep
`script-src` at hashes plus `'self'`, with no third-party script host. The only
outside host involved is the counting endpoint, `https://cardhaven.goatcounter.com`,
which the CSP allows in `connect-src` only. The script sends with `sendBeacon`; its
image fallback is deliberately left blocked so `img-src` stays limited to card hosts.

What it sends per page view: the path, the page title, the referrer, and the screen
width. No cookies, nothing stored on the device, no identifier. It skips localhost,
private-network hosts and automated browsers, so local runs and the test suite are
never counted.

To refresh: download the file again over the top of this one and commit it.

To stop counting your own visits on one browser, open
`https://cardhavenapp.com/#toggle-goatcounter` once.

// Minimal static file server for the test suite and local preview.
// The app is a static site with no build step; this just serves the repo root
// over http:// so index.html can fetch its pool from its own origin (file://
// can't). `npx serve` works too but has surprised us with a download-prone
// default handler, so we ship a 20-line one we control.
//
//   node tests/serve.mjs            # http://127.0.0.1:4173
//   PORT=8080 node tests/serve.mjs

import http from "node:http";
import { readFile } from "node:fs/promises";
import { join, extname, normalize } from "node:path";
import { fileURLToPath } from "node:url";
import { dirname } from "node:path";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const PORT = Number(process.env.PORT) || 4173;
const MIME = {
  ".html": "text/html; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".mjs": "text/javascript; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".svg": "image/svg+xml",
  ".png": "image/png",
};

const server = http.createServer(async (req, res) => {
  try {
    const path = decodeURIComponent(req.url.split("?")[0]);
    // Contain the path to ROOT — no traversal out of the repo.
    const rel = normalize(path === "/" ? "index.html" : path).replace(/^(\.\.[/\\])+/, "");
    const file = join(ROOT, rel);
    if (!file.startsWith(ROOT)) { res.writeHead(403); res.end("forbidden"); return; }
    const body = await readFile(file);
    res.writeHead(200, { "content-type": MIME[extname(file)] || "application/octet-stream" });
    res.end(body);
  } catch {
    res.writeHead(404, { "content-type": "text/plain" });
    res.end("not found");
  }
});

server.listen(PORT, "127.0.0.1", () => {
  console.log(`serving ${ROOT} at http://127.0.0.1:${PORT}`);
});

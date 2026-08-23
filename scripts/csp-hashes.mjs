#!/usr/bin/env node

import { readFile, writeFile } from "node:fs/promises";
import { createHash } from "node:crypto";

const FILE = new URL("../index.html", import.meta.url);
const WRITE = process.argv.includes("--write");

const html = await readFile(FILE, "utf8");

if (html.includes("\r\n")) {
  console.error("index.html contains CRLF line endings. The hash would not match");
  console.error("what GitHub Pages serves. Check .gitattributes, then:");
  console.error("  git add --renormalize index.html");
  process.exit(2);
}

const scannable = html.replace(/<!--[\s\S]*?-->/g, (c) => c.replace(/[^\n]/g, " "));
const scripts = [...scannable.matchAll(/<script(?:\s[^>]*)?>([\s\S]*?)<\/script>/g)]
  .map((m) => m[1]);

const sha = (s) => "'sha256-" + createHash("sha256").update(s, "utf8").digest("base64") + "'";
const hashes = scripts.map(sha);

const cspRe = /(<meta http-equiv="Content-Security-Policy" content=")([^"]*)(")/;
const found = cspRe.exec(html);
if (!found) { console.error("no CSP meta tag in index.html"); process.exit(2); }

const policy = found[2];
const srcRe = /script-src ([^;]*)/;
const current = srcRe.exec(policy);
if (!current) { console.error("no script-src in the CSP"); process.exit(2); }

const wanted = `script-src ${hashes.join(" ")} 'self'`;
const already = current[0].trim() === wanted;

console.log(`inline scripts: ${scripts.length}`);
scripts.forEach((s, i) => console.log(`  ${i}  ${String(s.length).padStart(7)} chars  ${hashes[i]}`));
console.log(`\ncurrent: ${current[0].trim()}`);
console.log(`wanted : ${wanted}`);

if (already) { console.log("\nup to date"); process.exit(0); }

if (!WRITE) {
  console.error("\nSTALE — the policy does not match the scripts. Re-run with --write.");
  process.exit(1);
}

const updated = html.replace(cspRe, (_, a, pol, c) => a + pol.replace(srcRe, wanted) + c);
await writeFile(FILE, updated);
console.log("\nwritten");
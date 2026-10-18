#!/usr/bin/env node

import { readFile, writeFile } from "node:fs/promises";
import { createHash } from "node:crypto";

// Every page that carries its own CSP with hashed inline scripts.
const PAGES = ["index.html", "privacy.html"];
const WRITE = process.argv.includes("--write");

const sha = (s) => "'sha256-" + createHash("sha256").update(s, "utf8").digest("base64") + "'";
const cspRe = /(<meta http-equiv="Content-Security-Policy" content=")([^"]*)(")/;
const srcRe = /script-src ([^;]*)/;

let stale = false;

for (const page of PAGES) {
  const FILE = new URL(`../${page}`, import.meta.url);
  const html = await readFile(FILE, "utf8");

  if (html.includes("\r\n")) {
    console.error(`${page} contains CRLF line endings. The hash would not match`);
    console.error("what GitHub Pages serves. Check .gitattributes, then:");
    console.error(`  git add --renormalize ${page}`);
    process.exit(2);
  }

  const scannable = html.replace(/<!--[\s\S]*?-->/g, (c) => c.replace(/[^\n]/g, " "));
  const scripts = [...scannable.matchAll(/<script(\s[^>]*)?>([\s\S]*?)<\/script>/g)]
    .filter((m) => !/\ssrc=/.test(m[1] ?? ""))   // external scripts are covered by 'self'
    .map((m) => m[2]);
  const hashes = scripts.map(sha);

  const found = cspRe.exec(html);
  if (!found) { console.error(`no CSP meta tag in ${page}`); process.exit(2); }

  const policy = found[2];
  const current = srcRe.exec(policy);
  if (!current) { console.error(`no script-src in the CSP of ${page}`); process.exit(2); }

  const wanted = `script-src ${hashes.join(" ")} 'self'`;
  const already = current[0].trim() === wanted;

  console.log(`${page}: inline scripts: ${scripts.length}`);
  scripts.forEach((s, i) => console.log(`  ${i}  ${String(s.length).padStart(7)} chars  ${hashes[i]}`));
  console.log(`current: ${current[0].trim()}`);
  console.log(`wanted : ${wanted}`);

  if (already) { console.log("up to date\n"); continue; }

  if (!WRITE) {
    console.error(`STALE — the policy in ${page} does not match its scripts. Re-run with --write.\n`);
    stale = true;
    continue;
  }

  const updated = html.replace(cspRe, (_, a, pol, c) => a + pol.replace(srcRe, wanted) + c);
  await writeFile(FILE, updated);
  console.log("written\n");
}

if (stale) process.exit(1);

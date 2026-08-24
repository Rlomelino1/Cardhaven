import { test, expect } from "@playwright/test";
import { readFile } from "node:fs/promises";
import { createHash } from "node:crypto";
import { openApp, RB_POOL } from "./helpers.js";

const INDEX = new URL("../../index.html", import.meta.url);

const readIndex = async () => {
  const html = await readFile(INDEX, "utf8");
  const policy = /<meta http-equiv="Content-Security-Policy" content="([^"]*)"/.exec(html)?.[1];
  const scannable = html.replace(/<!--[\s\S]*?-->/g, (c) => c.replace(/[^\n]/g, " "));
  const scripts = [...scannable.matchAll(/<script(?:\s[^>]*)?>([\s\S]*?)<\/script>/g)]
    .map((m) => m[1]);
  return { html, policy, scripts };
};

test.describe("the CSP forbids inline script, and says so accurately", () => {
  test("index.html has no CRLF, or the served bytes would not match the hashes",
    async () => {
      const { html } = await readIndex();
      expect(html.includes("\r\n"), "index.html contains CRLF").toBe(false);
    });

  test("every inline script is named by a current sha256", async () => {
    const { policy, scripts } = await readIndex();
    const src = /script-src ([^;]*)/.exec(policy)[1].trim().split(/\s+/);
    const wanted = scripts.map((s) =>
      "'sha256-" + createHash("sha256").update(s, "utf8").digest("base64") + "'");
    expect(scripts.length).toBeGreaterThan(0);
    for (const [i, h] of wanted.entries())
      expect(src, `inline script ${i} (${scripts[i].length} chars) is not named by the policy`)
        .toContain(h);
    expect(src.filter((s) => !s.startsWith("'sha256-"))).toEqual(["'self'"]);
  });

  test("'unsafe-inline' is gone from script-src", async () => {
    const { policy } = await readIndex();
    const src = /script-src ([^;]*)/.exec(policy)[1];
    expect(src).not.toContain("unsafe-inline");
    expect(/style-src ([^;]*)/.exec(policy)[1]).toContain("unsafe-inline");
  });

  test("the app still boots, and the vendored SDK still loads", async ({ page }) => {
    const violations = [];
    page.on("console", (m) => {
      if (/Content Security Policy/i.test(m.text())) violations.push(m.text());
    });
    await openApp(page);
    expect(await page.evaluate(() => S.pool.length)).toBe(RB_POOL);
    await page.waitForFunction(() => typeof window.cloud !== "undefined", null, { timeout: 15000 });
    expect(violations, "the app's own code was blocked").toEqual([]);
  });

  test("an injected inline script does not run", async ({ page }) => {
    await openApp(page);
    await page.evaluate(() => {
      const d = document.createElement("div");
      d.innerHTML = "<script>window.__injected = 1<\/script>";
      document.body.appendChild(d);
    });
    await page.waitForTimeout(300);
    expect(await page.evaluate(() => window.__injected ?? null)).toBeNull();
  });

  test("an injected inline event handler does not run", async ({ page }) => {
    await openApp(page);
    await page.evaluate(() => {
      const d = document.createElement("div");
      d.innerHTML = `<img src="x" onerror="window.__handler = 1">`;
      document.body.appendChild(d);
    });
    await page.waitForTimeout(400);
    expect(await page.evaluate(() => window.__handler ?? null)).toBeNull();
  });

  test("the delegated actions still work — the whole point of the refactor",
    async ({ page }) => {
      await openApp(page);
      await page.locator("#results .tile").first().locator(".acts .btn").first().click();
      expect(await page.evaluate(() => zoneCount("main"))).toBe(1);
      await page.locator("#themeBtn").click();
      expect(await page.evaluate(() =>
        document.documentElement.classList.contains("paper"))).toBe(true);
      await page.locator("#results .frame").first().click();
      await expect(page.locator("#modal.open")).toBeVisible();
      await page.locator("#modalBox .btn", { hasText: "Close" }).click();
      await expect(page.locator("#modal.open")).toBeHidden();
    });
});
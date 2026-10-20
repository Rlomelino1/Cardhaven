import { test, expect } from "@playwright/test";
import { openApp } from "./helpers.js";

// Signs a fake user in by answering Neon Auth and the Data API at the network, so the
// real module code (session, token, RPC) runs. Returns the requests the app made.
const signedIn = async (page, { rpcStatus = 204 } = {}) => {
  const calls = { rpc: [], signOut: 0 };
  let live = true;
  const user = { id: "aaaaaaaa-7777-4777-8777-aaaaaaaaaaaa", email: "g@example.com", name: "Gee",
    emailVerified: true, createdAt: "2026-01-01T00:00:00Z", updatedAt: "2026-01-01T00:00:00Z" };
  const session = { id: "s1", token: "tok", userId: user.id, expiresAt: "2099-01-01T00:00:00Z",
    createdAt: "2026-01-01T00:00:00Z", updatedAt: "2026-01-01T00:00:00Z" };
  await page.route(/neonauth\./, (r) => {
    const url = r.request().url();
    if (/\/get-session/.test(url)) return r.fulfill({ json: live ? { user, session } : null });
    if (/\/sign-out/.test(url)) { calls.signOut++; live = false; return r.fulfill({ json: { success: true } }); }
    return r.fulfill({ json: {} });
  });
  await page.route(/apirest\./, (r) => {
    const req = r.request();
    if (/\/rpc\/delete_my_account/.test(req.url())) {
      calls.rpc.push({ method: req.method(), auth: req.headers().authorization });
      if (rpcStatus >= 400)
        return r.fulfill({ status: rpcStatus, json: { code: "42501", message: "not signed in" } });
      return r.fulfill({ status: rpcStatus, body: "" });
    }
    return r.fulfill({ json: [] });
  });
  await openApp(page);
  await expect(page.locator("#acct .me")).toBeVisible();
  return calls;
};

const openAccount = async (page) => {
  await page.click("#acct .me");
  await expect(page.locator("#authTitle")).toHaveText("Your account");
};

test.describe("deleting an account", () => {
  test("the name in the header opens the account panel", async ({ page }) => {
    await signedIn(page);
    await openAccount(page);
    await expect(page.locator("#authLede")).toContainText("g@example.com");
    await expect(page.locator("#authForm .btn.go.danger")).toHaveText("Delete my account");
  });

  test("nothing is deleted until DELETE is typed", async ({ page }) => {
    const calls = await signedIn(page);
    await openAccount(page);
    await page.fill("#authForm input[name=confirm]", "yes");
    await page.click("#authForm .btn.go");
    await expect(page.locator("#authMsg")).toHaveText("Type DELETE to confirm.");
    expect(calls.rpc).toEqual([]);
    await expect(page.locator("#acct .me")).toBeVisible();
  });

  test("DELETE removes the account through the RPC and signs out", async ({ page }) => {
    const calls = await signedIn(page);
    await openAccount(page);
    await page.fill("#authForm input[name=confirm]", "delete");
    await page.click("#authForm .btn.go");
    await expect(page.locator("#authMsg"))
      .toHaveText("Your account and everything saved in it have been deleted.");
    expect(calls.rpc).toEqual([{ method: "POST", auth: "Bearer tok" }]);
    expect(calls.signOut).toBe(1);
    await expect(page.locator('#acct [data-auth="in"]')).toBeVisible();
    await expect(page.locator("#authTitle")).toHaveText("Sign in");
  });

  test("a failed delete says nothing was removed and stays signed in", async ({ page }) => {
    const calls = await signedIn(page, { rpcStatus: 403 });
    await openAccount(page);
    await page.fill("#authForm input[name=confirm]", "DELETE");
    await page.click("#authForm .btn.go");
    await expect(page.locator("#authMsg")).toContainText("nothing was removed");
    expect(calls.rpc.length).toBe(1);
    expect(calls.signOut).toBe(0);
    await expect(page.locator("#acct .me")).toBeVisible();
  });
});

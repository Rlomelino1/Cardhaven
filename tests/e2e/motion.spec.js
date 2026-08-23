import { test, expect } from "@playwright/test";
import { openApp, openPokemon } from "./helpers.js";

const BACK_DIR = "others/back";

const frameState = (el) => ({
  transform: getComputedStyle(el).transform,
  rx: el.style.getPropertyValue("--rx"),
  ry: el.style.getPropertyValue("--ry"),
  tilting: el.classList.contains("tilt"),
});

const hoverAt = async (page, frame, fx, fy) => {
  const at = await frame.evaluate((el, [fx, fy]) => {
    const r = el.getBoundingClientRect();
    return { x: r.left + r.width * fx, y: r.top + r.height * fy };
  }, [fx, fy]);
  await page.mouse.move(at.x, at.y);
};

const openType = async (page, type) => {
  await page.evaluate((t) => openCard(refOf(S.pool.find((c) => c.type === t))), type);
  await page.waitForSelector("#cardFlipper");
};

test.describe("grid hover tilt", () => {
  test("a hovered card tilts toward the cursor and returns to rest", async ({ page }) => {
    await openApp(page);
    const frame = page.locator("#results .frame").nth(6);
    const rest = await frame.evaluate(frameState);
    expect(rest.rx).toBe("");
    expect(rest.ry).toBe("");

    await frame.hover();
    await hoverAt(page, frame, 0.85, 0.2);
    await page.waitForFunction(
      () => !!document.querySelector("#results .frame.tilt")?.style.getPropertyValue("--ry"));
    const tilted = await frame.evaluate(frameState);
    expect(tilted.tilting).toBe(true);
    expect(parseFloat(tilted.ry)).toBeGreaterThan(0);
    expect(parseFloat(tilted.rx)).toBeGreaterThan(0);
    expect(tilted.transform).not.toBe(rest.transform);

    await hoverAt(page, frame, 0.15, 0.8);
    await page.waitForFunction(
      () => parseFloat(document.querySelector("#results .frame.tilt")
        ?.style.getPropertyValue("--ry") || "0") < 0);
    const other = await frame.evaluate(frameState);
    expect(parseFloat(other.ry)).toBeLessThan(0);
    expect(parseFloat(other.rx)).toBeLessThan(0);

    await page.mouse.move(2, 2);
    await page.waitForFunction(() => !document.querySelector("#results .frame.tilt"));
    const back = await frame.evaluate(frameState);
    expect(back.rx).toBe("");
    expect(back.ry).toBe("");
  });

  test("tilt never exceeds its cap, even at the scaled edge", async ({ page }) => {
    await openApp(page);
    const frame = page.locator("#results .frame").nth(2);
    await frame.hover();
    await page.waitForFunction(() => {
      const el = document.querySelector("#results .frame.tilt");
      if (!el) return false;
      const m = new DOMMatrix(getComputedStyle(el).transform);
      return m.m11 > 1.045;
    });
    for (const [fx, fy] of [[0, 0], [1, 0], [1, 1], [0, 1], [0.5, 0.5]]) {
      await hoverAt(page, frame, fx, fy);
      await page.waitForTimeout(60);
      const s = await frame.evaluate(frameState);
      expect(Math.abs(parseFloat(s.rx || "0")),
        `rx at (${fx},${fy})`).toBeLessThanOrEqual(7.01);
      expect(Math.abs(parseFloat(s.ry || "0")),
        `ry at (${fx},${fy})`).toBeLessThanOrEqual(7.01);
    }
  });

  test("a pointer outside the measured box still clamps to the cap",
    async ({ page }) => {
      await openApp(page);
      const r = await page.evaluate(() => {
        const el = document.querySelector("#results .frame");
        tiltEl = el;
        tiltBox = el.getBoundingClientRect();
        const read = (px, py) => {
          tiltPx = px; tiltPy = py;
          tiltPaint();
          return { rx: parseFloat(el.style.getPropertyValue("--rx")),
                   ry: parseFloat(el.style.getPropertyValue("--ry")) };
        };
        return {
          farLow: read(tiltBox.left - 400, tiltBox.top - 400),
          farHigh: read(tiltBox.right + 400, tiltBox.bottom + 400),
          justOut: read(tiltBox.right + 1, tiltBox.top - 1),
        };
      });
      expect(r.farLow).toEqual({ rx: 7, ry: -7 });
      expect(r.farHigh).toEqual({ rx: -7, ry: 7 });
      expect(Math.abs(r.justOut.rx)).toBeLessThanOrEqual(7);
      expect(Math.abs(r.justOut.ry)).toBeLessThanOrEqual(7);
    });

  test("the modal art is not a tilt target", async ({ page }) => {
    await openApp(page);
    await openType(page, "Unit");
    expect(await page.evaluate(() => document.querySelectorAll("#modalBox .frame").length))
      .toBe(0);
  });
});

test.describe("reduced motion", () => {
  const reducedPage = async (browser) => {
    const ctx = await browser.newContext({ reducedMotion: "reduce" });
    const page = await ctx.newPage();
    await openApp(page);
    expect(await page.evaluate(
      () => matchMedia("(prefers-reduced-motion: reduce)").matches),
      "reduced-motion emulation is not reaching the page").toBe(true);
    return { ctx, page };
  };

  test("hover applies no rotation and no lift", async ({ browser }) => {
    const { ctx, page } = await reducedPage(browser);
    const frame = page.locator("#results .frame").nth(6);
    await frame.hover();
    await hoverAt(page, frame, 0.9, 0.1);
    await page.waitForTimeout(150);
    const s = await frame.evaluate(frameState);
    expect(s.rx).toBe("");
    expect(s.ry).toBe("");
    expect(s.transform).toBe("none");
    expect(await frame.evaluate((el) => getComputedStyle(el).filter))
      .toContain("brightness");
    await ctx.close();
  });

  test("the flip still works, without a transition", async ({ browser }) => {
    const { ctx, page } = await reducedPage(browser);
    await openType(page, "Unit");
    expect(await page.evaluate(
      () => getComputedStyle(document.getElementById("cardFlipper")).transitionDuration))
      .toBe("0s");
    await page.click(".flipscene");
    await expect(page.locator("#cardFlipper")).toHaveClass(/flipped/);
    await ctx.close();
  });
});

test.describe("modal flip", () => {
  test("a click flips and unflips", async ({ page }) => {
    await openApp(page);
    await openType(page, "Unit");
    await expect(page.locator("#cardFlipper")).not.toHaveClass(/flipped/);
    await page.click(".flipscene");
    await expect(page.locator("#cardFlipper")).toHaveClass(/flipped/);
    await page.click(".flipscene");
    await expect(page.locator("#cardFlipper")).not.toHaveClass(/flipped/);
  });

  test("there is no flip button left to click", async ({ page }) => {
    await openApp(page);
    await openType(page, "Unit");
    const r = await page.evaluate(() => ({
      byAction: document.querySelectorAll('[data-a="flipCard"]').length,
      action: typeof window.flipCard,
      acts: document.querySelector(".modalacts").innerText.trim(),
    }));
    expect(r.byAction).toBe(0);
    expect(r.action).toBe("undefined");
    expect(r.acts).not.toContain("Flip");
  });

  test("clicking the card art flips it", async ({ page }) => {
    await openApp(page);
    await openType(page, "Unit");
    await page.click(".flipscene");
    await expect(page.locator("#cardFlipper")).toHaveClass(/flipped/);
  });

  test("the flip is a real animation, and the back is not mirrored", async ({ page }) => {
    await openApp(page);
    await openType(page, "Unit");
    const s = await page.evaluate(() => {
      const f = getComputedStyle(document.getElementById("cardFlipper"));
      const back = getComputedStyle(document.querySelector(".face.back"));
      return {
        duration: f.transitionDuration,
        property: f.transitionProperty,
        preserve: f.transformStyle,
        backface: back.backfaceVisibility,
        backTransform: back.transform,
      };
    });
    expect(parseFloat(s.duration)).toBeGreaterThan(0.3);
    expect(s.property).toContain("transform");
    expect(s.preserve).toBe("preserve-3d");
    expect(s.backface).toBe("hidden");
    expect(s.backTransform).not.toBe("none");
  });

  test("a reopened card starts front-facing", async ({ page }) => {
    await openApp(page);
    await openType(page, "Unit");
    await page.click(".flipscene");
    await expect(page.locator("#cardFlipper")).toHaveClass(/flipped/);
    await page.evaluate(() => closeModal());
    await openType(page, "Unit");
    await expect(page.locator("#cardFlipper")).not.toHaveClass(/flipped/);
  });

  test("no inline handler is introduced", async ({ page }) => {
    await openApp(page);
    await openType(page, "Unit");
    expect(await page.evaluate(() => {
      const bad = [];
      for (const el of document.querySelectorAll("#modalBox *"))
        for (const a of el.attributes) if (/^on/i.test(a.name)) bad.push(a.name);
      return bad;
    })).toEqual([]);
  });
});

test.describe("the back face comes from the registry", () => {
  for (const [type, file] of [["Unit", "blue.jpg"], ["Legend", "black.jpg"],
                              ["Battlefield", "black.jpg"], ["Rune", "white.jpg"]])
    test(`a Riftbound ${type} shows ${file}`, async ({ page }) => {
      await openApp(page);
      await openType(page, type);
      const src = await page.getAttribute(".face.back img", "src");
      expect(src).toContain(BACK_DIR);
      expect(src.endsWith(file)).toBe(true);
      expect(await page.getAttribute(".face.back img", "referrerpolicy"))
        .toBe("no-referrer");
    });

  test("a Pokemon card shows the Bulbagarden back", async ({ page }) => {
    await openPokemon(page);
    await page.waitForFunction(() => S.pool.length > 0);
    await page.evaluate(() => openCard(refOf(S.pool[0])));
    await page.waitForSelector("#cardFlipper");
    expect(await page.getAttribute(".face.back img", "src"))
      .toBe("https://archives.bulbagarden.net/media/upload/1/17/Cardback.jpg");
  });

  test("the back is never requested before a modal opens", async ({ page }) => {
    const hits = [];
    await page.route(/others\/back\/|archives\.bulbagarden\.net/, (route) => {
      hits.push(route.request().url());
      return route.abort();
    });
    await openApp(page);
    expect(hits).toEqual([]);
    await openType(page, "Unit");
    await page.waitForFunction(() => !!document.querySelector(".face.back svg,[data-back]"));
    expect(hits.length).toBe(1);
  });
});

test.describe("a failed back image falls back to the generated one", () => {
  test("the SVG back carries the game mark and raises no notice", async ({ page }) => {
    await page.route("**/others/back/*.jpg", (route) => route.abort());
    await openApp(page);
    await openType(page, "Unit");
    await page.waitForSelector(".face.back svg[data-backsvg]");
    const r = await page.evaluate(() => ({
      text: [...document.querySelectorAll(".face.back text")].map((t) => t.textContent),
      notice: !!document.querySelector(".artmiss"),
      img: !!document.querySelector(".face.back img"),
    }));
    expect(r.text).toEqual(["RB", "RIFTBOUND"]);
    expect(r.notice).toBe(false);
    expect(r.img).toBe(false);
    await page.click(".flipscene");
    await expect(page.locator("#cardFlipper")).toHaveClass(/flipped/);
  });
});

test.describe("regressions", () => {
  test("the modal still opens and closes", async ({ page }) => {
    await openApp(page);
    await openType(page, "Unit");
    await expect(page.locator("#modal.open")).toBeVisible();
    await page.click('.modalacts [data-a="closeModal"]');
    await expect(page.locator("#modal.open")).toBeHidden();
  });

  test("a broken front image still reports missing art", async ({ page }) => {
    await page.route("**/cmsassets.rgpub.io/**", (route) => route.abort());
    await openApp(page);
    await openType(page, "Unit");
    await expect(page.locator("#modalBox .artmiss")).toBeVisible();
    expect(await page.evaluate(
      () => !!document.querySelector(".face.front svg"))).toBe(true);
  });
});

test.describe("drag the card to flip it", () => {
  const scene = (page) => page.evaluate(() => {
    const r = document.querySelector(".flipscene").getBoundingClientRect();
    return { cx: r.left + r.width / 2, cy: r.top + r.height / 2, w: r.width };
  });

  const angle = (page) => page.evaluate(() => {
    const m = new DOMMatrix(
      getComputedStyle(document.getElementById("cardFlipper")).transform);
    return Math.atan2(-m.m31, m.m11) * 180 / Math.PI;
  });

  const drag = async (page, fraction, { release = true } = {}) => {
    const { cx, cy, w } = await scene(page);
    await page.mouse.move(cx, cy);
    await page.mouse.down();
    for (let i = 1; i <= 6; i++)
      await page.mouse.move(cx + (w * fraction * i) / 6, cy);
    const mid = await page.evaluate(() => ({
      inline: document.getElementById("cardFlipper").style.transform,
      dragging: document.getElementById("cardFlipper").classList.contains("dragging"),
    }));
    if (release) await page.mouse.up();
    return mid;
  };

  test("the card follows the pointer while dragging", async ({ page }) => {
    await openApp(page);
    await openType(page, "Unit");
    const mid = await drag(page, 0.25, { release: false });
    expect(mid.dragging).toBe(true);
    expect(mid.inline).toMatch(/^rotateY\(-?\d/);
    expect(Math.abs(Math.round(await angle(page)))).toBeGreaterThan(30);
    await page.mouse.up();
  });

  test("released past halfway it completes the flip", async ({ page }) => {
    await openApp(page);
    await openType(page, "Unit");
    await drag(page, 0.45);
    await expect(page.locator("#cardFlipper")).toHaveClass(/flipped/);
    expect(await page.evaluate(
      () => document.getElementById("cardFlipper").style.transform)).toBe("rotateY(180deg)");
  });

  test("the card settles in the direction it was dragged, from either face",
    async ({ page }) => {
      await openApp(page);
      await openType(page, "Unit");
      const at = () => page.evaluate(
        () => document.getElementById("cardFlipper").style.transform);

      await drag(page, -0.45);
      expect(await at()).toBe("rotateY(-180deg)");
      await drag(page, -0.45);
      expect(await at()).toBe("rotateY(-360deg)");
      await drag(page, 0.45);
      expect(await at()).toBe("rotateY(-180deg)");
      await drag(page, 0.45);
      expect(await at()).toBe("rotateY(0deg)");
    });

  test("no scrollbar appears in the modal while the card turns", async ({ page }) => {
    await page.setViewportSize({ width: 1400, height: 900 });
    await openApp(page);
    await openType(page, "Unit");
    const bar = () => page.evaluate(() => {
      const b = document.getElementById("modalBox");
      return { visible: b.scrollHeight > b.clientHeight + 1 && !b.classList.contains("flipping"),
               clipped: b.classList.contains("flipping") };
    });
    expect(await bar()).toEqual({ visible: false, clipped: false });
    await page.click(".flipscene");
    await page.waitForTimeout(200);
    expect((await bar()).visible).toBe(false);
    expect((await bar()).clipped).toBe(true);
    await page.waitForTimeout(1000);
    expect(await bar()).toEqual({ visible: false, clipped: false });
  });

  test("released before halfway it springs back", async ({ page }) => {
    await openApp(page);
    await openType(page, "Unit");
    await drag(page, 0.2);
    await expect(page.locator("#cardFlipper")).not.toHaveClass(/flipped/);
  });

  test("dragging left flips it too", async ({ page }) => {
    await openApp(page);
    await openType(page, "Unit");
    const mid = await drag(page, -0.45, { release: false });
    expect(mid.inline).toContain("-");
    await page.mouse.up();
    await expect(page.locator("#cardFlipper")).toHaveClass(/flipped/);
  });

  test("a drag that is abandoned eases back rather than jumping", async ({ page }) => {
    await openApp(page);
    await openType(page, "Unit");
    await drag(page, 0.25);
    const seen = [];
    for (let i = 0; i < 6; i++) {
      seen.push(Math.round(await angle(page)));
      await page.waitForTimeout(70);
    }
    expect(new Set(seen).size).toBeGreaterThan(2);
    expect(Math.abs(seen[seen.length - 1])).toBeLessThan(Math.abs(seen[0]));
  });

  test("a drag does not close the modal or select text", async ({ page }) => {
    await openApp(page);
    await openType(page, "Unit");
    await drag(page, 0.9);
    await expect(page.locator("#modal.open")).toBeVisible();
    expect(await page.evaluate(() => String(getSelection()))).toBe("");
  });

  test("a plain click still flips, and the scene owns it alone", async ({ page }) => {
    await openApp(page);
    await openType(page, "Unit");
    expect(await page.evaluate(
      () => document.querySelector(".flipscene").dataset.a)).toBeUndefined();
    const { cx, cy } = await scene(page);
    await page.mouse.click(cx, cy);
    await expect(page.locator("#cardFlipper")).toHaveClass(/flipped/);
  });

  test("a click and a drag agree on state", async ({ page }) => {
    await openApp(page);
    await openType(page, "Unit");
    await page.click(".flipscene");
    await expect(page.locator("#cardFlipper")).toHaveClass(/flipped/);
    await drag(page, 0.45);
    await expect(page.locator("#cardFlipper")).not.toHaveClass(/flipped/);
  });
});

test.describe("the Pokemon back has no white corners", () => {
  const backRadius = (page) => page.evaluate(
    () => getComputedStyle(document.querySelector(".face.back img")).borderRadius);

  test("the Pokemon back is rounded to its own artwork", async ({ page }) => {
    await openPokemon(page);
    await page.waitForFunction(() => S.pool.length > 0);
    await page.evaluate(() => openCard(refOf(S.pool[0])));
    await page.waitForSelector("#cardFlipper");
    expect(await backRadius(page)).toContain("%");
  });

  test("a Riftbound back keeps the plain corner, its art bleeding to the edge",
    async ({ page }) => {
      await openApp(page);
      await openType(page, "Unit");
      expect(await backRadius(page)).toBe("8px");
    });
});

test.describe("battlefields are printed landscape", () => {
  const openType2 = async (page, type) => {
    await page.evaluate((t) => openCard(refOf(S.pool.find((c) => c.type === t))), type);
    await page.waitForSelector("#cardFlipper");
  };

  test("only battlefields are marked landscape", async ({ page }) => {
    await openApp(page);
    const r = await page.evaluate(() => {
      const bf = S.pool.filter((c) => c.type === "Battlefield");
      const other = S.pool.filter((c) => c.type !== "Battlefield");
      return { bf: bf.length, allBf: bf.every((c) => GAME.landscape(c)),
               anyOther: other.some((c) => GAME.landscape(c)) };
    });
    expect(r.bf).toBeGreaterThan(0);
    expect(r.allBf).toBe(true);
    expect(r.anyOther).toBe(false);
  });

  test("the tile turns the card to fill its portrait slot, undistorted",
    async ({ page }) => {
      await openApp(page);
      await page.evaluate(() => { S.typeFilter = ["Battlefield"]; render(); });
      await page.waitForFunction(
        () => document.querySelectorAll("#results .frame.land").length > 0);
      await page.waitForFunction(() => {
        const i = document.querySelector("#results .frame.land img");
        return i && i.complete && i.naturalWidth > 0;
      });
      const r = await page.evaluate(() => {
        const f = document.querySelector("#results .frame.land");
        const img = f.querySelector("img");
        const slot = f.getBoundingClientRect(), painted = img.getBoundingClientRect();
        return {
          portraitSlot: slot.height > slot.width,
          preRotateLandscape: img.offsetWidth > img.offsetHeight,
          fillsW: Math.abs(painted.width - slot.width) < 6,
          fillsH: Math.abs(painted.height - slot.height) < 6,
          rotated: getComputedStyle(img).transform,
          boxAspect: img.offsetWidth / img.offsetHeight,
          srcAspect: img.naturalWidth / img.naturalHeight,
          plain: document.querySelectorAll("#results .frame:not(.land)").length,
        };
      });
      expect(r.portraitSlot).toBe(true);
      expect(r.preRotateLandscape).toBe(true);
      expect(r.fillsW).toBe(true);
      expect(r.fillsH).toBe(true);
      expect(r.rotated).not.toBe("none");
      expect(Math.abs(r.boxAspect - r.srcAspect)).toBeLessThan(0.05);
      expect(r.plain).toBe(0);
    });

  test("the collection tile turns it the same way", async ({ page }) => {
    await openApp(page, { hash: "#collection" });
    await page.evaluate(() => {
      COLF.types = ["Battlefield"]; renderCollection();
    });
    await page.waitForFunction(
      () => document.querySelectorAll(".cframe.land").length > 0);
    const r = await page.evaluate(() => {
      const f = document.querySelector(".cframe.land");
      const img = f.querySelector("img");
      const slot = f.getBoundingClientRect(), painted = img.getBoundingClientRect();
      return { portraitSlot: slot.height > slot.width,
               fills: Math.abs(painted.width - slot.width) < 6
                   && Math.abs(painted.height - slot.height) < 6,
               rotated: getComputedStyle(img).transform };
    });
    expect(r.portraitSlot).toBe(true);
    expect(r.fills).toBe(true);
    expect(r.rotated).not.toBe("none");
  });

  test("a portrait card is not turned at all", async ({ page }) => {
    await openApp(page);
    await page.evaluate(() => { S.typeFilter = ["Unit"]; render(); });
    await page.waitForFunction(() => document.querySelectorAll("#results .frame").length > 0);
    const r = await page.evaluate(() => {
      const f = document.querySelector("#results .frame");
      return { land: f.classList.contains("land"),
               transform: getComputedStyle(f.querySelector("img")).transform };
    });
    expect(r.land).toBe(false);
    expect(r.transform).toBe("none");
  });

  test("the modal scene is landscape and the back turns to fill it", async ({ page }) => {
    await openApp(page);
    await openType2(page, "Battlefield");
    const r = await page.evaluate(() => {
      const scene = document.querySelector(".flipscene");
      const s = scene.getBoundingClientRect();
      const img = document.querySelector(".face.back img");
      const painted = img.getBoundingClientRect();
      return {
        land: scene.classList.contains("land"),
        sceneLandscape: s.width > s.height,
        dataBack: img.dataset.back,
        preRotate: [Math.round(img.offsetWidth), Math.round(img.offsetHeight)],
        painted: [Math.round(painted.width), Math.round(painted.height)],
        face: [Math.round(s.width), Math.round(s.height)],
      };
    });
    expect(r.land).toBe(true);
    expect(r.sceneLandscape).toBe(true);
    expect(r.dataBack).toBe("land");
    expect(r.preRotate[1]).toBeGreaterThan(r.preRotate[0]);
    expect(r.painted[0]).toBeGreaterThan(r.painted[1]);
    expect(Math.abs(r.painted[0] - r.face[0])).toBeLessThanOrEqual(2);
    expect(Math.abs(r.painted[1] - r.face[1])).toBeLessThanOrEqual(2);
  });

  test("a portrait card's back is not rotated", async ({ page }) => {
    await openApp(page);
    await openType2(page, "Unit");
    const r = await page.evaluate(() => {
      const img = document.querySelector(".face.back img");
      return { land: document.querySelector(".flipscene").classList.contains("land"),
               dataBack: img.dataset.back,
               transform: getComputedStyle(img).transform };
    });
    expect(r.land).toBe(false);
    expect(r.dataBack).toBe("1");
    expect(r.transform).toBe("none");
  });

  test("the generated back follows the orientation when the image fails",
    async ({ page }) => {
      await page.route("**/others/back/*.jpg", (route) => route.abort());
      await openApp(page);
      await openType2(page, "Battlefield");
      await page.waitForSelector(".face.back svg[data-backsvg]");
      const box = await page.evaluate(() => {
        const vb = document.querySelector(".face.back svg").getAttribute("viewBox")
          .split(" ").map(Number);
        return { w: vb[2], h: vb[3] };
      });
      expect(box.w).toBeGreaterThan(box.h);
    });
});

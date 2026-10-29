import { expect, test } from "@playwright/test";

const PAGE = `
  <body style="margin:0">
    <div style="height:170px"></div>
    <div style="padding-left:250px">
      <svg width="340" height="480">
        <text x="80" y="80" font-size="16"><tspan x="80">Hello</tspan></text>
      </svg>
    </div>
  </body>`;

test.beforeEach(async ({ page }) => {
  await page.setContent(PAGE);
});

test("boundingBox() of an SVG <text> matches getBoundingClientRect()", async ({ page }) => {
  const text = page.locator("text");
  const box = await text.boundingBox();
  const rect = await text.evaluate((el) => {
    const r = el.getBoundingClientRect();
    return { x: r.x, y: r.y };
  });
  expect(box!.x).toBeCloseTo(rect.x, 0);
  expect(box!.y).toBeCloseTo(rect.y, 0);
});

test("an SVG <text> can be clicked", async ({ page }) => {
  await page.locator("text").click({ timeout: 3000 });
});

test("its <tspan> can be clicked (control)", async ({ page }) => {
  await page.locator("tspan").click({ timeout: 3000 });
});

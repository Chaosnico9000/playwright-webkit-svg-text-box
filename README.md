# WebKit: `boundingBox()` of an SVG `<text>` sits at the SVG's origin

```sh
npm install
npx playwright install webkit chromium
npx playwright test
```

In WebKit, `locator.boundingBox()` of an SVG `<text>` element reports the right size but
the position of the enclosing `<svg>`, so `click()` aims at empty SVG space and times out
with "`<svg>` intercepts pointer events". `getBoundingClientRect()` in the page is correct,
and so is the box of the `<tspan>` inside. Chromium passes all three tests.

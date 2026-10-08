// Rasterize each dish SVG (tools/watercolor/dishes.js) to a transparent 640x300 PNG.
// Usage: PLAYWRIGHT_PATH=<path to playwright module> CHROMIUM=<chromium binary> node render.js <outdir>
const fs = require('fs');
const path = require('path');
const { chromium } = require(process.env.PLAYWRIGHT_PATH || 'playwright');
const ART = require('./dishes.js');

(async () => {
  const out = process.argv[2];
  fs.mkdirSync(out, { recursive: true });
  const browser = await chromium.launch(process.env.CHROMIUM ? { executablePath: process.env.CHROMIUM } : {});
  const page = await browser.newPage({ viewport: { width: 640, height: 300 }, deviceScaleFactor: 1 });
  for (const key of Object.keys(ART)) {
    await page.setContent('<style>html,body{margin:0;background:transparent}svg{display:block;width:640px;height:300px}</style>' + ART[key]);
    await page.screenshot({ path: path.join(out, key + '.png'), omitBackground: true });
  }
  await browser.close();
  console.log('rendered', Object.keys(ART).length, 'images to', out);
})();

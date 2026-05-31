const { chromium } = require('playwright');
(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  await page.goto('https://www.justdial.com/Bhopal/Agilus-Diagnostics-Formerly-SRL-Opposite-Airtel-Office-Malviya-Nagar/0755P755STDS000005_BZDET');
  const img = await page.$eval('meta[property="og:image"]', el => el.content).catch(() => null);
  const logo = await page.$eval('img[alt*="Agilus"], img[alt*="logo"], img[src*="logo"]', el => el.src).catch(() => null);
  console.log('OG Image:', img);
  console.log('Logo Image:', logo);
  await browser.close();
})();

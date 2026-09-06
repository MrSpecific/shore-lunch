const { chromium } = require('playwright');
const path = require('path');

const BASE = 'http://localhost:3070';
const SHOT_DIR = '/private/tmp/claude-502/-Users-willchristenson-git-shore-lunch/35bf72ee-4de9-4fbd-9d35-51e3db8c438d/scratchpad/pw-test';

(async () => {
  const browser = await chromium.launch({ args: ['--no-sandbox'] });
  const page = await browser.newPage();
  const errors = [];
  page.on('pageerror', (err) => errors.push(String(err)));

  await page.goto(`${BASE}/`, { waitUntil: 'networkidle' });
  await page.waitForSelector('h2:has-text("Latest Catch")');
  await page.locator('h2:has-text("Latest Catch")').scrollIntoViewIfNeeded();
  await page.screenshot({ path: path.join(SHOT_DIR, '900-homepage-latest-catch.png') });

  console.log('PAGE ERRORS:', JSON.stringify(errors, null, 2));
  await browser.close();
})().catch((err) => {
  console.error('DRIVER SCRIPT FAILED:', err);
  process.exit(1);
});

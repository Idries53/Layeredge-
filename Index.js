const puppeteer = require('puppeteer');

async function run() {
  // Wait random 1-2 minutes
  const delay = 60000 + Math.floor(Math.random() * 60000);
  console.log(`Waiting ${delay / 1000} seconds before claiming...`);
  await new Promise((r) => setTimeout(r, delay));

  // Launch Chrome in non-headless mode so extension popups can appear
  const browser = await puppeteer.launch({
    headless: false,
    args: [
      '--no-sandbox',
      '--disable-setuid-sandbox',
      '--disable-gpu',
      '--disable-dev-shm-usage',
      '--start-maximized',
    ],
  });

  const page = await browser.newPage();

  // Go to LayerEdge
  await page.goto('https://www.layeredge.io', { waitUntil: 'networkidle2' });
  console.log("Opened layeredge.io");

  // Attempt to find the Claim button
  try {
    // Adjust this selector if LayerEdge changes
    await page.waitForSelector('button:has-text("Claim")', { timeout: 30000 });
    await page.click('button:has-text("Claim")');
    console.log("Clicked Claim button.");

    // Now the OKX wallet sign request might pop up in a new tab or window
    // or in a small popup. Puppeteer may need to handle that.

    // We'll just wait 20 seconds to let you manually sign
    // Or you can code advanced logic to switch to the OKX popup
    console.log("Waiting 20 seconds for wallet sign (if needed)...");
    await page.waitForTimeout(20000);

  } catch (e) {
    console.error("Error claiming:", e);
  }

  // Close browser
  await browser.close();
}

run();

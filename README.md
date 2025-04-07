# LayerEdge + OKX Claimer

This project runs a full Linux desktop with a browser in the cloud, so you can install OKX wallet and automatically claim LayerEdge daily.

## Quick Start

1. **Fork/clone this repo** to your GitHub.
2. **Deploy to Railway** using a template link (see below).
3. **Open the VNC** in your Railway logs or domain: `https://your-app-name.railway.app` (port 8080).
4. **Install OKX** in Chrome, sign in, then let the script auto-claim daily.

## Deploy to Railway

[![Deploy on Railway](https://railway.app/button.svg)](https://railway.app/new?template=https://github.com/YOUR_GITHUB_USERNAME/layeredge-okx-claimer)

1. Sign in or create a free Railway account.
2. Click “Deploy” — it will build the Docker image.
3. Once deployed, go to the logs/settings to find the URL.

## Usage

- After it starts, you can VNC into the container:
  - Open the URL from Railway
  - The default VNC password is `layeredge123` (set in `x11vnc`).
- Inside the virtual desktop, open **Chrome**, install **OKX** wallet, sign in.
- The script (`index.js`) runs once each container start, or on a schedule if you configure it.
- It randomly waits 1-2 minutes, visits LayerEdge, clicks “Claim,” and attempts to sign.

## Notes

- If LayerEdge changes its button text or flow, update `index.js` accordingly.
- For a truly daily schedule, you can:
  - Use [Railway Cron](https://docs.railway.app/deploy/cron) or
  - Set your service to redeploy daily
- You may need advanced logic to handle the OKX signature popup in Puppeteer (switching to the popup window, clicking “Sign”). Currently, we just wait 20 seconds for manual sign or if the extension auto-approves.

Good luck and happy claiming!

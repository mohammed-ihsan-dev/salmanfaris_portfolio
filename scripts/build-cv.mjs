// Renders /cv to public/cv/salman-faris-cv.pdf with the locally installed Chrome.
// Usage: start the app (npm run dev or npm start), then `npm run cv`. CV_URL overrides the page URL.
import { chromium } from "playwright-core";

const url = process.env.CV_URL ?? "http://localhost:3000/cv";
const browser = await chromium.launch({ channel: "chrome" });
const page = await browser.newPage();
await page.goto(url, { waitUntil: "networkidle" });
await page.emulateMedia({ media: "print" });
await page.pdf({
  path: "public/cv/salman-faris-cv.pdf",
  format: "A4",
  margin: { top: "14mm", bottom: "14mm", left: "14mm", right: "14mm" },
  printBackground: true,
});
await browser.close();
console.log("Wrote public/cv/salman-faris-cv.pdf from", url);

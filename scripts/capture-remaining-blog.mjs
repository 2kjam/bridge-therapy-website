// Capture live evidence first; existing snapshots are never overwritten.
import fs from "node:fs";
import assert from "node:assert/strict";
const root = "test-results/blog-capture";
fs.mkdirSync(root, { recursive: true });
const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
async function download(url) {
  for (let attempt = 0; attempt < 5; attempt++) {
    const response = await fetch(url);
    if (response.status === 429 || response.status >= 500) {
      await sleep(15000);
      continue;
    }
    assert.equal(response.status, 200, url);
    return Buffer.from(await response.arrayBuffer());
  }
  throw new Error(`Fetch failed: ${url}`);
}
let url = "https://www.thebridgetherapy.com/news?format=json";
const items = [];
while (url) {
  const data = JSON.parse((await download(url)).toString());
  items.push(...data.items);
  url = data.pagination?.nextPage
    ? new URL(data.pagination.nextPageUrl + "&format=json", url).href
    : null;
  await sleep(5000);
}
assert.equal(items.length, 19);
for (const item of items) {
  if (item.fullUrl === "/news/navigating-life-transitions") continue;
  const slug = item.fullUrl.split("/").at(-1);
  const directory = `${root}/${slug}`;
  if (fs.existsSync(`${directory}/page.html`)) continue;
  const page = await download(
    `https://www.thebridgetherapy.com${item.fullUrl}`,
  );
  fs.mkdirSync(directory, { recursive: true });
  fs.writeFileSync(
    `${directory}/item.json`,
    JSON.stringify(item, null, 2) + "\n",
    { flag: "wx" },
  );
  fs.writeFileSync(`${directory}/page.html`, page, { flag: "wx" });
  console.log(slug);
  await sleep(5000);
}

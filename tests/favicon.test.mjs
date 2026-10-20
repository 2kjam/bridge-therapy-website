import assert from "node:assert/strict";
import fs from "node:fs";
import test from "node:test";
import { parse } from "parse5";
import { PNG } from "pngjs";

const nodes = (node) => [node, ...(node.childNodes ?? []).flatMap(nodes)];
const attr = (node, name) => node.attrs?.find((a) => a.name === name)?.value;

test("built homepage declares one stable, square Google-supported brand favicon", () => {
  const html = fs.readFileSync(".next/server/app/index.html", "utf8");
  const head = nodes(parse(html)).find((node) => node.tagName === "head");
  const icons = nodes(head).filter((node) => node.tagName === "link" && /(?:^|\s)icon(?:\s|$)/.test(attr(node, "rel") ?? ""));
  assert.equal(icons.length, 1);
  assert.equal(attr(icons[0], "href"), "/assets/ivory-favicon.png");
  assert.equal(attr(icons[0], "type"), "image/png");
  assert.equal(attr(icons[0], "sizes"), "96x96");
  const png = PNG.sync.read(fs.readFileSync("public" + attr(icons[0], "href")));
  assert.equal(png.width, 96);
  assert.equal(png.height, 96);
  const colors = new Set();
  for (let i = 0; i < png.data.length; i += 4) {
    if (png.data[i + 3] === 255) colors.add(png.data.subarray(i, i + 3).toString("hex"));
  }
  assert.ok(colors.has("41543c"), "existing green background");
  assert.ok(colors.has("fbfaf7"), "existing ivory bridge artwork");
});

import assert from "node:assert/strict";
import fs from "node:fs";
import test from "node:test";
import { parse } from "parse5";
import { services } from "../lib/seo/schema-data.ts";

const teenPath = "/child-teen-counseling-tyler/";
const alyxPath = "/therapists/alyxandrah-white/";
const all = (node, predicate) => [
  ...(predicate(node) ? [node] : []),
  ...(node.childNodes ?? []).flatMap((child) => all(child, predicate)),
];
const attr = (node, name) => node.attrs?.find((attribute) => attribute.name === name)?.value;
const text = (node) => node.nodeName === "#text" ? node.value : (node.childNodes ?? []).map(text).join("");
const readPage = (path) => parse(fs.readFileSync(`.next/server/app${path.slice(0, -1)}.html`, "utf8"));

test("teen counselor cards and service schema include Alyx without removing existing counselors", () => {
  const page = readPage(teenPath);
  const grid = all(page, (node) => attr(node, "class") === "individual-team-grid")[0];
  assert.ok(grid);
  const links = all(grid, (node) => node.tagName === "a").map((node) => attr(node, "href"));
  assert.deepEqual(links, ["/therapists/denise-santos/", "/therapists/kelley-bell/", alyxPath]);
  assert.deepEqual(services.find((service) => service.path === teenPath).therapists, links);
  const card = all(grid, (node) => node.tagName === "article" && text(node).includes("Alyxandrah"));
  assert.equal(card.length, 1);
  assert.match(text(card[0]), /teens with persistent mental illness/);
  assert.match(text(card[0]), /substance use or personality disorders/);
  assert.equal(attr(all(card[0], (node) => node.tagName === "img")[0], "src"), "/assets/alyx.jpg");
});

test("Alyx profile links back to teen counseling and preserves her inquiry selection", () => {
  const page = readPage(alyxPath);
  const relevantServices = all(page, (node) => attr(node, "class") === "profile-services")[0];
  assert.ok(all(relevantServices, (node) => attr(node, "href") === teenPath).length === 1);
  assert.match(text(page), /specializes in therapy for teens with persistent mental\s+illness/);
  assert.equal(all(page, (node) => attr(node, "href") === "/contact/?therapist=alyxandrah-white").length, 2);
});

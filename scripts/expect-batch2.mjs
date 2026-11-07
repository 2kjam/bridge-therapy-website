import fs from "node:fs";
import assert from "node:assert/strict";
import { parseFragment } from "parse5";
const updates = JSON.parse(fs.readFileSync("tests/fixtures/batch2-copy.json", "utf8"));
const all = (n, p) => [...(p(n) ? [n] : []), ...(n.childNodes ?? []).flatMap(c => all(c, p))];
const attr = (n, key) => n.attrs?.find(a => a.name === key)?.value;
const text = n => n.nodeName === "#text" ? n.value : (n.childNodes ?? []).map(text).join("");
const normalized = n => text(n).replace(/\s+/g, " ").trim();
function append(parent, html) {
  for (const n of parseFragment(html).childNodes) { n.parentNode = parent; parent.childNodes.push(n); }
}
export function expectBatchTwo(doc, route) {
  for (const n of all(doc, n => n.nodeName === "#text")) {
    n.value = n.value.replace("Contact our office with questions about getting started.", "Kalynne can help you find a counselor who may be a good fit.");
  }
  for (const update of updates.paragraphs[route] ?? []) {
    // This feature was added after the migration; check-site validates it separately.
    if (update.contains.startsWith("Kalynne’s background")) continue;
    const matches = all(doc, n => n.tagName === "p" && normalized(n).includes(update.contains));
    assert.equal(matches.length, 1, `${route}: exact Batch 2 paragraph target ${update.contains}`);
    const old = matches[0], replacement = parseFragment(update.html).childNodes[0];
    replacement.parentNode = old.parentNode;
    old.parentNode.childNodes.splice(old.parentNode.childNodes.indexOf(old), 1, replacement);
  }
  if (route === "/contact/") {
    const removed = all(doc, n => n.tagName === "details" && normalized(n).startsWith("What should I include in my first email?"));
    assert.equal(removed.length, 1);
    const oldFaq = removed[0];
    oldFaq.parentNode.childNodes = oldFaq.parentNode.childNodes.filter(n => n !== oldFaq);

    append(all(doc, n => attr(n, "class") === "contact-faq")[0], updates.contactFaqs);
    append(all(doc, n => attr(n, "class") === "visit-note")[0], updates.officeHours);
  }
}

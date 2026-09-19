import fs from "node:fs";
import { parseFragment } from "parse5";
const images = JSON.parse(fs.readFileSync("lib/presentation-images.json", "utf8"));
const all = (n, p) => [...(p(n) ? [n] : []), ...(n.childNodes ?? []).flatMap(c => all(c, p))];
const attr = (n, key) => n.attrs?.find(a => a.name === key)?.value;
function set(n, name, value) {
  const a = n.attrs.find(a => a.name === name);
  if (a) a.value = String(value); else n.attrs.push({ name, value: String(value) });
}
// Explicit approved image-delivery changes; all other reference attributes stay strict.
export function expectPerformance(doc, route) {
  const header = all(doc, n => n.tagName === "header")[0];
  for (const image of all(header, n => n.tagName === "img")) {
    const source = attr(image, "src"), entry = images[source];
    if (!entry) continue;
    set(image, "src", entry.src);
    set(image, "loading", "lazy");
    if (["/assets/kalynne.jpg", "/assets/team.jpg"].includes(source)) {
      set(image, "width", entry.width); set(image, "height", entry.height);
    }
  }
  if (route !== "/") return;
  const main = all(doc, n => n.tagName === "main")[0];
  for (const image of all(main, n => n.tagName === "img")) {
    const entry = images[attr(image, "src")];
    if (entry?.src.includes("/presentation/home/")) set(image, "src", entry.src);
  }
  const next = all(main, n => attr(n, "id") === "getting-started")[0];
  const image = parseFragment('<img class="ivory-next-background" src="/assets/ivory-lake.jpg" width="2172" height="724" alt="" loading="lazy">').childNodes[0];
  image.parentNode = next;
  next.childNodes.unshift(image);
}

import { optimizedImageProps, serviceImageProps, heroImageSizes, portraitImageSizes } from "../lib/optimized-images.ts";
import fs from "node:fs";
import { parseFragment } from "parse5";
const optimized = JSON.parse(fs.readFileSync("lib/optimized-images.json", "utf8"));
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
  // The five approved homepage replacements leave every other attribute intact.
  const homepageReplacements = {
    "anxiety": "anxiety",
    "parenting": "parenting",
    "teen": "teens",
    "grief": "grief",
    "relationships": "relationships",
  };
  for (const image of all(main, n => n.tagName === "img")) {
    for (const [previous, replacement] of Object.entries(homepageReplacements)) {
      if (attr(image, "src") === `/assets/presentation/home/${previous}-800.webp`) {
        set(image, "src", `/assets/presentation/home/replacements/${replacement}-800.webp`);
      }
    }
  }
  const next = all(main, n => attr(n, "id") === "getting-started")[0];
  const image = parseFragment('<img class="ivory-next-background" src="/assets/ivory-lake.jpg" width="2172" height="724" alt="" loading="lazy">').childNodes[0];
  image.parentNode = next;
  next.childNodes.unshift(image);
  // Reviewed delivery attributes only: retain every original frame/crop/text attribute.
  for (const item of all(main, n => n.tagName === "img")) {
    const source = attr(item, "src");
    let props = {};
    if (source === "/assets/ivory-hero.jpg") props = optimizedImageProps(source, heroImageSizes);
    else if (source === "/assets/ivory-lake.jpg") props = optimizedImageProps(source, "max(100vw, 1080px)");
    else if (source?.startsWith("/assets/presentation/home/")) props = serviceImageProps(source);
    else if (optimized[source] && source.endsWith(".jpg")) props = optimizedImageProps(source, portraitImageSizes);
    for (const [key, value] of Object.entries(props)) set(item, key === "srcSet" ? "srcset" : key, value);
  }
}

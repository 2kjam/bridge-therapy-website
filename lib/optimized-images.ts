import images from "./optimized-images.json" with { type: "json" };

export const heroImageSizes =
  "(max-width: 560px) 1020px, (max-width: 800px) 1425px, (max-width: 1200px) 1320px, max(100vw, 1290px)";
export const portraitImageSizes =
  "(max-width: 560px) 220px, (max-width: 1050px) 230px, 240px";

export function optimizedImageProps(source: string, sizes: string) {
  const image = images[source as keyof typeof images];
  if (!image) return {};
  return {
    srcSet: image.variants
      .map((variant) => `${variant.src} ${variant.width}w`)
      .join(", "),
    sizes,
  };
}

export function serviceImageProps(source: string) {
  const image = images[source as keyof typeof images];
  if (!image) return {};
  // A cover-cropped landscape needs more pixels than the visible card width.
  const ratio = image.width / image.height;
  const mobile = Math.max(1, ratio / 1.1);
  const other = Math.max(1, ratio / 1.25);
  return optimizedImageProps(
    source,
    `(max-width: 560px) calc((100vw - 52px) * ${mobile / 2}), ` +
      `(max-width: 800px) calc((92vw - 28px) * ${other / 3}), ` +
      `(max-width: 1200px) calc((94.4vw - 60px) * ${other / 6}), ` +
      `(max-width: 1600px) calc((94.4vw - 90px) * ${other / 6}), ` +
      `calc((min(94vw, 1520px) - 90px) * ${other / 6})`,
  );
}

// Progressive enhancement: WebP remains the fallback for browsers without AVIF.
export function backgroundAvifProps(source: "/assets/ivory-hero.jpg" | "/assets/ivory-lake.jpg", sizes: string) {
  return {
    srcSet: images[source].avifVariants.map(variant => `${variant.src} ${variant.width}w`).join(", "),
    sizes,
  };
}

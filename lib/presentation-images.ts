import images from "./presentation-images.json";

export function blogThumbnail(source: string) {
  const image = images[source as keyof typeof images];
  return {
    src: image.src,
    width: image.width,
    height: image.height,
    srcSet: image.variants.map(v => `${v.src} ${v.width}w`).join(", "),
    sizes: "(max-width: 600px) calc(100vw - 46px), (max-width: 735px) min(538px, calc(100vw - 66px)), (max-width: 1087px) calc((100vw - 98px) / 2), (max-width: 1180px) calc((100vw - 134px) / 3), 350px",
    // Preserve the exact original card ratio despite integer thumbnail rounding.
    style: { aspectRatio: `${image.originalWidth} / ${image.originalHeight}` },
  };
}

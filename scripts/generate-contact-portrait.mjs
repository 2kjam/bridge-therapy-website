// Resize the verified source only; preserve its full composition and original file.
import fs from "node:fs";
import sharp from "sharp";

const directory = "public/assets/presentation/contact";
fs.mkdirSync(directory, { recursive: true });
const result = await sharp("public/assets/kalynne.jpg")
  .resize({ width: 720, withoutEnlargement: true })
  .webp({ quality: 85, effort: 6 })
  .toFile(`${directory}/kalynne-720.webp`);
console.log(result);

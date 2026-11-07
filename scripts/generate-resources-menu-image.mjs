// Menu-only landscape derivative of the existing Blog photograph; source stays intact.
import fs from "node:fs";
import sharp from "sharp";

fs.mkdirSync("public/assets/presentation/menu", { recursive: true });
const result = await sharp("public/assets/blog/how-to-calm-an-anxious-mind-learning-to-quiet-your-soul-with-god/featured.jpg")
  .resize(720, 480, { fit: "cover", position: "centre", withoutEnlargement: true })
  .webp({ quality: 82, effort: 6 })
  .toFile("public/assets/presentation/menu/resources-blog-720.webp");
console.log(result);

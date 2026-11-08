// Re-encode only the two approved decorative backgrounds; originals stay intact.
import fs from 'node:fs';
import sharp from 'sharp';
const file='lib/optimized-images.json';
const images=JSON.parse(fs.readFileSync(file,'utf8'));
for(const name of (process.argv.includes('--lake') ? ['lake'] : ['hero','lake'])) {
  const entry=images[`/assets/ivory-${name}.jpg`];
  entry.avifVariants=[];
  for(const width of [1080,1448,2172]) {
    const src=`/assets/presentation/delivery/${name}-seo-${width}.avif`;
    const info=await sharp(`public/assets/ivory-${name}.jpg`).resize({width}).avif({quality:65,effort:6,chromaSubsampling:'4:4:4'}).toFile(`public${src}`);
    entry.avifVariants.push({src,width:info.width,height:info.height,bytes:info.size,lossless:false,reused:false});
    console.log(src,info.size);
  }
  // Preserve existing WebP candidates; replace the last lake JPEG fallback only.
  if(name==='lake') {
    const src='/assets/presentation/delivery/lake-seo-2172.webp';
    const info=await sharp('public/assets/ivory-lake.jpg').webp({quality:82,effort:6}).toFile(`public${src}`);
    entry.variants[2]={src,width:info.width,height:info.height,bytes:info.size,lossless:false,reused:false};
  }
}
fs.writeFileSync(file,JSON.stringify(images,null,2)+'\n');

import sharp from 'sharp';
import fs from 'node:fs';
import path from 'node:path';

// Clean Minimalist Architectural T-Gate Mark matching Header.tsx
// Outer box: rounded dark square (#09090b)
// Lines: Crisp white #ffffff stroke
// Dot: Amber gold #d97706
const svg24 = `
<svg width="512" height="512" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
  <rect width="24" height="24" rx="5.5" fill="#09090b" />
  <path d="M4.5 7H19.5" stroke="#ffffff" stroke-width="2.3" stroke-linecap="round" stroke-linejoin="round" />
  <path d="M12 7V17.5" stroke="#ffffff" stroke-width="2.3" stroke-linecap="round" stroke-linejoin="round" />
  <circle cx="18" cy="17" r="1.8" fill="#d97706" />
</svg>
`.trim();

function createIcoFromPng(png32Buffer, png16Buffer) {
  const header = Buffer.alloc(6);
  header.writeUInt16LE(0, 0); // reserved
  header.writeUInt16LE(1, 2); // ICO type
  header.writeUInt16LE(2, 4); // count of images (2)

  const entry16 = Buffer.alloc(16);
  entry16.writeUInt8(16, 0); // width
  entry16.writeUInt8(16, 1); // height
  entry16.writeUInt8(0, 2);  // palette
  entry16.writeUInt8(0, 3);  // reserved
  entry16.writeUInt16LE(1, 4); // planes
  entry16.writeUInt16LE(32, 6); // bpp
  entry16.writeUInt32LE(png16Buffer.length, 8); // size
  entry16.writeUInt32LE(6 + 16 * 2, 12); // offset

  const entry32 = Buffer.alloc(16);
  entry32.writeUInt8(32, 0); // width
  entry32.writeUInt8(32, 1); // height
  entry32.writeUInt8(0, 2);  // palette
  entry32.writeUInt8(0, 3);  // reserved
  entry32.writeUInt16LE(1, 4); // planes
  entry32.writeUInt16LE(32, 6); // bpp
  entry32.writeUInt32LE(png32Buffer.length, 8); // size
  entry32.writeUInt32LE(6 + 16 * 2 + png16Buffer.length, 12); // offset

  return Buffer.concat([header, entry16, entry32, png16Buffer, png32Buffer]);
}

async function main() {
  const publicDir = path.resolve('public');
  const logoDir = path.resolve('public/images/logo');
  if (!fs.existsSync(logoDir)) fs.mkdirSync(logoDir, { recursive: true });

  const svgBuffer = Buffer.from(svg24);

  // 1. 512x512 master icon
  const png512 = await sharp(svgBuffer).resize(512, 512).png().toBuffer();
  fs.writeFileSync(path.join(publicDir, 'icon.png'), png512);
  console.log('Created public/icon.png (512x512)');

  // 2. 192x192 transparent logo icon
  const png192 = await sharp(svgBuffer).resize(192, 192).png().toBuffer();
  fs.writeFileSync(path.join(logoDir, 'icon-192-transparent.png'), png192);
  console.log('Created public/images/logo/icon-192-transparent.png (192x192)');

  // 3. 180x180 Apple Touch Icon
  const png180 = await sharp(svgBuffer).resize(180, 180).png().toBuffer();
  fs.writeFileSync(path.join(publicDir, 'apple-touch-icon.png'), png180);
  console.log('Created public/apple-touch-icon.png (180x180)');

  // 4. 32x32 Favicon PNG
  const png32 = await sharp(svgBuffer).resize(32, 32).png().toBuffer();
  fs.writeFileSync(path.join(publicDir, 'favicon.png'), png32);
  console.log('Created public/favicon.png (32x32)');

  // 5. 16x16 Favicon PNG for ICO
  const png16 = await sharp(svgBuffer).resize(16, 16).png().toBuffer();

  // 6. Multi-resolution favicon.ico
  const icoBuffer = createIcoFromPng(png32, png16);
  fs.writeFileSync(path.join(publicDir, 'favicon.ico'), icoBuffer);
  console.log('Created public/favicon.ico (16x16 + 32x32)');
}

main().catch(err => {
  console.error(err);
  process.exit(1);
});

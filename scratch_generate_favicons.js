const sharp = require('sharp');
const pngToIco = require('png-to-ico').default;
const fs = require('fs');
const path = require('path');

const SRC = path.join(__dirname, 'public', 'foto-terno-verde.png');
const OUT = path.join(__dirname, 'public');

// Square crop tightly framed on the face + a bit of shoulders, centered.
const CROP = { left: 245, top: 55, width: 450, height: 450 };

async function baseCrop() {
  return sharp(SRC)
    .extract(CROP)
    .sharpen({ sigma: 1.2 })
    .linear(1.08, -8) // slight contrast boost
    .modulate({ saturation: 1.05 });
}

async function makePng(size, outName) {
  const buf = await (await baseCrop()).resize(size, size, { fit: 'cover' }).png().toBuffer();
  fs.writeFileSync(path.join(OUT, outName), buf);
  return buf;
}

async function main() {
  await makePng(16, 'favicon-16x16.png');
  await makePng(32, 'favicon-32x32.png');
  const png48 = await makePng(48, 'favicon-48x48.png');
  await makePng(180, 'apple-touch-icon.png');

  const png16 = fs.readFileSync(path.join(OUT, 'favicon-16x16.png'));
  const png32 = fs.readFileSync(path.join(OUT, 'favicon-32x32.png'));

  const icoBuf = await pngToIco([png16, png32, png48]);
  fs.writeFileSync(path.join(OUT, 'favicon.ico'), icoBuf);

  console.log('Favicons generated successfully.');
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});

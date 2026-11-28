/**
 * Downloads the supplied Google Drive product photos into /images.
 * Run from the project root with: node scripts/download-product-images.js
 * Existing images are kept unless --force is supplied.
 */
const fs = require('node:fs/promises');
const path = require('node:path');

const products = [
  ['cherry-pop','1ErqSBrclazr4dqiYbOJKEtTspC2A7lt7'],
  ['candy-cloud','1UXIzZa5Y6hMhDGvf09AMS7e02sk5HCCE'],
  ['mystic-glow','1JBi8jnnfVecCypWUAI2OfAf4nOepvcYT'],
  ['peach-perfect','1ZrUW2i8BZ9cCG0pbwfo9NJOZ29cb8cf5'],
  ['starlight','1f_bFx8Ia3Ugc13OKS4lYwXNxqgvsIJ3u'],
  ['choco-royale','1-uSs_jhNr7AkKuBiqtkRoWlPwXeRBw5g'],
  ['clear-lipgloss','1LEAVRbTRGy2ZzyVGzB1UV1u1BAykK9pN'],
  ['lipcare-kit','1BeLzFGNgsSPn0rqMqln2mo-ernIzN96d'],
  ['pink-lip-balm','1b8a5isC9p2cZzb1b-kqvYZ5UZshoq8Or'],
  ['moisturizing-lip-balm','1MncZOaldo6wVPgB35RSHegO9WkrOwSpN'],
  ['lip-scrub','1-FJzzBqAiNgpQUyKTNeW62h6esowxXIL'],
  ['lip-brush','1PKuWCqYOT9RVLw4Ti6yBr2348wJjPV7L'],
  ['black-lip-liner','1BhtYq6kqAjct1jQoFqA093el5ZUi70BN'],
  ['brown-lip-liner','1J4nlfgTb832ron0wyqq7hWZnGRrQiH9-'],
  ['burgundy-lip-liner','16ahT3Y-jiOaxzUUHA8BfJe5ZhjpagOUK']
];
const output = path.resolve(__dirname, '..', 'images');
const force = process.argv.includes('--force');

async function download(id, destination) {
  const urls = [
    `https://drive.google.com/thumbnail?id=${encodeURIComponent(id)}&sz=w1000`,
    `https://drive.google.com/uc?export=view&id=${encodeURIComponent(id)}`,
    `https://drive.usercontent.google.com/download?id=${encodeURIComponent(id)}&export=view&authuser=0`
  ];
  let lastError;
  for (const url of urls) {
    try {
      const response = await fetch(url, {redirect:'follow', signal:AbortSignal.timeout(25000)});
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      const type = response.headers.get('content-type') || '';
      if (!type.startsWith('image/')) throw new Error(`Not an image (${type || 'unknown content type'})`);
      const bytes = Buffer.from(await response.arrayBuffer());
      if (bytes.length < 1000) throw new Error('Image response was unexpectedly small');
      await fs.writeFile(destination, bytes);
      return bytes.length;
    } catch (error) { lastError = error; }
  }
  throw lastError || new Error('No download source worked');
}

(async () => {
  await fs.mkdir(output, {recursive:true});
  let successes = 0, failures = 0;
  for (const [slug,id] of products) {
    const destination = path.join(output, `${slug}.jpg`);
    try {
      if (!force) {
        try { await fs.access(destination); console.log(`Kept ${slug}.jpg (already exists)`); successes++; continue; }
        catch {}
      }
      const bytes = await download(id, destination);
      console.log(`Downloaded ${slug}.jpg (${Math.round(bytes/1024)} KB)`);
      successes++;
    } catch (error) {
      failures++;
      console.error(`Could not download ${slug}: ${error.message}`);
    }
  }
  console.log(`\nFinished: ${successes} available, ${failures} failed.`);
  if (failures) process.exitCode = 1;
})();

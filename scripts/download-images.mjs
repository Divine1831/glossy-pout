// Saves every product photo into /images so the shop does not depend on Google Drive.
// Run once on your computer (needs Node 18+ and internet):  node scripts/download-images.mjs
// Then commit the new files in /images. The shop already looks for images/<product-id>.jpg first.
import { writeFile, mkdir } from "node:fs/promises";
const ids = {
  "cherry-pop": "1ErqSBrclazr4dqiYbOJKEtTspC2A7lt7",
  "candy-cloud": "1UXIzZa5Y6hMhDGvf09AMS7e02sk5HCCE",
  "mystic-glow": "1JBi8jnnfVecCypWUAI2OfAf4nOepvcYT",
  "peach-perfect": "1ZrUW2i8BZ9cCG0pbwfo9NJOZ29cb8cf5",
  "starlight": "1f_bFx8Ia3Ugc13OKS4lYwXNxqgvsIJ3u",
  "choco-royale": "1-uSs_jhNr7AkKuBiqtkRoWlPwXeRBw5g",
  "clear-lipgloss": "1LEAVRbTRGy2ZzyVGzB1UV1u1BAykK9pN",
  "lipcare-kit": "1BeLzFGNgsSPn0rqMqln2mo-ernIzN96d",
  "pink-lip-balm": "1b8a5isC9p2cZzb1b-kqvYZ5UZshoq8Or",
  "moisturizing-lip-balm": "1MncZOaldo6wVPgB35RSHegO9WkrOwSpN",
  "lip-scrub": "1-FJzzBqAiNgpQUyKTNeW62h6esowxXIL",
  "lip-brush": "1PKuWCqYOT9RVLw4Ti6yBr2348wJjPV7L",
  "black-lip-liner": "1BhtYq6kqAjct1jQoFqA093el5ZUi70BN",
  "brown-lip-liner": "1J4nlfgTb832ron0wyqq7hWZnGRrQiH9-",
  "burgundy-lip-liner": "16ahT3Y-jiOaxzUUHA8BfJe5ZhjpagOUK"
};
await mkdir("images", { recursive: true });
for (const [name, id] of Object.entries(ids)) {
  let ok = false;
  for (const url of [
    `https://drive.google.com/thumbnail?id=${id}&sz=w1000`,
    `https://lh3.googleusercontent.com/d/${id}=w1000`,
    `https://drive.google.com/uc?export=download&id=${id}`,
  ]) {
    try {
      const r = await fetch(url);
      if (r.ok && (r.headers.get("content-type") || "").startsWith("image/")) {
        await writeFile(`images/${name}.jpg`, Buffer.from(await r.arrayBuffer()));
        console.log("saved", name);
        ok = true;
        break;
      }
    } catch {}
  }
  if (!ok) console.log("FAILED", name, "- open the Drive file, download it, and save it as images/" + name + ".jpg");
}

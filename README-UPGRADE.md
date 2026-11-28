# Glossy Pout: app-style storefront upgrade

The storefront now looks and behaves like a mobile brand app: splash screen, welcome, home, explore, saved, product page, bag, checkout and order confirmation. On phones it fills the screen. On desktop it appears inside a phone frame.

## What changed
- `index.html`, `styles.css`, `app.js`: rebuilt as an app with screens, a bottom tab bar, slide transitions and fly-to-bag animation.
- `about.html`, `payment-success.html`: restyled to match. Their content and payment-check logic are unchanged.
- `manifest.webmanifest` and new icons in `images/`: customers can add the site to their phone home screen and it opens full screen like an app.
- `sitemap.xml`: about page added.

## What was kept
- `api/`, `vercel.json`, `package.json`: untouched. Checkout still POSTs `{ customer, items }` to `/api/create-payment`, with server-side prices and the 10% discount.
- Product IDs, prices, WhatsApp number (+234 811 087 8047) and the owner announcement tool (open the bell, then "Owner area").
- First-visit welcome with the optional "what are you here for" choice (`gpWelcomeCompleted` in localStorage).
- Existing carts (`glossyPoutCart`) are carried over automatically.

## Screens
Splash, onboarding ("Get Started"), welcome, Home (search, banner, categories, product rows, story, newsletter), Explore (search, filters, all 16 products), Saved, product page (shade swatches, tap image to zoom, quantity), Bag, Checkout (Paystack or WhatsApp) and order confirmation.

## Product photos
Product photos load in this order: `images/<product-id>.jpg`, then the Google Drive thumbnail, then two other Drive routes. If none loads, a plain tile with the product name shows (no drawings).
For the most reliable result, run `node scripts/download-images.mjs` once on your computer (Node 18+). It saves every photo into `/images` as `<product-id>.jpg`. Commit those files and the shop will use them first. Any that fail to download, save by hand from Drive using the same file name.

## Notes
- Newsletter opens an email draft to okohchristabel06@gmail.com. Connect a mailing service for automatic sign-ups.
- Not included because the backend has no support for them: logins, delivery-speed options, promo codes and order tracking.
- Preview the first-visit flow again: run `localStorage.removeItem('gpWelcomeCompleted'); sessionStorage.clear(); location.reload();` in the browser console.
- Test a Paystack test-mode checkout before going live.

## Deploy
Commit the files to the existing GitHub repository and let Vercel redeploy. Keep `api/` and `vercel.json` in the project root.

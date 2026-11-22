# Glossy Pout — premium storefront refresh

## Files updated
- `index.html` — new storefront structure, 3D hero canvas, product gallery, bag, checkout and notifications UI.
- `styles.css` — responsive premium beauty styling, intro, animations, accessibility and reduced-motion rules.
- `app.js` — product gallery, product modal/zoom, localStorage bag, 10% display discount, WhatsApp order link, existing Paystack endpoint integration, notifications and motion.
- `about.html` — founder story, mission, vision and timeline.

## Important backend note
The existing `api/` directory was copied without changes. Checkout still POSTs `{ customer, items }` to `/api/create-payment`, using the existing product IDs and server-side kobo prices/10% discount. Do not replace or expose any API secrets in frontend files.

## Product photos
The 15 supplied Google Drive image IDs are still referenced as thumbnail URLs because the actual photo files were not included as local uploads in this project. `bare-essence.jpg` is already local. If a remote image fails, the storefront shows a styled product-name placeholder. For best reliability, download the 15 originals and place them in `/images`, then change the matching `image` values in `app.js` to `/images/<filename>`.

## Configure before production
- Keep all current Vercel environment variables as they are.
- The newsletter form currently opens an email draft to `okohchristabel06@gmail.com`; it does not silently subscribe/store addresses. Connect an approved newsletter provider or backend endpoint for automatic subscriptions.
- Three.js, GSAP, ScrollTrigger and Lenis are loaded from public CDNs. If a CDN is unavailable, the page retains its static layout and core shopping functions.
- Run through a test checkout before publishing. The existing Paystack backend has not been modified.

## Deploy
Upload/commit the project files to the existing GitHub repository and let Vercel redeploy. Keep the `api/` folder and `vercel.json` in the project root.

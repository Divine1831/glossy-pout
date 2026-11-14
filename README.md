# Glossy Pout — upgraded storefront

A responsive static storefront with a cart, product filters, 10% discount on products with confirmed prices, Supabase order storage, and Paystack-hosted checkout.

## Included
- `index.html`, `styles.css`, `app.js`: storefront
- `about.html`: brand story
- `payment-success.html`: server-side payment verification result
- `api/`: Vercel serverless payment endpoints
- `package.json`, `vercel.json`: deployment configuration

## Before launch
1. Upload this project to a private GitHub repository and import it into Vercel.
2. In Vercel Project Settings → Environment Variables, add:
   - `SUPABASE_URL` — your Supabase project URL
   - `SUPABASE_SERVICE_ROLE_KEY` — Supabase secret/service-role key (server only)
   - `PAYSTACK_SECRET_KEY` — Paystack test secret key initially
   - `PAYSTACK_CALLBACK_URL` — optional absolute URL, e.g. `https://YOUR-DOMAIN/payment-success.html`
3. Redeploy after adding variables.
4. In Paystack dashboard, set webhook URL to `https://YOUR-DOMAIN/api/paystack-webhook`.
5. Test with Paystack test mode before any live transactions.
6. Confirm the callback and webhook behavior in a test transaction before launch.

## Security
- Never put `SUPABASE_SERVICE_ROLE_KEY` or `PAYSTACK_SECRET_KEY` in HTML, browser JavaScript, GitHub, or chat.
- Do not accept screenshots or uploaded receipts as proof of payment. This project verifies payment directly with Paystack.
- Live payment setup, merchant identity checks and payment-account ownership must be handled by a parent/guardian and the authorized business owner. Do not bypass provider age or identity rules.
- Do not ask customers for card PINs, OTPs, or full card details on this site.

## Important database note
The Supabase `orders` table should have RLS enabled and no public read/write grants. The SQL you already ran is intended for this setup. Server endpoints use the secret key only on Vercel.

## Product pricing
The currently confirmed price mapping in the server catalogue is:
- Moisturizing Lip Balm: ₦1,500 (mapped from the existing Lip Balm price)
- Candy Cloud: ₦3,000
- Clear Lipgloss: ₦2,500
- Choco Royale: ₦3,000
- Lip Scrub: ₦1,500

The remaining products are displayed as “Price coming soon” and cannot be added to checkout until their prices are confirmed. Edit both `app.js` and `api/_products.js` together when prices are confirmed. Prices in the server catalogue are authoritative; the browser cannot change them.

## Product images
No original product photographs were available in the source files when this project was prepared. The product visuals are original CSS illustrations, not photographs of the actual products. Replace them with real product images when available.

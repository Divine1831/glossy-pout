# Glossy Pout mobile storefront redesign

This update replaces the customer-facing interface with a mobile-first app-style storefront. It keeps the existing Vercel API handlers, `package.json`, and `vercel.json` unchanged.

## Files added or redesigned

- `index.html`, `styles.css`, `app.js` — splash, onboarding, guest welcome, home, explore, saved items, product sheet, bag, checkout, WhatsApp confirmation, notifications and dark mode.
- `about.html`, `payment-success.html` — matching branded pages. Payment success still calls `/api/verify-payment`.
- `manifest.webmanifest`, `sw.js`, `icons/` — installable web app shell and icons.
- `scripts/download-product-images.js` — downloads the supplied Drive product images into `images/`.
- `images/bare-essence.jpg` — local Bare Essence hero/product image supplied with the existing project.

## Product images

From the project root, run:

```bash
node scripts/download-product-images.js
```

The script downloads all 15 Drive-hosted photos to `images/<product-id>.jpg`. It keeps files already downloaded; use `--force` to replace them. The Drive files must be shared so the browser/script can view them. The storefront first tries the local product image, then the Drive thumbnail, then two alternate Drive URLs. If all fail, it displays a simple product-name tile rather than inventing product artwork.

## Existing server configuration

Keep the Vercel environment variables already used by the backend. The server handlers require:

- `SUPABASE_URL`
- `SUPABASE_SERVICE_ROLE_KEY`
- `PAYSTACK_SECRET_KEY`

The notifications POST endpoint also uses `NOTIFICATIONS_ADMIN_TOKEN`. The optional Paystack callback setting remains controlled by the existing backend. Do not place any of these secrets in browser JavaScript or public files.

## Checkout contract

The Paystack checkout continues to POST to `/api/create-payment` with:

```json
{
  "customer": {
    "customer_name": "...",
    "customer_email": "...",
    "customer_phone": "...",
    "delivery_address": "..."
  },
  "items": [
    { "id": "cherry-pop", "qty": 1 }
  ]
}
```

The browser only sends product IDs and quantities. The server remains authoritative for product prices and the 10% discount. WhatsApp orders include the selected items, quantities, customer details, and the displayed subtotal/discount/total in a pre-filled message.

## Deploy

Copy the project files to the existing repository and deploy through the existing Vercel project. Do not replace the existing `api/` directory, `package.json`, or `vercel.json` with different versions. After deployment, test a Paystack checkout in the live environment and verify that the existing Supabase and Paystack environment variables are present in Vercel.

# Fabliss — Website Draft (MERN Stack)

A full draft build for **Fabliss**, a gifting-hamper business in Delhi NCR.
Theme (blush pink / black / gold) is taken from the logo you shared.

This is a **working draft**, not a finished production site:
- Product images are hotlinked from Unsplash placeholders — swap them for your real photos.
- Prices, item names, and the "Housewarming / Baby Celebration / Coffee Therapy / Baby Shower"
  hamper contents are made up for the draft — replace with your real catalogue.
- The WhatsApp number, email, and phone number shown everywhere are placeholders
  (`+91 99999 99999` / `hello@fabliss.in`) — search-and-replace them with your real ones.
- Razorpay is wired up for real (order creation + signature verification), but you need
  your own Razorpay account and API keys for it to actually process payments.
- MongoDB is wired up for real too, but needs your own connection string (e.g. a free
  MongoDB Atlas cluster) — I can't spin up a live database from here.

## What's inside

**`/client`** — React (Vite) frontend
- 3D-ish CSS ribbon/ring loading intro, animated on every load (skippable by clicking)
- Sticky top bar: COD available / 5-7 day shipping / no refund & return / Delhi NCR only
- Navbar with an occasion dropdown (Housewarming, Baby Celebration, Coffee Therapy, Baby Shower, Build Your Own)
- Home page with hero, trust strip, hamper grid, custom-hamper CTA band
- Individual hamper pages (gallery, description, what's inside, qty picker, add to cart)
- **Build Your Own Hamper**: pick an occasion → check/uncheck items → price updates live
- Cart page, Checkout page (address form + COD or Razorpay) with a live order summary
- Login required before anything can be added to the cart (popup modal, or full /login /signup pages)
- Bulk Order page with a WhatsApp-linked enquiry form
- About Us, Contact Us (WhatsApp-linked form) pages
- Footer with Instagram / WhatsApp / email / hamper links
- Floating WhatsApp "chat with us" button on every page
- Order confirmation page showing a unique order ID (e.g. `FAB-7X9K2M`)

**`/server`** — Node + Express + MongoDB (Mongoose) backend
- `models/User.js`, `models/Order.js`
- Auth routes: `/api/auth/signup`, `/api/auth/login` — bcrypt-hashed passwords, JWT sessions,
  and regex validation for name / email / Indian phone number / password strength (see `utils/validators.js`)
- Product routes: `/api/products/hampers`, `/api/products/hampers/:slug`, `/api/products/custom`
- Order routes: `/api/orders/razorpay/create`, `/api/orders/razorpay/verify`, `/api/orders/place`
  (generates the unique order ID and blocks orders outside Delhi NCR pincodes), `/api/orders/mine`
- `middleware/auth.js` protects any route that needs a logged-in user

## Running it locally

### 1. Backend
```
cd server
npm install
cp .env.example .env      # then fill in MONGO_URI, JWT_SECRET, RAZORPAY_KEY_ID, RAZORPAY_KEY_SECRET
npm run dev                # starts on http://localhost:5000
```

### 2. Frontend
```
cd client
npm install
npm run dev                 # starts on http://localhost:5173
```
The Vite dev server proxies `/api/*` calls to `http://localhost:5000` (see `vite.config.js`),
so just running both at once is enough for everything to talk to each other.

To also enable the "Pay Online" button, add a `.env` file inside `/client` with:
```
VITE_RAZORPAY_KEY_ID=rzp_test_xxxxxxxxxxxx
```

## Before this goes live — a checklist

- [ ] Replace all placeholder images with real product photography
- [ ] Replace the 5 hampers' names, descriptions, items, and prices with your real catalogue
- [ ] Replace the placeholder WhatsApp number (in `WhatsAppButton.jsx`, `Footer.jsx`, `Contact.jsx`, `BulkOrder.jsx`)
- [ ] Replace the placeholder email/phone in `Footer.jsx` and `Contact.jsx`
- [ ] Create a free MongoDB Atlas cluster and put its connection string in `server/.env`
- [ ] Create a Razorpay account, get real API keys, and switch from test to live mode when ready
- [ ] Double-check the Delhi NCR pincode list in `server/utils/validators.js` — it's a reasonable
      prefix-based approximation, not an official list; tighten it if you need precision
- [ ] Deploy the backend (Render/Railway/etc.) and frontend (Vercel/Netlify), and point
      `VITE_API_URL` in the client at your deployed backend URL

## A note on scope

A few things worth flagging honestly:
- The "3D animation" on load is built with CSS 3D transforms (a genuinely rotating ring +
  rising wordmark), not a Three.js/WebGL scene — this keeps the site fast and dependency-light,
  which matters more for a small gifting business than a heavy 3D engine. Happy to build a
  Three.js version instead if you'd like something more elaborate.
- I couldn't test the MongoDB or Razorpay integration live from here since I don't have access
  to your database or payment credentials — the code follows the standard, correct patterns for
  both, but test them yourself once your `.env` values are in place before going live.

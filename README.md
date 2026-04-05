# Shitfriedrice

Art made from stuff nobody wanted. This is the website for Lydia's handmade art business.

## What this is

A full-stack e-commerce and portfolio website built with:

- **Next.js 14+** — The framework that runs the whole site
- **Tailwind CSS** — Styling (colors, layout, responsive design)
- **Sanity CMS** — Where Lydia manages products, portfolio, and settings (no code needed)
- **Stripe** — Handles payments for the shop
- **Zustand** — Keeps the shopping cart working across pages
- **Framer Motion** — Animations (card tilts, page transitions, hover effects)
- **Resend** — Sends commission form emails to Lydia

---

## Quick Start (for developers)

### 1. Install dependencies

```bash
npm install
```

### 2. Set up environment variables

Copy the example file and fill in your values:

```bash
cp .env.local.example .env.local
```

You need:
- **Sanity**: Project ID and dataset from [sanity.io/manage](https://sanity.io/manage)
- **Stripe**: API keys from [dashboard.stripe.com/apikeys](https://dashboard.stripe.com/apikeys) (use TEST keys for development)
- **Resend**: API key from [resend.com/api-keys](https://resend.com/api-keys)

### 3. Set up Sanity

If you don't have a Sanity project yet:

```bash
npx sanity init
```

Follow the prompts. Use the project ID it gives you in your `.env.local`.

### 4. Run the development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see the site.

### 5. Open Sanity Studio

Go to [http://localhost:3000/studio](http://localhost:3000/studio) to manage content.

---

## For Lydia: How to manage your site

### Adding/editing products

1. Go to `yoursite.com/studio`
2. Click **Products** in the sidebar
3. Click the **+** button to add a new product
4. Fill in: title, photos, price, description (in your voice), materials, category
5. Check "Featured on Homepage?" for up to 3 products you want on the home page
6. Check "One of a Kind?" for unique pieces (shows the "One left" badge)
7. Uncheck "In Stock?" when something sells out
8. Click **Publish**

### Adding portfolio pieces

1. Go to `yoursite.com/studio`
2. Click **Portfolio** in the sidebar
3. Add your piece with photos, artist note, materials, and year
4. Check "Super Bowl Work?" for the Villa's Tacos piece (only one should be checked)
5. Click **Publish**

### Opening/closing commissions

1. Go to `yoursite.com/studio`
2. Click **Site Settings** in the sidebar
3. Change "Commission Status" to:
   - **Open** — green badge, form is active
   - **Waitlist** — yellow badge, form still works
   - **Closed** — red badge, form still works (people can still submit)
4. Optionally add a note like "Back in March!" or "Booked through February"
5. Click **Publish**

### Removing a product

In Sanity Studio, open the product and either:
- Uncheck "In Stock?" (it stays on the site but shows "Gone" badge)
- Delete it entirely (it disappears from the site)

---

## What each folder does

```
shitfriedrice/
├── app/                    # All the pages and API routes
│   ├── page.tsx            # Home page (the one with the big headline)
│   ├── layout.tsx          # The shell around every page (nav, footer, fonts)
│   ├── shop/
│   │   ├── page.tsx        # Shop grid (all products with filters)
│   │   └── [slug]/page.tsx # Individual product pages
│   ├── gallery/page.tsx    # Portfolio/gallery page
│   ├── commissions/page.tsx # Commission form and info
│   ├── about/page.tsx      # About Lydia page
│   ├── studio/             # Sanity CMS Studio (where Lydia edits content)
│   └── api/
│       ├── checkout/       # Creates Stripe payment sessions
│       ├── webhook/        # Stripe tells us when payments happen
│       └── commission/     # Sends commission form emails
├── components/             # Reusable pieces of the website
│   ├── ui/                 # Buttons, badges, product cards, decorative elements
│   ├── layout/             # Nav, footer, cart drawer, marquee ticker
│   ├── shop/               # Shop-specific: product grid, filters, add-to-cart
│   ├── gallery/            # Gallery-specific: masonry grid, Super Bowl callout
│   └── home/               # Home-specific: hero, featured products, Super Bowl banner
├── lib/                    # Shared code
│   ├── sanity.ts           # Talks to Sanity CMS
│   ├── stripe.ts           # Talks to Stripe
│   └── store.ts            # Shopping cart state (persists in browser)
├── sanity/                 # Sanity CMS configuration
│   ├── schemas/            # What products/portfolio items look like in the CMS
│   └── sanity.config.ts    # Sanity Studio settings
├── styles/globals.css      # All the global styles, animations, colors
├── public/                 # Static files
│   ├── cursor.svg          # Custom fried rice bowl cursor
│   ├── noise.svg           # Grain texture overlay
│   └── favicon.svg         # Browser tab icon (fried rice bowl)
└── .env.local.example      # Template for secret keys
```

---

## Stripe Setup

### For development (test mode)

1. Go to [dashboard.stripe.com/test/apikeys](https://dashboard.stripe.com/test/apikeys)
2. Copy the "Publishable key" (starts with `pk_test_`) into `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY`
3. Copy the "Secret key" (starts with `sk_test_`) into `STRIPE_SECRET_KEY`
4. For webhooks locally, install the Stripe CLI and run:
   ```bash
   stripe listen --forward-to localhost:3000/api/webhook
   ```
5. Copy the webhook signing secret it gives you into `STRIPE_WEBHOOK_SECRET`

### For production (live mode)

1. In Stripe Dashboard, switch to live mode
2. Use the live keys instead of test keys
3. Create a webhook endpoint at `https://yoursite.com/api/webhook`
4. Select the event `checkout.session.completed`
5. Copy the webhook signing secret

### Test credit card numbers

- **Success**: 4242 4242 4242 4242 (any future expiry, any CVC)
- **Declined**: 4000 0000 0000 0002

---

## Deploying to Vercel

1. Push your code to GitHub
2. Go to [vercel.com](https://vercel.com) and import the repository
3. Add all your environment variables from `.env.local` to Vercel's Environment Variables settings
4. Deploy

The site will automatically redeploy when you push to main.

### After deploying

- Update `NEXT_PUBLIC_SITE_URL` to your actual domain
- Set up Stripe webhooks pointing to your live URL
- Make sure your Sanity CORS settings allow your domain

---

## Product Photos

All placeholder images use `picsum.photos` and are marked with `// TODO: Replace with actual product photo from Lydia` comments.

To replace them:
1. Upload real photos to Sanity via the Studio
2. The site will automatically use the Sanity images once the Sanity client is connected with real data
3. The placeholder data in the component files can be removed once Sanity has real products

---

## Design Notes

- **Colors**: Pulled from Lydia's actual work (Heinz red, lava orange, chartreuse green, Catan blue, chrome silver)
- **Fonts**: Bebas Neue (headings), Syne (subheadings), Inter (body), Syne Mono (labels/prices)
- **Animations**: All wrapped in `prefers-reduced-motion` media queries for accessibility
- **The namesake**: "Shit Fried Rice" — a hyperrealistic fake fried rice bowl sculpture — is the mascot piece and appears in the hero, favicon, and about page
- **Custom cursor**: A tiny fried rice bowl (desktop only, falls back to default on mobile)
- **Card tilt**: Disabled on touch devices automatically

---

## License

This is Lydia's site. All art and content belongs to Shitfriedrice.

# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this project is

A static, read-only product catalog for "Helios Figs" — visually identical to the
main `figs-shop` app (Farmhouse Editorial design), but with no login, no cart, no
checkout, and no admin panel. Visitors browse products and use a **"Contact to
Buy"** button (a `mailto:` link) instead of purchasing on-site. It has zero
server/database dependency so it can be hosted for free on **GitHub Pages** via
Next.js static export.

It was generated from a sibling project, `figs-shop`
(`C:\Users\Palousaki\Documents\projects\figs-shop` on the machine it was created
on), which is the full dynamic app with Prisma/Postgres, NextAuth, Stripe
checkout, and an admin panel. This repo intentionally does **not** share code
or dependencies with it — see "Relationship to figs-shop" below.

## Commands

```bash
npm install     # Install dependencies
npm run dev     # Local dev server on localhost:3000
npm run build   # Static export -> ./out
npm run lint    # ESLint
```

To preview the exported build the way GitHub Pages will actually serve it:

```bash
npx serve out
```
(Note: on first run `npx serve` may print an interactive telemetry prompt and
appear to hang in a non-interactive shell — answer it once, or use any other
static file server, e.g. `npx http-server out`.)

## Architecture

**Next.js 15 App Router**, JavaScript (no TypeScript), Tailwind CSS 3.
`output: 'export'` in `next.config.mjs` — this build produces static HTML/JS
into `out/`; there is no Node server at runtime.

- **Products**: `data/products.json` — a static array, no database. Each
  entry: `{ id, name: {en, el}, description: {en, el}, price, weight, image,
  category, inStock, stock, rating, reviews }`. `image` is a `/public` path.
  Currently seeded with the 4 real products from `figs-shop`'s
  `prisma/seed.js` (250g/500g/1kg/10kg of the same "Organic Dried Figs"),
  all sharing the one product photo that exists (`/dried_figs.png`) — there
  is no per-product photography yet.
- **Bilingual UI**: `lib/translations.js` (`en`/`el` keys), consumed via
  `useLanguage()` from `context/LanguageContext.js` (localStorage-persisted,
  same mechanism as `figs-shop`). Always add both `en` and `el` entries for
  new UI strings.
- **Pages**: `app/page.js` (home), `app/products/page.js` (listing, category
  tabs via `?category=retail|wholesale`), `app/products/[id]/page.js`
  (detail — `generateStaticParams()` over `data/products.json`),
  `app/about/page.js`, `app/contact/page.js`.
- **"Contact to Buy"**: `components/ContactToBuyButton.js` opens
  `components/ContactModal.js`, a form (name/email/message, message
  pre-filled naming the product) that submits via client-side `fetch` to
  [Web3Forms](https://web3forms.com) — a free form-backend API, so it works
  for every visitor regardless of whether they have a mail client configured
  (a plain `mailto:` link silently does nothing for such visitors, which is
  why this was changed from the original `mailto:`-only implementation — see
  the sibling project `sunset-view` for the same pattern). The Contact page
  (`app/contact/page.js`) still uses a plain `mailto:` link — that one wasn't
  changed. Both the destination email and the Web3Forms access key live in
  `lib/contactConfig.js` (`CONTACT_EMAIL`, `WEB3FORMS_KEY`) — that's the one
  place to update either.
- **No state management needed** — no cart, no auth, no client-only data
  beyond the language toggle.

## Relationship to `figs-shop`

Ported from `figs-shop` and kept **verbatim**: `tailwind.config.js` (the
oklch `brand`/`ink`/`olive`/`fig`/`parchment`/`line` palette — **except**
`fig`, changed here from purple to warm brown, and the logo/favicon, recolored
from purple to golden, because the products are green figs, not dark ones),
`app/globals.css`,
`context/LanguageContext.js`, fonts (Inter/Instrument Serif/Caveat via
`next/font/google` in `app/layout.js`), and `app/about/page.js`.

Reworked to drop DB/auth/payments coupling: `Header.js` (no session/cart),
`Footer.js` (no cart link), `Providers.js` (only `LanguageProvider`,
`app/page.js` (no `fetch('/api/products')`, reads local JSON), `app/contact/page.js`
(no server-side form submit — direct mailto instead),
`ProductCard.js`/`ProductDetailContent.js` (no `useCart`; `AddToCartButton` →
`ContactToBuyButton`).

**Deliberately not present here** (by design — do not re-add without
re-discussing scope): Prisma/Postgres, NextAuth, Stripe, `middleware.js`,
`app/api/**`, `app/admin/**`, `app/login`, `app/register`, `app/cart`,
`app/checkout`, `CartContext`, `AddToCartButton`, `ProductCardSkeleton`.

If the live `figs-shop` site's design or product line changes, those changes
must be **manually re-ported here** — there is no shared code and no sync
mechanism between the two repos.

## What's done

- Full static site built and verified: `npm run build` produces a clean
  `out/` (12 pages: home, about, contact, products list, 4 product detail
  pages) with zero references to Prisma/NextAuth/Stripe/`/api/*`.
- Locally smoke-tested: all routes return 200, an invalid product id 404s,
  and the mailto CTA generates correctly with the product name/weight in the
  subject/body, addressed to `elenipalou@gmail.com`.
- Dependencies deliberately upgraded off the `figs-shop` pins: `next` bumped
  from `15.0.3` to `^15.5.25` (the `15.0.3` in `figs-shop` has a known
  critical CVE) and `react`/`react-dom` moved from the November 2024 RC build
  to stable `^19.0.0`.
- Git initialized locally with one commit. **Not yet pushed to GitHub** —
  no remote has been created or configured.

## What's left

1. **Create the GitHub repo and push.** Decide the exact repo name first —
   `next.config.mjs` has `const repoName = 'figs-catalog'`, which must match
   the GitHub repo name exactly (GitHub Pages project sites are served from
   `https://<user>.github.io/<repo-name>/`, and Next needs that as
   `basePath`/`assetPrefix` to resolve assets correctly). If the repo is
   renamed, update `repoName` in `next.config.mjs` to match before deploying
   — this is the most common cause of a broken (CSS/asset-less) GitHub Pages
   deploy for a Next static export.
2. **Enable GitHub Pages** after the first push: repo Settings → Pages →
   Source → "GitHub Actions". The included `.github/workflows/deploy.yml`
   builds and deploys automatically on every push to `main`.
3. **Confirm the deploy actually works** — check the Actions tab after the
   first push, then open the live `github.io` URL and click through every
   page, confirm images/fonts load (not just the homepage — this is where a
   `basePath` mismatch shows up), and test the "Contact to Buy" modal *and*
   the Contact page's mailto CTA in a real browser.
4. ~~Set a real Web3Forms access key.~~ **Done** — `lib/contactConfig.js` has
   a real `WEB3FORMS_KEY`. It's committed in plaintext (deliberately — the
   key is meant to be public/client-side and ends up in the shipped JS bundle
   either way, since this is a static export with no server to hide it
   behind; moving it to an env var wouldn't hide it from visitors, only from
   git history, and the owner chose not to bother with that tradeoff).
5. **Contact email is a placeholder.** `elenipalou@gmail.com` is currently
   set as `CONTACT_EMAIL` in `lib/contactConfig.js` as a stand-in because the
   real business address didn't exist yet at creation time — swap to the
   real one before this goes live publicly (used by both the "Contact to
   Buy" modal and the Contact page's mailto link).
6. **Product photography.** All 4 products currently reuse the single
   `/dried_figs.png` image inherited from `figs-shop` — there's no real
   per-product photography in the repo. Not blocking, but worth doing before
   a real launch.
7. **Custom domain (optional)** — if a custom domain is added later via
   GitHub Pages settings, `basePath`/`assetPrefix` in `next.config.mjs`
   should be cleared back to `''` (they're only needed for the
   `<user>.github.io/<repo>` subpath case).

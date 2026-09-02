# Figs Catalog

Static, read-only product catalog for Helios Figs. Same visual design as the
main `figs-shop` app, but no login, no cart, no checkout — visitors browse
products and use a "Contact to Buy" button (a form submitted via
[Web3Forms](https://web3forms.com)) to reach out.

Zero server dependency: no database, no auth, no payment provider. Built with
Next.js static export (`output: 'export'`) so it can be hosted for free on
GitHub Pages.

## Commands

```bash
npm install     # Install dependencies
npm run dev     # Local dev server on localhost:3000
npm run build   # Static export -> ./out
```

To preview the exported build locally the way GitHub Pages will serve it:

```bash
npx serve out
```

## Editing content

- **Products**: edit `data/products.json`. Each entry needs `id, name{en,el},
  description{en,el}, price, weight, image, category, inStock, stock, rating,
  reviews`. Product images go in `public/` and are referenced by path (e.g.
  `/dried_figs.png`).
- **Text/translations**: `lib/translations.js` (`en` and `el` keys — always
  update both).
- **Contact email and Web3Forms key**: `lib/contactConfig.js`
  (`CONTACT_EMAIL`, `WEB3FORMS_KEY`) — used by both the "Contact to Buy"
  modal and the Contact page. Get a free `WEB3FORMS_KEY` at
  https://web3forms.com/ (just an email, no signup); without it, "Contact to
  Buy" submissions will fail.

## Deploying to GitHub Pages

1. Push this repo to GitHub.
2. In `next.config.mjs`, make sure `repoName` matches the exact GitHub repo
   name (this sets the asset `basePath` for GitHub Pages' `/<repo>/` URL
   structure). Skip this if using a custom domain or a `<user>.github.io`
   user/org page repo.
3. In the repo settings, go to **Settings → Pages** and set **Source** to
   **GitHub Actions**.
4. Push to `main` — `.github/workflows/deploy.yml` builds and deploys
   automatically. The site will be live at
   `https://<user>.github.io/<repo-name>/`.

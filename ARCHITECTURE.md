Repository architecture — Simu Rahisi (web)

Goal
- Keep a simple, debuggable Next.js app with clear separation: `app`, `components`, `lib`, `data`, `public`.

Top-level folders
- `app/` — Next.js app routes, pages, layouts, middleware.
- `components/` — Presentational and client components (Hero, Header, ProductCard, ThemeToggle, etc.).
- `lib/` — Application logic helpers (db, products, images, finance helpers, auth). Keep pure functions here to simplify unit testing.
- `data/` — JSON data used by the local file DB in development. Treat as a single source of truth for seeded content.
- `public/` — Static assets (put `beach.jpg` and `phone-images/*` here).

Files I added/changed for clarity
- `src/lib/finance.ts` — single place for contribution margin and commission calculations.
- `src/components/HeroCarousel.tsx` — client carousel for featured phones.
- `src/components/ThemeToggle.tsx` — theme switch persisted to `localStorage`.
- `ARCHITECTURE.md` — this file.

Debugging & development tips
- Run locally in dev mode to get fast refresh and server logs:

  ```bash
  cd web
  npm install
  npm run dev
  ```

- Rebuild production to verify typechecking and static generation:

  ```bash
  npm run build
  npm run start
  ```

- Data: `data/products.json` is read/written by `src/lib/db.ts`. For a safer workflow, keep a `products-data-temp/` copy and use `seed-products.py` to regenerate.

- Errors: Next.js build shows TypeScript errors. Re-run `npm run build` after changes to catch SSG/TS issues.

Testing & extension ideas
- Add unit tests for `src/lib/finance.ts` to verify commission calculations.
- Consider moving from file-JSON DB to SQLite or low-overhead DB for easier concurrency and reliability.
- Add `src/lib/index.ts` as a barrel file to centralize imports if imports grow.

How commissions are now computed
- Commission = 50% * contributionMargin.
- Contribution margin uses explicit `product.margin` when available; otherwise computed as `customerPrice - dealerPrice`.
- Displayed in product cards and product detail pages using `src/lib/finance.ts`.

If you want, I can:
- Add `public/beach.jpg` for you (upload the image here) and I will place it into `public/`.
- Add unit tests for `finance.ts` and a small CI workflow.


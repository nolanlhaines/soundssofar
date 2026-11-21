# Sounds So Far

Site for Nolan Haines' 2027 tour, built with [Astro](https://astro.build).
Multiple pages sharing one nav header and footer (`src/layouts/Layout.astro`).

## Structure

- `src/layouts/Layout.astro` — shared head (meta/favicon/OG tags), nav
  header, and footer. Every page wraps its content in this.
- `src/pages/index.astro` — home: hero + "A stage that comes to you".
- `src/pages/meet-nolan.astro` — Nolan's bio and quote.
- `src/pages/route.astro` — the tour route, rendered at build time from
  `src/data/routes.json`, no client-side fetch involved.
- `src/pages/apply.astro` — the artist application. Submits to [Netlify
  Forms](https://docs.netlify.com/forms/setup/) (`data-netlify="true"`,
  honeypot via `netlify-honeypot`) and redirects to `/thanks` on success.
- `src/pages/contact.astro` — general contact email and a "follow along"
  area (social/stream/podcast links pending, see `TODO.md`).
- `src/pages/thanks.astro` — the page artists land on after submitting.
- `src/styles/global.css` — all styling.
- `src/scripts/apply-form.js` — client-side validation and the honeypot
  check. Only blocks submission on invalid input or spam; a valid submission
  is left to the browser's native POST so file uploads work.
- `netlify.toml` — build command and publish directory for Netlify.
- `src/data/routes.json` — tour stops. Edit this file to change dates or add
  stops; no code changes needed.
- `src/assets/` — images that go through Astro's image pipeline (currently
  empty; see `TODO.md`).
- `public/` — static files served as-is (favicon, etc.).
- `TODO.md` — open items that need Nolan's input. Not part of the public
  site.

## Running locally

```bash
npm install
npm run dev
```

Then visit the local URL it prints (usually `http://localhost:4321/`).

`npm run build` builds the static site into `dist/`. `npm run preview` serves
that built output locally, closer to what production will look like.

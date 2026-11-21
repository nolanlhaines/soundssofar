# Sounds So Far

One-page site for Nolan Haines' 2027 tour, built with [Astro](https://astro.build).

## Structure

- `src/pages/index.astro` — the page. Route stops are rendered at build time
  from `src/data/routes.json`, no client-side fetch involved. The
  application form submits to [Netlify
  Forms](https://docs.netlify.com/forms/setup/) (`data-netlify="true"`,
  honeypot via `netlify-honeypot`) and redirects to `/thanks` on success.
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

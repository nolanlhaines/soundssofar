# Sounds So Far

Site for Nolan Haines' 2028 tour (year under confirmation, see `TODO.md`),
built with [Astro](https://astro.build). Multiple pages sharing one nav
header, "Next stop" banner, and footer (`src/layouts/Layout.astro`).

## Structure

- `src/layouts/Layout.astro` — shared head (meta/favicon/OG tags), the Next
  Stop banner, nav header, and footer. Every page wraps its content in this.
- `src/components/NextStopBanner.astro` — reads `src/data/routes.json` at
  build time and shows the next stop whose end date hasn't passed yet.
- `src/components/SiteFooter.astro` — newsletter form, Follow placeholders,
  and legal/secondary nav links. Shared by every page via the Layout.
- `src/components/NewsletterForm.astro` — reused on the home page, in the
  footer, and on `/stay-in-the-loop`. Doesn't submit anywhere real yet — see
  `TODO.md`.
- `src/pages/index.astro` — home: hero + "A stage that comes to you" +
  newsletter signup.
- `src/pages/meet-nolan.astro` — Nolan's bio and quote.
- `src/pages/route.astro` — the tour route, rendered at build time from
  `src/data/routes.json`, plus a link to download `/tour.ics`.
- `src/pages/tour.ics.ts` — an Astro endpoint that generates a static
  iCalendar file of every stop, from the same `routes.json`.
- `src/pages/apply.astro` — the artist application. Submits to [Netlify
  Forms](https://docs.netlify.com/forms/setup/) (`data-netlify="true"`,
  honeypot via `netlify-honeypot`) and redirects to `/thanks` on success.
- `src/pages/contact.astro` — a real contact form (name/email/topic/message,
  its own Netlify Forms submission) plus a direct email link and a personal
  photo gallery.
- `src/pages/stay-in-the-loop.astro`, `watch-and-listen.astro`, `faq.astro`,
  `privacy.astro`, `terms.astro`, `404.astro` — see `TODO.md` for what each
  one still needs.
- `src/pages/thanks.astro` — the page artists/contacts land on after
  submitting either form.
- `src/styles/global.css` — all styling.
- `src/scripts/apply-form.js`, `contact-form.js` — client-side validation
  and honeypot checks. Only block submission on invalid input or spam; a
  valid submission is left to the browser's native POST so file uploads
  work.
- `netlify.toml` — build command and publish directory for Netlify.
- `src/data/routes.json` — tour stops, including `start`/`end` ISO dates
  used by the Next Stop banner and the `.ics` calendar. Edit this file to
  change dates or add stops; no code changes needed.
- `src/assets/` — images that go through Astro's image pipeline.
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

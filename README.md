# Sounds So Far

One-page site for Nolan Haines' 2027 tour. Plain HTML, CSS and JavaScript —
no build step, no framework.

## Structure

- `index.html` — the page.
- `css/styles.css` — all styling.
- `js/route.js` — loads `data/routes.json` and renders the route list.
- `js/apply-form.js` — artist application form validation and the honeypot
  spam check. No submission backend is wired in yet (see `TODO.md`).
- `data/routes.json` — tour stops. Edit this file to change dates or add
  stops; the page reads it at load time, no code changes needed.
- `assets/` — images (currently empty; see `TODO.md`).
- `TODO.md` — open items that need Nolan's input. Not part of the public
  site.

## Running locally

Opening `index.html` directly (`file://`) won't load `data/routes.json`,
because browsers block `fetch()` on local files. Serve the folder instead:

```bash
python3 -m http.server 8000
```

Then visit `http://localhost:8000/`.

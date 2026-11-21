# Open items (not shown on the public site)

Things only Nolan can decide or provide. Nothing here should ever be copied
into the public pages.

- **Contact email for notifications.** Once the Netlify site exists, add the
  real address under Site settings → Forms → Form notifications → Email
  notification. There's no address hardcoded in the app anymore — it's a
  dashboard setting, not code.
- **Agreement checkbox wording.** The text in the "Making it happen" fieldset
  of `src/pages/apply.astro` is the plain-language draft from the reference
  file. Flagged for legal/wording review before launch.
- **Photo.** `src/pages/meet-nolan.astro` currently shows a dashed placeholder
  box instead of a photo. Drop the real image in `src/assets/` (matching the
  old `nolan.jpg`, roughly 900x1125), swap the `.photo-placeholder` div for
  Astro's `<Image>` component (`astro:assets`) so it gets optimized
  automatically.
- **Follow-along links.** `src/pages/contact.astro` has a "Follow along"
  section but no actual links yet — social, stream and podcast links aren't
  decided. Add them there once they exist.
- **Domain name.** Needed before we can connect hosting to a real URL. Also,
  once it's set, add `site: "https://<domain>"` to `astro.config.mjs` and
  switch the `og:image`/`twitter:image` tags in `src/layouts/Layout.astro`
  from relative paths to absolute URLs — some platforms that preview shared
  links want an absolute image URL.
- **Route data judgment call:** the mid-August Wyoming stop is listed in
  `data/routes.json` as `"Jackson, WY / Grand Targhee"` with `"type":
  "festival"` and `"tbd": true`, grouping it with Under the Big Sky and ACL
  Fest the way the brief's "Expected, to be confirmed" list does. The earlier
  draft file had treated it as a plain scouting stop instead. Flag if that's
  wrong — easy to change in the JSON.

# Still to decide together (not blockers, just sequencing)

- Stack confirmed: Astro, deployed to Netlify, with Netlify Forms as the
  application-form backend. Kit (ConvertKit) is for the newsletter, wired up
  last, after the site is built and live.
- **File size limit.** `MAX_FILE_BYTES` in `src/scripts/apply-form.js` is set
  to a conservative 10MB per file as a placeholder — Netlify changed its
  Forms pricing/limits in a way I can't fully verify from here. Check the
  real number on the connected Netlify account's actual plan (Site settings →
  Forms, or the billing page) and adjust that one constant, plus the hint
  text next to the file input in `src/pages/apply.astro`, to match.
- **Netlify setup steps once the account exists** (can't do these without
  Nolan's Netlify login):
  1. Connect the GitHub repo in the Netlify dashboard (build command and
     publish directory are already in `netlify.toml`, so it should
     auto-detect).
  2. After the first deploy, go to Site settings → Forms and turn on form
     detection if it isn't already (Netlify scans the built static HTML for
     the `apply` form and should pick it up automatically).
  3. Add a real notification email under Forms → Form notifications.
  4. Submit a real test application once live and confirm it shows up in
     the Netlify dashboard and the notification email arrives.
- Connecting the domain once chosen.

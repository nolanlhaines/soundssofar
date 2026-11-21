# Open items (not shown on the public site)

Things only Nolan can decide or provide. Nothing here should ever be copied
into index.html or the public page.

- **Contact email.** `js/apply-form.js` still uses the placeholder
  `hello@nolanhaines.com` as the fallback address shown in the form. Replace
  `FALLBACK_EMAIL` once the real address is set, and use the same address for
  the "send me an email notification" requirement once the form backend is
  wired up.
- **Agreement checkbox wording.** The text in the "Making it happen" fieldset
  of `index.html` is the plain-language draft from the reference file. Flagged
  for legal/wording review before launch.
- **Photo.** `index.html` currently shows a dashed placeholder box in the
  "Meet Nolan" section instead of a photo. Drop the real image in `assets/`
  (matching the old `nolan.jpg`, roughly 900x1125) and swap the
  `.photo-placeholder` div for an `<img>` tag.
- **Follow-along links.** Social, stream and podcast links aren't on the page
  yet. Once they exist, add a small "Follow along" area — ask before adding
  it, since it's a new section.
- **Domain name.** Needed before we can connect hosting to a real URL.
- **Route data judgment call:** the mid-August Wyoming stop is listed in
  `data/routes.json` as `"Jackson, WY / Grand Targhee"` with `"type":
  "festival"` and `"tbd": true`, grouping it with Under the Big Sky and ACL
  Fest the way the brief's "Expected, to be confirmed" list does. The earlier
  draft file had treated it as a plain scouting stop instead. Flag if that's
  wrong — easy to change in the JSON.

# Still to decide together (not blockers, just sequencing)

- Form backend / file storage / email notifications (recommendation pending
  — see chat).
- Static hosting provider.
- Connecting the domain once chosen.

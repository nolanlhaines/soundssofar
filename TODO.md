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
- **Follow-along links.** Both `src/pages/contact.astro` (photo gallery
  section) and `src/components/SiteFooter.astro` (Instagram/YouTube/Podcast,
  shown on every page) say "link coming soon" — no actual URLs yet. Give me
  the real links and I'll wire them in.
- **Newsletter service.** You already said Kit (ConvertKit) for this. The
  newsletter form (home page, every page's footer, and `/stay-in-the-loop`)
  is built and validates, but doesn't actually submit anywhere yet — on
  submit it just says "sign-ups aren't open yet." Once you confirm Kit (or
  pick something else — see the chat for pricing on a couple of
  alternatives), I'll swap in the real embed/API and wire up real signups.
- **Year: 2027 or 2028?** Everything currently says 2028 (you asked for this
  explicitly a while back). A later message asked me to change it back to
  2027, which I did NOT do without checking first — please confirm which is
  correct.
- **Privacy/Terms wording.** Both pages (`src/pages/privacy.astro`,
  `src/pages/terms.astro`) are plain-language drafts I wrote, each with a
  visible "not reviewed by a lawyer" notice. Needs real legal review before
  launch — don't treat the current wording as final.
- **FAQ answers.** I only put questions on `/faq` that I could answer
  honestly from content already on the site. A few common questions I did
  NOT add because I'd have to guess the answer (flagging here instead of
  guessing on the public page):
  - Is the open mic free to attend?
  - Is there a minimum/maximum set length?
  - Do you cover any travel costs for artists?
  Let me know the answers and I'll add them.
- **Route data used for the calendar/banner.** `src/data/routes.json` now
  has `start`/`end` ISO dates per stop, used by the "Next stop" banner and
  the `.ics` calendar download. For the fuzzy entries ("Mid-July", "Late
  July", "September", "Early October"), I picked a reasonable specific date
  range myself since there's no exact date to parse — the displayed "when"
  text is unchanged, but the invisible date used for sorting/the calendar is
  my estimate, not a confirmed date. Worth a glance once real dates land.
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
     detection if it isn't already (Netlify scans the built static HTML and
     should pick up both the `apply` and `contact` forms automatically).
  3. Add separate notification emails per form under Forms → Form
     notifications — one for `apply`, a different one for `contact`
     (decided: these shouldn't land in the same inbox the same way).
  4. Submit a real test application AND a real test contact message once
     live, and confirm both show up in the Netlify dashboard and trigger
     notifications.
- Connecting the domain once chosen.

# Salt & Scale Website

Production-ready Astro site for Salt & Scale.

## Stack
- Astro 5 (static output) + Vercel adapter
- Tailwind CSS v4
- Partytown (optional third-party offloading)
- Sitemap integration
- Vercel Functions for contact form (`/api/contact`)

## Getting started

```bash
# Install
npm i        # or yarn / pnpm

# Dev
npm run dev

# Build & preview
npm run build
npm run preview
```

## Configuration

Set the canonical site URL in `astro.config.mjs` via env:

```env
SITE_URL=https://saltandscale.consulting
```

On Vercel → Project Settings → Environment Variables:
- SITE_URL – required (used for canonical URLs and sitemap)
- RESEND_API_KEY – optional (email sending)
- CONTACT_TO – optional (destination email)
- CONTACT_FROM – optional (defaults to no-reply@your-domain)

### Open Graph image

Add a 1200×630 JPG at `public/og-image.jpg` for social previews. The layout references `/og-image.jpg` via `og:image` and Twitter card meta.

## Contact form
- Frontend: form in `src/pages/index.astro` posts JSON to `/api/contact`.
- Backend: `src/pages/api/contact.ts` validates, applies a light cookie rate-limit, and (optionally) sends email via Resend.
- Honeypot field `bot-field` is included; add Turnstile/hCaptcha later if spam appears.

## Commands

- dev – run the local dev server
- build – production build
- preview – preview the production build
- format – Prettier format (Astro + Tailwind plugins)
- icons:png – generate PNG icons from vector sources

## Launch checklist
- Domain added to Vercel; HTTPS enabled; redirect www → apex
- Env vars set (SITE_URL, email vars if used); redeploy
- Google Workspace configured (MX records, SPF, DKIM, DMARC)
- Resend domain verified (if using), test form end-to-end
- Privacy Policy and Terms pages added and linked in footer
- Analytics configured (Plausible/GA4); error monitoring (Sentry optional)
- Lighthouse and a11y audits run on production URL

## Development notes
- Keep intrinsic width/height on images to prevent CLS (Lighthouse rule)
- Use semantic headings and focus styles; keep color contrast ≥ 4.5:1
- Avoid dev-only scripts when auditing (Vite client, Astro Dev Toolbar)

## License
Proprietary – © Salt & Scale. All rights reserved.

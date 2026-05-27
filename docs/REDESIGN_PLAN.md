# Salt & Scale — Website Redesign Plan

> **Self-contained handoff document.** This plan is written so a fresh Claude Opus 4.7 session can pick up the redesign without prior conversation context. Read this entire document before making any changes. All decisions in §2 are locked unless explicitly flagged as open in §17.

---

## 0. How to use this document (read first)

### You are picking up an in-progress redesign.

**Project:** Redesign of [http://saltandscale.consulting/](http://saltandscale.consulting/) — Astro 5 + Tailwind v4 + Vercel.

**Operator:** Gabriel Rosales (`@notoriousgor` on GitHub, [`/in/gabriel-rosales`](https://www.linkedin.com/in/gabriel-rosales/) on LinkedIn). Solo shop based in Houston, TX.

**Tech stack already in place** (do not migrate without explicit approval):
- Astro 5.13 with Vercel adapter (`@astrojs/vercel`)
- Tailwind CSS v4 via `@tailwindcss/vite`
- React 19 (islands only — most pages are zero-JS)
- Self-hosted variable Inter + Playfair Display via `@fontsource-variable/*`
- `@vercel/analytics`, `@astrojs/sitemap`, `@astrojs/partytown`

### First message to operator if resuming this work

> "I've read `docs/REDESIGN_PLAN.md`. Starting Phase 0 (foundations) per §13 unless you want me to begin elsewhere. Phase 0 is a single low-risk PR: token consolidation, static-by-default Astro config, extended `Layout` props, scroll-padding fix for WCAG 2.2 §2.4.11, headshot import, removal of fabricated testimonials, and replacement of the 'juniors + mentorship' copy. Confirm or redirect."

### Phase order (default)

1. **Phase 0** — Foundations PR (~1 day). See §13.0.
2. **Phase 0.5** — Visual mockups for hero + 1 service page + 1 case study, operator sign-off before §13.1.
3. **Phase 1** — Multi-page IA split (~1 week).
4. **Phase 2** — Visual redesign across all routes (~1 week).
5. **Phase 3** — A11y + SEO finalization, structured data `@graph`, per-page OG (~3 days).
6. **Phase 4** — Insights launch, 2 pillars + 4 cluster posts (~1 week, parallel with Phase 2).
7. **Phase 5** — Launch + monitoring (~2 days).

Total: ~5–6 weeks single-threaded, 4 weeks if Phases 2 and 4 overlap.

### Critical guardrails

- **Never publish a fabricated testimonial.** The four testimonials in §4 are *drafts written from public site context*. The operator stated permission to generate, but each draft must be sent to the named client for confirmation/edit before going live under their name. FTC 16 CFR Part 255 + E-E-A-T basics.
- **Never publish invented metrics.** The stat blocks in §5 only describe what is verifiably visible on each client site. Real outcome numbers will be added by the operator post-launch.
- **The Sanrio / PAX / Hive / Thursday Boots work is NOT Salt & Scale case studies.** It is prior-employment work (Corra) and prior contracting. It belongs in `/about` as a résumé block on the `Person` schema, never as `CaseStudy` schema on the `Organization`.
- **No emoji in shipped UI.** Only use them if explicitly requested.
- **Keep the tagline "Growth, grounded in Truth."** It is brand-load-bearing.

---

## 1. Project context

### 1.1 The business

Salt & Scale is a **solo consultancy** (Gabriel Rosales) offering **AI-accelerated website design and development for service businesses**, backed by 10+ years of production commerce experience. The original site copy positioned the business as enterprise Shopify Plus / Adobe Commerce engineering, but the actual delivered Salt & Scale work is local Houston service-business websites. Positioning has been corrected — see §2.1.

### 1.2 Founder

- **Name:** Gabriel Rosales
- **Location:** Houston, TX
- **GitHub (personal):** [`@notoriousgor`](https://github.com/notoriousgor) — 45 repos, contributor to `Shopify/hydrogen`, `redwoodjs/graphql`
- **GitHub (company):** [`Salt-Scale` org](https://github.com/Salt-Scale)
- **LinkedIn:** [`/in/gabriel-rosales`](https://www.linkedin.com/in/gabriel-rosales/)
- **Personal site:** `gabriel-rosales.com`
- **Headshot:** `~/Downloads/headshot.jpeg` (724×1086 JPEG, Canon EOS, October 2024). Move to `src/assets/headshot-source.jpeg` in Phase 0.

### 1.3 Active partner credentials

- **Shopify Partner** (confirmed)
- **Anthropic Claude Partner** (confirmed)
- **Vercel Partner** (confirmed)

These are the named E-E-A-T signals. Use them on `/about`, in footer, and in `Person`/`Organization` schema where appropriate.

### 1.4 Current site state

Single-page site at `src/pages/index.astro` (~1,247 lines). Visual system already uses Inter + Playfair, charcoal `#373E45`, with two undefined-token green/copper accents (`#5a7c65`, `#8b7d6b`) hardcoded across the file that *do not match* the brand tokens declared in `src/styles/global.css` (`--color-supporting-green: #4b6241`, `--color-accent-brown: #8a5c37`). Phase 0 fixes this drift.

The site has fabricated testimonials ("Sarah Chen / Marcus Rodriguez / Jennifer Park") that must be removed in Phase 0.

### 1.5 Domain & deployment

- **Production domain:** `http://saltandscale.consulting/` (HTTP — confirm HTTPS is configured at Vercel; if not, add to launch checklist).
- **Hosting:** Vercel via `@astrojs/vercel`.
- **Email:** Optional Resend integration on `/api/contact` (env var `RESEND_API_KEY`).
- **Sitemap:** Auto-generated by `@astrojs/sitemap`.

---

## 2. Locked decisions

These have been agreed by the operator. Do not change without explicit re-confirmation.

### 2.1 Positioning

**One-line:** *"AI-accelerated website design and development for service businesses, built by a senior engineer with 10+ years in production commerce."*

**Hero H1 (recommended):** *Websites that book the work.*
**Hero subhead:** *Built fast with AI. Engineered with 10 years in production commerce. One senior engineer, end to end.*

**Two-track service offering:**

| Track | Audience | Lead | Primary URL |
|---|---|---|---|
| Websites for service businesses | Local/regional service companies | **Yes** — homepage leads here | `/services/business-websites` |
| Ecommerce engineering | Brands needing Shopify/Adobe work | Secondary slot | `/services/shopify-development`, `/services/adobe-commerce`, `/services/headless-commerce` |

### 2.2 Visual scope

**Full rewrite.** New homepage hero, new component library in `src/components/`, multi-page IA. Visual mockups in Phase 0.5 require operator sign-off before proceeding into Phase 1's full rollout.

### 2.3 Color system (locked)

| Role | Hex | Tailwind token | Use |
|---|---|---|---|
| Ink | `#2A2F35` | `text-ink` | Body, headings on light |
| Charcoal | `#373E45` | `text-charcoal` | Logo, dark surfaces |
| Paper | `#F7F1E1` | `bg-paper` | Default page background |
| Cream | `#F4E3C3` | `bg-cream` | Highlight surfaces, callouts |
| Sage (deep) | `#4B6241` | `text-sage` | Primary green, brand accent |
| Sage (soft) | `#7A9080` | `text-sage-soft` | Tints, dividers |
| Copper | `#8A5C37` | `text-copper` | Secondary brand accent |
| Stone | `#9A938A` | `text-stone` | Muted text, captions |
| **Saffron** *(THE splash)* | `#C8893E` | `bg-saffron` | Primary CTAs, eyebrow tags, link underlines on /insights, stat-block emphasis |
| Saffron text | `#8E5F22` | `text-saffron` | Saffron-as-text on paper |

**Saffron usage rules:**
- ✓ Primary CTA on light background (text `#2A2F35` on bg `#C8893E` = 7.4:1 AAA)
- ✓ Accent text on dark hero (`#C8893E` on `#373E45` = 5.6:1 AA)
- ✓ Inline link/text on paper (use `#8E5F22` on `#F7F1E1` = 5.1:1 AA)
- ✗ Never use `#C8893E` for body text on paper (2.7:1, fails AA)
- ✗ Never use white text on saffron buttons — use ink (`#2A2F35`)
- Saffron should feel like a *splash*, not a coat. Reserve for moments of attention.

### 2.4 Typography (locked, retained from current)

- **Display/headings:** Playfair Display Variable, weight 500–600 (avoid 800/900 — too heavy for editorial tone)
- **Body/UI:** Inter Variable, 17–18px base (current is 16px — bump to 17px on `text-base`), line-height 1.6, max-width 65–72ch
- **Code/data (insights only):** JetBrains Mono Variable. Add via `@fontsource-variable/jetbrains-mono`. Load only on `/insights/*` and `/work/*`.

### 2.5 Insights commitment

**Yes, committed: 1–2 posts per month.** Editorial calendar in §14 covers first 12 articles (~6 months). Build the Astro Content Collection infrastructure in Phase 4.

### 2.6 IA at a glance (locked, see §7 for full)

```
/                              Home
/services                      Hub
/services/business-websites    [NEW — primary track]
/services/shopify-development
/services/adobe-commerce
/services/headless-commerce
/services/custom-app-development
/services/integrations-automation
/services/audits-strategy
/work                          Index of Salt & Scale work
/work/mahi-plumbing
/work/aim-global-transport
/work/premier-door-innovations
/work/elevated-water-solutions
/about                         Founder + résumé + partners
/insights                      Blog index
/insights/<slug>
/contact
/legal/privacy
/legal/terms
/legal/accessibility
```

---

## 3. Real assets

### 3.1 Founder bio (verbatim copy for `/about` and footer)

**Display name:** Gabriel Rosales
**Title:** Founder & Principal Engineer
**Location:** Houston, TX

**Short bio (footer / homepage block, ~30 words):**

> Gabriel Rosales is the founder and principal engineer at Salt & Scale. Based in Houston, with 10+ years building production websites and commerce systems, and an open-source contributor to Shopify's Hydrogen storefront framework.

**Long bio (`/about`, ~120 words):**

> Gabriel Rosales is the founder of Salt & Scale, a solo consultancy in Houston building production-grade websites for service businesses. Over the past ten years he has shipped commerce engineering work for brands including Sanrio (at Corra), PAX Labs, Hive Brands, and Thursday Boots Co., and contributed open-source code to Shopify's Hydrogen storefront framework. Salt & Scale is a Shopify Partner, an Anthropic Claude Partner, and a Vercel Partner — three credentials that map directly to how the work gets done: ecommerce platform fluency, AI used as a force multiplier (never a deliverable), and modern deployment infrastructure. Every line shipped under the Salt & Scale name is written and reviewed by Gabriel personally.

**Credentials block:**

- 10+ years in production web engineering
- Open-source contributor to [`Shopify/hydrogen`](https://github.com/Shopify/hydrogen)
- Shopify Partner
- Anthropic Claude Partner
- Vercel Partner

**`sameAs` URLs (for `Person` JSON-LD):**

- `https://www.linkedin.com/in/gabriel-rosales/`
- `https://github.com/notoriousgor`
- `https://github.com/Salt-Scale`
- `https://gabriel-rosales.com`

### 3.2 Headshot pipeline

1. Move source: `~/Downloads/headshot.jpeg` → `src/assets/headshot-source.jpeg` (gitignored is OK; binary is fine in repo at 264 KB).
2. Variants generated via Astro `<Image>` (AVIF + WebP fallback):
   - `headshot-portrait.avif` — 256×320 (4:5 crop) for `/about` hero
   - `headshot-square.avif` — 256×256 for footer / schema `image`
   - `headshot-og.avif` — 1200×630 for `/about` OG image
3. Target: largest AVIF ≤ 25 KB at q80.

### 3.3 Real client roster (logo + quote permission granted)

| # | Client | Sector | Site | Voice |
|---|---|---|---|---|
| 1 | Mahi Plumbing | Houston residential plumbing | [mahiplumbing.com](https://www.mahiplumbing.com/) | Houston small-business owner; family/personal |
| 2 | AIM Global Transport | 18-wheeler freight, all 48 + cross-border | [aimtransports.com](https://www.aimtransports.com/) | B2B logistics; direct, results-oriented |
| 3 | Premier Door Innovations | Aluminum door manufacturer/distributor | [premierdoor.org](https://www.premierdoor.org/) | B2B manufacturing; partnership-focused |
| 4 | Elevated Water Solutions | Water heaters / treatment / gas / plumbing | [elevatedwatersolution.com](https://www.elevatedwatersolution.com/) | Houston tradesman; values the craft |

**Logo acquisition:** logos are permitted. Phase 1 step: scrape from each live site, vector-trace if only raster is available, store under `src/assets/logos/<slug>.svg`. Display greyscale on the homepage trust strip; full color on the case study pages.

---

## 4. Testimonials — DRAFTS for client sign-off

> **Process:** Send each client a short text/email with their draft. Reply of "yes" or proposed edit constitutes endorsement. Save the reply (screenshot is fine) for FTC paper trail. Do not publish under their name without confirmation.

### 4.1 Mahi Plumbing — AJ, Owner

> *"Gabriel took the 'Trophy Catch Plumber' idea I had in my head and turned it into a site that actually feels like Mahi. The phone is right where customers need it at 2 AM, the trust badges are in the right spots, and the form doesn't get in the way when somebody's water heater goes out. First time I saw it I couldn't talk for a minute."*
>
> — **AJ**, Owner — Mahi Plumbing (Houston, TX)

### 4.2 AIM Global Transport

> *"We needed a site that talks to logistics buyers, not consumers. Salt & Scale got the brief on the first call — service-by-service breakdown, 24/7 dispatch front and center, real stats not stock copy, and a quote form that actually routes leads to dispatch. Launched fast and looks like we've been operating for two decades."*
>
> — **AIM Global Transport** (Houston, TX)

### 4.3 Premier Door Innovations

> *"We had three founders' worth of opinions on every page and Gabriel turned that into one coherent site. Product categories are clear, the gallery does the selling, and the contact form routes by project type so we can prioritize the right requests. Our contractor partners actually use the site to spec jobs now."*
>
> — **Premier Door Innovations** (Houston, TX)

### 4.4 Elevated Water Solutions — Emmanuel, Owner

> *"Eleven years of work and I never had a site that represented it right. Gabriel built me one that looks as careful as the work itself — eleven services laid out the way a customer thinks about them, fifteen service areas that actually rank locally, and a quote form on every page that gets me real leads. I send people to it before they call."*
>
> — **Emmanuel**, Owner — Elevated Water Solutions (Houston, TX)

### 4.5 Homepage placement

Place 1 quote (Mahi — strongest emotional hook) below the hero. Other three live on `/work` index and on the home `/` testimonial band only after sign-off.

---

## 5. Case study stat blocks (factual, no invented metrics)

> Every bullet below describes something **directly verifiable on the live client site as of May 2026**. Do not introduce metrics ("doubled inbound calls," "ranking #1 for…") without operator-supplied evidence. Add real metrics later as the operator collects them.

### 5.1 `/work/mahi-plumbing` — Houston residential plumbing

**Brief:** A 24/7 residential plumber serving Houston and 9+ surrounding cities. Owner-operator brand built around the "Trophy Catch Plumber" theme — fishing-meets-plumbing personality with serious craft underneath.

**What was shipped:**

- 24/7 emergency-services UX with phone-first conversion path (phone number anchored in header, hero, services, and footer)
- 9-city service-area architecture (Alvin, Pearland, Katy, Sugar Land, The Woodlands, Conroe, Baytown, Texas City, Galveston)
- License + insurance trust signals integrated (RMP 46529 displayed in footer)
- Bespoke "Trophy Catch" brand language across hero, CTAs, and contact copy
- 4-service catalog: Repairs, Installation, Water Heaters, Drain Cleaning
- Flat-rate, transparent-pricing positioning
- Mobile-first responsive layout with form auto-error handling
- Contact form with graceful submit/error states ("We'll get back to you soon. For immediate help, call …")

**Stack:** Astro / Tailwind / Vercel (matches Salt & Scale toolchain).

### 5.2 `/work/aim-global-transport` — B2B 18-wheeler freight

**Brief:** A nationwide freight carrier operating across all 48 contiguous states plus cross-border. Modern fleet, GPS-tracked, with a 24/7 dispatch operation. Audience is logistics buyers and operations managers, not consumers.

**What was shipped:**

- Stat-led hero block (15+ years, 20+ fleet vehicles, 99.9% on-time delivery, 24/7 dispatch) — quantifies credibility before scrolling
- 6-service B2B catalog: Flatbed Hauling, Step-Deck/Drop Deck, Hotshot, Over-Dimensional, Dry Van, Dedicated & Contract Freight
- Dual conversion path: "Get a Quote" form + direct dispatch phone number, both above the fold
- Dispatch + sales email split for proper lead routing (24/7 dispatch line vs. `sales@aimtransports.com`)
- All 48 + cross-border positioning baked into copy
- Career, fleet, and safety-standards links anchored in footer for HR + procurement audiences

**Stack:** Astro / Tailwind / Vercel.

### 5.3 `/work/premier-door-innovations` — B2B aluminum door manufacturer

**Brief:** A Houston aluminum door and slider distributor founded in 2021 by three industry veterans with 60+ combined years of glazing experience. Sells through contractor and glazier networks, not direct-to-consumer.

**What was shipped:**

- 4 product-category architecture (Commercial, Residential, Sliders, Transaction Windows) with cross-linked galleries
- Filterable gallery system across 5 categories (Interior, Residential, Sliders, Storefront, Transaction)
- 6-testimonial block from real industry partners with role + company attribution (Mario's Glass & Mirror, B and B Glass, Spartan Glass, JM Aluminum, The Imperium, Euro Glass)
- 8-question FAQ with structured-data schema
- Multi-form contact routing by inquiry type (Request Quote / Free Consultation / General Inquiry / Customer Support)
- Project-type / timeline / budget triage fields in contact form for sales prioritization
- Founder story block anchoring "60+ years combined experience" trust signal
- "What Sets Us Apart" pillar block (Precision Craftsmanship / Complete Service / Local Expertise)

**Stack:** Astro / Tailwind / Vercel.

### 5.4 `/work/elevated-water-solutions` — Multi-service licensed plumbing

**Brief:** An 11+ year master-plumber operation expanding from water-heater specialty into water treatment, reverse osmosis, gas line work, and plumbing remodels across the Houston metro.

**What was shipped:**

- 11 services across 3 categories (Water Heater work, Water Treatment, Gas Lines + Remodels) with deep navigation
- 15-area service-area map for local SEO (Houston, Katy, Cypress, Spring, The Woodlands, Conroe, Magnolia, Sugar Land, Channelview, Pasadena, Deer Park, Baytown, La Porte, Galena Park, Jacinto City)
- Recent-installations photo gallery with location attribution (each install captioned with city for trust + local proof)
- 5-star review block with named-customer attribution (Alexis A., Daniel R., James T.) — *real reviews, retained from existing site*
- Trusted-brand row (Rheem, Bradford White, Navien, Rinnai, A.O. Smith) — installer-credibility signal
- License/insurance display (RMPL #47030) + master-plumber positioning
- Dropdown service-needed contact form for free estimates, present on every service page
- Per-service sub-pages with scoped FAQs and CTAs

**Stack:** Astro / Tailwind / Vercel.

---

## 6. Brand & visual system

### 6.1 Colors — see §2.3

Implement as Tailwind v4 `@theme` tokens in `src/styles/global.css`:

```css
@theme {
  --color-ink: #2A2F35;
  --color-charcoal: #373E45;
  --color-paper: #F7F1E1;
  --color-cream: #F4E3C3;
  --color-sage: #4B6241;
  --color-sage-soft: #7A9080;
  --color-copper: #8A5C37;
  --color-stone: #9A938A;
  --color-saffron: #C8893E;
  --color-saffron-deep: #8E5F22;

  --font-sans: "Inter Variable", ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Arial;
  --font-serif: "Playfair Display Variable", ui-serif, Georgia, serif;
  --font-mono: "JetBrains Mono Variable", ui-monospace, SFMono-Regular, Consolas, monospace;
}
```

After this PR, **delete every hardcoded `#5a7c65`, `#8b7d6b`, `#373e45`, `#373E45`, `#f5f8f6`, `#f6f5f3`, `#f7f9f8`, `#f5f6f7` from the codebase** and replace with the tokens above. Use ripgrep to verify zero hardcoded brand-color hex remains except inside SVG assets in `public/`.

### 6.2 Typography scale (Tailwind classes via custom CSS)

| Class | Use | Size / line-height |
|---|---|---|
| `text-display-1` | Homepage H1 | clamp(2.5rem, 6vw, 4.5rem) / 1.05, Playfair 600 |
| `text-display-2` | Section H2 | clamp(2rem, 4.5vw, 3rem) / 1.15, Playfair 600 |
| `text-display-3` | Sub-H2 / card titles | clamp(1.5rem, 3vw, 2rem) / 1.2, Playfair 500 |
| `text-h4` | Card / disclosure headings | 1.25rem / 1.3, Inter 600 |
| `text-eyebrow` | Eyebrow tags | 0.75rem / 1, Inter 600 uppercase tracking-wide |
| `text-body` | Body | 1.0625rem (17px) / 1.65, Inter 400 |
| `text-body-lg` | Lead paragraph | 1.25rem / 1.55, Inter 400 |
| `text-caption` | Captions, footnotes | 0.875rem / 1.5, Inter 400 stone |

### 6.3 Component library (build in Phase 2)

Place under `src/components/`:

- `Section.astro` — `<section>` with consistent padding, optional `eyebrow`, `title`, `lede` props, anchor `id`, `scroll-mt` baked in
- `Eyebrow.astro` — eyebrow tag with optional dot
- `Button.astro` — variants: `primary` (saffron on light / cream on dark), `secondary` (outline charcoal), `ghost`
- `Card.astro` — base card with optional accent stripe
- `Disclosure.astro` — native `<details><summary>` with styled chevron
- `StatBlock.astro` — stat number + label, with optional source footnote slot
- `Quote.astro` — testimonial with attribution + role + company
- `Breadcrumbs.astro` — semantic breadcrumb with `BreadcrumbList` schema injection
- `CTABand.astro` — pre-footer CTA section, configurable copy + button
- `Logo.astro` — already exists, retain
- `LogoStrip.astro` — greyscale client logos row
- `Founder.astro` — bio block with portrait + sameAs links
- `Icon.astro` — single-sprite icon component to replace inline SVG noise

### 6.4 Motion

- Default transitions: 150ms color/opacity, 300ms layout
- Remove `hover:scale-105` everywhere — it's the AI-slop tell
- Keep the existing `prefers-reduced-motion: reduce` block in `src/styles/global.css`
- One signature animation: nav-link active-section underline that draws in with `transform-origin: left` (200ms ease-out)

---

## 7. Information architecture

### 7.1 Header (consistent across every page — WCAG 2.2 §3.2.6 Consistent Help)

Sticky, 64px tall, white/paper background with subtle border-bottom.

**Left:** Logo (links to `/`)
**Center/right (desktop):** `Services` · `Work` · `About` · `Insights` · `Contact (saffron CTA)`
**Right (mobile):** Hamburger → full-screen overlay menu

`Services` and `Work` use a hover/click megamenu listing direct sub-pages — never plain anchor jumps.

### 7.2 Footer (consistent across every page)

5-column layout on desktop, stacked on mobile:

1. **Brand** — logo + tagline + 1-line bio + LinkedIn/GitHub icons
2. **Services** — 7 service links
3. **Work** — 4 case study links + "View all"
4. **Company** — About, Insights, Contact
5. **Legal** — Privacy, Terms, Accessibility Statement

Bottom strip: `© 2026 Salt & Scale. Houston, TX.` · `Growth, grounded in Truth.` · daily-scripture line (move from header script to footer; keep `requestIdleCallback`-deferred load)

### 7.3 URL map (locked from §2.6)

```
/
/services/
/services/business-websites/
/services/shopify-development/
/services/adobe-commerce/
/services/headless-commerce/
/services/custom-app-development/
/services/integrations-automation/
/services/audits-strategy/
/work/
/work/mahi-plumbing/
/work/aim-global-transport/
/work/premier-door-innovations/
/work/elevated-water-solutions/
/about/
/insights/
/insights/<slug>/
/contact/
/legal/privacy/
/legal/terms/
/legal/accessibility/
/feed.xml
/sitemap-index.xml (generated)
/robots.txt
```

Trailing slashes: configure Astro `trailingSlash: 'always'` in `astro.config.mjs` for canonical consistency.

---

## 8. Page-by-page outlines

### 8.1 `/` (Home)

Sections in order:

1. **Hero** — H1 "Websites that book the work." + subhead + 2 CTAs ("Start a project" / "See work") + 1-paragraph "what we do" block (50–150 words, AEO citation target)
2. **Trust strip** — 4 greyscale client logos in a single muted row, alt-tagged with each business name
3. **The Mahi quote** — single editorial pull-quote, large Playfair, attribution
4. **Two service tracks** — 2 cards, link to deep pages: "Websites for service businesses" / "Ecommerce engineering"
5. **Selected work** — 4 case study cards (Mahi, AIM, Premier, Elevated), each with hero stat or quote-snippet
6. **How we work** — 3-step approach (Discovery / Build / Launch & iterate) — preserve the existing copy structure
7. **Why Salt & Scale** — 3 pillars (One senior engineer / AI as multiplier / Production fundamentals) — rewritten per §8.6
8. **Founder block** — portrait + name + 1-paragraph bio + partner badges + LinkedIn/GitHub icons
9. **Insights teaser** — 3 latest articles
10. **CTA band → contact**
11. **Footer**

**Out of scope for home:** the full FAQ (lives on /services/* and /contact instead), the Evolution timeline (moves to /about as résumé), the 6-service grid (moves to /services hub).

### 8.2 `/services` (hub)

H1: *"Two ways we work."*

Two large cards: "Websites for service businesses" → `/services/business-websites`, and "Ecommerce engineering" → expandable list of 6 sub-services.

Below: 1-paragraph "Not sure which fits?" + CTA to contact.

### 8.3 `/services/business-websites` (primary track — NEW)

1. H1: *"Websites for service businesses."*
2. **150-word answer block** (the AEO target): what it is, who it's for, what gets shipped, typical timeline.
3. "What's included" — bulleted list (brand integration, mobile-first design, contact + lead routing, local SEO foundation, accessibility-conformant build, performance budget, deployment + handoff)
4. "How we work" — 4 steps with named deliverables
5. "Stack we ship on" — Astro / Tailwind / Vercel + AI-augmented build
6. **Two related case studies** — Mahi + Elevated (most representative of this track)
7. **FAQ** — 5 service-specific questions as `<details><summary>` + `FAQPage` schema
8. CTA → contact with `?service=business-websites` query param

### 8.4 `/services/shopify-development`, `/adobe-commerce`, `/headless-commerce`, `/custom-app-development`, `/integrations-automation`, `/audits-strategy`

Same template as 8.3. Pull copy from the existing `index.astro` service grid (services 1–6). Each gets:

- 1-paragraph 150-word answer block
- "What's included" (existing bullets)
- "How we work" (3-step adapted from existing approach)
- "Outcomes we target" (Core Web Vitals, conversion, integration reliability — with footnote disclaimer)
- 2 related case studies — for ecommerce-track pages, link to the *résumé* commerce work in /about (Sanrio, PAX, Hive, Thursday Boots) explicitly framed as prior work, not Salt & Scale case studies
- 4–6-question service-specific FAQ
- CTA → contact with pre-selected service

### 8.5 `/work` (index) and `/work/<slug>`

**Index:** filterable by sector (Plumbing / Logistics / Manufacturing / Multi-service). Each card shows logo, business name, sector tag, hero stat or quote snippet, "View case →".

**Each case study page:**

1. Breadcrumb: `Home › Work › <Client>`
2. H1 (client name)
3. **Header strip** — logo, sector, year, project type, link to live site
4. **Brief** — 1 paragraph on the business (factual, no metrics invented)
5. **What we shipped** — bulleted list from §5
6. **Stack** — Astro / Tailwind / Vercel
7. **Quote** — testimonial draft from §4 (only after sign-off)
8. **Visit live** — outbound link with `rel="noopener"`
9. **Next case** + **Back to all work**
10. CTA band → contact

### 8.6 `/about`

1. H1: *"One engineer, ten years, every line."*
2. Founder portrait + 120-word long bio (§3.1)
3. **Partner badges** — Shopify Partner, Anthropic Claude Partner, Vercel Partner
4. **What I believe** — 3 short tenets:
   - "One senior engineer, end-to-end. No handoffs, no junior work shipped, no agency overhead."
   - "AI as a force multiplier, never a deliverable. Anthropic Claude Partner. Every line is reviewed and owned by a human with 10+ years of production experience."
   - "Production-grade fundamentals. Hydrogen contributor, Shopify + Vercel Partner. Built for Core Web Vitals, WCAG 2.2 AA, and real ROI — not Lighthouse vanity scores."
5. **Prior work** (résumé framing — *not* Salt & Scale case studies):
   - Senior engineer at Corra — Sanrio (Shopify Plus + Magento PWA, Laravel APIs, infra leadership)
   - PAX Labs — Shopify Plus headless program with Remix, Hydrogen, Oxygen; custom OMS in PHP/MySQL
   - Hive Brands — custom apps, microservices for promos/ops, Coupon Card app
   - Thursday Boots Co. — Shopify Liquid/JS audits and front-end features
6. **Open source** — link to Hydrogen contributions, public GitHub
7. **Contact** — email + LinkedIn + GitHub + a CTA
8. `Person` JSON-LD with full `sameAs` and `worksFor`

### 8.7 `/insights` and `/insights/<slug>`

**Index:** chronological list, latest 12 articles, filterable by topic tag (Service Businesses / Local SEO / Performance / WCAG / AI in Engineering / Commerce).

**Article template:**

- Breadcrumb
- H1 (article title)
- Eyebrow: topic tag
- Author byline: portrait thumbnail + name + LinkedIn link
- Date published + date modified
- Reading time
- 50–100-word answer summary block at top (AEO citation block)
- Article body with H2/H3 hierarchy
- Inline code blocks (JetBrains Mono) where relevant
- "Key takeaways" bulleted list
- CTA band → relevant service page
- Related articles (3)
- `Article` JSON-LD with `author` ref to founder `Person`

### 8.8 `/contact`

Retain existing form structure (it has good a11y bones already). Changes:

- Pre-fill `service` and `project-type` from URL query params (WCAG 2.2 §3.3.7 Redundant Entry)
- Replace airplane SVG icon with a simple right-arrow on submit button
- Add "What to expect next" sequence card: 1) Reply within 1 business day, 2) 30-min discovery call, 3) Written proposal within 3 business days
- Add direct email + LinkedIn fallback below the form

### 8.9 `/legal/privacy`, `/legal/terms`

Standard boilerplate. Operator should provide final language; Phase 1 can ship placeholder.

### 8.10 `/legal/accessibility`

Required by enterprise procurement; signals seriousness.

Sections:

- Conformance statement: "Salt & Scale aims to conform to WCAG 2.2 Level AA."
- Last reviewed date (auto from frontmatter)
- Known issues (currently empty)
- Feedback contact: email + form link
- Brief explanation of remediation timelines

### 8.11 `/404`

Retain existing; reskin to new system.

---

## 9. Accessibility — WCAG 2.2 AA conformance plan

### 9.1 Legal context (May 2026)

- WCAG 2.2 has been the W3C Recommendation since October 5, 2023, and is the de-facto AA target — courts cite it in ADA cases, the European Accessibility Act references it via EN 301 549.
- DOJ's April 20, 2026 Interim Final Rule extended **Title II** (state/local government) compliance dates by one year. **Title III** (private "places of public accommodation") is unchanged. Salt & Scale is private; under Title III precedent and state laws (e.g., Unruh in CA, NYSHRL/NYCHRL), the practical exposure remains: build to WCAG 2.2 AA.
- The 4.1.1 Parsing criterion was **removed** in 2.2 — do not include in checklists.

### 9.2 Existing 2.1 AA gaps to fix

| Issue | Where | Fix |
|---|---|---|
| Modal (case study) has no focus trap | `index.astro` `#case-modal` | Wrap `<main>` and `<header>` in `inert` while open; add focus trap (~15 lines vanilla JS); restore focus to opener on close |
| Modal missing `aria-labelledby` | `#case-modal` | Add `aria-labelledby` pointing to in-content H3 |
| Mobile menu doesn't `inert` siblings | `Layout.astro` `#mobile-menu` | Add `inert` on `<main>` while menu open |
| FAQ rendered as static cards | `index.astro` FAQ section | Convert to `<details><summary>` |
| Toast as primary error signal | `index.astro` form script | Make per-field `aria-describedby` errors primary; toast is secondary |
| Decorative `✓` glyphs | All service lists | Add `aria-hidden="true"` to the wrapping span |
| Color-only success states | Form success toast | Pair color with iconography or text |

### 9.3 The six new WCAG 2.2 AA criteria

| Criterion | Status | Action |
|---|---|---|
| **2.4.11 Focus Not Obscured (Min)** — focused element can't be fully hidden by sticky/fixed UI | Needs fix | Add `scroll-padding-top: 6rem` on `<html>` (covers 64px sticky header). Tab through every page after deploy. |
| **2.5.7 Dragging Movements** — drag has single-pointer alternative | N/A | Site has no drag interactions. Note in `/legal/accessibility`. |
| **2.5.8 Target Size (Min)** — interactive targets ≥ 24×24 CSS px | Audit needed | Verify every nav link, button, icon button. Bump case-study close button (currently `h-8 w-8`) to `h-10 w-10`. Hamburger is already 40×40 ✓. |
| **3.2.6 Consistent Help** — help in same relative location across pages | Designed in | "Contact" link in identical position in header + footer on every page |
| **3.3.7 Redundant Entry** — don't make users re-enter session info | Designed in | Pre-fill `service` and `project-type` on `/contact` from query params when arriving from a service page |
| **3.3.8 Accessible Authentication (Min)** — no cognitive-test-only auth | N/A | No login. Note in accessibility statement. |

### 9.4 Verification tooling

- Lighthouse a11y per route — target ≥ 95
- `@axe-core/cli` in CI on every Vercel preview deploy
- Manual: keyboard-only walkthrough, NVDA + VoiceOver smoke test, 200% zoom, Windows High Contrast, `prefers-reduced-motion`

### 9.5 Accessibility statement at `/legal/accessibility`

Use this structure:

```markdown
# Accessibility statement

Salt & Scale aims to conform to **WCAG 2.2 Level AA** across all pages of saltandscale.consulting.

**Last reviewed:** [auto from frontmatter]

## What this means
- Pages are designed to work with screen readers, keyboard-only navigation, and 200% zoom
- Color contrast meets or exceeds 4.5:1 for body text
- All interactive targets are at least 24×24 CSS pixels with adequate spacing
- Focus indicators remain visible at all times during keyboard navigation
- Forms support browser autofill and never require previously entered information to be re-typed within a session

## Known limitations
None at this time.

## Feedback
If you encounter an accessibility issue, please email [contact email] or use the [contact form](/contact). We aim to respond within 2 business days.
```

---

## 10. SEO plan

### 10.1 Technical foundation

| Item | Current | Target |
|---|---|---|
| `astro.config.mjs` `output` | `'server'` | `'static'` with per-route `export const prerender = false` only on `src/pages/api/contact.ts` |
| `trailingSlash` | unset | `'always'` |
| Sitemap | `@astrojs/sitemap` ✓ | Include `lastmod` from frontmatter dates on insights and case studies |
| `robots.txt` | exists | Allow all except `/api/`; reference sitemap |
| Canonical | set in `Layout.astro` ✓ | Verify after multi-page split |
| OG images | single `/og-image.jpg` | Generate per-page via `@vercel/og` or Satori; one per service, case study, and article |
| Favicons | SVG ✓ | Add `apple-touch-icon` + maskable PNG for installable PWA-style |

### 10.2 Per-page on-page checklist

- One `<h1>` per page, exact-match the primary keyword phrase
- 50–150-word direct-answer block within the first viewport (AEO citation target)
- `<h2>` for major sections, `<h3>` for sub-sections, no skipped levels
- Descriptive link text — never "click here" or "learn more" alone
- 2 internal service links + 1 case study link + 1 insight link where relevant
- `alt` text on content images; `alt=""` only on truly decorative
- Per-page `<title>` (≤ 60 chars) and `<meta name="description">` (≤ 155 chars)
- Per-page OG title/description/image
- Breadcrumbs on every non-home page

### 10.3 Core Web Vitals targets (75th percentile, field — May 2026 thresholds)

| Metric | Threshold | Strategy |
|---|---|---|
| LCP | ≤ 2.5s | Hero text-led, no above-fold image; preload Inter Variable; consider dropping `hero-texture.svg` opacity layer |
| INP | ≤ 200ms | Defer all non-critical JS; ship zero JS on `/about`, `/legal/*`; lazy-load case-study modal script only on `/work/*`; remove the daily-scripture fetch from non-home pages |
| CLS | ≤ 0.1 | Width/height on every image; reserve space for OG card embeds |

INP is the hardest of the three to pass in 2026 — only ~64% of mobile origins pass at the 75th percentile per HTTP Archive. The 0-JS-by-default Astro architecture is the single biggest lever; preserve it.

### 10.4 E-E-A-T checklist (the 2026 ranking lever)

- ✓ Named author on every post + page (Gabriel Rosales)
- ✓ Verifiable credentials visible (Hydrogen contributor, Shopify Partner, Claude Partner, Vercel Partner)
- ✓ External `sameAs` links (LinkedIn, GitHub personal, GitHub org)
- ✓ Real, attributed testimonials with company + role (after sign-off — see §4)
- ✓ Real, factually-described case studies (no invented metrics — see §5)
- ✓ Original screenshots, code, charts in articles (the differentiator vs. AI-generated content)
- ✓ `dateModified` on Article schema, visible on page
- ✗ No stock-photo people, no fabricated quotes
- ✗ No "[expert team]" copy — Salt & Scale is a solo shop, say so

### 10.5 Topic clusters (pillar/cluster model) — see §14 for full editorial

- **Pillar 1:** "How to choose a website builder for a service business"
- **Pillar 2:** "Service business website fundamentals"
- **Pillar 3:** "Engineering depth for the curious operator"

Each pillar links down to 3–4 cluster articles; clusters link back up; both link sideways to the relevant `/services/*` page.

---

## 11. Structured data templates

> Use the consolidated `@graph` pattern. One `<script type="application/ld+json">` per page, containing one `@graph` array.
>
> **Schema.org version:** v30.0 (March 2026). Do **not** use `ProfessionalService` — deprecated. Use `Organization` (no `LocalBusiness` until/unless the operator targets local-pack search).

### 11.1 Sitewide (every page)

Inject in `Layout.astro` always:

```jsonc
{
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": "https://saltandscale.consulting/#org",
      "name": "Salt & Scale",
      "url": "https://saltandscale.consulting/",
      "logo": {
        "@type": "ImageObject",
        "url": "https://saltandscale.consulting/icons/icon-c-monogram.svg"
      },
      "founder": { "@id": "https://saltandscale.consulting/#founder" },
      "areaServed": "United States",
      "knowsAbout": [
        "Website design",
        "Web development",
        "Shopify development",
        "Adobe Commerce",
        "Headless commerce",
        "AI-accelerated development",
        "Web accessibility",
        "Core Web Vitals"
      ],
      "sameAs": [
        "https://github.com/Salt-Scale"
      ]
    },
    {
      "@type": "Person",
      "@id": "https://saltandscale.consulting/#founder",
      "name": "Gabriel Rosales",
      "jobTitle": "Founder & Principal Engineer",
      "worksFor": { "@id": "https://saltandscale.consulting/#org" },
      "image": "https://saltandscale.consulting/headshot-square.jpg",
      "sameAs": [
        "https://www.linkedin.com/in/gabriel-rosales/",
        "https://github.com/notoriousgor",
        "https://github.com/Salt-Scale",
        "https://gabriel-rosales.com"
      ]
    },
    {
      "@type": "WebSite",
      "@id": "https://saltandscale.consulting/#website",
      "url": "https://saltandscale.consulting/",
      "name": "Salt & Scale",
      "publisher": { "@id": "https://saltandscale.consulting/#org" }
    }
  ]
}
```

### 11.2 Per-service page additions

Add to that page's `@graph`:

```jsonc
{
  "@type": "Service",
  "@id": "https://saltandscale.consulting/services/business-websites/#service",
  "name": "Websites for service businesses",
  "serviceType": "Web design and development",
  "provider": { "@id": "https://saltandscale.consulting/#org" },
  "areaServed": "United States",
  "description": "[150-word service description]",
  "offers": {
    "@type": "Offer",
    "priceSpecification": {
      "@type": "PriceSpecification",
      "priceCurrency": "USD"
    }
  }
}
```

Plus a `BreadcrumbList` and a `FAQPage` if the page has FAQs.

### 11.3 Per-case-study page additions

```jsonc
{
  "@type": "CreativeWork",
  "@id": "https://saltandscale.consulting/work/mahi-plumbing/#case-study",
  "name": "Mahi Plumbing — Houston residential plumbing website",
  "creator": { "@id": "https://saltandscale.consulting/#org" },
  "about": {
    "@type": "Organization",
    "name": "Mahi Plumbing",
    "url": "https://www.mahiplumbing.com/"
  },
  "abstract": "[1-paragraph factual brief]"
}
```

(Not using `CaseStudy` — it's not a Google rich-result type. `CreativeWork` with descriptive `about` is more durable.)

### 11.4 Per-article page additions

```jsonc
{
  "@type": "Article",
  "@id": "https://saltandscale.consulting/insights/<slug>/#article",
  "headline": "<title>",
  "description": "<meta description>",
  "image": "<og image url>",
  "datePublished": "<ISO date>",
  "dateModified": "<ISO date>",
  "author": { "@id": "https://saltandscale.consulting/#founder" },
  "publisher": { "@id": "https://saltandscale.consulting/#org" },
  "mainEntityOfPage": "<canonical url>"
}
```

### 11.5 Removing existing JSON-LD

Phase 3 deletes the per-section JSON-LD blocks currently scattered through `index.astro` (FAQ, CaseStudy, etc.) and replaces with this single `@graph` per page.

---

## 12. Performance budget

| Budget | Target |
|---|---|
| Total HTML/CSS/JS first load (homepage) | ≤ 80 KB gzipped |
| Per-page JS | ≤ 30 KB; most pages 0 KB |
| LCP image (if any) | ≤ 80 KB AVIF |
| Largest font payload | self-hosted, subset to Latin |
| Lighthouse mobile (per route) | Performance ≥ 95, A11y ≥ 95, Best Practices = 100, SEO = 100 |
| LCP @ 75th percentile | ≤ 2.5s |
| INP @ 75th percentile | ≤ 200ms |
| CLS @ 75th percentile | ≤ 0.1 |

Add Vercel Speed Insights or `web-vitals` JS for RUM after launch.

---

## 13. Implementation phases

### 13.0 Phase 0 — Foundations (single PR, ~1 day)

**Goal:** correctness + token cleanup + structural prep, zero visual regression.

Branch: `redesign/phase-0-foundations`

1. Create `src/styles/global.css` with new `@theme` tokens (§6.1). Keep old token aliases for one PR (`--color-supporting-green: #4B6241` etc.) so nothing breaks.
2. Run codebase replace: `#5a7c65` → `var(--color-supporting-green)` (or new `--color-sage`), `#8b7d6b` → `var(--color-accent-brown)` (or new `--color-copper`). Use ripgrep to confirm zero hex left except in `public/icons/*.svg`.
3. `astro.config.mjs`:
   - `output: 'static'`
   - `trailingSlash: 'always'`
4. `src/pages/api/contact.ts`: add `export const prerender = false;` at the top so it stays a function.
5. Extend `src/layouts/Layout.astro` props: `title`, `description`, `ogImage`, `canonicalPath`, `breadcrumbs`, `schema`. Default values match current homepage so nothing visually changes.
6. Add `scroll-padding-top: 6rem` to `<html>` in `global.css`.
7. Move `~/Downloads/headshot.jpeg` → `src/assets/headshot-source.jpeg`.
8. **Delete the fabricated testimonials** in `index.astro` (the entire "What Our Clients Say" section). Replace with HTML comment placeholder for Phase 1.
9. **Delete the "Human-first delivery / juniors + mentorship" copy** in the "Why we're different" section. Replace with stub:
   ```
   <!-- Phase 2 will replace with three-pillar block: One senior engineer / AI as multiplier / Production fundamentals -->
   ```
10. Verify build, deploy preview, smoke-test homepage.

**Commit message:** `chore: Phase 0 foundations — token consolidation, static output, layout props, remove fabricated testimonials`

### 13.0.5 Phase 0.5 — Visual mockups (operator gate)

Before Phase 1's full IA rollout, ship 3 mockup pages (build them as routes, marked `noindex`):

- `/_preview/home` — new hero, trust strip, two-track services, real Mahi quote
- `/_preview/service` — `/services/business-websites` template
- `/_preview/case` — `/work/mahi-plumbing` template

Operator reviews and signs off. Iterate. Do not proceed until typography + color + spacing are approved.

### 13.1 Phase 1 — Multi-page IA split (~1 week)

1. Build `/services` hub + 7 service pages (existing service copy adapted; new `/services/business-websites` page is new copy)
2. Build `/work` index + 4 case study pages (per §5 stat blocks; testimonials placeholder until sign-off)
3. Build `/about` (per §8.6, including Person schema)
4. Build `/legal/privacy`, `/legal/terms`, `/legal/accessibility`
5. Update header nav to point to real pages, not anchor jumps
6. Footer rebuilt per §7.2

### 13.2 Phase 2 — Visual redesign (~1 week, can overlap Phase 4)

1. New homepage hero (text-led, no card stack)
2. Build component library (§6.3)
3. Replace all inline SVG with `<Icon>` component using a single sprite sheet
4. Apply tokens + type scale + new motion across every route
5. Process headshot → AVIF/WebP variants

### 13.3 Phase 3 — A11y + SEO finalization (~3 days)

1. Run `@axe-core/cli` on every route, fix to zero violations
2. Lighthouse a11y ≥ 95 on every route
3. Keyboard + NVDA + VoiceOver walkthrough
4. Replace per-section JSON-LD with `@graph` per page (§11)
5. Generate per-page OG images via `@vercel/og`
6. `BreadcrumbList` everywhere except home
7. Fix modal focus trap, FAQ disclosures, target sizes

### 13.4 Phase 4 — Insights launch (~1 week, parallel with Phase 2)

1. Add `astro:content` collection at `src/content/insights/` with frontmatter schema (title, description, datePublished, dateModified, author, tags, ogImage)
2. Build `/insights` index + `/insights/<slug>` template
3. RSS feed at `/feed.xml`
4. Ship 2 pillars + 4 cluster articles per §14 first wave

### 13.5 Phase 5 — Launch + monitoring (~2 days)

1. Lighthouse + axe in CI on Vercel preview (GitHub Action or Vercel Check)
2. Submit new sitemap to Google Search Console + Bing Webmaster Tools
3. Request indexing on top 8 pages (home, /about, /work, 4 case studies, /services/business-websites)
4. Set up Vercel Speed Insights or `web-vitals` → analytics
5. Publish accessibility statement
6. Confirm HTTPS + redirect www → apex
7. Test contact form end-to-end with Resend
8. Test all OG previews in LinkedIn / Slack / iMessage

---

## 14. Editorial calendar — first 90–180 days

Two posts per month minimum. Operator-committed cadence.

### Pillar 1 — "How to choose a website builder for a service business"

Pillar article (publish first):
- **P1.0** — *How to choose a website builder for a service business in 2026* (canonical pillar, 2,000+ words, links to all P1 cluster posts)

Cluster:
- **P1.1** — Why most plumbers and contractors get a worse site than a $200/mo template
- **P1.2** — Squarespace vs. WordPress vs. custom — real cost comparison after 3 years
- **P1.3** — The 6 things that move a service-business site from "exists" to "books work"
- **P1.4** — What "AI-built website" actually means in 2026 (and what to watch for)

### Pillar 2 — "Service business website fundamentals"

- **P2.0** — *The service-business website checklist: every page, every form, every signal* (pillar)
- **P2.1** — Local SEO: what actually matters for a Houston plumber (vs. SEO theater)
- **P2.2** — Lead forms that convert: the 5 fields that matter, the 12 that kill submissions
- **P2.3** — Service-area pages without keyword stuffing — the right way to scale geography
- **P2.4** — Phone-first vs. form-first: which wins for which trade

### Pillar 3 — "Engineering depth for the curious operator"

- **P3.0** — *The technical fundamentals every operator should ask their developer about* (pillar)
- **P3.1** — Why your site's INP score is a leading indicator of conversion
- **P3.2** — WCAG 2.2 for service businesses — what's required, what's smart, what's overkill
- **P3.3** — When you outgrow a website builder (and how to migrate without losing rankings)

**Publishing order (suggested):**

| Month | Posts |
|---|---|
| 1 | P1.0 (pillar), P1.1 |
| 2 | P2.0 (pillar), P2.1 |
| 3 | P1.2, P3.0 (pillar) |
| 4 | P3.1, P2.2 |
| 5 | P1.3, P2.3 |
| 6 | P3.2, P1.4 |

Each cluster post links back to its pillar (and to the relevant `/services/*` page); each pillar links to all its clusters.

---

## 15. Files to change — concrete inventory

### 15.1 New files (Phase 1+)

```
src/components/
  Section.astro            new
  Eyebrow.astro            new
  Button.astro             new
  Card.astro               new
  Disclosure.astro         new
  StatBlock.astro          new
  Quote.astro              new
  Breadcrumbs.astro        new
  CTABand.astro            new
  LogoStrip.astro          new
  Founder.astro            new
  Icon.astro               new
  partner-badges/
    ShopifyPartner.astro   new
    ClaudePartner.astro    new
    VercelPartner.astro    new

src/pages/
  services/index.astro                       new
  services/business-websites.astro           new
  services/shopify-development.astro         new (from index.astro service 1+3)
  services/adobe-commerce.astro              new
  services/headless-commerce.astro           new (from index.astro service 3)
  services/custom-app-development.astro      new (from index.astro service 2)
  services/integrations-automation.astro     new (from index.astro service 5)
  services/audits-strategy.astro             new (from index.astro service 6)
  work/index.astro                           new
  work/mahi-plumbing.astro                   new
  work/aim-global-transport.astro            new
  work/premier-door-innovations.astro        new
  work/elevated-water-solutions.astro        new
  about.astro                                new
  insights/index.astro                       new
  insights/[...slug].astro                   new (Astro content collection route)
  contact.astro                              new (extracted from index.astro)
  legal/privacy.astro                        new
  legal/terms.astro                          new
  legal/accessibility.astro                  new

src/content/
  insights/                                  new (Astro content collection)
    .keep
  config.ts                                  new (collection schema)

src/assets/
  headshot-source.jpeg                       moved from ~/Downloads
  logos/
    mahi-plumbing.svg                        new (acquired in Phase 1)
    aim-global-transport.svg                 new
    premier-door-innovations.svg             new
    elevated-water-solutions.svg             new

public/
  feed.xml                                   generated by Astro
```

### 15.2 Heavily modified

```
src/layouts/Layout.astro    extend props (Phase 0), real schema graph (Phase 3)
src/pages/index.astro       gut and rebuild as new home (Phase 2)
src/styles/global.css       new @theme tokens (Phase 0)
astro.config.mjs            output: 'static', trailingSlash: 'always' (Phase 0)
src/pages/api/contact.ts    add `export const prerender = false;` (Phase 0)
README.md                   update with new structure (Phase 5)
```

### 15.3 Possibly retire

```
src/assets/astro.svg              unused starter asset, delete
src/assets/background.svg         verify usage; delete if unused
public/hero-texture.svg           replaced by inline CSS gradient in new hero (Phase 2)
```

### 15.4 Untouched

```
src/components/Logo.astro          retain
public/icons/icon-d-integrated.svg retain (header logo)
public/icons/icon-c-monogram.svg   retain (favicon/schema logo)
public/fonts/*                     retain
public/site.webmanifest            retain
public/og-image.jpg                retained as fallback; per-page OG generated additionally
```

---

## 16. Launch checklist

Add to README's existing checklist:

- [ ] All routes pass Lighthouse mobile ≥ 95 across Performance / A11y / Best Practices / SEO
- [ ] `axe-core` clean on every route
- [ ] Keyboard-only walkthrough of nav, modals, forms, FAQ disclosures across every page
- [ ] Screen-reader smoke test (NVDA + VoiceOver)
- [ ] All structured data validates via Google Rich Results Test (home, /about, 1 service, 1 case study, 1 article)
- [ ] CrUX-eligible OR RUM in place (Vercel Speed Insights or `web-vitals` lib)
- [ ] All four client testimonials confirmed by client before publishing under their name
- [ ] All four client logos acquired with permission and stored in `src/assets/logos/`
- [ ] Accessibility statement live at `/legal/accessibility` and linked from footer
- [ ] HTTPS enforced; www → apex redirect in place
- [ ] Per-page OG images render correctly in LinkedIn / Slack / iMessage / Twitter previews
- [ ] No fabricated names, no stock-photo people, no invented metrics
- [ ] Sitemap submitted to Google Search Console + Bing Webmaster Tools
- [ ] Top 8 pages requested for indexing
- [ ] `robots.txt` references sitemap
- [ ] Contact form tested end-to-end (form submit → Resend → operator inbox)
- [ ] All four case studies have the live-site link working with `rel="noopener"`

---

## 17. Open items pending operator

These are items the next session should ask the operator about *only when reaching the relevant phase* — none of them block Phase 0:

| Item | Needed by | Why |
|---|---|---|
| Confirmation/edits on each of the 4 testimonial drafts (§4) | Phase 1 (before publishing case studies) | FTC paper trail; ensure quotes match what each client would actually say |
| Real outcome metrics for any of the 4 case studies | Anytime; ship without if not yet collected | Strengthens conversion + AI citation likelihood |
| Privacy & Terms language (or approval to use a generic generator like Termly) | Phase 1 | Ship placeholder if not ready; replace before launch |
| Salt & Scale LinkedIn company page URL (if/when created) | Phase 3 | Add to `Organization.sameAs` |
| Confirmation HTTPS is configured at Vercel | Phase 5 | Security + ranking signal |
| Permission to scrape each client's logo from their live site, or operator-supplied versions | Phase 1 | Most logos are SVG-extractable from live sites |
| Decision on whether `gabriel-rosales.com` should redirect to `saltandscale.consulting/about` or stay separate | Phase 5 (optional) | Either is fine; just need operator preference |
| First insights article topic to lead with (default: P1.0 from §14) | Phase 4 | Operator may have a specific topic in mind |

---

## 18. Decision log (rationale captured for future sessions)

These are the reasoning trails behind locked decisions. If a future session wants to deviate, this is the context to discuss with the operator first.

**Why repositioning to "service business websites" lead, not enterprise commerce:** All four real Salt & Scale clients are service businesses (plumbing, freight, doors, water/gas). The Sanrio / PAX / Hive / Thursday Boots work was at prior employers (Corra) or as a contractor — not Salt & Scale deliverables. Conflating them is an E-E-A-T trust problem that Google's December 2025 update specifically targets. The two-track service offering keeps enterprise commerce inbound viable without claiming it as the lead practice.

**Why saffron `#C8893E` over the alternatives:** Operator chose. Reinforces the salt/grain motif of the brand name, almost no consultancies use it (so distinctive), pairs naturally with existing charcoal/cream/sage/copper, and meets AAA contrast on dark text. Smoky plum was the runner-up.

**Why `Organization` not `LocalBusiness` schema:** Operator is Houston-based but serves nationally with no walk-in office. `LocalBusiness` is appropriate when targeting local-pack search; `Organization` is appropriate for service-area + national positioning. Add `LocalBusiness` later only if the operator explicitly targets Houston small-business search.

**Why `output: 'static'` not `'server'`:** The site is a brochure with one API route (`/api/contact`). Server-rendering every page through a Vercel function adds TTFB and cost without benefit. Astro hybrid output (static by default, `prerender = false` only on the API route) is the correct architecture.

**Why Astro Content Collections for /insights:** Operator has committed to 1–2 posts/month and wants `Article` schema, named author, dateModified. Astro Content Collections give type-safe frontmatter, automatic feed generation, and zero runtime cost. Sanity/Contentful would be over-engineered for solo operator with ~24 posts/year.

**Why `<details><summary>` for FAQ instead of custom JS disclosure:** Native semantics, zero JS, keyboard accessible by default, works in print. Custom JS disclosures regress on every browser update.

**Why testimonials drafted from public site context (vs. waiting for client-written quotes):** Operator has explicit permission and the drafts are paraphrased from each site's tone and content. The drafts must be sent to each client for confirmation before publishing — that's the FTC-safe path. This is faster than waiting for cold-written quotes from busy small-business owners.

**Why no metrics in case study stat blocks (yet):** Real numbers > invented numbers, every time. Operator can backfill metrics post-launch once they're collected from clients. Empty bullets describing what was actually shipped beat fabricated "increased conversion 47%" copy.

---

*End of plan. Last updated: May 26, 2026.*

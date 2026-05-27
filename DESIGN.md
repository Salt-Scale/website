# Design System: Salt & Scale

**Stitch Project:** Salt & Scale Website Redesign

---

## 1. Visual Theme & Atmosphere

Editorial and grounded. The palette draws from earth, grain, and ink — warm paper backgrounds, deep forest greens, burnished copper, and a saffron accent that fires like a lantern in a dark room. The aesthetic is not tech-startup slick; it is deliberate craft. Think printed letterpress on cream stock, not a SaaS dashboard. Dense enough to project expertise, airy enough to let copy breathe.

Motion is minimal and purposeful — 150ms color transitions, 300ms layout, no hover-scale. The visual weight system communicates hierarchy through color temperature and type size, not shadows or gradients. Surfaces are flat to near-flat; depth is created by tonal contrast and whitespace, not elevation.

---

## 2. Color Palette & Roles

| Name | Hex | Role |
|------|-----|------|
| **Inkwell** | `#2A2F35` | Deepest body text, fine-print labels |
| **Charcoal** | `#373E45` | Logo, dark surface backgrounds, nav, primary text on paper |
| **Parchment (Paper)** | `#F7F1E1` | Default page background — warm off-white with a linen feel |
| **Cream** | `#F4E3C3` | Callout surfaces, highlight cards, eyebrow tag backgrounds |
| **Forest Sage** | `#4B6241` | Primary brand green — CTAs on dark, section anchors, inline emphasis |
| **Sage Mist** | `#7A9080` | Tints, dividers, decorative lines, muted icon fills |
| **Weathered Copper** | `#8A5C37` | Secondary brand accent — pull-quote bars, link underlines on dark surfaces |
| **Fieldstone** | `#9A938A` | Muted body text, captions, metadata, timestamps |
| **Saffron (Splash)** | `#C8893E` | **THE primary CTA.** Used sparingly — submit buttons, eyebrow tags, stat emphasis, link underlines on `/insights`. Never background for white text. |
| **Saffron Text** | `#8E5F22` | Saffron-as-text on parchment backgrounds (5.1:1 AA). Inline links on light surfaces. |

**Contrast anchors:**
- `#2A2F35` on `#C8893E` = 7.4:1 (AAA) — saffron CTA button text
- `#C8893E` on `#373E45` = 5.6:1 (AA) — saffron accent on dark hero
- `#8E5F22` on `#F7F1E1` = 5.1:1 (AA) — copper-saffron links on parchment

**Usage rule:** Saffron should feel like a *splash*, not a coat. One saffron element per viewport is the maximum; two is the edge case.

---

## 3. Typography Rules

**Display / Headings:** Playfair Display Variable — weights 500–600 only. Never 800 or heavier; the editorial tone collapses into loud at that weight. Ideal for H1–H3. Letter-spacing: default (never track tighter; never use `tracking-widest` on serif).

**Body / UI:** Inter Variable — 17px base (`1.0625rem`), line-height 1.65, max-width 65–72ch per line. Weight 400 for body, 600 for labels and UI. Never use Inter for decorative display purposes.

**Code / Data (insights only):** JetBrains Mono Variable — loaded only on `/insights/*` and `/work/*`. Weight 400, 500. Use for inline code snippets and terminal-style data blocks.

**Scale:**

| Role | Size / Leading | Font | Weight |
|------|---------------|------|--------|
| `display-1` — Homepage H1 | `clamp(2.5rem, 6vw, 4.5rem)` / 1.05 | Playfair | 600 |
| `display-2` — Section H2 | `clamp(2rem, 4.5vw, 3rem)` / 1.15 | Playfair | 600 |
| `display-3` — Sub-H2 / card title | `clamp(1.5rem, 3vw, 2rem)` / 1.2 | Playfair | 500 |
| `h4` — Card / disclosure heading | `1.25rem` / 1.3 | Inter | 600 |
| `eyebrow` — Tag above heading | `0.75rem` / 1, uppercase, `tracking-wide` | Inter | 600 |
| `body` — Default prose | `1.0625rem (17px)` / 1.65 | Inter | 400 |
| `body-lg` — Lead paragraph | `1.25rem` / 1.55 | Inter | 400 |
| `caption` — Footnotes, metadata | `0.875rem` / 1.5 | Inter | 400 |

---

## 4. Component Stylings

**Buttons:**
- **Primary (saffron on light):** Saffron background (`#C8893E`), Inkwell text (`#2A2F35`). Gently rounded corners (`border-radius: 0.5rem`). No white text ever on saffron. Padding `0.625rem 1.5rem`.
- **Primary (dark surface):** Charcoal background (`#373E45`), white text. Same radius.
- **Secondary:** Transparent fill, Charcoal border (1px, 12% opacity), Charcoal text. Becomes sage-green border on hover.
- **Ghost:** No border, no fill, Forest Sage text, underline on hover.
- All buttons: `transition: color 150ms, background 150ms, box-shadow 150ms`. No scale transforms on hover.

**Cards / Containers:**
- Standard card: White background, generously rounded corners (`border-radius: 1rem`), whisper-soft shadow (`box-shadow: 0 4px 24px rgba(55,62,69,0.08)`), hairline border (`1px solid rgba(55,62,69,0.08)`).
- Callout / highlight card: Cream background (`#F4E3C3`), same radius, no shadow (elevation via color contrast alone).
- Testimonial card: White, `border-radius: 1rem`, stronger shadow (`0 8px 32px rgba(55,62,69,0.12)`), left border accent in Forest Sage or Saffron.

**Inputs / Forms:**
- Background: White. Border: `1px solid rgba(55,62,69,0.20)`. Rounded corners (`border-radius: 0.5rem`). Padding `0.75rem 1rem`.
- Focus ring: `box-shadow: 0 0 0 3px rgba(75,98,65,0.25)` (Forest Sage ring, no outline).
- Error state: Copper-red border + per-field `aria-describedby` error text. No color-only signal.
- Select: Custom chevron SVG in Charcoal; switches to Forest Sage on focus.

**Eyebrow Tags:**
- Pill-shaped (`border-radius: 9999px`). Cream background or Forest Sage at 10% opacity. Forest Sage text or Saffron text variant. `font-size: 0.75rem`, uppercase, `letter-spacing: 0.075em`, Inter 600.
- Paired with a `1.5×1.5` dot in the same accent color.

**Navigation:**
- Sticky, `height: 64px`, white/80% with `backdrop-filter: blur`. Hairline `border-bottom: 1px solid rgba(55,62,69,0.08)`.
- Active nav link: Forest Sage text + `text-decoration: underline` with left-origin `transform-origin` draw animation (200ms ease-out).
- CTA in nav: Charcoal background pill button.

**Disclosure / FAQ (`<details><summary>`):**
- Summary: Inter 600 `1.0625rem`, Charcoal. Chevron rotates 90° on open (CSS transition).
- Body: `1rem` Inter 400, Fieldstone color, `padding-top: 0.75rem`.

**Testimonial / Quote:**
- `<figure>` + `<blockquote>` + `<figcaption>` semantics.
- Quote mark: Large decorative `"` in Forest Sage at 20% opacity, `font-size: 4rem`, Playfair.
- Attribution: Fieldstone meta text, `<cite>` in Charcoal 600.

---

## 5. Layout Principles

**Grid:** Max-width `1120px` centered, `padding: 0 1.5rem` on mobile scaling to `0 2rem` on tablet, `0 1rem` at max-width. 12-column grid internally; most sections use 1 or 2 columns only — never more than 3 on desktop.

**Section padding:** `padding-block: 5rem` on desktop, `3.5rem` on mobile. Sections breathe; never stack-pack content.

**Whitespace philosophy:** Content-first density. Every major section has one primary visual "weight" — either a large heading, a stat number, a quote, or an image. Supporting elements step back. Never two things competing for dominance in the same vertical band.

**Responsive breakpoints:** Mobile-first. `sm: 640px` (two-column possibility), `md: 768px` (navigation switches), `lg: 1024px` (full desktop layout), `xl: 1280px` (used sparingly, capped at `max-w-[1120px]`).

**Alignment:** Left-aligned body copy always. Centered only for pull quotes, hero taglines, and the footer copyright strip. Never center-aligned UI forms or navigation.

**Image treatment:** Content images use Astro `<Image>` for AVIF/WebP. No stock-photo people. Headshot is founder-only (`src/assets/headshot-source.jpeg`). Client logos: greyscale on trust strips, full color on case study pages.

**Zero-JS default:** Pages ship no JavaScript unless interaction demands it. Scroll-triggered animations via `IntersectionObserver` only. No JavaScript frameworks in page output except Astro React islands on form-heavy pages.

---

*End of DESIGN.md. Sourced from `docs/REDESIGN_PLAN.md` §2.3, §2.4, §6.1–6.4 + `src/styles/global.css` tokens.*

# Editorial Design Patterns — Salt & Scale

> Reference for redesigning inner pages to match the editorial homepage aesthetic. See `src/pages/index.astro` for the canonical implementation.

## Core principles

1. **Rhythm, not repetition.** Mix backgrounds across sections: `bg-paper` → `bg-cream` → `bg-charcoal` → `bg-paper`. Never two adjacent sections with the same bg.
2. **One visual weight per section.** Either a big heading, a big quote, a big stat, or a big number — never two competing.
3. **Asymmetric grids.** Use `grid-cols-[1.4fr_1fr]` or `grid-cols-[0.85fr_1.15fr]` rather than `grid-cols-2`.
4. **No card grids of identical white boxes.** If you need multiple items, use a numbered editorial list (see homepage Selected work) or a bordered list with `divide-y`.
5. **Decorative typography over decorative chrome.** Use big Playfair numerals (`numeral` class), italic accent words in saffron, hanging quote marks. Avoid border-radius `rounded-2xl` everywhere — use `rounded-sm` or no radius for editorial feel.
6. **Saffron is THE accent.** Use saffron sparingly but boldly: rules above eyebrows, italic accent in headlines, CTAs, link underlines. Sage and copper are quieter supporting colors.

## Section header pattern (ALWAYS use this)

```html
<div class="flex items-center gap-4 mb-14 md:mb-20">
  <span class="block h-px w-12 bg-saffron" aria-hidden="true"></span>
  <p class="text-eyebrow text-saffron-deep">{eyebrow}</p>
</div>

<h2 class="text-display-1 text-charcoal max-w-[14ch] mb-16 md:mb-24">
  Two-line headline with <span class="italic font-normal text-saffron-deep">italic accent</span>.
</h2>
```

On dark sections use `text-saffron` (not `text-saffron-deep`) for the eyebrow color, and `text-paper` for the headline.

## Container widths

- Hero / charcoal sections: `max-w-[1280px] px-6 md:px-10`
- Standard sections: `max-w-[1280px] px-6 md:px-10`
- Long-form prose / quotes: `max-w-[900px]` or `max-w-[1100px]` centered
- Content text: cap at `max-w-[58ch]` or `max-w-[52ch]` for line length

## Section padding

- Standard: `py-24 md:py-32`
- Hero: `pt-20 pb-24 md:pt-28 md:pb-32`
- CTA-band finale: `py-28 md:py-40`
- Trust-strip / hairline: `py-8 md:py-10`

## Typography

- **Hero H1:** `text-display-xl` (clamp 3rem → 6.5rem)
- **Section H2:** `text-display-1` (clamp 2.5rem → 5rem) — set `max-w-[14ch]` or `[18ch]` to force wrap
- **Article/card H3:** `font-serif font-semibold text-[clamp(1.875rem,3.5vw,2.75rem)] leading-[1.1] tracking-[-0.018em]`
- **Smaller H3:** `font-serif font-medium text-[1.625rem] leading-[1.2] tracking-[-0.012em]`
- **Eyebrow:** `text-eyebrow` (always pair with the saffron rule above)
- **Lede/intro paragraph:** `text-body-lg text-charcoal/75 max-w-[58ch]`
- **Body:** `text-[1.0625rem] leading-[1.65] text-charcoal/70`
- **Italic accent in headlines:** `<span class="italic font-normal text-saffron-deep">{word}</span>` — Playfair italic at lower weight reads as a typographic emphasis, NOT a different font.

## Numbered editorial lists (preferred over card grids)

```html
<ul class="divide-y divide-charcoal/15 border-t border-charcoal/15">
  {items.map((item) => (
    <li>
      <a href={item.href} class="grid md:grid-cols-[64px_180px_1fr_auto] gap-x-6 md:gap-x-10 gap-y-3 items-baseline py-8 md:py-10 group hover:text-saffron-deep transition-colors duration-150">
        <span class="numeral text-saffron-deep text-[1.875rem] leading-none">{item.n}</span>
        <span class="text-eyebrow text-charcoal/45">{item.sector}</span>
        <div>
          <h3 class="font-serif font-medium text-[clamp(1.5rem,2.5vw,2rem)] leading-[1.15] tracking-[-0.012em] text-charcoal group-hover:text-saffron-deep transition-colors mb-2">{item.title}</h3>
          <p class="text-[0.9375rem] leading-[1.6] text-charcoal/65 max-w-[55ch]">{item.description}</p>
        </div>
        <span class="hidden md:inline-block text-[0.9375rem] text-charcoal/50 group-hover:text-saffron-deep group-hover:translate-x-1 transition-all duration-150 whitespace-nowrap" aria-hidden="true">→</span>
      </a>
    </li>
  ))}
</ul>
```

## CTA buttons (inline, no Button component for visual control)

Primary on light:
```html
<a href="..." class="group inline-flex items-center gap-3 bg-charcoal text-paper px-7 py-4 text-[0.95rem] font-medium tracking-wide hover:bg-saffron hover:text-ink transition-colors duration-150">
  Label
  <span aria-hidden="true" class="inline-block transition-transform duration-150 group-hover:translate-x-1">→</span>
</a>
```

Primary on dark (charcoal section):
```html
<a href="..." class="group inline-flex items-center gap-3 bg-saffron text-ink px-7 py-4 text-[0.95rem] font-medium tracking-wide hover:bg-cream transition-colors duration-150">
  Label
  <span aria-hidden="true" class="inline-block transition-transform duration-150 group-hover:translate-x-1">→</span>
</a>
```

Secondary (link with saffron underline):
```html
<a href="..." class="group inline-flex items-baseline gap-2 text-charcoal hover:text-saffron-deep transition-colors duration-150 border-b border-saffron pb-1 text-[0.95rem] font-medium tracking-wide">
  Label
  <span aria-hidden="true" class="inline-block transition-transform duration-150 group-hover:translate-x-1">→</span>
</a>
```

## Quote / pull-quote pattern

Centered, big, with hanging saffron quote mark:

```html
<section class="bg-cream">
  <div class="mx-auto max-w-[1100px] px-6 md:px-10 py-24 md:py-32">
    <figure class="text-center">
      <span class="block font-serif text-saffron text-[5rem] md:text-[7rem] leading-none mb-6 italic" aria-hidden="true">"</span>
      <blockquote class="font-serif font-medium text-[clamp(1.5rem,3.2vw,2.5rem)] leading-[1.35] text-charcoal max-w-[32ch] mx-auto -mt-4">
        {quote with <span class="text-saffron-deep italic">a key phrase</span> highlighted}
      </blockquote>
      <figcaption class="mt-10 md:mt-12 flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 text-[0.875rem]">
        <span class="text-eyebrow text-charcoal/60">{name}</span>
        <span aria-hidden="true" class="h-px w-8 bg-charcoal/25 hidden sm:block"></span>
        <span class="text-charcoal/65">{role}, {company} · {location}</span>
      </figcaption>
    </figure>
  </div>
</section>
```

## Hero pattern (page-specific, not just homepage)

For inner pages, scale down the homepage hero — eyebrow + saffron rule + display-1 headline with italic accent + lede + 2 CTAs:

```html
<section class="bg-charcoal text-paper relative overflow-hidden grain grain-dark">
  <div class="relative mx-auto max-w-[1280px] px-6 md:px-10 pt-20 pb-20 md:pt-28 md:pb-28">
    <div class="flex items-center gap-4 mb-10">
      <span class="block h-px w-12 bg-saffron" aria-hidden="true"></span>
      <p class="text-eyebrow text-saffron">{Section context}</p>
    </div>
    <h1 class="text-display-1 max-w-[18ch] mb-10">
      Headline <span class="italic font-normal text-saffron">accent</span>.
    </h1>
    <p class="text-body-lg text-paper/75 max-w-[55ch] mb-10">{Lede}</p>
    {ctas}
  </div>
</section>
```

## Background rhythm for a typical inner page

```
1. Hero — bg-charcoal
2. Intro / content section — bg-paper
3. Detail / list section — bg-paper (with border-top divider OR bg-cream)
4. Testimonial / pull-quote — bg-cream
5. Detail / FAQ — bg-paper
6. Pre-footer CTA — bg-charcoal
```

## FAQ / disclosure pattern

```html
<ul class="border-t border-charcoal/15">
  {questions.map((q) => (
    <li class="border-b border-charcoal/15">
      <details class="group">
        <summary class="flex items-baseline justify-between gap-6 py-6 cursor-pointer list-none">
          <span class="font-serif text-[1.25rem] md:text-[1.375rem] leading-[1.3] text-charcoal pr-4 max-w-[60ch]">{q.question}</span>
          <span class="text-saffron-deep numeral text-2xl shrink-0 transition-transform duration-200 group-open:rotate-45" aria-hidden="true">+</span>
        </summary>
        <div class="pb-6 -mt-2 text-[1.0625rem] leading-[1.65] text-charcoal/70 max-w-[65ch]">
          {q.answer}
        </div>
      </details>
    </li>
  ))}
</ul>
```

## Breadcrumb pattern

```html
<nav aria-label="Breadcrumb" class="bg-paper border-b border-charcoal/8">
  <div class="mx-auto max-w-[1280px] px-6 md:px-10 py-4">
    <ol class="flex items-center gap-2 text-[0.8125rem] tracking-wide">
      <li><a href="/" class="text-charcoal/50 hover:text-saffron-deep transition-colors">Home</a></li>
      <li aria-hidden="true" class="text-charcoal/30">/</li>
      <li><a href="..." class="text-charcoal/50 hover:text-saffron-deep transition-colors">Work</a></li>
      <li aria-hidden="true" class="text-charcoal/30">/</li>
      <li aria-current="page" class="text-charcoal/80">Current page</li>
    </ol>
  </div>
</nav>
```

## Forbidden / avoid

- ❌ `rounded-2xl` on cards (use `rounded-sm` or no radius)
- ❌ `shadow-[0_4px_24px_...]` everywhere (use border or no shadow)
- ❌ Equal `grid-cols-2` or `grid-cols-3` for content cards (use asymmetric or numbered list)
- ❌ Generic emoji icons (use `→` arrows, saffron rules, numerals)
- ❌ `hover:scale-105` anywhere
- ❌ Center-aligned body copy (only quotes, hero ornaments, footer)
- ❌ `bg-white` page sections (use `bg-paper` or `bg-cream`)
- ❌ Sentence-case eyebrows (always uppercase + tracked)
- ❌ "Learn more" links — use "Explore the practice", "See selected work", etc.
- ❌ Multiple H1s, skipped heading levels

## When in doubt

Read `src/pages/index.astro`. The homepage is the canonical pattern reference. If a section feels boxy, replace it with an editorial list. If a card looks generic, give it a saffron top-rule and a numeral. If a heading feels flat, add an italic saffron accent word.

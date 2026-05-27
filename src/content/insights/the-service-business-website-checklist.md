---
title: "The service-business website checklist"
description: "Every page, every form, every signal. What a working service-business site actually needs in 2026, and what to leave out."
datePublished: 2026-04-29
author: "Gabriel Rosales"
tags:
  - "Service Businesses"
takeaways:
  - "The five conversion essentials: visible phone number in the hero, one CTA per page, five-field form max, trust signals next to the CTA, and a clear 'what happens after I submit' message."
  - "Local SEO is mostly Tier 1 fundamentals: verified Google Business Profile, LocalBusiness schema, consistent NAP across the web, real service pages and service-area pages, breadcrumb and FAQ schema. Skip the combo-page sprawl until the fundamentals are nailed."
  - "Core Web Vitals thresholds at the 75th percentile of real-user data: LCP ≤ 2.5s, INP ≤ 200ms, CLS ≤ 0.1. Lighthouse lab scores are debugging tools; field data is what Google ranks on."
  - "Trust signals specific to service buyers: license number, real photos of your work, real reviews with first names, explicit service area, insurance and bonding, years in business, stated response time."
  - "WCAG 2.2 AA is non-optional: keyboard nav, visible focus, 4.5:1 contrast on body text, alt text on content images, 24×24px tap targets, page works at 200% zoom, prefers-reduced-motion honored."
  - "Things that don't help and often hurt: homepage carousels, live chat for most service businesses, stock photos of generic technicians, vanity award badges, blogs you'll never update, calendar embeds you don't use."
draft: false
---

Most service-business websites are missing four or five specific things that genuinely move the needle on lead generation. They usually have eight or nine things that don't.

This is the checklist. Built from auditing real plumbing, HVAC, electrical, and trades sites. Organized by what actually books work versus what just looks busy.

## Conversion essentials

These are the things that turn a visitor into a phone call or a form submission.

- **Phone number visible at the top of every page.** Not in a tiny corner. Not hidden behind a menu. Click-to-call enabled on mobile (`tel:` link). For emergency-service businesses, the phone goes in the hero, not just the header.
- **One primary call-to-action per page.** A homepage with "Call Now," "Get a Quote," "Schedule Online," and "Chat with Us" four different ways pulls in four different directions. Pick one path and reinforce it.
- **Form with five fields or fewer.** Studies on [form length and conversion](https://www.hubspot.com/marketing-statistics) consistently show the same pattern: every additional required field reduces submissions. Name, email, phone, service needed, brief description. Stop.
- **Trust signals next to the CTA.** License number. "Family-owned since [year]." "Insured and bonded." "Same-day service." Whatever's true. The signal goes next to the button, not on a separate "About" page.
- **What happens after I submit?** A clear next-step message. "We'll call you back within 2 hours during business hours, or first thing tomorrow morning." Sets expectations and reduces double-submissions.

## Local SEO essentials

The technical foundation that lets Google rank you for searches in your area.

- **Verified Google Business Profile.** This single thing does more for local map-pack rankings than anything on your website. Claim it, fill out every field, post photos monthly, respond to every review.
- **`LocalBusiness` schema** with consistent name, address, and phone number. ([What schema is and why it matters for local search](https://schema.org/LocalBusiness).)
- **Consistent NAP across the web.** Name, Address, Phone. Same exact format on your site, Google Business Profile, Yelp, Facebook, BBB, and every directory you're listed on. "Suite 200" and "Ste. 200" count as different addresses to Google.
- **One page per service.** Real pages with at least 300 to 500 words of useful content. Not a single services page with five paragraphs.
- **One page per city or service area.** Real content specific to that area. ([Why hub-and-spoke beats combo pages for most local businesses](/insights/hub-and-spoke-seo-local-service-businesses/).)
- **Breadcrumb schema** on every page deeper than the homepage.
- **FAQ schema** on service pages. Google often pulls these into rich results for service-related searches.
- **A sitemap submitted to Google Search Console.** Once. After that, it auto-updates.
- **HTTPS enforced.** No "http://" version, no mixed-content warnings.

## Performance essentials

The 2026 Core Web Vitals thresholds at the 75th percentile, measured on real-user data.

- **LCP (Largest Contentful Paint) ≤ 2.5 seconds.** The biggest single element in the viewport should render within 2.5 seconds. Usually means a text headline or a properly-optimized image, not a hero video.
- **INP (Interaction to Next Paint) ≤ 200 milliseconds.** When someone taps a button, the next paint happens within 200 ms. [Why INP matters more than most owners realize](/insights/why-your-sites-inp-score-is-a-leading-indicator-of-conversion/).
- **CLS (Cumulative Layout Shift) ≤ 0.1.** Content doesn't shift around while the page loads. The classic example: an ad or image that loads late and pushes everything down. Reserve space ahead of time.
- **Images in AVIF or WebP** with proper `srcset` and `sizes` attributes for responsive delivery. JPEG is acceptable as a fallback. PNG only for logos and graphics with transparency.
- **Fonts loaded with `font-display: swap`** and preloaded if they're above the fold. Variable font files instead of multiple weight files where supported.
- **No render-blocking third-party scripts in `<head>`.** Move Google Analytics, chat widgets, and marketing tags to deferred loading or Partytown.

## Trust signals

Specific to service-business buyers. These reduce the "is this real?" hesitation.

- **License number displayed.** RMP for plumbing in Texas, ECRA/ESA for electrical in Ontario, contractor license number in California. Visible on the homepage, in the footer, and on the contact page.
- **Real photos of your actual work.** Not stock photos of generic technicians. Phone-camera photos of your last five jobs are more persuasive than $500 of stock imagery.
- **Real reviews with first names and last initial.** "Alexis A.," "Daniel R.," "James T." If the review is from a Google Business Profile, link to the profile so people can verify. Pulled-quote testimonials with full names look fake even when they aren't.
- **Service area named explicitly.** "Serving Houston, Katy, Pearland, Sugar Land, and 6 surrounding cities" beats "Serving the greater Houston area." Specificity reads as honest.
- **Insurance and bonding info.** "Fully insured and bonded" if true. The actual policy numbers if you want to over-deliver on trust.
- **Years in business or "founded in [year]."** "Since 2014" is a real signal.
- **Response time stated.** "We answer the phone 24/7" or "Most calls returned within 30 minutes during business hours."

## Accessibility (WCAG 2.2 AA)

Required reading: [WCAG 2.2 itself](https://www.w3.org/TR/WCAG22/). The list below is what actually matters for a typical service-business site.

- **All interactive elements work with keyboard navigation.** Tab through your homepage. Can you reach the phone number, the menu, the form, and the CTA? Can you submit the form without using a mouse?
- **Visible focus state on every interactive element.** The browser default outline is fine if you haven't removed it. If you've styled it away, restore a visible alternative.
- **Color contrast ≥ 4.5:1 for body text, ≥ 3:1 for large text.** Test it with [WebAIM Contrast Checker](https://webaim.org/resources/contrastchecker/). Most "subtle gray text on light background" designs fail this.
- **Alt text on every content image.** Not on decorative images. Use `alt=""` for decorative.
- **Form labels properly associated with their inputs.** `<label for="email">` and `<input id="email">`, or wrapped labels. Not placeholder-only forms.
- **Interactive targets ≥ 24×24 CSS pixels** (WCAG 2.2 §2.5.8). Bigger is better on mobile. The tiny "X" close buttons on most chat widgets fail this.
- **Page works at 200% browser zoom** without horizontal scroll. Test it.
- **`prefers-reduced-motion` honored** for any animations. People with vestibular disorders need this. Easy CSS fix.

## Technical fundamentals

The things that exist on every working website but are missing on many bad ones.

- **HTTPS with auto-renewing certificate.** Vercel, Cloudflare Pages, and most modern hosts handle this for free. If you're paying $99/year for SSL, you're being overcharged.
- **A working 404 page** that has navigation back to the rest of the site. Not a server-default error message.
- **`robots.txt`** that allows search engines to crawl your public pages and blocks the `/admin/` or `/api/` paths if you have them.
- **A sitemap.xml** auto-generated from your pages.
- **Canonical URLs on every page.** Prevents duplicate-content penalties from URL parameters or trailing-slash inconsistencies.
- **`<title>` and `<meta name="description">` on every page.** Title under 60 characters, description under 155.
- **Open Graph and Twitter Card metadata.** For when your site gets shared on LinkedIn, Facebook, or in iMessage. A site shared without OG tags looks broken.

## What's not on the checklist

Things that get sold as essential but almost never move the needle for service businesses.

- **A homepage carousel/slider.** Carousels are mostly ignored. The auto-rotating ones actively hurt conversion. Use a single static hero with one message and one CTA.
- **A live chat widget.** For most service businesses, a chat widget gets fewer leads than a click-to-call link. It also tanks your INP score. The exception is high-volume operations with dedicated chat staff.
- **Stock photos of professional-looking people in scrubs/uniforms.** Buyers can spot stock photos in 0.3 seconds. They reduce trust, not build it. Real photos of your real crew, even imperfect, beat polished stock every time.
- **Award badges from organizations no one's heard of.** "Top 10 Plumbers in Houston 2023" from a directory that lists every plumber means nothing. BBB accreditation is a partial exception. Real award badges from credible sources are fine.
- **A blog that you'll never update.** A stale blog with five posts from 2022 makes the site look abandoned. If you'll commit to writing, write. If not, leave it off.
- **A booking calendar embed** unless your business actually books that way. Most service businesses dispatch by phone. A calendar embed adds JavaScript weight and rarely gets used.
- **An "Our Process" page with five identical-looking sections.** Either fold the process into your homepage, or skip it.

## The bottom line

A working service-business website nails fifteen of the items on this checklist. A great one nails almost all of them. A site that nails fewer than ten is leaving leads on the table, and probably losing them to a competitor whose site is half as pretty but twice as functional.

Go through your current site honestly. Score it. Fix the gaps in priority order: conversion essentials first, then local SEO, then performance and accessibility.

If you're trying to figure out whether a custom build is the right call vs. a website builder, see [How to choose a website builder for a service business in 2026](/insights/how-to-choose-a-website-builder-for-a-service-business-in-2026/). If you've already decided custom is the right path and want to know how a project actually goes, see [the walkthrough for solo-shop owners](/insights/how-a-project-actually-goes-with-a-solo-engineer/).

---

Want a written audit of where your site sits against this checklist? [Get in touch.](/contact/?service=audits-strategy) We deliver fixed-scope audits with a prioritized written report inside of a week.

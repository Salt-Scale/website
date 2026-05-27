---
title: "How to choose a website builder for a service business in 2026"
description: "Squarespace vs. WordPress vs. custom vs. 'AI-built.' An honest 3-year cost and tradeoff breakdown for service-business owners."
datePublished: 2026-05-13
author: "Gabriel Rosales"
tags:
  - "Service Businesses"
draft: false
---

If you run a plumbing, HVAC, electrical, roofing, or landscaping operation, you've probably been pitched five different "website solutions" in the last year. They all sound similar. Most of them aren't.

This is the honest breakdown of the four real options, what each one actually costs over three years, and how to decide which one fits your business without getting sold.

## The four real options

Strip away the marketing and almost every offer falls into one of these buckets.

**1. Website builders.** Squarespace, Wix, GoDaddy. You sign up, pick a template, drop in your logo and copy, point a domain at it. The platform hosts, updates, and patches the site for you.

**2. WordPress with a template and a freelancer.** A template costs $50 to $100. A WordPress developer installs it, configures plugins, and writes a small amount of custom CSS. You pay them again every time something breaks or needs updating.

**3. Custom development.** A senior engineer writes the site from scratch on a modern stack (Astro, Next.js, or similar) hosted on a CDN like Vercel, Cloudflare Pages, or Netlify. You own the code, the repo, and the deployment.

**4. "AI-built" sites.** A newer category. You describe what you want, an AI tool generates a site, the tool hosts it and bills you monthly. Quality varies wildly. Lock-in is usually significant.

Each of these has a defensible use case. None is universally right.

## What each one costs over three years

Real numbers, mid-2026, for a typical 8-to-15 page service-business site.

**Website builder (Squarespace Business plan + Google Workspace + domain):**

- Year 1: $360 platform + $120 domain renewal + $144 email = $624
- Years 2 and 3: same. Total over 3 years: ~$1,870.
- Add a designer if you don't want to DIY: another $800 to $2,500 one-time.

**WordPress with a freelancer:**

- Setup: $1,500 to $4,000 one-time (template, install, customization, plugins, basic SEO).
- Hosting: $20 to $50 per month ($720 to $1,800 over 3 years).
- Maintenance: $50 to $150 per month if you keep the freelancer on retainer ($1,800 to $5,400 over 3 years).
- Total over 3 years: $4,000 to $11,000, sometimes more if a major plugin breaks or the site gets hacked.

**Custom development (modern stack):**

- Build: $4,000 to $15,000 one-time depending on scope.
- Hosting: $0 to $20 per month on Vercel or Cloudflare Pages free tier (most service-business sites stay free).
- Maintenance: $0 if nothing changes; $100 to $300 per month if you keep the engineer on retainer for small updates and new features.
- Total over 3 years: $4,000 to $15,000 if you don't add anything, $7,600 to $25,800 with a small retainer.

**"AI-built" site (typical pricing in 2026):**

- Monthly subscription: $20 to $200 depending on tier.
- Hosting and domain bundled.
- Total over 3 years: $720 to $7,200 in subscriptions, plus whatever you spent on AI-tool credits during setup.

Cheap is not always cheap. Builder sites with bad SEO and no lead capture cost you more in missed jobs than they save in monthly fees.

## What each one does well

**Website builders.** Fast to launch. Predictable monthly cost. Great if you need a brochure site, a Google Business Profile is doing most of your lead generation, and you don't expect to grow past a single service area. The platform handles SSL, backups, and uptime.

**WordPress.** Massive ecosystem of plugins, themes, and freelancers. If you have a specific feature in mind (a complex booking system, a membership portal, an integration with a legacy tool), there's almost certainly a WordPress plugin that does it. Cheap to start, easy to find help.

**Custom development.** No platform fees, no theme dependency, no plugin lottery. The site is yours. Performance is typically multiple times better than templated alternatives, which matters for both [Core Web Vitals](https://web.dev/articles/vitals) and conversion. You can ship features no off-the-shelf product supports.

**"AI-built" sites.** Cheapest path to "something that looks decent" if you have zero budget and zero technical help. A reasonable choice for a side project or a temporary landing page.

## Where each one fails for service businesses

**Website builders fail when:**

- You need lead-routing logic (different forms going to different inboxes based on service type or service area). Most builders can't do conditional routing.
- You need service-area pages that actually rank locally. Template-driven city pages are usually thin enough that Google [treats them as doorway pages](https://developers.google.com/search/docs/essentials/spam-policies#doorway-pages).
- You want performance scores that hold up at scale. Squarespace and Wix ship significant JavaScript by default. INP scores on mobile are often borderline. ([What INP is and why it matters](/insights/why-your-sites-inp-score-is-a-leading-indicator-of-conversion/).)
- You want to leave the platform. Exporting from Squarespace gives you raw HTML you can't easily reuse. Wix has historically been worse.

**WordPress fails when:**

- The plugin you depend on stops being maintained, breaks on a core update, or gets bought by a company that triples the price.
- You get hacked. WordPress is the most targeted CMS on the internet because of its install base. If you don't keep plugins patched, this becomes a real risk within 12 to 24 months.
- Your freelancer disappears. The site is "yours" but unless you can read PHP and navigate a WordPress admin, you can't actually maintain it alone.
- Performance becomes an issue. WordPress performance is solvable but requires more engineering than most freelancers deliver.

**Custom development fails when:**

- The budget genuinely isn't there. A real custom build starts around $4,000. If your business is smaller than that can support, a website builder is the honest answer.
- You don't have a stable list of services or areas yet. Custom builds work best when the scope is clear. If you're still figuring out what your business does, start with a builder.

**"AI-built" sites fail when:**

- You try to use them for anything beyond a single-page brochure. Most AI tools generate plausible-looking content that doesn't actually fit local SEO patterns.
- You want to leave the platform. Most tools don't export to a portable format.
- You need real engineering for forms, integrations, or anything custom. They're not designed for that.

## The "AI-built" pitch deserves a closer look

Many AI website pitches in 2026 are really *AI-generated drafts hosted on a proprietary editor*. The AI is the surface; the business model underneath is a recurring subscription with content lock-in and limited export.

A useful question to ask any "AI website" vendor:

- Can I export the entire site as static HTML, CSS, and image assets and host it elsewhere?
- Who owns the content the AI generated for me?
- If I cancel, does my site come down within 30 days, or do I get a grace period to migrate?

If the answers are "no," "we do," and "down immediately," that's a hosting subscription with an AI wrapper. Price it accordingly.

Salt & Scale uses AI throughout the build process. That's different from selling you an "AI website." We deliver a static site in a repo you own. You can host it anywhere static files are served, with or without us.

## A decision framework

Three questions. Answer them honestly.

**1. What's your budget for the next three years total?**

- Under $2,500: website builder, plus a Saturday writing copy.
- $2,500 to $5,000: WordPress with a careful freelancer, or a stripped-down custom build.
- $5,000 to $15,000: custom development is in range and usually the best value.
- $15,000+: custom development with ongoing engineering support.

**2. How fast is your business growing?**

- Stable, same services in same areas: a builder is fine.
- Growing into new services or new cities: custom development scales with you. Builders and templates fight you.
- Expanding into commercial work or franchising: you need custom development.

**3. How comfortable are you reading and editing things yourself?**

- "I won't touch the site after launch": custom development with someone on retainer. Or a builder if budget is tight.
- "I'll edit copy and swap photos myself": any of the four, depending on budget.
- "I can install a plugin and update content": WordPress is in play if the budget can't support custom.

## How to evaluate any vendor

Regardless of which path you choose, the same questions filter out bad fits.

- **Show me three sites you've shipped in the last year.** Not portfolios with cherry-picked work. Real, recent client sites with URLs.
- **What's the total three-year cost, in writing?** Get every fee in writing. Setup, hosting, maintenance, upgrades, change-orders. If they can't give you a number, they're not ready to work with you.
- **Who owns the code, the domain, and the hosting account?** If any of those answers isn't "you," walk away.
- **What happens when something breaks at 9 PM on a Saturday?** Get the actual response process in writing. Phone? Email? 24-hour turnaround? No turnaround?
- **What does my site score on PageSpeed Insights today vs. yours?** Real test. Their portfolio site should score 90+ on mobile. If it doesn't, they don't actually care about performance.

## The bottom line

For most owner-operated service businesses with 5 to 25 services and 5 to 20 service areas, custom development at the $5,000 to $12,000 range delivers the best long-term value. You spend more upfront, you save on monthly fees, and you get a site that ranks and converts well enough to pay for itself within the first year.

For a smaller operation, a website builder honestly handles the basics. Don't overspend on a custom build for a business that doesn't yet need one.

For everyone else: WordPress is fine if you have a freelancer you trust who will actually be reachable in two years. "AI-built" subscriptions are the riskiest of the four, and the easiest to get locked into.

Decide based on your budget, your growth plans, and your honest comfort level. Then evaluate vendors with the same questions regardless of approach.

---

Trying to figure out which path is right for your business? [Get in touch.](/contact/) We'll walk through your specific situation and tell you honestly whether a custom build is the right call, or whether a builder will serve you just as well.

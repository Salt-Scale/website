---
title: "The two Shopifys: Liquid + webhooks vs Hydrogen + Functions in 2026"
description: "Shopify isn't one platform anymore. It's two stacks, and most teams pick wrong. A developer's map of when Liquid still wins, when headless pays off, and the middle ground most brands actually want."
datePublished: 2026-05-19
author: "Gabriel Rosales"
tags:
  - "Shopify"
  - "Ecommerce"
takeaways:
  - "Shopify is two distinct development stacks now. The old stack (Liquid + Online Store 2.0 + Theme App Extensions + webhooks) and the new stack (Hydrogen + Storefront API + Functions + Checkout UI Extensions) solve different problems and have different economics."
  - "Most brands don't need to choose. A Liquid theme on Online Store 2.0 + Shopify Functions for backend logic + Checkout UI Extensions for checkout is the realistic middle path and the right call for the majority of mid-market stores."
  - "Hydrogen v2 on Oxygen is the right call when you need a custom data layer (heavy metaobject usage, integrations Shopify themes can't surface), market-by-market storefronts, or hard performance targets that templated Liquid themes can't hit."
  - "Migrating off Liquid is not a one-weekend project. SEO continuity, Customer Account API, checkout customization, and theme app dependencies all need a real plan. Budget 2–6 months for a real headless migration, not weeks."
  - "Shopify Scripts and checkout.liquid are gone or going. If you're still leaning on them, the migration to Functions and Checkout UI Extensions is the work, not a maybe."
draft: false
---

If you haven't built on Shopify in two years, you're going to open the dev docs and find a platform that doesn't quite match the one you remember. The Liquid + theme + webhooks stack that ran the platform for a decade still exists, but a parallel stack has grown up around it: Hydrogen, Oxygen, Functions, Checkout UI Extensions, Customer Account API, metaobjects.

These aren't two ways of doing the same thing. They're two stacks that solve different problems. Most teams I talk to either don't know the new one exists, or they overcorrect and rebuild everything in Hydrogen when they didn't need to.

This is the developer-facing map: what's in each stack, when each one wins, and what the realistic middle path looks like for most brands.

## What's in the old stack

The "old Shopify" is still the default for the vast majority of stores. It's also still being actively developed, which surprises people. Online Store 2.0 was a real upgrade, not a maintenance release.

**The shape:**

- **Liquid** as the templating language. Server-rendered by Shopify's edge.
- **Online Store 2.0 themes** (Dawn is the reference theme). JSON templates, sections everywhere, app blocks, theme settings exposed to merchants.
- **Theme App Extensions.** App-installed blocks and sections that drop into any OS 2.0 theme without touching theme code. The replacement for ScriptTag injection.
- **Admin GraphQL API** for app integrations. (The REST Admin API still works, but new apps should target GraphQL; some surfaces are GraphQL-only now.)
- **Webhooks** for event-driven integrations. Orders, fulfillments, inventory, customers. The HTTP-level integration layer.
- **Shopify Flow** for no-code automation between Shopify events and apps/external services.
- **Shopify CLI v3** for theme and app development locally.

This stack covers brochure stores, mid-market DTC, B2B, and a meaningful chunk of Plus. It runs on Shopify's edge with no infrastructure for you to manage, scales without intervention, and the merchant can edit copy and layout in the theme editor without filing a developer ticket.

## What's in the new stack

The "new Shopify" is the headless and customization stack. Not all of it is for headless stores, which is the part most people miss.

**Headless storefront:**

- **Hydrogen v2.** Shopify's React framework, built on Remix. Server-side rendering, route-based data loading, optimistic UI for cart, baked-in Shopify-specific helpers.
- **Oxygen.** Shopify's hosting for Hydrogen, edge-deployed globally, zero-config Hydrogen integration. (Hydrogen can also deploy to any Node-compatible host.)
- **Storefront API.** The GraphQL surface for customer-facing data: products, collections, cart, checkout URL, customer account, content.

**Checkout and post-purchase customization:**

- **Checkout UI Extensions.** React components that render at defined extension points inside the Shopify-hosted checkout, the order status page, and Shop Pay. This is the replacement for `checkout.liquid` on Plus.
- **Customer Account UI Extensions.** Same idea, mounted at extension points in the new customer account experience.

**Backend logic at checkout and cart:**

- **Shopify Functions.** WebAssembly-compiled (Rust or JavaScript) functions that run server-side, attached to specific Shopify decisions. The Function APIs are:
  - **Discount.** Programmatic discounts ("buy X get Y," tiered, BOGO, automatic, code-based).
  - **Cart and Checkout Validation.** Block or warn on cart configurations.
  - **Cart Transform.** Bundle expansion, virtual line items, dynamic line-item modifications.
  - **Delivery Customization.** Reorder, rename, or hide delivery options.
  - **Payment Customization.** Reorder, rename, or hide payment methods.
  - **Fulfillment Constraints.** Govern which inventory locations can fulfill which lines.
  - **Pickup Point / Local Pickup Delivery Option Generator.** Generate custom delivery options.
  - **Order Routing Location Rule.** Custom inventory-location selection for orders.

  Functions are how you replace Shopify Scripts, which are being deprecated.

**Customer accounts:**

- **Customer Account API.** OAuth-based, scoped per app, replaces the legacy `/account` flow. Required for new apps targeting customer data; existing stores have a migration window.

**Embedded admin and POS:**

- **Polaris.** Shopify's React component library and design system for embedded admin apps. The admin's own UI uses it.
- **Admin UI Extensions.** Drop custom actions, blocks, and full pages into specific surfaces in the admin (order details, product details, customer details, etc.) without owning the surrounding chrome.
- **POS UI Extensions** for retail point-of-sale apps.

**Data modeling:**

- **Metaobjects + Metafields.** First-class custom data types and custom fields on Shopify resources. Defined with a schema, validated at write time, surfaced through both Admin and Storefront APIs.

## When the old stack still wins

For most stores, the answer is "stay on Liquid." The list of cases where that's true is longer than the headless industry will tell you.

- **Brochure stores and small DTC.** Under 1,000 SKUs, standard category structure, no exotic data requirements. A Dawn-derived theme on OS 2.0 is faster to ship, cheaper to maintain, and easier for the merchant to edit.
- **Theme-shop economics.** A $200 theme + $1,500 of custom Liquid is a different budget than a $30,000 Hydrogen build. If the store's lifetime gross is under $1M/year, the math rarely justifies headless.
- **Merchant edits everything in the theme editor.** Plenty of brands have a marketing team that lives in the theme editor and never wants to file a developer ticket to change a hero image. OS 2.0 sections + theme settings make that work. Hydrogen makes it your problem.
- **No custom checkout requirements beyond what Checkout UI Extensions cover.** You can install Checkout UI Extensions on a Liquid-themed store. You don't need Hydrogen to customize checkout.
- **The merchant doesn't have ongoing engineering capacity.** Hydrogen is an app you have to operate. Updates, deploys, dependency management, observability. If there isn't an engineer or agency on retainer, a Liquid theme is the right answer.

## When the new stack pays off

Headless is the right call when one or more of these is genuinely true.

- **A custom data layer.** Heavy metaobject usage, complex product relationships, content from external CMSes or PIM systems composed into product pages. Liquid can do a lot, but the second you're building a CMS inside metaobjects and rendering it server-side, Hydrogen's data layer is the right tool.
- **Performance ceilings the theme can't hit.** A well-built Hydrogen storefront on Oxygen routinely hits LCP under 1.2s and INP comfortably under 200ms. Liquid themes with heavy app installations frequently don't. ([Why INP matters for conversion.](/insights/why-your-sites-inp-score-is-a-leading-indicator-of-conversion/))
- **Markets at scale.** Hydrogen's Markets support gives you per-market routing, currency, language, and content out of the box. You can do markets in Liquid; you can't do them at the same level of control.
- **Combined listings / advanced product configurators.** Product families, variant compositions, or configurators that go beyond Shopify's stock variant model are easier in Hydrogen than in Liquid.
- **B2B with custom workflows.** Shopify B2B is a real surface, and headless storefronts can compose B2B catalogs, quote-to-cart, customer-specific pricing, and per-buyer net terms more freely than Liquid can.
- **Multi-storefront architecture.** One product catalog, three or four storefronts (retail, B2B, regional). Hydrogen + the Storefront API makes this tractable. Liquid replicates effort across themes.
- **Third-party caching strategy.** Hydrogen recipes like third-party API queries with caching let you compose data from your ERP, OMS, or review platform on the server with explicit cache control. In a Liquid theme, that work tends to land in client-side JavaScript and tank INP.

## The middle path most teams actually want

The honest answer for the majority of mid-market Shopify brands is "neither pure old nor pure new." It's a Liquid theme + a few targeted pieces of the new stack.

This setup looks like:

- **Online Store 2.0 Liquid theme.** Customer-facing pages stay on the merchant-editable theme. Marketing team keeps their workflow.
- **Shopify Functions for any backend customization.** Discount logic, delivery customization, payment method ordering, cart validation. Each Function is an app you build (or install) once and forget.
- **Checkout UI Extensions for anything you'd have done in `checkout.liquid` historically.** Trust signals, upsells, gift-message inputs, custom payment instructions. They install into the standard checkout without owning it.
- **Customer Account UI Extensions for self-service.** Order detail extensions, address management, subscription-management UIs.
- **Theme App Extensions** for storefront-side app blocks (reviews, related products, custom badges).
- **Metaobjects + Metafields** for custom data, surfaced through the Storefront API directly to your Liquid theme.

The work surface here is meaningfully smaller than headless. You're writing focused Functions and UI Extensions, not standing up an entire React framework. The merchant edits the theme. The custom logic lives in apps. Functions run server-side at the right moment.

For 60-to-80% of Shopify Plus brands I see, this is the right architecture. It's also the architecture that doesn't make the front page of dev Twitter.

## Migration gotchas

If you are moving from old to new, a few things to plan for. None of these are blockers; all of them get harder if you ignore them.

**SEO continuity.** A Liquid theme on `yourbrand.com` and a Hydrogen storefront on `yourbrand.com` need to serve the same URL structure unless you also want to manage redirects for every product, collection, and content page. Plan the URL map before you start. Build redirects for the inevitable handful that change.

**Customer Account API migration.** If your store has been around for a while, customers exist in the legacy account system. The new Customer Account API is OAuth-based and the customer needs to re-link. Shopify provides a migration flow; it's still a step the customer has to take. Communicate it. Many brands run both side-by-side during a window.

**`checkout.liquid` is gone for everyone.** Shopify Plus stores that still have `checkout.liquid` customizations are working through forced migration to Checkout UI Extensions. If you're on Plus and your `checkout.liquid` does anything non-trivial, the migration is the work, not a vague future thing. The good news is Checkout UI Extensions are easier to reason about than `checkout.liquid` ever was.

**Shopify Scripts are deprecated.** If you have Scripts running discount logic or payment customization, those need to move to Functions. The migration is mechanical for the simple cases (a few hours per script) and structural for the complex ones (a few days). Don't get caught at the deprecation deadline.

**Theme app dependencies.** Audit every app installed on the current theme. Some inject script tags through the legacy `ScriptTag` API (which is being deprecated in favor of Web Pixel and theme app extensions). Some have Hydrogen-compatible SDKs; some don't. The app inventory determines a real chunk of the migration scope.

**Observability.** A Liquid theme on Shopify's edge has effectively zero ops surface. A Hydrogen storefront on Oxygen has logs, metrics, deploys, dependency updates, and a runtime to operate. Budget for that, both in tooling and in the engineering hours to actually look at the dashboards.

**Per-market routing and currency.** Shopify Markets in a Liquid theme handles a lot for you. In Hydrogen you wire it up yourself (the Markets recipe gives you the patterns). Doable; not free.

## A decision framework for the developer in the room

When a brand asks "should we go headless?" the questions worth asking before nodding:

1. **What does the merchant actually do in the theme editor today?** If the answer is "everything," staying on Liquid is the high-leverage call.
2. **What's broken about the current setup that headless solves?** If the honest answer is "nothing structural; it's a redesign," you don't need a stack change.
3. **What's the engineering ops capacity post-launch?** If there's no one to run Oxygen deploys and Hydrogen dependency updates, the headless storefront becomes technical debt within twelve months.
4. **What pieces of the new stack would actually pay off?** Often the answer is "two or three Functions and a couple of Checkout UI Extensions." That's the middle path; that doesn't require a full Hydrogen migration.
5. **What's the realistic budget and timeline?** A real Hydrogen migration for a non-trivial catalog is 2–6 months and well into six figures. If those numbers don't match the conversation, the answer is the middle path or a phased approach.

## The bottom line

Shopify in 2026 is two stacks. The old one (Liquid, OS 2.0, Theme App Extensions, webhooks) is still actively developed and still the right call for most stores. The new one (Hydrogen, Oxygen, Functions, Checkout UI Extensions, Customer Account API) is genuinely better for headless, complex data, and aggressive performance targets.

The mistake most teams make is treating them as a binary. The realistic architecture for mid-market brands is a Liquid theme with Shopify Functions for backend customization and Checkout UI Extensions for checkout. That gets you the merchant-editable storefront, the modern custom logic, and the modern checkout without the operational cost of a full headless build.

If you're moving fully to Hydrogen, do it because you have a custom data layer, market-level requirements, or performance targets that demand it. Don't do it because it's on the conference circuit.

---

Stuck between the old and the new stack on a Shopify project? [Get in touch.](/contact/?service=shopify-development) We do scoped audits with a prioritized written report inside of a week, including a stack recommendation that matches the actual business, not the conference talk.

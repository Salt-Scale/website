---
title: "Why your site's INP score is a leading indicator of conversion"
description: "INP replaced FID as a Core Web Vital in March 2024. Slow interactions cost you leads. Here's the measurement, the math, and the fixes."
datePublished: 2026-04-15
author: "Gabriel Rosales"
tags:
  - "Performance"
draft: false
---

In March 2024, Google replaced First Input Delay (FID) with [Interaction to Next Paint (INP)](https://web.dev/articles/inp) as a Core Web Vital. Two years later, most service-business sites still don't measure it. Most of the ones that do are failing.

This matters because INP correlates directly with bounce rate. When someone taps a button and your site takes 600 milliseconds to respond, they don't sit there waiting. They tap again, or they leave. Either outcome is bad.

This post explains what INP measures, why it predicts conversion, what typically breaks it on service-business sites, and how to fix it.

## What INP actually measures

FID measured the delay between a user's first interaction and the browser's first response. It only measured the start of the first interaction. It missed everything that happened after.

INP measures the full latency of every interaction across the session, from tap to next paint, and reports the worst performer at the 75th percentile. If a single interaction on your page takes 800 ms while everything else takes 100 ms, INP reports the 800 ms.

The thresholds:

- **Good:** ≤ 200 ms at the 75th percentile.
- **Needs improvement:** 200 to 500 ms.
- **Poor:** > 500 ms.

The 75th percentile means three out of every four users see at least this latency. That's a meaningful share of your traffic, and it includes most mobile users on older phones or slower networks.

## Why INP correlates with conversion

Two reasons.

**First, INP measures perceived responsiveness.** When a user taps a button to schedule service and your site freezes for half a second, they perceive your business as slow. Slow site, slow business. The mental model is unconscious but consistent.

**Second, INP measures real interactions.** Unlike LCP (which measures the initial paint) or CLS (which measures layout stability), INP is a signal about the moments when users are actually engaging with your site. Submitting a form. Tapping a phone number. Opening a service menu. These are the conversion moments. If they're slow, you lose leads.

Public data from the [HTTP Archive Web Almanac](https://almanac.httparchive.org/en/2024/performance) shows that as of late 2024, about 64% of mobile origins pass INP at the 75th percentile. Said differently: roughly one in three mobile sites on the public web fail this threshold. Service-business sites built on heavy WordPress themes or with chat-widget overload fail more often than the average.

## What kills INP on most service-business sites

Most of the damage comes from four sources. None of them are subtle once you know what to look for.

### 1. Heavy JavaScript frameworks for simple content

A service-business homepage is mostly text, images, a phone number, and a form. The actual interactive surface is small.

When that page is built on React, Vue, or another client-side framework, the browser downloads the framework, parses it, hydrates it, and binds event listeners before the page becomes interactive. On a mid-range Android phone, this can add 1 to 3 seconds of work. Every tap during that window suffers.

The fix is structural: ship zero JavaScript by default for content that doesn't need it. Astro, Eleventy, and Next.js with the App Router (when used correctly) all support this. WordPress with a JS-heavy theme rarely does.

### 2. Third-party scripts that run on the main thread

Google Analytics. Facebook Pixel. Hotjar. Chat widgets. Marketing automation tags. Each one is "just a small script." Combined, they often add 200 to 500 ms of main-thread work on every interaction.

Service businesses don't usually need most of these. The ones they do need (analytics, sometimes a chat widget) can be moved off the main thread using [Partytown](https://partytown.qwik.dev/) or deferred until after the page is interactive.

A rule of thumb that works for most service-business sites: if a third-party script isn't measurably helping you book jobs, remove it. Most aren't.

### 3. Long tasks during interaction

A "long task" in browser performance terms is any single piece of work that holds the main thread for more than 50 ms. Tapping a button that triggers a long task means the next paint can't happen until the task finishes.

Common culprits:

- A custom JavaScript form validator that runs on every keystroke instead of on blur or submit.
- An "interactive" carousel that recalculates layout on resize.
- Inline analytics events that serialize a large payload on click.
- React components that re-render the entire subtree when a small piece of state changes.

The fix is profiling: use [the Chrome DevTools Performance panel](https://developer.chrome.com/docs/devtools/performance/) to record an interaction, find the long task, and either break it up, defer it, or remove it.

### 4. Layout thrashing on late-loading content

When images, ads, or embedded widgets load after the page initially renders, they often push existing content down. This is the classic CLS problem.

CLS and INP are related: if a user is about to tap a button and the page shifts, either they miss the tap (bad UX) or they hit the wrong thing (worse UX). In both cases, the next interaction takes longer to land cleanly.

The fix is to reserve space for every element that loads late. `<img>` tags need explicit `width` and `height`. Ad slots need fixed dimensions. Embedded video iframes need an aspect-ratio wrapper.

## How to measure INP

Three paths, in order of usefulness.

**1. Real-user monitoring with the `web-vitals` library.** Install [the web-vitals npm package](https://github.com/GoogleChrome/web-vitals), report INP and the other Core Web Vitals to your analytics provider, and watch your real users' p75 over time. This is the metric Google actually uses for ranking.

**2. The Chrome User Experience Report (CrUX) dashboard.** Free, public, no instrumentation required. Pulls real-user data from Chrome telemetry. Available through [PageSpeed Insights](https://pagespeed.web.dev/) and the CrUX Big Query export. Useful for benchmarking against competitors.

**3. Chrome DevTools Performance panel.** Record an interaction, find the long tasks, see what's blocking the main thread. Best for diagnosis, not for tracking over time.

The first two are field measurements (real users). The third is a lab measurement (your machine, your network). Field always wins for ranking and conversion. Lab is for debugging.

## The fixes that move the needle

Listed in order of typical impact for service-business sites.

**1. Ship less JavaScript.** Static HTML pages are the fastest possible thing the web can do. A site built on Astro, Eleventy, or another static-first framework will pass INP at the 75th percentile without effort, because there's almost nothing to slow it down.

**2. Defer non-critical third-party scripts.** Move analytics, chat, and marketing tags to load after the page is interactive. Use `async` or `defer` attributes. Consider Partytown for genuinely heavy scripts.

**3. Use native UI where you can.** A native `<select>` element is faster than a custom-built dropdown. A native `<details>` and `<summary>` is faster than a JavaScript accordion. Forms with built-in browser validation are faster than custom validators. The native versions are also more accessible by default.

**4. Lazy-load below-the-fold content.** Images, iframes, and embedded videos that appear after the initial viewport should use `loading="lazy"`. This reduces initial load and frees the main thread.

**5. Reserve space for late-loading elements.** Every image has explicit width and height. Every iframe has an aspect-ratio container. Every dynamically inserted block has a placeholder of the right size.

**6. Replace heavy form validation libraries with native and minimal custom code.** A 5-field service-business form does not need a 50 kB validation library. `<input type="email" required>` plus a few lines of JavaScript for the submit handler is enough.

## A reality check

Most templated WordPress sites cannot pass INP at the 75th percentile without significant engineering work. The combination of jQuery, page builders, plugin overhead, and theme JavaScript reliably pushes INP into the 300 to 600 ms range on mobile.

This is fixable. It requires either replacing the theme, removing plugins, or moving the site to a static-first framework. The work is usually 20 to 60 hours of engineering depending on scope.

For Squarespace and Wix sites, INP is largely outside your control. The platform ships the JavaScript bundle, and you can't remove it. If your INP is poor on these platforms, the realistic options are: accept the limitation, or migrate to a different stack.

For custom-built sites on modern static-first frameworks, INP usually passes by default. If it doesn't, the diagnosis is straightforward: something specific is wrong, and one of the fixes above will likely solve it.

## The bottom line

INP is the closest thing the web has to a direct measurement of perceived responsiveness. It correlates with conversion because it measures the moments when conversion is happening: taps, clicks, form submissions.

Service-business sites that nail INP feel snappy and book more work. Service-business sites that fail INP feel sluggish, and the lost conversions are invisible because the user just leaves.

Measure it on real users. Fix the four common culprits in order. Don't optimize for Lighthouse scores at the expense of the field data, because Google ranks on the field data.

---

Wondering where your site's INP actually sits, and what's worth fixing first? [Get in touch.](/contact/) A fixed-scope performance audit with a prioritized written report runs about a week start to finish.

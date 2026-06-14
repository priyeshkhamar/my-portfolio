# Priyesh Khamar — Portfolio

A premium, dark-mode-first portfolio for a full-stack software developer who owns
product delivery end-to-end. Inspired by Linear, Vercel, Stripe and Raycast.

## Stack

- **Next.js 15** (App Router) + **React 19**
- **TypeScript** (strict)
- **Tailwind CSS v4** (CSS-first `@theme` config)
- **Motion** (Framer Motion) for animation
- **Lenis** for inertia smooth scrolling
- **Geist** Sans + Mono typography
- **Lucide** icons

## Design system

- Background `#0A0A0A` · Surface `#111111` · single accent **electric blue `#4F8CFF`**
- Motion easing `cubic-bezier(0.16, 1, 0.3, 1)`, all animation respects
  `prefers-reduced-motion`
- Custom React-Bits-style primitives in `components/ui/`:
  `Magnetic`, `SpotlightCard`, `AnimatedGrid`, `TextReveal`, `ScrollReveal`,
  `ScrollProgress`

## Features

- ⌘K / Ctrl+K command menu (navigate, copy email, links)
- Scroll progress indicator + animated experience timeline rail
- SOAR platform case study, spotlight cards, magnetic CTAs
- SEO: metadata, OpenGraph, JSON-LD Person schema, sitemap, robots
- Accessible: skip link, focus-visible rings, semantic landmarks

## Develop

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build
npm start        # serve production build
```

## Content

All copy lives in [`lib/data.ts`](lib/data.ts) — edit there to update the site.

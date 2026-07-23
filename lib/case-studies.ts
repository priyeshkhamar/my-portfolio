/**
 * Case-study content — the deep-dive pages behind each project card.
 *
 * Kept deliberately lean: five tight sections, one paragraph each. Grounded in
 * the same facts as lib/data.ts. Where a concrete artifact can't be shown
 * publicly (CIO 360 is a closed-source commercial product), the code sample is
 * a representative example of the real contract, and is labeled as such.
 */

export type CaseSection = {
  id: string;
  title: string;
  body: string[];
  bullets?: { title: string; body: string }[];
  code?: {
    title: string;
    lang: string;
    snippet: string;
    caption?: string;
  };
};

export type CaseStudy = {
  slug: string;
  name: string;
  status: string;
  tagline: string;
  summary: string;
  meta: { label: string; value: string }[];
  stack: string[];
  links?: { label: string; href: string }[];
  sections: CaseSection[];
  takeaways: string[];
};

export const caseStudies: CaseStudy[] = [
  {
    slug: "cio-360",
    name: "CIO 360",
    status: "Production · Attra Technologies",
    tagline:
      "A monitoring, automation & SOAR platform — one operational view across an organization's security stack.",
    summary:
      "CIO 360 pulls a dozen disconnected security tools into one dashboard and orchestrates responses on top. I built the entire web application as its sole developer, and I own the REST API contracts the Laravel backend and native iOS app both build against.",
    meta: [
      { label: "Role", value: "Sole web developer · API contract owner" },
      { label: "Timeline", value: "Jan 2024 — Present" },
      { label: "Team", value: "Me + external backend & iOS team (3)" },
      { label: "Users", value: "CIOs, CISOs and MSPs" },
    ],
    stack: [
      "React.js",
      "Redux",
      "REST API contracts",
      "Laravel (integration)",
      "iOS (integration)",
      "MongoDB",
      "MySQL",
    ],
    sections: [
      {
        id: "problem",
        title: "The problem",
        body: [
          "Mid-size orgs run security across a dozen disconnected tools — Entra ID for identity, DefensX for browsers, Dropsuite for backup — each with its own dashboard and alert format. No one, least of all the CIO who answers for all of it, had a single operational view. CIO 360 gives CIOs and MSPs one place to monitor the whole stack and trigger automated responses from it.",
        ],
      },
      {
        id: "build",
        title: "What I built",
        body: [
          "I joined as the only web developer — no frontend codebase, no component library, no API docs, and a backend being built in parallel by an external team. So the job was three things at once: build the entire React web app from an empty repo, design and document the REST API contracts both clients consume, and act as the technical interface between product and the external engineers.",
        ],
      },
      {
        id: "architecture",
        title: "How it works",
        body: [
          "A React SPA and a native iOS app both talk to a Laravel REST API that aggregates the vendor integrations — relational data in MySQL, high-volume vendor payloads in MongoDB. Because two clients with different teams consume the same API, I treated the contract as a designed artifact: written and agreed before either side wrote code.",
        ],
        bullets: [
          {
            title: "Contract-first, not code-first",
            body: "Every endpoint was specified — shape, errors, pagination — before implementation. When clients disagree about a field, the document decides, not whoever shipped first.",
          },
          {
            title: "Normalize at the contract",
            body: "A dozen vendor feeds arrive in a dozen shapes. The contract defines one canonical shape per domain, so web and iOS render identical data with zero vendor-specific logic.",
          },
          {
            title: "One response envelope",
            body: "Every endpoint returns the same envelope with machine-readable error codes, so both clients share one error-handling path instead of special-casing endpoints.",
          },
        ],
        code: {
          title: "Representative contract excerpt — normalized alerts feed",
          lang: "http",
          snippet: `GET /api/v1/alerts?source=entra&severity=high

200 OK
{
  "status": "ok",
  "data": {
    "items": [{
      "id": "alrt_8f3a...",
      "source": "entra_id",     // canonical key, not vendor-raw
      "severity": "high",        // normalized scale across vendors
      "occurred_at": "2025-11-04T09:21:00Z",
      "actions": ["disable_user", "require_mfa"]  // SOAR hooks
    }],
    "page": { "current": 1, "per_page": 25, "total": 214 }
  },
  "error": null
}

502  { "status": "error", "data": null,
       "error": { "code": "SOURCE_UNAVAILABLE",
                  "source": "entra_id", "retryable": true } }`,
          caption:
            "One envelope, canonical field names across every vendor, and error codes clients branch on. \"actions\" is what wires detection to SOAR response.",
        },
      },
      {
        id: "decision",
        title: "The hardest call",
        body: [
          "The sharpest trade-off was normalization. Vendor APIs disagree about everything — severity scales, timestamps, what even counts as an alert. Flattening them into one canonical shape means some vendor-specific richness is lost, but the payoff is clients that never contain vendor logic and one shared UI for every source. I kept raw payloads retrievable for the cases that genuinely need them. Building the UI against the agreed contract with local fixtures also meant integration became verification, not discovery — when reality diverged from the document, the divergence was visible and arguable.",
        ],
      },
    ],
    takeaways: [
      "Sole developer of a production React platform — empty repo to live users.",
      "Contract-first API design consumed identically by two client platforms.",
      "Normalized a dozen vendor feeds into one canonical schema with explicit errors.",
      "On multi-client systems, the interface is the product — precision there pays daily.",
    ],
  },
  {
    slug: "portfolio",
    name: "This portfolio",
    status: "Open source · You're looking at it",
    tagline:
      "A production-grade Next.js site — every effect hand-rolled, every page statically generated.",
    summary:
      "This site is its own case study: a fully static Next.js 15 app with a custom cursor engine, a procedural three.js hero and a ⌘K palette — built to prove visual ambition and engineering discipline aren't in tension.",
    meta: [
      { label: "Role", value: "Design + engineering, solo" },
      { label: "Type", value: "Open source" },
      { label: "Stack", value: "Next.js 15 · React 19 · Tailwind 4" },
      { label: "Hosting", value: "Vercel · fully static" },
    ],
    stack: [
      "Next.js 15",
      "React 19",
      "TypeScript",
      "Tailwind CSS 4",
      "Motion",
      "Three.js / R3F",
    ],
    links: [
      { label: "GitHub", href: "https://github.com/priyeshkhamar/my-portfolio" },
      { label: "Live", href: "https://priyeshkhamar.vercel.app" },
    ],
    sections: [
      {
        id: "goal",
        title: "The goal",
        body: [
          "A portfolio has one job — get a recruiter to \"I want to talk to this person\" in under a minute — and one trap: demoing animation libraries instead of engineering judgment. My constraint was that every effect had to be written from scratch, and none of it could cost the first paint anything.",
        ],
      },
      {
        id: "build",
        title: "How it's built",
        body: [
          "A Next.js 15 App Router app that renders to fully static output. All copy lives in one typed content layer, so every section, this case study, the resume and the metadata generate from a single source of truth. Interactive surfaces are client components at the leaves; everything else is a server component.",
        ],
        bullets: [
          {
            title: "One typed content layer",
            body: "Copy, projects and case studies are TypeScript modules — the compiler catches a missing field before a recruiter sees a broken card.",
          },
          {
            title: "Server by default",
            body: "Only the pieces that need the DOM — cursor, palette, 3D, reveals — opt into the client. Every route pre-renders at build time.",
          },
          {
            title: "Motion is a garnish",
            body: "Every reveal honors prefers-reduced-motion and collapses to instant. Keyboard-navigable, focus-styled, skip-link'd throughout.",
          },
        ],
      },
      {
        id: "performance",
        title: "The performance budget",
        body: [
          "The three.js particle sphere is the most expensive thing here, so it's treated like a liability: dynamically imported with SSR off, downloaded only after hydration, mounted only on desktop. First paint is pure HTML and CSS. Fonts load with swap so text renders immediately; animations run on transforms and opacity only; the aurora, grain and marquees are pure CSS at zero JavaScript cost. A portfolio that claims to care about performance while scoring poorly is self-refuting — keeping it static and lazy was the whole point.",
        ],
      },
    ],
    takeaways: [
      "Fully static Next.js 15 output — no runtime dependencies, instant first paint.",
      "three.js hero lazy-loaded post-hydration, desktop-only.",
      "Reduced-motion aware, keyboard navigable, SEO-complete.",
      "One typed content layer drives every page, including this one.",
    ],
  },
  {
    slug: "erp-modules",
    name: "ERP Modules — Asset & Recruitment",
    status: "Internship · Virtual Coders",
    tagline:
      "Two full ERP modules shipped to internal users during my internship — my first production software.",
    summary:
      "During my internship I built the Asset Management and Recruitment modules of an internal ERP in Angular and .NET — full CRUD workflows with role-based flows, integrated into existing systems and tested end-to-end before release.",
    meta: [
      { label: "Role", value: "Developer intern" },
      { label: "Timeline", value: "Jan 2023 — Jul 2023" },
      { label: "Team", value: "Me + senior developers reviewing" },
      { label: "Users", value: "Internal operations & HR teams" },
    ],
    stack: ["Angular", ".NET", "REST", "SQL"],
    sections: [
      {
        id: "problem",
        title: "The problem",
        body: [
          "The company tracked assets and recruitment in spreadsheets — no audit trail, no ownership history, no single view of where a laptop or a candidate actually was. Both processes needed proper modules inside the existing ERP.",
        ],
      },
      {
        id: "build",
        title: "What I built & learned",
        body: [
          "Two full vertical slices — Angular frontends, .NET REST endpoints, SQL schemas. Asset Management covered the lifecycle from registration through assignment, transfer and retirement; Recruitment covered the pipeline from opening a role to closing it. Both had role-based flows and integrated with the ERP's existing auth and employee records rather than inventing parallel ones. It's where software became real for me: I learned that integrating with what exists is most of the job, that schema decisions outlive the code that made them, and to take review feedback as a gift.",
        ],
      },
    ],
    takeaways: [
      "Full-stack vertical slices: Angular UI, .NET APIs, SQL schemas.",
      "Role-based flows integrated with existing ERP auth and records.",
      "Shipped to real internal users with end-to-end testing.",
    ],
  },
];

export function getCaseStudy(slug: string): CaseStudy | undefined {
  return caseStudies.find((c) => c.slug === slug);
}

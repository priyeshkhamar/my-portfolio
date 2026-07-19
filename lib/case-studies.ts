/**
 * Case-study content — the deep-dive pages behind each project card.
 *
 * Grounded in the same facts as lib/data.ts. Where a concrete artifact can't
 * be shown publicly (CIO 360 is a closed-source commercial product), code
 * samples are representative examples of the real contracts, and are labeled
 * as such on the page.
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
      "CIO 360 consolidates a fragmented stack of security, identity, backup and compliance tools — Microsoft Entra ID, DefensX, Dropsuite, Secure Connect and more — into a single dashboard, then orchestrates security responses on top. I built the entire web application as its sole developer, and I own the REST API contracts that the Laravel backend and native iOS app both build against.",
    meta: [
      { label: "Role", value: "Sole web developer · API contract owner" },
      { label: "Timeline", value: "Jan 2024 — Present" },
      { label: "Team", value: "Me + external backend & iOS team (3 engineers)" },
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
          "Mid-size organizations run their security operations across a dozen disconnected vendor tools: identity in Microsoft Entra ID, browser security in DefensX, backup in Dropsuite, network access in Secure Connect, and more. Each tool has its own dashboard, its own alert format and its own login. Nobody — least of all the CIO who answers for all of it — has one place to see the state of the whole stack, and responding to an incident means hopping between consoles.",
          "The business goal for CIO 360 was direct: give CIOs, CISOs and MSPs a single operational view across all of those tools, and let them trigger automated responses (the SOAR part — Security Orchestration, Automation and Response) from the same place they detect problems.",
        ],
      },
      {
        id: "role",
        title: "My role",
        body: [
          "I joined as the platform's only web developer. There was no existing frontend codebase, no component library and no API documentation — the backend was being built in parallel by an external three-person team, alongside a native iOS app.",
          "That shaped the job into three overlapping responsibilities: build the entire React web application from an empty repository; design and document the REST API contracts both clients would consume; and act as the primary technical interface between our product side and the external engineering team — writing scope documents, running daily progress meetings and unblocking integration issues.",
        ],
      },
      {
        id: "architecture",
        title: "System architecture",
        body: [
          "The platform is a classic multi-client architecture: a React single-page application and a native iOS app, both talking to a Laravel REST API that aggregates data from the vendor integrations. Relational platform data lives in MySQL; high-volume, loosely-structured vendor feed payloads land in MongoDB before being normalized.",
          "Because two clients with different teams and release cadences consume the same API, the contract layer is the load-bearing wall of the system. My most consequential architectural decision was to treat the API contract as a designed artifact — written, reviewed and agreed before implementation — rather than letting the backend's code define it implicitly.",
        ],
        bullets: [
          {
            title: "Contract-first, not code-first",
            body: "Every endpoint was specified in a shared document — URL, method, request shape, response shape, error semantics — before either side wrote code. When web, iOS and backend disagree about a field, the document decides, not whoever shipped first.",
          },
          {
            title: "One response envelope",
            body: "All endpoints return the same envelope: a status, the data payload, and a structured error object with a machine-readable code. Both clients share one error-handling path instead of special-casing endpoints.",
          },
          {
            title: "Normalize at the contract, not in the client",
            body: "A dozen vendor feeds arrive in a dozen shapes. Rather than each client re-interpreting raw vendor payloads, the contract defines one canonical shape per domain (alerts, identities, backups) and the backend maps vendors into it. Web and iOS render identical data with zero vendor-specific logic.",
          },
        ],
      },
      {
        id: "api-design",
        title: "API contract design",
        body: [
          "The contract documents cover request/response schemas, pagination, filtering, and — the part that pays for itself daily — explicit error semantics. Every failure mode an endpoint can produce is enumerated with a stable code, so clients can distinguish \"vendor integration is down\" from \"your token expired\" from \"this tenant has no data yet\" and show the right UI for each.",
          "The example below is representative of the real contracts (the production API is closed-source): a normalized alert feed endpoint, with the envelope and error semantics both clients rely on.",
        ],
        code: {
          title: "Representative contract excerpt — normalized alerts feed",
          lang: "http",
          snippet: `GET /api/v1/alerts?source=entra&severity=high&page=2

200 OK
{
  "status": "ok",
  "data": {
    "items": [
      {
        "id": "alrt_8f3a...",
        "source": "entra_id",        // canonical source key, not vendor-raw
        "severity": "high",           // normalized: low | medium | high | critical
        "category": "identity",
        "title": "Risky sign-in detected",
        "occurred_at": "2025-11-04T09:21:00Z",
        "entity": { "type": "user", "ref": "usr_29c1..." },
        "actions": ["disable_user", "require_mfa"]   // SOAR actions available
      }
    ],
    "page": { "current": 2, "per_page": 25, "total": 214 }
  },
  "error": null
}

502 Bad Gateway (vendor unreachable)
{
  "status": "error",
  "data": null,
  "error": {
    "code": "SOURCE_UNAVAILABLE",
    "source": "entra_id",
    "retryable": true,
    "message": "Entra ID integration did not respond."
  }
}`,
          caption:
            "One envelope, canonical field names across all vendor sources, and error codes clients can branch on. \"actions\" is what wires detection to SOAR response.",
        },
      },
      {
        id: "frontend",
        title: "Frontend architecture",
        body: [
          "The web app is a React SPA with Redux as the single source of truth for server state. The store is organized by domain (alerts, integrations, tenants, automation) rather than by page, so the same normalized data feeds the overview dashboard, the per-tool drill-downs and the response workflows without duplication.",
          "Every remote read goes through one async lifecycle convention — idle, loading, success, error with the contract's error code attached — which means every screen gets loading states, empty states and per-failure-mode error states from shared components instead of ad-hoc handling.",
        ],
        bullets: [
          {
            title: "Domain-sliced Redux store",
            body: "State is keyed by what the data is, not where it's shown. Dashboard widgets and detail pages select from the same slices, so a status change propagates everywhere at once.",
          },
          {
            title: "One async convention",
            body: "A single request-lifecycle pattern wraps every API call. Adding a new endpoint means writing a thunk and a selector — loading, error and retry UI come free.",
          },
          {
            title: "Error UI driven by error codes",
            body: "Because the contract enumerates failure modes, the UI can be honest: a down integration shows a \"source unavailable\" card with retry, not a generic spinner that never resolves.",
          },
        ],
      },
      {
        id: "challenges",
        title: "Challenges & trade-offs",
        body: [
          "The hardest problems were coordination problems wearing technical clothes. The three that taught me the most:",
        ],
        bullets: [
          {
            title: "A dozen vendors, one schema",
            body: "Vendor APIs disagree about everything — severity scales, timestamp formats, what counts as an \"alert\". Designing the canonical shapes meant deciding, per field, what to preserve, what to coerce and what to drop. Trade-off accepted: some vendor-specific richness is flattened in the normalized feed, in exchange for clients that never contain vendor logic. Raw payloads stay retrievable for the cases that need them.",
          },
          {
            title: "Building against an API that didn't exist yet",
            body: "Backend and frontend were built in parallel. The contract documents made that possible: I built the entire UI against the agreed shapes with local fixtures, and integration became verification rather than discovery. When reality diverged from the document, the divergence was visible and arguable — that alone justified the process.",
          },
          {
            title: "Three workstreams, one release train",
            body: "Web, iOS and backend shipped together. I ran the daily syncs and kept a running integration-status document. The lesson: most \"integration bugs\" are two teams holding different definitions of the same word. Writing definitions down early is cheaper than debugging them later.",
          },
        ],
      },
      {
        id: "security",
        title: "Auth & security considerations",
        body: [
          "A platform whose whole purpose is security operations has no room for a sloppy client. The web app follows token-based authentication against the Laravel API, with the session lifecycle — expiry, refresh, forced logout — handled through the same contract-defined error codes as everything else, so an expired token degrades into a clean re-authentication flow rather than a broken screen.",
          "What a user can see and trigger is role-driven: a CIO's read-heavy overview and an operator's response actions are different capability sets, and the UI derives what it renders from what the API says the account can do — the client never assumes permissions the server hasn't granted. SOAR response actions are the sharpest edge in the product (a button that disables a user is not a button to render casually), so destructive actions are explicit, confirmed and driven by the per-alert action list the API returns.",
        ],
      },
      {
        id: "delivery",
        title: "Delivery & how it shipped",
        body: [
          "The platform is live in production with real organizations monitoring their stacks through it. I shipped the web app from empty repository to launch and continue to own it — features, fixes and the contract documents — while coordinating each release across the backend and iOS workstreams through daily progress meetings.",
          "I also lean on AI-assisted development tooling deliberately: as a sole developer, it compresses the cycle between \"decided\" and \"shipped\" — scaffolding, debugging, reviewing my own code — while the architecture and contract decisions stay mine.",
        ],
      },
      {
        id: "lessons",
        title: "What I'd do differently",
        body: [
          "With another pass, I'd push type safety across the contract boundary — generating TypeScript types from the contract documents so the compiler catches divergence instead of integration testing. I'd also introduce automated contract tests on the backend so the documents are enforced, not just agreed.",
          "The larger lesson stands regardless: on multi-client systems, the interface is the product. Time spent making the contract precise is the highest-leverage engineering time there is.",
        ],
      },
    ],
    takeaways: [
      "Sole developer of a production React platform — empty repo to live users.",
      "Contract-first API design consumed by two client platforms.",
      "Normalized a dozen vendor feeds into canonical schemas with explicit error semantics.",
      "Primary technical interface between product and a 3-person external team.",
    ],
  },
  {
    slug: "portfolio",
    name: "This portfolio",
    status: "Open source · You're looking at it",
    tagline:
      "A production-grade Next.js site — every effect hand-rolled, every page statically generated.",
    summary:
      "This site is its own case study: a Next.js 15 App Router application with a custom cursor engine, a procedural three.js hero, scroll-choreographed reveals and a ⌘K command palette — built to prove that visual ambition and engineering discipline aren't in tension. Everything you're seeing ships as static HTML with the expensive parts lazy-loaded behind first paint.",
    meta: [
      { label: "Role", value: "Design + engineering, solo" },
      { label: "Type", value: "Open source" },
      { label: "Stack", value: "Next.js 15 · React 19 · Tailwind 4" },
      { label: "Hosting", value: "Vercel · fully static output" },
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
          "A portfolio has one job — get a recruiter from landing to \"I want to talk to this person\" in under a minute — and one trap: sites that demo animation libraries instead of engineering judgment. The constraint I set was that every effect had to be written from scratch, and none of it could cost the first paint anything.",
        ],
      },
      {
        id: "architecture",
        title: "Architecture",
        body: [
          "The site is a Next.js 15 App Router application that renders to fully static output. All copy lives in one typed content layer (a single data module), so every section, the resume page, metadata and structured data are generated from the same source of truth — change a job title once and the whole site agrees.",
          "Interactive surfaces are client components at the leaves; everything that can be a server component is one. The case-study pages you're reading are server-rendered from typed content with per-page metadata, static params and generated OpenGraph images.",
        ],
        bullets: [
          {
            title: "One typed content layer",
            body: "Copy, experience, projects and case studies are TypeScript modules. The compiler catches a missing field before a recruiter ever sees a broken card.",
          },
          {
            title: "Server by default, client at the leaves",
            body: "Sections are server components; only the pieces that need the DOM (cursor, palette, 3D, reveals) opt into the client.",
          },
          {
            title: "Static everything",
            body: "Every route pre-renders at build time. There is no runtime data dependency, no cold start, nothing to fail.",
          },
        ],
      },
      {
        id: "performance",
        title: "Performance decisions",
        body: [
          "The three.js particle sphere is the most expensive thing on the site, so it's treated like a liability: dynamically imported with SSR disabled, downloaded only after hydration, and mounted only on desktop viewports. First paint is pure HTML and CSS — the 3D arrives late and silently, or not at all on mobile.",
          "Fonts load through next/font with swap display, so text renders immediately in a fallback and upgrades without layout shift. Animations run on transforms and opacity only — nothing that triggers layout — and the film-grain, aurora and marquee effects are pure CSS, costing zero JavaScript.",
        ],
      },
      {
        id: "accessibility",
        title: "Accessibility & UX care",
        body: [
          "Motion is a garnish, not a dependency: every reveal honors prefers-reduced-motion and collapses to instant, fully-visible content. The custom cursor only activates on fine-pointer devices, keyboard focus is visibly styled throughout, the command palette is fully keyboard-driven, and a skip link jumps past the chrome. Semantics stay honest — real headings, landmarks, and descriptive labels on every icon-only control.",
        ],
      },
      {
        id: "lessons",
        title: "What building it taught me",
        body: [
          "Hand-rolling effects you could import is slower — and worth it exactly once, here, where the site is the demo. The durable lessons were about budgets: deciding what an effect is allowed to cost before writing it, and letting the answer kill features. A portfolio that scores poorly in Lighthouse while claiming to care about performance is self-refuting; keeping this one static and lazy was the point.",
        ],
      },
    ],
    takeaways: [
      "Fully static Next.js 15 output — no runtime dependencies, instant first paint.",
      "Three.js hero lazy-loaded post-hydration, desktop-only.",
      "Reduced-motion aware, keyboard navigable, SEO-complete.",
      "Single typed content layer drives every page, including this one.",
    ],
  },
  {
    slug: "erp-modules",
    name: "ERP Modules — Asset & Recruitment",
    status: "Internship · Virtual Coders",
    tagline:
      "Two full ERP modules shipped to internal users during my internship — my first production software.",
    summary:
      "During my six-month internship I built the Asset Management and Recruitment modules of an internal ERP in Angular and .NET — complete CRUD workflows with role-based flows, integrated into the company's existing systems and tested end-to-end before release.",
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
          "The company tracked assets and recruitment pipelines in spreadsheets — no audit trail, no ownership history, no single view of where a laptop or a candidate actually was. Both processes needed proper modules inside the existing internal ERP.",
        ],
      },
      {
        id: "build",
        title: "What I built",
        body: [
          "Two modules, each a full vertical slice: Angular frontends, .NET REST endpoints, and relational schemas underneath. Asset Management covered the asset lifecycle — registration, assignment to employees, transfers, and retirement — with the state history queryable. Recruitment covered the hiring pipeline from opening a position through candidate stages to closure.",
          "Both had role-based flows (an employee sees their assigned assets; an admin manages the fleet), and both had to integrate cleanly with the ERP's existing authentication and employee records rather than inventing parallel ones.",
        ],
      },
      {
        id: "lessons",
        title: "What it taught me",
        body: [
          "This was where software became real for me: actual users, existing systems to respect, and senior developers reviewing my code. I learned that integrating with what exists is most of the job, that end-to-end testing before release is what lets you sleep, and that schema decisions outlive the code that made them. It's also where I learned to take review feedback as a gift — the habits from those reviews are still in my code today.",
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

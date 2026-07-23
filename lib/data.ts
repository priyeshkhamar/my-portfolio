/**
 * Single source of truth for all portfolio content.
 * Synced with Priyesh_Khamar_Resume.pdf — copy is written for a senior,
 * product-owning engineer: impact over responsibility.
 */

/**
 * Public site URL. Override with NEXT_PUBLIC_SITE_URL if you add a custom
 * domain later; otherwise production resolves to the canonical Vercel domain
 * and local development uses localhost.
 */
const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ??
  (process.env.NODE_ENV === "production"
    ? "https://priyeshkhamar.vercel.app"
    : "http://localhost:3000");

export const site = {
  name: "Priyesh Khamar",
  role: "Full-Stack Software Developer",
  tagline: "Building production software from idea to deployment.",
  location: "Ahmedabad, India",
  email: "dev.priyeshkhamar@gmail.com",
  phone: "+91 95582 77906",
  github: "https://github.com/priyeshkhamar",
  linkedin: "https://linkedin.com/in/priyeshkhamar",
  url: siteUrl,
  description:
    "Full-stack developer with 2+ years shipping production web apps. Sole developer of a live monitoring, automation and SOAR platform in React, owning the REST API contracts its Laravel backend and iOS app build against.",
} as const;

export const hero = {
  kicker: "Full-Stack Software Developer",
  headline: "Building production software from idea to deployment.",
  sub: "Sole developer of a production monitoring & SOAR platform in React — and I own the REST API contracts its Laravel backend and native iOS app build against.",
} as const;

export const about = {
  kicker: "About",
  title: "From understanding the product to building it.",
  paragraphs: [
    "My path into engineering ran through the product side — an ERP internship, then six months coordinating delivery between stakeholders and external engineers. When I moved into development, I built a production React platform from an empty repo and took on the API contracts other teams depend on. Having seen the product side first, I keep the why in view, not just the how.",
  ],
  pillars: [
    {
      title: "Product understanding",
      body: "I scope features from the user's need first, so what ships solves the real problem.",
    },
    {
      title: "Ownership",
      body: "I stay with a feature from first commit to production fixes — no half-way hand-offs.",
    },
    {
      title: "Communication",
      body: "I write the API contract down, so backend and iOS build against one reference.",
    },
    {
      title: "Technical growth",
      body: "I take the unfamiliar problems — schema design, auth, integration — to keep learning.",
    },
  ],
} as const;

export type ExperienceItem = {
  period: string;
  role: string;
  company: string;
  location: string;
  summary: string;
  outcomes: string[];
  stack: string[];
};

export const experience: ExperienceItem[] = [
  {
    period: "Jan 2024 — Present",
    role: "Software Developer",
    company: "Attra Technologies",
    location: "Ahmedabad",
    summary:
      "Sole developer of the platform's web app, and the primary technical interface between product and an external engineering team.",
    outcomes: [
      "Sole developer of a production React.js web app for a monitoring, automation & SOAR platform — empty repo to live users.",
      "Designed and documented the REST API contracts for a Laravel backend, consumed identically across web and iOS clients.",
      "Primary technical interface between product and a 3-person external iOS/backend team — scope docs, daily syncs, on-time releases.",
    ],
    stack: ["React.js", "Redux", "REST contracts", "Laravel (integration)", "iOS (integration)"],
  },
  {
    period: "Jul 2023 — Dec 2023",
    role: "Project Coordinator",
    company: "Attra Technologies",
    location: "Ahmedabad",
    summary:
      "Coordinated between stakeholders and external teams — the role where I learned how delivery actually works.",
    outcomes: [
      "Coordinated between business stakeholders and external dev teams through daily standups — clear requirements, met deadlines.",
      "Ran cross-functional syncs and documented decisions — the delivery discipline that led into an engineering role.",
    ],
    stack: ["Agile / Scrum", "Delivery", "Stakeholders", "Documentation"],
  },
  {
    period: "Jan 2023 — Jul 2023",
    role: "Software Developer Intern",
    company: "Virtual Coders",
    location: "Ahmedabad",
    summary:
      "Shipped real ERP modules — my first taste of production-grade software.",
    outcomes: [
      "Built Asset Management and Recruitment ERP modules in Angular and .NET, improving internal workflow efficiency.",
      "Integrated with existing systems and tested end-to-end alongside senior developers.",
    ],
    stack: ["Angular", ".NET", "REST", "SQL"],
  },
];

export const education = [
  {
    kind: "Education",
    title: "B.Tech, Computer Science & Engineering",
    org: "Indus University",
    location: "Ahmedabad, India",
    period: "Graduated May 2024",
  },
  {
    kind: "Certification",
    title: "MERN Stack Development",
    org: "TOPS Technologies",
    location: "Ahmedabad, India",
    period: "Nov 2023 — Oct 2024",
  },
] as const;

export type Project = {
  featured?: boolean;
  /** Slug of the matching case study at /projects/[slug]. */
  slug: string;
  name: string;
  status: string;
  tagline: string;
  description: string;
  highlights: string[];
  stack: string[];
  links?: { label: string; href: string }[];
};

export const projects: Project[] = [
  {
    featured: true,
    slug: "cio-360",
    name: "CIO 360",
    status: "Production · Attra Technologies",
    tagline:
      "A monitoring, automation & SOAR platform — one operational view across an organization's tech stack, with automated response on top.",
    description:
      "Consolidates a dozen security, identity and backup tools — Entra ID, DefensX, Dropsuite and more — into one dashboard, then orchestrates responses. I built and shipped the entire web app independently.",
    highlights: [
      "Sole React.js developer — empty repo to live users.",
      "Own the REST API contracts a Laravel backend and iOS app both build against.",
      "Normalized a dozen vendor feeds into one canonical schema with explicit error semantics.",
      "Primary technical interface to a 3-person external engineering team.",
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
  },
  {
    slug: "portfolio",
    name: "This portfolio",
    status: "Open source · You're looking at it",
    tagline:
      "The site you're on — designed and built from scratch, every effect hand-rolled.",
    description:
      "A fully static Next.js 15 site: custom cursor engine, procedural three.js hero, scroll-pinned project deck and a ⌘K command palette — with the expensive parts lazy-loaded behind first paint.",
    highlights: [
      "Custom cursor and scroll-pinned card deck, hand-rolled with Motion + DOM.",
      "three.js hero lazy-loaded post-hydration, desktop-only — instant first paint.",
      "Fully static, reduced-motion aware, keyboard navigable, SEO-complete.",
    ],
    stack: ["Next.js 15", "React 19", "TypeScript", "Tailwind CSS 4", "Motion", "Three.js / R3F"],
    links: [
      { label: "GitHub", href: "https://github.com/priyeshkhamar/my-portfolio" },
      { label: "Live", href: "https://priyeshkhamar.vercel.app" },
    ],
  },
  {
    slug: "erp-modules",
    name: "ERP Modules — Asset & Recruitment",
    status: "Internship · Virtual Coders",
    tagline:
      "Asset Management and Recruitment modules for an internal ERP, shipped during my internship.",
    description:
      "Built two full ERP modules in Angular and .NET that improved internal workflow efficiency — integrated with existing systems and tested end-to-end alongside senior developers.",
    highlights: [
      "Full CRUD modules with role-based flows in Angular + .NET.",
      "Integrated with the company's existing ERP systems.",
      "End-to-end testing before release.",
    ],
    stack: ["Angular", ".NET", "REST", "SQL"],
  },
];

export type SkillGroup = {
  title: string;
  caption: string;
  items: string[];
};

export const skillGroups: SkillGroup[] = [
  {
    title: "Frontend",
    caption: "Where product meets the user.",
    items: [
      "React.js",
      "Redux",
      "Component Architecture",
      "REST API Integration",
      "Responsive UI",
      "JavaScript (ES6+)",
      "HTML5",
      "CSS3",
    ],
  },
  {
    title: "Backend",
    caption: "Contracts and services that hold up.",
    items: [
      "Node.js",
      "Express.js",
      "REST API Design",
      "API Contract Documentation",
      "Endpoint schemas & data flows",
    ],
  },
  {
    title: "Databases",
    caption: "The data behind the product.",
    items: ["MongoDB", "MySQL", "SQL"],
  },
  {
    title: "Tools",
    caption: "The daily workbench.",
    items: ["Git & GitHub", "Postman", "npm", "AI-assisted development tools"],
  },
  {
    title: "Engineering Practices",
    caption: "How the work stays trustworthy.",
    items: [
      "Agile / Scrum",
      "API Contract Design",
      "Technical Documentation",
      "Cross-team Coordination",
      "End-to-end ownership",
    ],
  },
];

export const contact = {
  kicker: "Contact",
  title: "Let's talk.",
  body: "I'm looking for roles where I can take features from idea through to production. Email is the best way to reach me.",
} as const;

export type NavLink = { label: string; href: string };
/**
 * Section links use `/#hash` (not `#hash`) so they also work from inner
 * routes like /projects/[slug] and /resume.
 */
export const navLinks: NavLink[] = [
  { label: "Projects", href: "/#projects" },
  { label: "Experience", href: "/#experience" },
  { label: "Skills", href: "/#skills" },
  { label: "About", href: "/#about" },
  { label: "Contact", href: "/#contact" },
];

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
    "Full-Stack Software Developer with 2+ years shipping production web applications — sole developer of a live monitoring, automation and SOAR platform web app in React.js, owning API contracts across a Laravel backend and native iOS app.",
} as const;

export const hero = {
  kicker: "Full-Stack Software Developer",
  headline: "Building production software from idea to deployment.",
  sub: "I work across product and engineering — sole developer of a production React platform, and I define the REST API contracts its Laravel backend and native iOS app build against.",
} as const;

export const about = {
  kicker: "About",
  title: "From understanding the product to building it.",
  paragraphs: [
    "My path into engineering ran through the product side. After an internship shipping ERP modules, I spent six months coordinating delivery between stakeholders and external engineers — where I learned how products actually get scoped, negotiated and shipped.",
    "When I moved into development, I built a production React platform from an empty repo and took on the API contracts other teams rely on. Having seen the product side first, I try to keep the why in view, not just the how.",
  ],
  pillars: [
    {
      title: "Product understanding",
      body: "I try to scope features from the user's need first, so what ships solves the problem it was meant to.",
    },
    {
      title: "Ownership",
      body: "I stay with a feature across its lifecycle — from first commit to fixing issues in production — rather than handing it off partway.",
    },
    {
      title: "Communication",
      body: "I write and document the API contract so the backend and iOS teams have a single reference to build against.",
    },
    {
      title: "Technical growth",
      body: "I take on the less familiar problems — schema design, auth, cross-platform integration — because that's how I keep learning.",
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
      "Sole developer of the platform's web application, and the primary technical interface between product and an external engineering team.",
    outcomes: [
      "Sole developer of a production React.js web application for a monitoring, automation and SOAR platform — built from scratch and independently shipped to live users.",
      "Designed and documented REST API contracts for a Laravel backend — endpoint schemas, request/response structures and data flows consumed across web and iOS clients.",
      "Authored technical scope documents and feature requirements for a 3-person external iOS and backend team, acting as the primary technical interface between product and engineering.",
      "Drove feature delivery across web, iOS and backend workstreams through daily progress meetings — surfacing blockers early and consistently hitting release deadlines.",
      "Applied AI-assisted development tooling to accelerate implementation, tighten debugging cycles and maintain code quality in a lean team setup.",
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
      "Coordinated between business stakeholders and external development teams through daily standups and structured check-ins, keeping requirements clear and deadlines met.",
      "Maintained project trackers, documented key decisions and ran cross-functional syncs.",
      "Built the delivery discipline that led directly into the move to a hands-on engineering role.",
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
      "Integrated modules with existing systems and performed end-to-end testing.",
      "Collaborated with senior developers on code quality.",
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
      "CIO 360 consolidates a fragmented stack of security, identity, backup and compliance tools — Microsoft Entra ID, DefensX, Dropsuite, Secure Connect and more — into one dashboard, then orchestrates security responses so CIOs, CISOs and MSPs can monitor, decide and act from a single place. I built and shipped the entire web application independently.",
    highlights: [
      "Sole React.js developer — from empty repo to live users.",
      "Designed and documented the REST API contracts a Laravel backend and native iOS app both build against.",
      "Normalized a dozen vendor feeds into consistent data shapes with explicit error semantics, consumed identically by web and iOS.",
      "Primary technical interface between product and a 3-person external engineering team.",
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
      "The site you're on — designed and built from scratch as a playground for modern front-end craft.",
    description:
      "A statically generated Next.js site with a custom cursor engine, a procedural 3D hero, a scroll-pinned project deck, scroll-velocity marquees, a ⌘K command palette and scroll-choreographed reveals — every effect written from scratch.",
    highlights: [
      "Custom dot-and-ring cursor and scroll-pinned card deck, hand-rolled with Motion + DOM.",
      "Procedural particle-sphere hero in three.js — lazy-loaded so first paint stays instant.",
      "100% static output, reduced-motion aware, keyboard navigable and SEO-complete.",
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

export const philosophy = {
  kicker: "How I work",
  title: "A few things I try to work by.",
  principles: [
    {
      n: "01",
      title: "Ownership over hand-off",
      body: "I like to take a feature from rough idea through to deployment rather than handing it off partway. Fewer hand-offs usually means fewer things fall through the cracks.",
    },
    {
      n: "02",
      title: "Ship, then improve",
      body: "I try to get something correct into production first and improve it from there, instead of polishing in isolation.",
    },
    {
      n: "03",
      title: "Write the interface down",
      body: "When several teams build against one contract, writing the interface down clearly saves a lot of confusion later.",
    },
    {
      n: "04",
      title: "Agree the definitions early",
      body: "Working across backend and iOS taught me that good integration mostly comes down to clear, agreed definitions. I try to make those explicit early.",
    },
    {
      n: "05",
      title: "Keep the user in view",
      body: "Having worked on the product side, I try to keep the user's actual need in view and to ask early whether a feature solves the right problem.",
    },
  ],
} as const;

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
  { label: "About", href: "/#about" },
  { label: "Experience", href: "/#experience" },
  { label: "Projects", href: "/#projects" },
  { label: "Skills", href: "/#skills" },
  { label: "Philosophy", href: "/#philosophy" },
  { label: "Contact", href: "/#contact" },
];

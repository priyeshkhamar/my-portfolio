/**
 * Single source of truth for all portfolio content.
 * Copy is written for a senior, product-owning engineer — impact over responsibility.
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
  email: "priyeshkhamar76@gmail.com",
  phone: "+91 95582 77906",
  github: "https://github.com/priyeshkhamar",
  linkedin: "https://linkedin.com/in/priyeshkhamar",
  url: siteUrl,
  description:
    "Full-Stack Software Developer focused on shipping production React applications, maintaining API contracts, and coordinating with backend and iOS teams from idea to deployment.",
} as const;

export const hero = {
  kicker: "Full-Stack Software Developer",
  headline: "Building production software from idea to deployment.",
  sub: "I work across product and engineering — sole developer of a production React platform, and I maintain the API contract between its Laravel backend and native iOS app.",
  metrics: [
    { value: "2+", label: "Years shipping production" },
    { value: "Sole", label: "Developer of the platform web app" },
    { value: "3", label: "Workstreams · web · iOS · backend" },
  ],
} as const;

export const about = {
  kicker: "About",
  title: "From understanding the product to building it.",
  paragraphs: [
    "I didn't start in an editor. I started by coordinating delivery between stakeholders and engineers, which is where I learned how products actually get scoped and shipped.",
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
    period: "July 2024 — Present",
    role: "Software Developer",
    company: "Attra Technologies",
    location: "Ahmedabad",
    summary:
      "Sole developer of the platform's web application, and the main technical point of contact between product and an external engineering team.",
    outcomes: [
      "Built CIO 360 — an IT operations, security orchestration & governance platform — as the sole React.js developer, from empty repo to live users.",
      "Designed and documented the REST API contracts a Laravel backend and native iOS app both build against — endpoint schemas, payloads and data flows.",
      "Worked as the main technical point of contact between product and a 3-person external team, helping coordinate delivery across web, iOS and backend.",
    ],
    stack: ["React.js", "Redux", "REST contracts", "Laravel (integration)", "iOS (integration)"],
  },
  {
    period: "July 2024 — Jan 2026",
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
    period: "Jan 2023 — July 2023",
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

export const caseStudy = {
  kicker: "Featured Work",
  name: "CIO 360",
  tagline:
    "An IT operations, security orchestration & governance platform — it unifies visibility across an organization's tech stack, then automates the response.",
  context:
    "Attra Technologies' flagship product. CIO 360 consolidates a fragmented stack of security, identity, backup and compliance tools — Microsoft Entra ID, DefensX, Dropsuite, Secure Connect and more — into one operational view, then goes further: automating workflows and orchestrating security responses so CIOs, CISOs and MSPs can monitor, decide and act from a single place.",
  sections: [
    {
      label: "Challenge",
      title: "A dozen vendor APIs, one coherent pane of glass.",
      body: "CIO 360's promise is a single dashboard — but behind it sit many different vendor feeds (Entra ID, DefensX, Dropsuite, Secure Connect, compliance data), each shaped differently, and a web app, Laravel backend and iOS app that all had to present them as one story.",
    },
    {
      label: "Approach",
      title: "Define the contract before building against it.",
      body: "I documented the API contract up front and kept it as the shared reference — agreeing the data shapes with the backend and iOS teams before building each feature.",
    },
    {
      label: "Architecture",
      title: "A React app that stays organized as it grows.",
      body: "Built from scratch in React with Redux and a clear component structure, so a growing set of integrations and compliance views stayed organized within one dashboard.",
    },
    {
      label: "API Design",
      title: "Contracts that normalized many feeds into one.",
      body: "I designed and documented the REST contracts carrying normalized security, identity, compliance and backup data to web and iOS — consistent shapes and explicit error semantics, so both clients consumed every integration identically.",
    },
    {
      label: "Cross-platform Collaboration",
      title: "The point of contact between product and engineering.",
      body: "I wrote the scope docs for a 3-person external iOS and backend team and used daily syncs to keep the work aligned across web, iOS and backend.",
    },
    {
      label: "Outcome",
      title: "In production with real users.",
      body: "CIO 360 is in production — used by IT teams and MSPs to monitor their posture, track compliance and watch automated responses from one place. I built and shipped the web app independently.",
    },
  ],
  stack: [
    "React.js",
    "Redux",
    "Component Architecture",
    "REST API contracts",
    "Laravel (integration)",
    "iOS (integration)",
    "Entra ID / vendor APIs",
    "MongoDB",
    "MySQL",
  ],
} as const;

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
export const navLinks: NavLink[] = [
  { label: "About", href: "#about" },
  { label: "Experience", href: "#experience" },
  { label: "Work", href: "#work" },
  { label: "Skills", href: "#skills" },
  { label: "Philosophy", href: "#philosophy" },
  { label: "Contact", href: "#contact" },
];

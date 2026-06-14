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
    "Full-Stack Software Developer who owns product delivery — shipping production React systems, owning API contracts, and coordinating backend and iOS teams from idea to deployment.",
} as const;

export const hero = {
  kicker: "Full-Stack Software Developer",
  headline: "Building production software from idea to deployment.",
  sub: "I own the surface where product meets engineering — shipping a production React platform from scratch, owning the API contracts that bind a Laravel backend to an iOS app, and turning ambiguous requirements into systems that hold up in front of real users.",
  metrics: [
    { value: "2+", label: "Years shipping production" },
    { value: "Sole", label: "Developer of the platform web app" },
    { value: "3", label: "Workstreams driven · web · iOS · backend" },
  ],
} as const;

export const about = {
  kicker: "About",
  title: "From understanding the product to building it.",
  paragraphs: [
    "I didn't start in an editor. I started in the room where products get decided — coordinating delivery, translating between stakeholders and engineers, and learning exactly why features live or die. That vantage point is the thing most engineers spend years trying to acquire.",
    "So when I moved into building, I didn't just write code — I owned outcomes. I built a production React platform from an empty repository, defined the API contracts other teams depend on, and made the calls that keep a system coherent as it grows.",
    "Today I work as the connective tissue of a small, fast team: the person who can scope a feature with a stakeholder in the morning, design the data model at noon, and ship the interface that night. Product thinking and engineering execution aren't separate skills for me — they're the same job.",
  ],
  pillars: [
    {
      title: "Product understanding",
      body: "I scope features from the user backward, not the ticket forward — so what ships actually moves the metric it was meant to.",
    },
    {
      title: "Ownership",
      body: "From empty repo to production incident at 11pm, I own the whole lifecycle. No hand-offs, no 'not my layer.'",
    },
    {
      title: "Communication",
      body: "I write the contract, document the interface, and keep backend and iOS teams aligned on a single source of truth.",
    },
    {
      title: "Technical growth",
      body: "I move toward the hard problem on purpose — schema design, auth, cross-platform integration — because that's where I compound.",
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
      "Sole developer of the platform's web application — and the primary technical interface between product and an external engineering team.",
    outcomes: [
      "Built a production React.js web app for a monitoring, automation & SOAR platform from scratch and shipped it independently to live users.",
      "Designed and documented the REST API contracts for a Laravel backend — endpoint schemas, request/response structures and data flows consumed across web and iOS clients.",
      "Authored the technical scope documents and feature requirements for a 3-person external iOS and backend team, acting as the single technical interface between product and engineering.",
      "Drove delivery across web, iOS and backend workstreams through daily progress meetings — surfacing blockers early and consistently hitting release deadlines.",
      "Used AI-assisted development tooling to accelerate implementation and tighten debugging cycles in a lean team.",
    ],
    stack: ["React.js", "Redux", "REST contracts", "Laravel (integration)", "iOS (integration)"],
  },
  {
    period: "Jul 2023 — Dec 2023",
    role: "Project Coordinator",
    company: "Attra Technologies",
    location: "Ahmedabad",
    summary:
      "Bridged stakeholders and external teams — the role that taught me why products succeed before I learned to build them.",
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

export const caseStudy = {
  kicker: "Featured Work",
  name: "Monitoring, Automation & SOAR Platform",
  tagline:
    "A production platform for security operations — orchestrating monitoring, automated response, and cross-device workflows.",
  context:
    "The flagship product at Attra Technologies: a Security Orchestration, Automation and Response (SOAR) platform that lets operations teams watch their systems, codify response playbooks, and act from anywhere — web or mobile.",
  sections: [
    {
      label: "Challenge",
      title: "One contract, three teams, zero room for drift.",
      body: "A SOAR platform is only as trustworthy as its consistency. The web app I owned, an outsourced Laravel backend, and a native iOS client all had to agree — exactly — on how monitoring data, automation rules and response actions were shaped and exchanged. Any ambiguity in the contract would surface as a production incident in someone's security workflow.",
    },
    {
      label: "Approach",
      title: "Own the interface, not just the implementation.",
      body: "Rather than treating the frontend as a downstream consumer, I made the API contract a first-class, documented artifact and took ownership of it. I scoped each feature from the operator's actual workflow backward, designed the request/response shapes, and aligned all three teams on a single source of truth before code was written.",
    },
    {
      label: "Architecture",
      title: "A React app built to stay coherent under growth.",
      body: "I built the web application from scratch in React.js with Redux and a deliberate component architecture, structuring state and data flow so the platform's monitoring and automation views stayed coherent as features accumulated. As the sole developer, every architectural decision was mine to make and to live with.",
    },
    {
      label: "API Design",
      title: "Contracts that made integration predictable.",
      body: "I designed and documented the REST API contracts for the Laravel backend — endpoint schemas, request/response structures and data flows — written down so the same definitions were consumed identically across web and iOS. The documentation became the working agreement between teams, so 'how does this endpoint behave?' had one answer, not three.",
    },
    {
      label: "Cross-platform Collaboration",
      title: "The single technical interface between product and engineering.",
      body: "I authored the technical scope documents and feature requirements for a 3-person external iOS and backend team, and drove delivery across all three workstreams through daily progress meetings — surfacing blockers early, aligning everyone on the contract, and consistently hitting release deadlines.",
    },
    {
      label: "Outcome",
      title: "A platform shipped to live users.",
      body: "The web application reached live users, built and shipped independently. Delivery stayed on schedule across web, iOS and backend; AI-assisted tooling kept a lean team fast without sacrificing quality — proof that owning the contract, not just the code, is what keeps a multi-team system trustworthy.",
    },
  ],
  stack: [
    "React.js",
    "Redux",
    "Component Architecture",
    "REST API contracts",
    "Laravel (integration)",
    "iOS (integration)",
    "MongoDB",
    "MySQL",
    "AI-assisted tooling",
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
  title: "Engineering is a series of decisions you have to live with.",
  principles: [
    {
      n: "01",
      title: "Ownership over hand-off",
      body: "I take features from ambiguous idea to deployed system. The fewer seams between 'who scoped it' and 'who shipped it,' the better the software.",
    },
    {
      n: "02",
      title: "Shipping is the point",
      body: "Code that isn't in front of users isn't finished. I optimise for getting something correct in production, then making it better — not for theoretical perfection.",
    },
    {
      n: "03",
      title: "Documentation is design",
      body: "When three teams build against one contract, the document is the product. Writing the interface down forces the clarity that prevents incidents.",
    },
    {
      n: "04",
      title: "Collaboration is a contract",
      body: "Working across backend and iOS taught me that good integration is just agreed definitions, kept honest. I make the agreement explicit so the teams can move fast.",
    },
    {
      n: "05",
      title: "Product thinking first",
      body: "I scope from the user's workflow backward. The best engineering decision is often the one that questions whether the feature should exist as specified.",
    },
  ],
} as const;

export const contact = {
  kicker: "Contact",
  title: "Have a system worth building?",
  body: "I'm interested in roles and collaborations where I can own real product surface — from contract to production. The fastest way to reach me is email.",
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

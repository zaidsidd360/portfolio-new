export const PERSONAL = {
  name: "Md Zaid Siddiqui",
  title: "Software Engineer",
  tagline: "Building scalable systems at the intersection of performance and elegance.",
  bio: "I'm a software engineer who obsesses over latency numbers, clean abstractions, and shipping things that actually work. Currently at Vujis, where I architect AI pipelines, search infrastructure, and APIs that handle real production load.",
  email: "zaidsidd360@gmail.com",
  phone: "7044294158",
  linkedin: "https://linkedin.com/in/zaidsidd360",
  github: "https://github.com/zaidsidd360",
  location: "Hyderabad, India",
};

export interface Experience {
  role: string;
  company: string;
  location: string;
  period: string;
  current: boolean;
  owned: string;
  built: string[];
  problems: string[];
  writeup?: { slug: string; label: string };
  tags: string[];
}

export const EXPERIENCE: Experience[] = [
  {
    role: "Software Engineer",
    company: "Vujis",
    location: "Hyderabad",
    period: "Mar 2025 – Present",
    current: true,
    owned:
      "Search and AI across the core platform: the OpenSearch layer behind faceted discovery, the OpenAI pipelines that turn raw records into insight, and the high-traffic APIs holding it together under real production load.",
    built: [
      "A search layer over 100k+ documents with full-text search, faceted filtering, and index mappings tuned so the engine does the work it was built for. Average query time went from 1.8s to around 500ms.",
      "AI pipelines on top of the OpenAI APIs that chew through 50k+ records a day, pulling structured insight out of messy data across several categories and erasing analysis work that used to eat afternoons.",
      "A pass over the hottest Node.js endpoints (smarter middleware, cursor pagination, less wasted work) that cut tail latency by about two-thirds and let throughput scale roughly 10x.",
      "An image pipeline that compresses with cWebP before anything touches S3, shrinking a 2GB pile of product images by ~95% and making pages load noticeably faster.",
    ],
    problems: [
      "I was computing facet counts in Node by pulling every matching row back and tallying them by hand. The fix was equal parts embarrassing and satisfying: OpenSearch aggregations do that at the shard level, right next to the data. Moving the counting into the engine was most of the latency win.",
      "Deep pagination quietly caps at 10k results, and asking for page 500 makes every shard collect 5,000 rows just to throw them away. A search_after cursor with a stable tiebreaker made page 500 cost the same as page 2.",
      "Designing a schema loose enough to absorb new data categories as they appear, but tight enough that downstream pipelines don't break every time something new ships.",
    ],
    writeup: {
      slug: "optimizing-opensearch-query-performance",
      label: "Read the full writeup",
    },
    tags: ["OpenSearch", "OpenAI", "Node.js", "TypeScript", "AWS S3"],
  },
  {
    role: "Full Stack Developer",
    company: "Scallio Digital",
    location: "Kolkata",
    period: "Aug 2024 – Feb 2025",
    current: false,
    owned:
      "The front-to-back of a lead-nurturing platform used by 5k+ people daily: the React app they lived in, the REST APIs behind it, and the AWS pipeline that shipped it.",
    built: [
      "A React and Shadcn UI front end with Zustand for state, restructured so 40+ components stopped re-rendering when they had no reason to (render cycles down ~20%).",
      "20+ REST endpoints on Node and Express, deployed to AWS with CI/CD that held 99.9% uptime and halved deploy time.",
      "Debounced inputs and server-side pagination across 8 data-heavy views holding 30k+ records, so the UI stayed responsive while the CRM synced in real time.",
    ],
    problems: [
      "Keeping a data-heavy CRM interface snappy when every keystroke could fire a request. The craft was in deciding what to debounce, what to paginate on the server, and what should simply never re-render.",
      "Real-time sync where the client and the source of truth could quietly drift, and the user should never see the seam.",
    ],
    tags: ["React.js", "Node.js", "Express", "Zustand", "Shadcn UI", "AWS"],
  },
  {
    role: "Software Developer",
    company: "Mocero Health Solutions",
    location: "Chennai",
    period: "Dec 2023 – Jul 2024",
    current: false,
    owned:
      "Core front-end work on internal tools used by 200+ people, including a Notion-style markdown editor and the file infrastructure underneath it.",
    built: [
      "A Notion-like WYSIWYG markdown editor in React and Redux Toolkit, the kind of surface where every edge case is a fresh bug. Closed out 17+ critical ones and cut the crash rate by ~65%.",
      "S3-backed file storage handling 1k+ uploads a day through secure pre-signed URLs, with upload latency down ~30%.",
      "A re-render audit across 27+ components with Context API and React.memo, taking unnecessary renders down 40% and shaving ~800ms off page load.",
    ],
    problems: [
      "WYSIWYG editors are deceptively brutal: selection, paste, undo, and nested formatting all conspire against you. Most of the work was taming the edge cases that only appear once real people start typing.",
      "Cutting re-renders without rewriting everything, which meant finding the few components actually causing the cascade instead of reflexively memoizing the whole tree.",
    ],
    tags: ["React.js", "Redux Toolkit", "Node.js", "AWS S3", "Context API"],
  },
];

export interface Project {
  title: string;
  description: string;
  tech: string[];
  liveUrl?: string;
  repoUrl?: string;
  highlights: string[];
  featured: boolean;
}

export const PROJECTS: Project[] = [
  {
    title: "Live Polling System",
    description:
      "A real-time classroom polling system with distinct teacher/student interfaces, built for scale and low latency.",
    tech: ["React", "Express.js", "Socket.io", "Tailwind CSS", "MongoDB"],
    liveUrl: "#",
    highlights: [
      "100+ concurrent users with sub-200ms latency via Socket.io",
      "Teacher dashboard with 50+ poll tracking and detailed response analytics",
      "MongoDB with indexed queries for 10k+ responses, query time down 40%",
    ],
    featured: true,
  },
  {
    title: "React-Terminal",
    description:
      "An open-source interactive Bash-like terminal component for React with TypeScript support and a full pseudo filesystem.",
    tech: ["React", "TypeScript", "Styled-Components"],
    repoUrl: "#",
    highlights: [
      "Published to npm with 15+ GitHub stars and 620+ downloads",
      "Command processor with pseudo file system: 8+ built-in commands, full path resolution, nested directory traversal",
      "10+ configurable props for theming and custom commands, with zero-dependency integration",
    ],
    featured: true,
  },
];

export interface Skill {
  category: string;
  icon: string;
  items: string[];
}

export const SKILLS: Skill[] = [
  {
    category: "Languages",
    icon: "Code2",
    items: ["TypeScript", "JavaScript", "Java", "SQL", "HTML/CSS"],
  },
  {
    category: "Frameworks",
    icon: "Layers",
    items: ["React.js", "Next.js", "Node.js", "Express.js", "Tailwind CSS", "Material-UI", "Shadcn UI"],
  },
  {
    category: "Cloud & DevOps",
    icon: "Cloud",
    items: ["AWS EC2", "AWS S3", "App Runner", "Amplify", "Aurora", "CI/CD", "Linux"],
  },
  {
    category: "Data & Search",
    icon: "Database",
    items: ["PostgreSQL", "MongoDB", "OpenSearch", "Redis"],
  },
  {
    category: "Tools",
    icon: "Wrench",
    items: ["Git", "GitHub", "BitBucket", "VS Code", "IntelliJ"],
  },
  {
    category: "Specialties",
    icon: "Zap",
    items: ["API Optimization", "Performance Tuning", "AI Pipelines", "Real-time Systems", "Open Source"],
  },
];

export const STATS = [
  { value: "72%", label: "Search latency reduction", sublabel: "1.8s → 500ms" },
  { value: "95.6%", label: "Storage savings", sublabel: "2.05 GB → 91.6 MB" },
  { value: "10×", label: "Throughput boost", sublabel: "2k → 20k rows" },
  { value: "50k+", label: "Records processed daily", sublabel: "via AI pipelines" },
];

export const NAV_LINKS = [
  { label: "About", href: "#about" },
  { label: "Experience", href: "#experience" },
  { label: "Projects", href: "#projects" },
  { label: "Skills", href: "#skills" },
  { label: "Contact", href: "#contact" },
];

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
  bullets: string[];
  tags: string[];
}

export const EXPERIENCE: Experience[] = [
  {
    role: "Software Engineer",
    company: "Vujis",
    location: "Hyderabad, TG",
    period: "Mar 2025 – Present",
    current: true,
    bullets: [
      "Leading integration of OpenAI APIs to build custom AI pipelines processing 50k+ records daily, reducing manual data analysis time by 60% and automating insight extraction across 4+ dataset categories.",
      "Architected and integrated OpenSearch across 3+ core modules — full-text search, faceted filtering, index mapping optimizations — reducing average query time by 72% (1.8s → 500ms) for 100k+ indexed documents.",
      "Optimized 8+ critical Node.js APIs by refactoring middlewares and efficient pagination, reducing average endpoint latency by 64% (2.5s → 910ms) and boosting throughput 10× (2k → 20k rows).",
      "Delivered an S3 image compression pipeline using Node.js and cWebP, processing 1,400+ product images — storage down 95.6% (2.05 GB → 91.6 MB), load times improved 71% (2.75s → 800ms).",
    ],
    tags: ["OpenAI", "OpenSearch", "Node.js", "AWS S3", "TypeScript"],
  },
  {
    role: "Full Stack Developer",
    company: "Scallio Digital",
    location: "Kolkata, WB",
    period: "Aug 2024 – Feb 2025",
    current: false,
    bullets: [
      "Architected a lead nurturing platform serving 5k+ active users with React.js and Shadcn UI, leveraging Zustand for state management — reduced render cycles by 20% across 40+ components.",
      "Developed 20+ scalable RESTful endpoints with Node.js + Express.js, deployed on AWS with CI/CD pipelines achieving 99.9% uptime and cutting deployment time by 50%.",
      "Implemented input debouncing and server-side pagination for 30k+ records across 8 data-heavy views, improving perceived load times by 25% while maintaining real-time CRM synchronization.",
    ],
    tags: ["React.js", "Node.js", "Zustand", "AWS", "Express.js", "Shadcn UI"],
  },
  {
    role: "Software Developer",
    company: "Mocero Health Solutions",
    location: "Chennai, TN",
    period: "Dec 2023 – Jul 2024",
    current: false,
    bullets: [
      "Spearheaded development of a Notion-like markdown WYSIWYG editor with React.js + Redux Toolkit, used by 200+ internal users — resolved 17+ critical bugs, reduced crash rate by 65%.",
      "Implemented scalable file storage with AWS S3 handling 1k+ daily uploads using Node.js — secure pre-signed URL workflows reduced upload latency by 30%.",
      "Optimized 27+ components using Context API and React.memo — reduced unnecessary re-renders by 40% and cut page load time by 800ms.",
    ],
    tags: ["React.js", "Redux Toolkit", "AWS S3", "Node.js", "Context API"],
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
      "MongoDB with indexed queries for 10k+ responses — query time down 40%",
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
      "Published to npm — 15+ GitHub stars and 620+ downloads",
      "Command processor with pseudo file system: 8+ built-in commands, full path resolution, nested directory traversal",
      "10+ configurable props for theming and custom commands — zero-dependency integration",
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

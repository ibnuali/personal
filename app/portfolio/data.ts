export const BOOT_SEQUENCE = [
  { text: "booting system", delay: 300 },
  { text: "loading modules", delay: 400 },
  { text: "fetching data", delay: 350 },
  { text: "system ready", delay: 200 },
];

export const NAV_SECTIONS = [
  { id: "intro", label: "Overview" },
  { id: "work", label: "Experience" },
  { id: "projects", label: "Projects" },
  { id: "connect", label: "Contact" },
] as const;

export const EXPERIENCE = [
  {
    year: "2024 — Present",
    role: "Software Engineer",
    company: "Len Inovasi Teknologi",
    description:
      "Developing a Combat Management System for the Indonesian Navy",
    tech: ["Websocket", "React", "TypeScript", "WebRTC", "Webpack"],
  },
  {
    year: "2022 — 2024",
    role: "Node JS Developer",
    company: "PT. Mitrais",
    description:
      "Developing a web-based Internal system for employee assessment and development",
    tech: ["Node JS", "NestJS", "NextJS", "React", "TypeScript", "PostgreSQL"],
  },
  {
    year: "2020 — 2022",
    role: "Software Engineer",
    company: "PT Len Industri",
    description:
      "Developing a web-based asset management system and system information intelligence",
    tech: ["Neo4j", "React", "PostgreSQL", "Python"],
  },
  {
    year: "2019 — 2020",
    role: "Full Stack Developer",
    company: "PT. Indocisc",
    description: "Created a web-based weather monitoring system",
    tech: ["Django", "PostgreSQL", "HTML", "CSS", "InfluxDB"],
  },
];

export const PROJECTS = [
  {
    title: "xDraw",
    description:
      "A collaborative drawing application powered by Excalidraw with real-time collaboration features.",
    url: "https://xdraw.web.id",
    tech: ["React", "Excalidraw", "WebSocket"],
  },
];

export const SKILLS = [
  "React",
  "TypeScript",
  "Next.js",
  "Node.js",
  "Python",
  "PostgreSQL",
  "Docker",
  "WebSocket",
];

export const SOCIALS = [
  {
    name: "GitHub",
    handle: "@ibnuali",
    url: "https://github.com/ibnuali",
  },
  {
    name: "LinkedIn",
    handle: "Ibnu Ali Mukhtarom",
    url: "https://www.linkedin.com/in/ibnuali/",
  },
  {
    name: "X",
    handle: "@iibnuali",
    url: "https://x.com/iibnuali",
  },
  {
    name: "Instagram",
    handle: "@ibnualii",
    url: "https://www.instagram.com/ibnualii/",
  },
] as const;

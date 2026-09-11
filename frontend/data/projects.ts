export interface Project {
  title: string;
  slug: string;
  year: string;
  description: string;
  technologies: string[];
  github?: string;
  liveUrl?: string;
  docsUrl?: string;
  image?: string;
  featured: boolean;
  highlights: string[];
}

export const projects: Project[] = [
  {
    title: "R.I.S.H.I.",
    slug: "rishi",
    year: "2026",
    description:
      "An autonomous AI companion capable of executing real tasks across devices through a unified backend.",
    technologies: [
      "Electron",
      "Qdrant",
      "RAG",
      "Whisper",
      "OpenClaw",
      "EC2",
      "Python",
    ],
    github: "https://github.com/Hrick-08",
    featured: true,
    highlights: [
      "Multi-provider LLM routing",
      "Long-term RAG memory",
      "Web search & image generation",
      "File management & email",
      "Autonomous task execution",
    ],
  },
  {
    title: "Closetly",
    slug: "closetly",
    year: "2025",
    description:
      "A full-stack fashion intelligence platform combining computer vision, visual search, outfit generation, product matching, and a RAG fashion agent.",
    technologies: [
      "React",
      "Tailwind",
      "Node/Express",
      "FastAPI",
      "MongoDB",
      "Qdrant",
      "Cloudinary",
    ],
    github: "https://github.com/Hrick-08",
    liveUrl: "https://closetly.hrick.in",
    featured: true,
    highlights: [
      "Computer vision pipeline",
      "Visual search engine",
      "AI outfit generation",
      "Product matching system",
      "RAG fashion agent",
    ],
  },
  {
    title: "Exposr",
    slug: "exposr",
    year: "2025",
    description:
      "A reverse TCP/UDP tunneling CLI that exposes local services publicly through a persistent relay agent. Published on PyPI.",
    technologies: ["Python", "asyncio", "TCP/UDP", "Azure"],
    github: "https://github.com/Hrick-08/exposr",
    docsUrl: "https://exposr.hrick.in",
    featured: true,
    highlights: [
      "Dynamic public ports",
      "Automatic agent reconnection",
      "UUID-based data channels",
      "Concurrent connections",
      "Azure relay infrastructure",
    ],
  },
];

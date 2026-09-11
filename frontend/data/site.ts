export const siteConfig = {
  name: "Hrick",
  fullName: "Hritabrata Das",
  title: "Hrick — Software Engineer & Builder",
  description:
    "A personal portfolio showcasing Hrick's software projects, experiments, and work across web development, AI, backend systems and infrastructure.",
  url: "https://hrick.in",
  apiUrl: process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000",
  links: {
    github: "https://github.com/Hrick-08",
    linkedin: "https://linkedin.com/in/hritabrata-das",
    email: "hritabratadas8@gmail.com",
  },
};

export const navigation = [
  { label: "About", href: "#about", number: "01" },
  { label: "Work", href: "#work", number: "02" },
  { label: "Now", href: "#now", number: "03" },
  { label: "Blog", href: "#writing", number: "04" },
  { label: "Contact", href: "#contact", number: "05" },
];

export const experience = [
  {
    role: "Web Developer",
    organization: "Google Developer Groups On Campus — Chitkara University",
    period: "Aug 2024 – Present",
    description:
      "Building web platforms for community events, supporting 150+ student developers, and mentoring junior members. Increased participation in Google tech programs by 40%. Placed 3rd among 20+ teams in the Agentic Sprint Hackathon.",
  },
];

export const education = {
  degree: "B.E. Computer Science and Engineering",
  specialization: "AI & ML Specialization",
  university: "Chitkara University, Rajpura, Punjab",
  cgpa: "9.49 / 10",
  graduation: "May 2028",
};

export const stackCategories = [
  {
    label: "LANGUAGES",
    items: ["Python", "TypeScript", "JavaScript", "C++", "Java", "SQL"],
  },
  {
    label: "WEB",
    items: ["React", "Next.js", "Node", "Express", "FastAPI"],
  },
  {
    label: "AI",
    items: ["RAG", "Qdrant", "LLM APIs", "Agentic AI", "Whisper"],
  },
  {
    label: "INFRASTRUCTURE",
    items: ["Docker", "AWS", "Azure", "GCP", "GitHub"],
  },
];

export const now = [
  {
    label: "Building",
    value: "R.I.S.H.I. and Exposr",
  },
  {
    label: "Learning",
    value: "Systems, AI infrastructure and better full-stack architecture",
  },
  {
    label: "Exploring",
    value: "Agentic systems, networking and developer tools",
  },
];

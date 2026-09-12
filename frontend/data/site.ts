export const siteConfig = {
  name: "Hrick",
  fullName: "Hritabrata Das",
  title: "Hrick — Software Engineer & Builder",
  description:
    "A personal portfolio showcasing Hrick's software projects, experiments, and work across web development, AI, backend systems and infrastructure.",
  url: "https://hrick.in",
  apiUrl: (process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000").replace(/\/+$/, ""),
  links: {
    github: "https://github.com/Hrick-08",
    linkedin: "https://linkedin.com/in/hritabrata-das",
    email: "hritabratadas8@gmail.com",
    resume:
      "https://drive.google.com/uc?export=download&id=11z16BzMD-I1oo2ggk3hswZX8iK_aWRem",
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
  graduation: "August 2028",
};

export const certifications = [
  {
    name: "Microsoft AI Fundamentals",
    url: "https://www.credly.com/badges/6455ba0b-6457-48ab-b33a-7490785ca1cb/linked_in_profile",
  },
  {
    name: "Microsoft Azure Fundamentals",
    url: "https://www.credly.com/badges/da97194b-1180-465d-bd80-0f6759628284/linked_in_profile",
  },
  {
    name: "Microsoft Azure Data Fundamentals",
    url: "https://www.credly.com/earner/earned/badge/eba2c1d6-3b90-492a-ad5b-7132bcbd44e6",
  },
  {
    name: "Microsoft Power BI Data Analyst Associate",
    url: "https://learn.microsoft.com/api/credentials/share/en-in/HritabrataDas-2883/1C92F1E9DF7F6666?sharingId=12EC26C3F16C6F11",
  },
  {
    name: "Design Thinking — University of Virginia",
    url: "https://www.coursera.org/account/accomplishments/specialization/TS4012GW0MI3",
  },
  {
    name: "Introduction to Cyber Security",
    url: "https://www.credly.com/badges/cd3d17b0-0436-4814-9b3d-81a001e661e3/linked_in_profile",
  },
];

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

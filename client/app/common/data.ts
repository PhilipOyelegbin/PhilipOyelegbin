import {
  Activity,
  Cloud,
  Code,
  Cpu,
  FileText,
  Layers,
  MessageCircle,
  Network,
  Server,
  Share2,
  Terminal,
} from "lucide-react";

export const directEmail = "philip@oyelegbin.name.ng";

export const NAV_LINKS = [
  { label: "Overview", href: "#overview" },
  { label: "Projects", href: "#projects" },
  { label: "Skills", href: "#skills" },
  { label: "Experience", href: "#experience" },
  { label: "Contact", href: "#contact" },
  { label: "Testimonials", href: "#testimonials" },
];

export const SKILLS = [
  {
    id: "skill-1",
    category: "cloud",
    icon: Cloud,
    title: "Cloud & Infrastructure",
    description: "Multi-cloud cluster orchestration & hosting platforms",
    tags: [
      "AWS EKS / EC2",
      "Kubernetes",
      "Terraform",
      "Docker",
      "Linux Kernel / Bash",
    ],
    proficiency: "Advanced / Lead",
    theme: "primary",
  },
  {
    id: "skill-2",
    category: "backend",
    icon: Terminal,
    title: "Backend & Systems",
    description: "Scalable services, streaming pipelines & DB tuning",
    tags: [
      "Node.js / NestJS",
      "PHP / Laravel",
      "PostgreSQL",
      "MongoDB",
      "Redis Cluster",
    ],
    proficiency: "Production Mastered",
    theme: "secondary",
  },
  {
    id: "skill-3",
    category: "frontend",
    icon: Code,
    title: "Frontend Engineering",
    description: "Responsive client interfaces, real-time dashboards",
    tags: [
      "React / Next.js",
      "TypeScript",
      "Tailwind CSS",
      "State Management",
      "Figma / UI Design",
    ],
    proficiency: "Senior Level",
    theme: "primary",
  },
  {
    id: "skill-4",
    category: "observability",
    icon: Activity,
    title: "DevOps & Observability",
    description: "CI/CD pipelines, SLA alerting & triage automation",
    tags: [
      "GitHub Actions",
      "Prometheus & Grafana",
      "Nginx / Envoy",
      "Ansible Playbooks",
    ],
    proficiency: "Enterprise SLA",
    theme: "secondary",
  },
];

export const EXPERIENCE = [
  {
    role: "L2 Technical Support Officer",
    company: "HostAfrica (Whogohost) - FullTime (HYBRID/NG)",
    desription:
      "Managed cPanel/WHM servers, resolved client issues, and optimized hosting environments for performance and security.",
    duration: "2022 - Present",
    skills: ["cPanel/WHM", "WHMCS", "Linux", "Wordpress", "JavaScript"],
    theme: "text-[#d2bbff]",
  },
  {
    role: "Backend & Cloud Engineer",
    company: "Nobzo - Contract (REMOTE/NG)",
    desription:
      "Developed and maintained backend services, implemented cloud infrastructure solutions, and ensured high availability and scalability of applications.",
    duration: "2026",
    skills: ["Express", "AWS", "GitHub Actions", "Terraform"],
    theme: "text-[#ff8c61]",
  },
  {
    role: "Lead DevOps Engineer",
    company: "3MTT-HealthPointer - Freelance (REMOTE/NG)",
    desription:
      "Led the design and implementation of DevOps practices, ensuring smooth deployment and operation of applications.",
    duration: "2025",
    skills: ["JavaScript", "GitHub", "CI/CD", "AWS"],
    theme: "text-[#d2bbff]",
  },
  {
    role: "Backend & DevOps Engineer",
    company: "ReCreaX - Contract (REMOTE/NG)",
    desription:
      "Developed backend services and managed cloud infrastructure, focusing on automation and continuous integration.",
    duration: "2024 - 2025",
    skills: ["Nest", "PostgreSQL", "AWS", "GitHub Actions"],
    theme: "text-[#ff8c61]",
  },
  {
    role: "Frontend Engineer",
    company: "Valorise Limited - Contract (REMOTE/UK)",
    desription:
      "Built responsive and interactive user interfaces, collaborating with backend teams to deliver seamless user experiences.",
    duration: "2022 - 2023",
    skills: ["HTML", "SCSS", "React", "Git"],
    theme: "text-[#d2bbff]",
  },
  {
    role: "Senior Robotics Instructor",
    company: "WiFi Combat Academy - Contract (ONSITE/NG)",
    desription:
      "Instructed students in robotics and programming, fostering a hands-on learning environment that encouraged innovation and problem-solving.",
    duration: "2021 - 2023",
    skills: ["Figma", "MIT App Inventor", "Arduino", "Roblox"],
    theme: "text-[#ff8c61]",
  },
];

export const CERTIFICATIONS = [
  {
    id: "cert-6",
    icon: Layers,
    title: "Kubernetes and Cloud Native Associate (KCNA)",
    issuer: "Cloud Native Computing Foundation",
    tags: ["Kubernetes", "Cloud Native", "Containers", "DevOps"],
    certId: "RHCE-88314",
    theme: "secondary",
  },
  {
    id: "cert-5",
    icon: Cloud,
    title: "AWS Cloud Practitioner",
    issuer: "Amazon Web Services",
    tags: ["Cloud Computing", "AWS Services", "DevOps", "Linux"],
    certId: "RHCE-88314",
    theme: "primary",
  },
  {
    id: "cert-4",
    icon: Cloud,
    title: "AWS reStart Graduate",
    issuer: "CIL Academy",
    tags: ["AWS Cloud", "Cloud Computing", "DevOps", "Linux"],
    certId: "RHCE-88314",
    theme: "secondary",
  },
  {
    id: "cert-3",
    icon: Cpu,
    title: "Introduction To Linux (LFS101)",
    issuer: "Linux Foundation",
    tags: ["Linux Basics", "Command Line", "File System", "Permissions"],
    certId: "HCTA-00389",
    theme: "primary",
  },
  {
    id: "cert-2",
    icon: Server,
    title: "cPanel & WHM Proficiency",
    issuer: "cPanel University",
    tags: ["Web Hosting", "Server Management", "DNS", "Email"],
    certId: "CKA-249018",
    theme: "secondary",
  },
  {
    id: "cert-1",
    icon: Code,
    title: "Meta Frontend Developer",
    issuer: "Coursera",
    tags: ["HTML", "CSS", "JavaScript", "React", "Redux"],
    certId: "AWS-PSA-94810",
    theme: "primary",
  },
];

export const CONTACT_METHODS = [
  {
    name: "Whatsapp",
    icon: MessageCircle,
    url: "https://wa.me/2348054945601",
    theme: "primary",
  },
  {
    name: "GitHub",
    icon: Code,
    url: "https://github.com/philipoyelegbin",
    theme: "secondary",
  },
  {
    name: "LinkedIn",
    icon: Network,
    url: "https://linkedin.com/in/philipoyelegbin",
    theme: "primary",
  },
  {
    name: "Twitter/X",
    icon: Share2,
    url: "https://x.com/oyelegbinphilip",
    theme: "secondary",
  },
  {
    name: "Medium",
    icon: FileText,
    url: "https://medium.com/@philipoyelegbin",
    theme: "primary",
  },
];

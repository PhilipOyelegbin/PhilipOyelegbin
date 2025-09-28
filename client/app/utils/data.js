import { FaCloud, FaAws, FaServer, FaReact, FaLinux } from "react-icons/fa";

export const EducationData = [
  {
    certificate: "Cloud Engineer",
    institution: "AltSchool Africa",
    duration: "2025 - Present",
    summary: "",
    skills: ["JavaScript", "GCP", "Ansible", "Terraform"],
    flex: "",
    pad: "md:pr-8",
  },
  {
    certificate: "AWS Cloud Practitioner",
    institution: "AWS & CIL Academy",
    summary:
      "Automated Scripting with Bash, VPC Network Setup, Network Troubleshooting, Securing Cloud Services, Provision AWS service using CloudFomation, Tracking activity using CloudTail, etc.",
    duration: "2025",
    skills: ["Linux", "Bash", "AWS", "CI/CD"],
    flex: "md:flex-row-reverse",
    pad: "md:pl-8",
  },
  {
    certificate: "HND, Industrial Maintenance Engineering",
    institution: "Yaba College of Technology",
    duration: "2019 - 2022",
    skills: ["Automation", "Electronics", "Programming", "Mechanics"],
    flex: "",
    pad: "md:pr-8",
  },
];

export const SkillsData = {
  FrontendSkills: [
    {
      cover_image: "/html.svg",
      label: "HTML",
      summary:
        "HyperText Markup Language is the standard for creating web pages, using tags to structure content like text, images, and links, enabling user-friendly interfaces and interactivity.",
    },
    {
      cover_image: "/css.svg",
      label: "CSS",
      summary:
        "Cascading Style Sheets is used to style and layout web pages, controlling colors, fonts, spacing, and positioning, enhancing the visual appeal and user experience of HTML content.",
    },
    {
      cover_image: "/sass.svg",
      label: "Sass",
      summary:
        "Sassy CSS is a syntax of Sass that extends CSS with features like variables, nested rules, and mixins, making it easier to write and manage styles for complex web projects.",
    },
    {
      cover_image: "/bootstrap.svg",
      label: "Bootsrap",
      summary:
        "Bootstrap is a popular front-end framework that provides pre-designed UI components and responsive grid layouts, enabling developers to create mobile-first, visually appealing web pages quickly and easily.",
    },
    {
      cover_image: "/tailwind.svg",
      label: "Tailwind",
      summary:
        "Tailwind CSS is a utility-first framework that allows developers to build custom designs quickly using pre-defined utility classes, promoting a modular and responsive approach to styling web applications.",
    },
    {
      cover_image: "/javascript.svg",
      label: "JavaScript",
      summary:
        "JavaScript is a versatile scripting language used to create dynamic and interactive web content. It enables features like animations, form validations, and asynchronous communication for a richer user experience.",
    },
    {
      cover_image: "/react.svg",
      label: "React",
      summary:
        "React.js is a JavaScript library for building user interfaces. It allows developers to create reusable components, manage state efficiently, and build dynamic, interactive web applications.",
    },
    {
      cover_image: "/next.svg",
      label: "Next",
      summary:
        "Building scalable SPAs with hooks, context, and modern patterns. Experience with Next.js, Redux, and testing libraries.",
    },
  ],
  BackendSkills: [
    {
      cover_image: "/nodejs.svg",
      label: "Nodejs",
      summary:
        "Server-side JavaScript with Express.js, RESTful APIs, and microservices architecture.",
    },
    {
      cover_image: "/express.svg",
      label: "Express",
      summary:
        "Express is a minimalist web framework for Node.js that simplifies the process of building server-side applications. It provides robust features for routing, middleware, and handling HTTP requests.",
    },
    {
      cover_image: "/nestjs.svg",
      label: "NestJs",
      summary:
        "NestJS is a progressive Node.js framework for building efficient, scalable server-side applications. It uses TypeScript and incorporates modern design patterns, making it suitable for complex projects.",
    },
    {
      cover_image: "/typescript.svg",
      label: "TypeScript",
      summary:
        "Strong typing for JavaScript with advanced generics, decorators, and enterprise-scale application development.",
    },
    {
      cover_image: "/mongodb.svg",
      label: "MongoDB",
      summary:
        "MongoDB is a NoSQL database that stores data in flexible, JSON-like documents. It's designed for scalability, high performance, and ease of use, making it ideal for modern web applications.",
    },
    {
      cover_image: "/mysql.svg",
      label: "MySQL",
      summary:
        "MySQL is an open-source relational database management system that uses structured query language (SQL) to manage and store data, providing reliable data storage for web applications and software.",
    },
    {
      cover_image: "/postgresql.svg",
      label: "PostgreSQL",
      summary:
        "PostgreSQL is a powerful open-source relational database that supports advanced data types and complex queries. It's known for its reliability, performance, and extensibility, making it ideal for diverse applications.",
    },
  ],
  CloudSkills: [
    {
      cover_image: "/aws.svg",
      label: "AWS",
      summary:
        "EC2, S3, Lambda, RDS, CloudFormation for scalable cloud infrastructure and serverless applications.",
    },
    {
      cover_image: "/gcp.svg",
      label: "GCP",
      summary:
        "Suite of cloud computing services offering infrastructure, data storage, machine learning, and analytics, enabling businesses to build, deploy, and scale applications efficiently.",
    },
    {
      cover_image: "/nginx.svg",
      label: "Nginx",
      summary:
        "High-performance web server and reverse proxy that efficiently handles static content, load balancing, and HTTPS traffic, making it ideal for serving dynamic websites and applications.",
    },
    {
      cover_image: "/git.svg",
      label: "Git",
      summary:
        "Version control system that tracks changes in source code, allowing multiple developers to collaborate, manage revisions, and maintain project history efficiently and effectively.",
    },
    {
      cover_image: "/github.svg",
      label: "GitHub",
      summary:
        "Web-based platform for version control using Git. It facilitates collaboration on projects, provides repositories for code storage, and offers tools for issue tracking and code reviews.",
    },
    {
      cover_image: "/ansible.svg",
      label: "Ansible",
      summary:
        "Open-source automation tool used for configuration management, application deployment, and task automation, allowing IT teams to manage systems easily and consistently across environments.",
    },
    {
      cover_image: "/terraform.svg",
      label: "Terraform",
      summary:
        "Open-source infrastructure as code tool that allows developers to define and provision cloud resources using a declarative configuration language, enabling efficient and automated infrastructure management.",
    },
    {
      cover_image: "/docker.svg",
      label: "Docker",
      summary:
        "Containerization, Docker Compose, multi-stage builds, and container orchestration.",
    },
    {
      cover_image: "/kubernetes.svg",
      label: "Kubernetes",
      summary:
        "Container orchestration, deployments, services, and cluster management for production workloads.",
    },
  ],
  OtherSkills: [
    {
      cover_image: "/figma.svg",
      label: "Figma",
      summary:
        "Building scalable SPAs with hooks, context, and modern patterns. Experience with Next.js, Redux, and testing libraries.",
    },
    {
      cover_image: "/vscode.svg",
      label: "VS Code",
      summary:
        "Building scalable SPAs with hooks, context, and modern patterns. Experience with Next.js, Redux, and testing libraries.",
    },
    {
      cover_image: "/vim.svg",
      label: "Vim",
      summary:
        "Building scalable SPAs with hooks, context, and modern patterns. Experience with Next.js, Redux, and testing libraries.",
    },
    {
      cover_image: "/netlify.svg",
      label: "Netlify",
      summary:
        "Building scalable SPAs with hooks, context, and modern patterns. Experience with Next.js, Redux, and testing libraries.",
    },
    {
      cover_image: "/vercel.svg",
      label: "Vercel",
      summary:
        "Building scalable SPAs with hooks, context, and modern patterns. Experience with Next.js, Redux, and testing libraries.",
    },
  ],
};

export const ExperienceData = [
  {
    role: "Tier 2 Customer Support Officer",
    company: "GO54 (Whogohost Limited)",
    duration: "2022 - Present",
    skills: ["cPanel/WHM", "CRM", "Wordpress", "JavaScript"],
    flex: "",
    pad: "md:pr-8",
  },
  {
    role: "Lead DevOps Engineer",
    company: "3MTT-HealthPointer",
    duration: "2025",
    skills: ["JavaScript", "GitHub", "CI/CD", "AWS"],
    flex: "md:flex-row-reverse",
    pad: "md:pl-8",
  },
  {
    role: "Backend Engineer",
    company: "ReCreaX",
    duration: "2024 - 2025",
    skills: ["Typescript", "Nest", "PostgreSQL", "AWS"],
    flex: "",
    pad: "md:pr-8",
  },
  {
    role: "Frontend Engineer",
    company: "Valorise Limited",
    duration: "2022 - 2023",
    skills: ["HTML", "SCSS", "React", "Git"],
    flex: "md:flex-row-reverse",
    pad: "md:pl-8",
  },
  {
    role: "Senior Robotics Instructor",
    company: "WiFi Combat Academy",
    duration: "2021 - 2023",
    skills: ["Figma", "MIT App Inventor", "Arduino", "Roblox"],
    flex: "",
    pad: "md:pr-8",
  },
];

export const Services = [
  {
    id: 1,
    icon: "/binoculars.svg",
    title: "Vision",
    summary:
      "You need a beautiful and functional website that will inspire and connect with their visitors, aiming to convert website visitors into clients.",
  },
  {
    id: 2,
    icon: "/pencil.svg",
    title: "Plan",
    summary:
      "Actualizing your vision requires a strategic plan. This is where we analyze your target market and tailor the look of your site to your vision and your ideal client's needs using Figma.",
  },
  {
    id: 3,
    icon: "/columns.svg",
    title: "Build",
    summary:
      "This is where I implement the plan to make your vision come alive on the web page. With the language of computers, I build the structure, give it an attractive look, make it interactive and host it on the web.",
  },
];

export const Certificates = [
  {
    icon: <FaCloud className="w-8 h-8 text-accent" />,
    name: "AWS Cloud Practitioner",
    level: "Associate Level",
  },
  {
    icon: <FaAws className="w-8 h-8 text-accent" />,
    name: "AWS reStart Graduate",
    level: "Associate Level",
  },
  {
    icon: <FaLinux className="w-8 h-8 text-accent" />,
    name: "Introduction To Linux (LFS101)",
    level: "Associate Level",
  },
  {
    icon: <FaServer className="w-8 h-8 text-secondary-600" />,
    name: "cPanel & WHM Proficiency",
    level: "Associate Level",
  },
  {
    icon: <FaReact className="w-8 h-8 text-primary" />,
    name: "Meta Frontend Developer",
    level: "Professional Level",
  },
];

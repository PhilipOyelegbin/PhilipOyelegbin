import React, { useState, useEffect } from "react";
import { create } from "zustand";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import toast, { Toaster } from "react-hot-toast";
import {
  CheckCircle,
  Download,
  MessageSquare,
  ArrowDown,
  Zap,
  Copy,
  Terminal,
  ExternalLink,
  ShieldCheck,
  Mail,
  Code,
  BadgeCheck,
  Share2,
  FileText,
  Star,
  Send,
  Lock,
  Cloud,
  Cpu,
  Activity,
  RefreshCw,
  Phone,
  MapPin,
  Clock,
  Calendar,
  ChevronUp,
  Sliders,
  Check,
  Layers,
  Server,
} from "lucide-react";

// ==========================================
// 1. ZUSTAND STORE SETUP
// ==========================================
const usePortfolioStore = create((set) => ({
  projectFilter: "all",
  skillFilter: "all",
  selectedRating: 5,
  setProjectFilter: (filter) => set({ projectFilter: filter }),
  setSkillFilter: (filter) => set({ skillFilter: filter }),
  setSelectedRating: (rating) => set({ selectedRating: rating }),
}));

// ==========================================
// 2. YUP VALIDATION SCHEMA FOR CONTACT FORM
// ==========================================
const contactSchema = yup.object().shape({
  fullName: yup
    .string()
    .required("Full name is required")
    .min(2, "Name is too short"),
  email: yup
    .string()
    .required("Work email is required")
    .email("Please enter a valid email address"),
  overallRating: yup.number().required("Please select a rating").min(1).max(5),
  infraRating: yup.string().required("Please select infrastructure rating"),
  codeRating: yup.string().required("Please select code quality rating"),
  message: yup
    .string()
    .required("Message / feedback is required")
    .min(10, "Message should be at least 10 characters long"),
});

// ==========================================
// 3. STATIC DATA DEFINITIONS
// ==========================================
const PROJECTS = [
  {
    id: "project-1",
    category: ["devops", "sre"],
    title: "Autonomous Cluster Orchestrator",
    codeTag: "PROJECT_01 // ORCHESTRATION",
    sla: "99.99% Uptime SLA",
    description:
      "Automated multi-region AWS EKS provisioning engine with GitOps synchronization, zero-downtime blue/green rollouts, and self-healing node clusters.",
    flowIcon: RefreshCw,
    flowText: "GH Actions → Harbor → ArgoCD → EKS Edge",
    buildMetric: "1m 14s build",
    image:
      "https://images.unsplash.com/photo-1667372393119-3d4c48d07fc9?q=80&w=800&auto=format&fit=crop",
    tags: ["Kubernetes", "AWS EKS", "Terraform", "ArgoCD"],
    highlightColor: "primary",
  },
  {
    id: "project-2",
    category: ["fullstack", "devops"],
    title: "High-Throughput Edge API Gateway",
    codeTag: "PROJECT_02 // LOW-LATENCY",
    sla: "-45% Deploy Latency",
    description:
      "Global API edge distribution mesh handling dynamic routing, token authentication in under 4ms, and tiered multi-level caching for rapid content propagation.",
    flowIcon: Zap,
    flowText: "Cloudflare Edge → Envoy Proxy → Redis Cache → Go Core",
    buildMetric: "98.4% Hit Rate",
    image:
      "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?q=80&w=800&auto=format&fit=crop",
    tags: ["Go", "Envoy Proxy", "Redis", "Cloudflare"],
    highlightColor: "secondary",
  },
  {
    id: "project-3",
    category: ["sre", "devops"],
    title: "Enterprise Incident Mitigation Platform",
    codeTag: "PROJECT_03 // INCIDENT RESPONSE",
    sla: "350M+ Req/Day",
    description:
      "Real-time enterprise hosting observability stack with automated remediation bots, adaptive worker thread balancing, and instant failover execution under peak stress.",
    flowIcon: Activity,
    flowText: "Prometheus → Alertmanager → Ansible Remediation → Healing",
    buildMetric: "SLA: 99.98%",
    image:
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=800&auto=format&fit=crop",
    tags: ["Python", "Ansible", "Prometheus", "Grafana"],
    highlightColor: "primary",
  },
  {
    id: "project-4",
    category: ["fullstack"],
    title: "Distributed Event-Driven Ledger",
    codeTag: "PROJECT_04 // DATA RESILIENCE",
    sla: "Zero-Downtime Migration",
    description:
      "High-concurrency financial event ledger with WebSocket real-time updates, strict ACID write consistency via WAL streaming, and zero data loss multi-AZ replication.",
    flowIcon: Layers,
    flowText: "React 19 → Node.js API → Kafka Topics → PostgreSQL Primary",
    buildMetric: "0.42ms Latency",
    image:
      "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=800&auto=format&fit=crop",
    tags: ["React 19", "Node.js", "Kafka", "PostgreSQL"],
    highlightColor: "secondary",
  },
];

const SKILLS = [
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
    title: "Backend & Distributed",
    description: "Scalable services, streaming pipelines & DB tuning",
    tags: [
      "Go (Golang)",
      "Node.js / TypeScript",
      "Python",
      "PostgreSQL",
      "Redis Cluster",
      "Apache Kafka",
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
      "React 19 / Next.js",
      "TypeScript",
      "Tailwind CSS",
      "State Management",
      "WebSockets",
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
      "ArgoCD",
      "Prometheus & Grafana",
      "Nginx / Envoy",
      "Ansible Playbooks",
    ],
    proficiency: "Enterprise SLA",
    theme: "secondary",
  },
];

const CERTIFICATIONS = [
  {
    id: "cert-1",
    icon: Cloud,
    title: "AWS Certified Solutions Architect – Professional",
    issuer: "Amazon Web Services • Valid 2024–2027",
    tags: ["Multi-Region", "Cloud Architecture", "High Availability"],
    certId: "AWS-PSA-94810",
    theme: "primary",
  },
  {
    id: "cert-2",
    icon: Server,
    title: "Certified Kubernetes Administrator (CKA)",
    issuer: "Linux Foundation / CNCF • Valid 2023–2026",
    tags: ["Cluster Admin", "Container Security", "Helm"],
    certId: "CKA-249018",
    theme: "secondary",
  },
  {
    id: "cert-3",
    icon: Cpu,
    title: "HashiCorp Certified: Terraform Associate",
    issuer: "HashiCorp • Valid 2024–2026",
    tags: ["Infrastructure as Code", "Multi-Cloud Modules"],
    certId: "HCTA-00389",
    theme: "primary",
  },
  {
    id: "cert-4",
    icon: Terminal,
    title: "Red Hat Certified Engineer (RHCE)",
    issuer: "Red Hat Enterprise Linux • Valid 2023–2026",
    tags: ["Linux Kernel", "Automation", "Ansible"],
    certId: "RHCE-88314",
    theme: "secondary",
  },
];

// Helper to copy text to clipboard with Toast Notification
const copyToClipboard = (text, label) => {
  navigator.clipboard.writeText(text).then(
    () => {
      toast.custom(
        (t) => (
          <div
            className={`${
              t.visible ? "animate-enter" : "animate-leave"
            } max-w-md w-full bg-[#282832]/95 border border-[#d2bbff]/30 text-[#f1f0f5] shadow-[0_12px_40px_rgba(0,0,0,0.8)] backdrop-blur-md rounded-xl p-4 flex items-center gap-3 pointer-events-auto`}
          >
            <CheckCircle className="w-5 h-5 text-[#d2bbff] flex-shrink-0" />
            <div className="font-mono text-xs tracking-wide">
              Copied{" "}
              <span className="text-[#d2bbff] font-semibold">{text}</span> to
              clipboard
            </div>
          </div>
        ),
        { duration: 2600 },
      );
    },
    () => {
      toast.error("Failed to copy text");
    },
  );
};

// ==========================================
// 4. SUB-COMPONENTS
// ==========================================

// Header Navigation
const Header = () => {
  const handleDownloadResume = () => {
    toast.success("PDF Resume download initiated", {
      style: {
        background: "#202026",
        color: "#f1f0f5",
        border: "1px solid #ff6b35",
        fontFamily: "JetBrains Mono, monospace",
        fontSize: "12px",
      },
      icon: "🚀",
    });
  };

  return (
    <header className="sticky top-0 w-full z-50 bg-[#0a0a0c]/80 backdrop-blur-xl border-b border-[#27272e]">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 h-20 flex items-center justify-between">
        {/* Brand/Wordmark */}
        <a href="#" className="flex items-center gap-4 group">
          <div className="w-10 h-10 rounded-xl bg-[#202026] border border-[#27272e] flex items-center justify-center group-hover:border-[#d2bbff]/50 transition-colors">
            <span className="font-mono text-sm font-semibold text-[#d2bbff]">
              PO
            </span>
          </div>
          <div className="flex flex-col">
            <div className="flex items-center gap-2">
              <span className="font-semibold text-sm tracking-tight text-[#f1f0f5] group-hover:text-[#d2bbff] transition-colors">
                Philip Oyelegbin
              </span>
              <span className="font-mono text-xs text-[#4a4857]">//</span>
              <span className="font-mono text-xs text-[#9d9bb0]">
                Full-Stack &amp; DevOps
              </span>
            </div>
            <div className="flex items-center gap-2 mt-0.5">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              <span className="font-mono text-[11px] text-emerald-400/90 font-medium">
                Available for Enterprise &amp; Growth Roles
              </span>
            </div>
          </div>
        </a>

        {/* Navigation Links */}
        <nav className="hidden md:flex items-center gap-8 text-sm font-mono text-[#9d9bb0]">
          <a
            href="#overview"
            className="hover:text-[#d2bbff] transition-colors"
          >
            Overview
          </a>
          <a
            href="#projects"
            className="hover:text-[#d2bbff] transition-colors"
          >
            Projects
          </a>
          <a href="#skills" className="hover:text-[#d2bbff] transition-colors">
            Skills
          </a>
          <a
            href="#experience"
            className="hover:text-[#d2bbff] transition-colors"
          >
            Experience
          </a>
          <a href="#contact" className="hover:text-[#d2bbff] transition-colors">
            Contact
          </a>
        </nav>

        {/* Action Buttons */}
        <div className="flex items-center gap-3">
          <button
            onClick={handleDownloadResume}
            className="hidden sm:inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-[#ff6b35] hover:bg-[#ff5517] text-white font-medium text-xs font-mono shadow-[0_0_20px_-3px_rgba(255,107,53,0.45)] transition-all active:scale-95"
          >
            <Download className="w-4 h-4" />
            <span>Download Resume</span>
          </button>
          <a
            href="#contact"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-[#202026] hover:bg-[#282832] border border-[#27272e] text-[#f1f0f5] text-xs font-mono transition-all active:scale-95"
          >
            <MessageSquare className="w-4 h-4 text-[#d2bbff]" />
            <span>Get in Touch</span>
          </a>
        </div>
      </div>
    </header>
  );
};

// Hero Section
const Hero = () => {
  const email = "philip.oyelegbin.infra@gmail.com";

  return (
    <section
      id="overview"
      className="max-w-7xl mx-auto px-6 lg:px-12 pt-20 pb-16 lg:pt-28 lg:pb-24 flex flex-col gap-10"
    >
      {/* Eyebrow Badge */}
      <div>
        <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-[#18181c] border border-[#27272e] shadow-[0_0_24px_-8px_rgba(124,58,237,0.3)]">
          <span className="w-2 h-2 rounded-full bg-[#ff8c61] shadow-[0_0_8px_#ff8c61] animate-pulse"></span>
          <span className="font-mono text-xs uppercase tracking-wider text-[#9d9bb0]">
            4+ Years Enterprise Web Hosting &amp; Cloud Architecture
          </span>
        </div>
      </div>

      {/* Grid Content */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
        {/* Left Column */}
        <div className="lg:col-span-7 flex flex-col gap-6">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-semibold tracking-tight text-[#f1f0f5] leading-[1.12]">
            I bridge the gap between{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#ff8c61] to-amber-300">
              bulletproof infrastructure
            </span>{" "}
            and{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#d2bbff] to-purple-400">
              clean, scalable code.
            </span>
          </h1>
          <p className="text-lg sm:text-xl text-[#9d9bb0] font-normal leading-relaxed max-w-2xl">
            Senior Full-Stack &amp; DevOps Engineer specializing in Kubernetes
            orchestration, low-latency microservices, resilient CI/CD pipelines,
            and high-availability hosting platforms.
          </p>

          {/* Action CTAs */}
          <div className="flex flex-wrap items-center gap-4 pt-2">
            <a
              href="#projects"
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-lg bg-[#7c3aed] hover:bg-[#6d28d9] text-white font-medium text-sm transition-all shadow-[0_0_24px_-4px_rgba(124,58,237,0.5)] active:scale-95"
            >
              <span>Explore Projects</span>
              <ArrowDown className="w-4 h-4" />
            </a>
            <a
              href="#contact"
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-lg bg-[#18181c] hover:bg-[#202026] border border-[#27272e] text-[#f1f0f5] text-sm transition-all"
            >
              <Zap className="w-4 h-4 text-[#ff8c61]" />
              <span>Quick Contact</span>
            </a>

            {/* Email Copy Terminal Widget */}
            <div className="flex items-center gap-2 px-4 py-2.5 rounded-lg bg-[#0e0e11] border border-[#27272e] font-mono text-xs text-[#9d9bb0]">
              <span className="text-[#d2bbff] font-semibold">$</span>
              <span>{email}</span>
              <button
                onClick={() => copyToClipboard(email, "Email")}
                className="ml-2 text-[#9d9bb0] hover:text-white flex items-center p-1 rounded hover:bg-[#18181c] transition-colors"
                title="Copy email"
              >
                <Copy className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>

        {/* Right Column: Headshot Portrait Card */}
        <div className="lg:col-span-5 flex justify-center lg:justify-end">
          <div className="relative group">
            <div className="absolute -inset-1.5 bg-gradient-to-r from-[#7c3aed]/20 to-[#ff6b35]/20 rounded-2xl blur-xl opacity-75 group-hover:opacity-100 transition duration-300"></div>
            <div className="relative rounded-2xl bg-[#121215] border border-[#27272e] group-hover:border-[#d2bbff]/50 transition-all p-3 shadow-xl">
              <div className="relative overflow-hidden rounded-xl border border-[#202026]/40">
                <img
                  src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=800&auto=format&fit=crop"
                  alt="Philip Oyelegbin - Senior Full-Stack & DevOps Engineer"
                  className="w-full max-w-[340px] sm:max-w-[380px] h-[380px] sm:h-[420px] object-cover rounded-xl"
                />
                {/* Floating Availability Badge */}
                <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between px-3.5 py-2 rounded-lg bg-[#282832]/95 backdrop-blur-md border border-[#27272e]/60 shadow-lg">
                  <div className="flex items-center gap-2">
                    <span className="relative flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                    </span>
                    <span className="font-mono text-xs text-emerald-400 font-medium">
                      Available for Hire
                    </span>
                  </div>
                  <span className="font-mono text-[11px] text-[#9d9bb0]">
                    Remote / Global
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

// Projects Section
const ProjectsSection = () => {
  const { projectFilter, setProjectFilter } = usePortfolioStore();

  const filteredProjects = PROJECTS.filter((proj) => {
    if (projectFilter === "all") return true;
    return proj.category.includes(projectFilter);
  });

  return (
    <section
      id="projects"
      className="max-w-7xl mx-auto px-6 lg:px-12 py-20 border-t border-[#27272e]"
    >
      {/* Header & Filters */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
        <div>
          <div className="font-mono text-xs uppercase tracking-wider text-[#d2bbff] font-semibold mb-2 flex items-center gap-2">
            <Terminal className="w-4 h-4" />
            <span>Production Systems</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight text-[#f1f0f5]">
            Featured Production Systems
          </h2>
          <p className="text-sm text-[#9d9bb0] mt-2 max-w-xl">
            Real-world architectures battle-tested under heavy throughput,
            automated zero-downtime cutovers, and rigorous SLAs.
          </p>
        </div>

        {/* Filter Pills */}
        <div className="flex items-center gap-2 flex-wrap">
          {[
            { key: "all", label: "All Systems" },
            { key: "devops", label: "Cloud & DevOps" },
            { key: "fullstack", label: "Full-Stack Apps" },
            { key: "sre", label: "Infrastructure & SRE" },
          ].map((item) => (
            <button
              key={item.key}
              onClick={() => setProjectFilter(item.key)}
              className={`px-4 py-2 rounded-lg text-xs font-mono font-medium transition-all ${
                projectFilter === item.key
                  ? "bg-[#7c3aed] text-white"
                  : "bg-[#18181c] text-[#9d9bb0] hover:text-white border border-[#27272e]"
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>
      </div>

      {/* Grid of Projects */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {filteredProjects.map((project) => {
          const FlowIconComponent = project.flowIcon;
          const isPrimary = project.highlightColor === "primary";

          return (
            <article
              key={project.id}
              className={`flex flex-col justify-between p-7 rounded-2xl bg-[#121215] border border-[#27272e] transition-all duration-300 group hover:shadow-xl ${
                isPrimary
                  ? "hover:border-[#d2bbff]/50 hover:shadow-[0_8px_32px_rgba(124,58,237,0.12)]"
                  : "hover:border-[#ff8c61]/50 hover:shadow-[0_8px_32px_rgba(255,107,53,0.12)]"
              }`}
            >
              <div className="flex flex-col gap-5">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-48 object-cover rounded-xl border border-[#202026]/40 mb-4"
                />
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <span
                      className={`font-mono text-[11px] uppercase tracking-wider ${
                        isPrimary ? "text-[#d2bbff]" : "text-[#ff8c61]"
                      }`}
                    >
                      {project.codeTag}
                    </span>
                    <h3
                      className={`text-xl font-semibold text-[#f1f0f5] mt-1 transition-colors ${
                        isPrimary
                          ? "group-hover:text-[#d2bbff]"
                          : "group-hover:text-[#ff8c61]"
                      }`}
                    >
                      {project.title}
                    </h3>
                  </div>
                  <span className="font-mono text-[11px] px-3 py-1 rounded-full bg-[#ff6b35]/10 border border-[#ff8c61]/30 text-[#ff8c61] whitespace-nowrap">
                    {project.sla}
                  </span>
                </div>
                <p className="text-sm text-[#9d9bb0] leading-relaxed">
                  {project.description}
                </p>

                {/* Architecture Summary Bar */}
                <div className="p-3.5 rounded-xl bg-[#0e0e11] border border-[#27272e]/60 font-mono text-xs flex items-center justify-between gap-2 text-[#9d9bb0]">
                  <span className="flex items-center gap-2 text-[#f1f0f5]">
                    <FlowIconComponent
                      className={`w-4 h-4 ${isPrimary ? "text-[#d2bbff]" : "text-[#ff8c61]"}`}
                    />
                    <span>{project.flowText}</span>
                  </span>
                  <span
                    className={`font-medium text-[11px] ${isPrimary ? "text-[#d2bbff]" : "text-[#ff8c61]"}`}
                  >
                    {project.buildMetric}
                  </span>
                </div>
              </div>

              {/* Card Footer Tags & Action */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mt-6 pt-5 border-t border-[#27272e]/60">
                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag, idx) => (
                    <span
                      key={idx}
                      className="px-2.5 py-1 rounded-md bg-[#202026] text-xs font-mono text-[#f1f0f5]"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <a
                  href="#contact"
                  className={`inline-flex items-center gap-1.5 text-xs font-mono hover:text-white transition-colors ${
                    isPrimary ? "text-[#d2bbff]" : "text-[#ff8c61]"
                  }`}
                >
                  <span>Request Topology</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
};

// Skills Matrix Section
const SkillsSection = () => {
  const { skillFilter, setSkillFilter } = usePortfolioStore();

  const filteredSkills = SKILLS.filter((sk) => {
    if (skillFilter === "all") return true;
    return sk.category === skillFilter;
  });

  return (
    <section
      id="skills"
      className="max-w-7xl mx-auto px-6 lg:px-12 py-20 border-t border-[#27272e]"
    >
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
        <div>
          <div className="font-mono text-xs uppercase tracking-wider text-[#ff8c61] font-semibold mb-2 flex items-center gap-2">
            <Cpu className="w-4 h-4" />
            <span>Stack Matrix</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight text-[#f1f0f5]">
            Technical Core &amp; Capabilities
          </h2>
          <p className="text-sm text-[#9d9bb0] mt-2 max-w-xl">
            A comprehensive matrix of technologies utilized across 4+ years of
            cloud architecture and production web development.
          </p>
        </div>

        {/* Skill Category Filters */}
        <div className="flex items-center gap-2 flex-wrap">
          {[
            { key: "all", label: "All Capabilities" },
            { key: "cloud", label: "Cloud & Infrastructure" },
            { key: "backend", label: "Backend & Systems" },
            { key: "frontend", label: "Frontend Engineering" },
            { key: "observability", label: "DevOps & Observability" },
          ].map((item) => (
            <button
              key={item.key}
              onClick={() => setSkillFilter(item.key)}
              className={`px-4 py-2 rounded-lg text-xs font-mono font-medium transition-all ${
                skillFilter === item.key
                  ? "bg-[#ff6b35] text-white"
                  : "bg-[#18181c] text-[#9d9bb0] hover:text-white border border-[#27272e]"
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>
      </div>

      {/* Grid of Skills */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {filteredSkills.map((skill) => {
          const IconComponent = skill.icon;
          const isPrimary = skill.theme === "primary";

          return (
            <div
              key={skill.id}
              className="p-6 rounded-2xl bg-[#121215] border border-[#27272e] flex flex-col justify-between gap-6 hover:border-[#4a4857] transition-all"
            >
              <div className="flex flex-col gap-4">
                <div
                  className={`w-12 h-12 rounded-xl bg-[#202026] border border-[#27272e] flex items-center justify-center ${
                    isPrimary ? "text-[#d2bbff]" : "text-[#ff8c61]"
                  }`}
                >
                  <IconComponent className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-semibold text-base text-[#f1f0f5]">
                    {skill.title}
                  </h4>
                  <p className="text-xs text-[#9d9bb0] mt-1">
                    {skill.description}
                  </p>
                </div>
                <div className="flex flex-wrap gap-1.5 pt-2">
                  {skill.tags.map((tag, i) => (
                    <span
                      key={i}
                      className="px-2 py-1 rounded bg-[#202026] text-xs font-mono text-[#f1f0f5]"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              <div
                className={`text-[11px] font-mono pt-3 border-t border-[#27272e]/60 flex items-center justify-between ${
                  isPrimary ? "text-[#d2bbff]" : "text-[#ff8c61]"
                }`}
              >
                <span>Proficiency</span>
                <span className="font-semibold">{skill.proficiency}</span>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

// Experience Timeline Section
const ExperienceSection = () => {
  return (
    <section
      id="experience"
      className="max-w-7xl mx-auto px-6 lg:px-12 py-20 border-t border-[#27272e]"
    >
      <div className="flex flex-col mb-10">
        <div className="font-mono text-xs uppercase tracking-wider text-[#d2bbff] font-semibold mb-2">
          Track Record
        </div>
        <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight text-[#f1f0f5]">
          Career Experience &amp; Impact
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="p-6 rounded-2xl bg-[#121215] border border-[#27272e] flex flex-col justify-between">
          <div>
            <div className="font-mono text-xs text-[#d2bbff] font-medium">
              2022 — Present
            </div>
            <h3 className="text-lg font-semibold text-[#f1f0f5] mt-1">
              Senior Cloud Infrastructure Engineer
            </h3>
            <div className="text-xs text-[#9d9bb0] mt-0.5">
              Global Web Hosting Solutions
            </div>
            <p className="text-sm text-[#9d9bb0] mt-4 leading-relaxed">
              Spearheaded migration of 140+ bare-metal workloads to multi-region
              AWS EKS. Designed automated failover mechanisms resulting in
              99.99% uptime compliance.
            </p>
          </div>
          <div className="mt-6 pt-4 border-t border-[#27272e]/60 font-mono text-xs text-[#ff8c61]">
            Role: Tech Lead &amp; DevOps
          </div>
        </div>

        <div className="p-6 rounded-2xl bg-[#121215] border border-[#27272e] flex flex-col justify-between">
          <div>
            <div className="font-mono text-xs text-[#ff8c61] font-medium">
              2020 — 2022
            </div>
            <h3 className="text-lg font-semibold text-[#f1f0f5] mt-1">
              Full-Stack &amp; DevOps Engineer
            </h3>
            <div className="text-xs text-[#9d9bb0] mt-0.5">
              ScaleCloud Infrastructure
            </div>
            <p className="text-sm text-[#9d9bb0] mt-4 leading-relaxed">
              Engineered low-latency customer edge telemetry dashboards in React
              &amp; Node.js while maintaining Envoy-based traffic shaping and
              containerized microservices.
            </p>
          </div>
          <div className="mt-6 pt-4 border-t border-[#27272e]/60 font-mono text-xs text-[#d2bbff]">
            Role: Full-Stack Dev &amp; SRE
          </div>
        </div>

        <div className="p-6 rounded-2xl bg-[#121215] border border-[#27272e] flex flex-col justify-between">
          <div>
            <div className="font-mono text-xs text-[#d2bbff] font-medium">
              2019 — 2020
            </div>
            <h3 className="text-lg font-semibold text-[#f1f0f5] mt-1">
              L2/L3 Systems &amp; Hosting Specialist
            </h3>
            <div className="text-xs text-[#9d9bb0] mt-0.5">
              Enterprise Cloud Host
            </div>
            <p className="text-sm text-[#9d9bb0] mt-4 leading-relaxed">
              Conducted incident triage, root cause analysis on production Linux
              systems, Nginx tuning, and zero-downtime DB migrations across
              50,000+ client domains.
            </p>
          </div>
          <div className="mt-6 pt-4 border-t border-[#27272e]/60 font-mono text-xs text-[#ff8c61]">
            Role: L3 Infrastructure Triage
          </div>
        </div>
      </div>
    </section>
  );
};

// Certifications Section
const CertificationsSection = () => {
  return (
    <section
      id="certifications"
      className="max-w-7xl mx-auto px-6 lg:px-12 py-20 border-t border-[#27272e]"
    >
      <div className="flex flex-col mb-10">
        <div className="font-mono text-xs uppercase tracking-wider text-[#d2bbff] font-semibold mb-2 flex items-center gap-2">
          <BadgeCheck className="w-4 h-4" />
          <span>Accreditations &amp; Verification</span>
        </div>
        <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight text-[#f1f0f5]">
          Certifications &amp; Credentials
        </h2>
        <p className="text-sm text-[#9d9bb0] mt-2 max-w-xl">
          Industry-recognized engineering, cloud architecture, and security
          credentials.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {CERTIFICATIONS.map((cert) => {
          const IconComp = cert.icon;
          const isPrimary = cert.theme === "primary";

          return (
            <div
              key={cert.id}
              className={`p-6 rounded-2xl bg-[#121215] border border-[#27272e] flex flex-col justify-between gap-5 transition-all ${
                isPrimary
                  ? "hover:border-[#d2bbff]/50"
                  : "hover:border-[#ff8c61]/50"
              }`}
            >
              <div className="flex flex-col gap-3">
                <div className="flex items-start justify-between gap-3">
                  <div
                    className={`w-12 h-12 rounded-xl bg-[#202026] border border-[#27272e] flex items-center justify-center ${
                      isPrimary ? "text-[#d2bbff]" : "text-[#ff8c61]"
                    }`}
                  >
                    <IconComp className="w-6 h-6" />
                  </div>
                  <span className="font-mono text-[11px] px-2.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 font-medium flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                    Verified Active
                  </span>
                </div>
                <div>
                  <h3 className="font-semibold text-lg text-[#f1f0f5]">
                    {cert.title}
                  </h3>
                  <div className="text-xs text-[#9d9bb0] mt-0.5">
                    {cert.issuer}
                  </div>
                </div>
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {cert.tags.map((t, idx) => (
                    <span
                      key={idx}
                      className="px-2.5 py-1 rounded-md bg-[#202026] text-xs font-mono text-[#f1f0f5]"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              <div className="pt-4 border-t border-[#27272e]/60 flex items-center justify-between text-xs font-mono">
                <span className="text-[#4a4857]">ID: {cert.certId}</span>
                <span
                  className={`flex items-center gap-1 cursor-pointer hover:text-white ${
                    isPrimary ? "text-[#d2bbff]" : "text-[#ff8c61]"
                  }`}
                  onClick={() =>
                    toast.success(`Verified credential ID: ${cert.certId}`)
                  }
                >
                  <span>Verify Badge</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

// Contact & Feedback Section with Form
const ContactSection = () => {
  const { selectedRating, setSelectedRating } = usePortfolioStore();

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(contactSchema),
    defaultValues: {
      overallRating: 5,
      infraRating: "exceptional",
      codeRating: "exceptional",
    },
  });

  const onSubmit = (data) => {
    toast.custom(
      (t) => (
        <div
          className={`${
            t.visible ? "animate-enter" : "animate-leave"
          } max-w-md w-full bg-[#202026] border border-emerald-500/40 text-[#f1f0f5] shadow-2xl rounded-xl p-4 flex items-center gap-3`}
        >
          <CheckCircle className="w-6 h-6 text-emerald-400 flex-shrink-0" />
          <div className="font-mono text-xs">
            <p className="font-semibold text-emerald-400">
              Feedback Submitted!
            </p>
            <p className="text-[#9d9bb0] mt-0.5">
              Thank you, intro requested for {data.email}
            </p>
          </div>
        </div>
      ),
      { duration: 4000 },
    );
    reset();
    setSelectedRating(5);
  };

  const directEmail = "philip.oyelegbin.infra@gmail.com";

  return (
    <section
      id="contact"
      className="max-w-7xl mx-auto px-6 lg:px-12 py-20 border-t border-[#27272e]"
    >
      <div className="flex flex-col mb-12">
        <div className="font-mono text-xs uppercase tracking-wider text-[#ff8c61] font-semibold mb-2 flex items-center gap-2">
          <Mail className="w-4 h-4" />
          <span>Fast-Track Recruiter Triage</span>
        </div>
        <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight text-[#f1f0f5]">
          Let's Connect &amp; Collaborate
        </h2>
        <p className="text-sm text-[#9d9bb0] mt-2 max-w-xl">
          Interested in bringing senior infrastructure resilience or full-stack
          engineering to your engineering organization?
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        {/* Left Column: Direct Contact Cards */}
        <div className="lg:col-span-5 flex flex-col gap-6">
          <div className="p-6 rounded-2xl bg-[#121215] border border-[#27272e] flex flex-col gap-6">
            <div className="flex items-center justify-between pb-3 border-b border-[#27272e]/60">
              <div className="flex items-center gap-2.5">
                <FileText className="w-5 h-5 text-[#d2bbff]" />
                <span className="font-mono text-sm font-semibold text-[#f1f0f5]">
                  Direct Contact Information
                </span>
              </div>
              <span className="font-mono text-[11px] text-emerald-400 font-medium px-2 py-0.5 rounded bg-emerald-500/10 border border-emerald-500/20">
                Available
              </span>
            </div>

            <div className="flex flex-col gap-4 text-xs font-mono">
              <div className="flex flex-col gap-1.5">
                <span className="text-[#4a4857] uppercase text-[10px] tracking-wider">
                  Direct Email
                </span>
                <div className="flex items-center justify-between p-3 rounded-xl bg-[#0e0e11] border border-[#27272e]">
                  <span className="text-[#f1f0f5] font-medium select-all">
                    {directEmail}
                  </span>
                  <button
                    type="button"
                    onClick={() => copyToClipboard(directEmail, "Email")}
                    className="px-2.5 py-1 rounded-md bg-[#202026] hover:bg-[#282832] text-[#d2bbff] flex items-center gap-1 transition-colors"
                  >
                    <Copy className="w-3.5 h-3.5" />
                    <span>Copy</span>
                  </button>
                </div>
              </div>

              <div className="flex flex-col gap-1.5">
                <span className="text-[#4a4857] uppercase text-[10px] tracking-wider">
                  Direct Phone / Signal
                </span>
                <div className="flex items-center justify-between p-3 rounded-xl bg-[#0e0e11] border border-[#27272e]">
                  <span className="text-[#f1f0f5] font-medium">
                    +1 (415) 890-3412
                  </span>
                  <span className="text-[#9d9bb0] text-[11px]">
                    Signal Verified
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 pt-1">
                <div className="p-3 rounded-xl bg-[#0e0e11] border border-[#27272e] flex flex-col gap-1">
                  <span className="text-[#4a4857] text-[10px] uppercase">
                    Location
                  </span>
                  <span className="text-[#f1f0f5] font-medium">
                    SF, CA (PST / UTC-8)
                  </span>
                  <span className="text-[10px] text-[#9d9bb0]">
                    Remote &amp; Hybrid
                  </span>
                </div>
                <div className="p-3 rounded-xl bg-[#0e0e11] border border-[#27272e] flex flex-col gap-1">
                  <span className="text-[#4a4857] text-[10px] uppercase">
                    Response SLA
                  </span>
                  <span className="text-[#ff8c61] font-medium">
                    &lt; 12 hours guaranteed
                  </span>
                  <span className="text-[10px] text-[#9d9bb0]">
                    P1 Priority
                  </span>
                </div>
              </div>

              <div className="p-3 rounded-xl bg-[#0e0e11] border border-[#27272e] flex items-center gap-2.5 text-[#9d9bb0]">
                <Calendar className="w-4 h-4 text-[#d2bbff]" />
                <span className="text-[11px]">
                  Available for Enterprise &amp; Lead Roles
                </span>
              </div>
            </div>

            {/* Social Links */}
            <div className="pt-2 border-t border-[#27272e]/60 flex flex-col gap-2.5">
              <span className="font-mono text-[10px] uppercase text-[#4a4857] tracking-wider">
                Profiles &amp; Ecosystem
              </span>
              <div className="grid grid-cols-4 gap-2.5">
                {[
                  {
                    name: "GitHub",
                    icon: Code,
                    url: "https://github.com",
                    theme: "primary",
                  },
                  {
                    name: "LinkedIn",
                    icon: FileText,
                    url: "https://linkedin.com",
                    theme: "secondary",
                  },
                  {
                    name: "Twitter/X",
                    icon: Share2,
                    url: "https://x.com",
                    theme: "primary",
                  },
                  {
                    name: "Medium",
                    icon: FileText,
                    url: "https://medium.com",
                    theme: "secondary",
                  },
                ].map((soc, idx) => {
                  const IconComp = soc.icon;
                  return (
                    <a
                      key={idx}
                      href={soc.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex flex-col items-center justify-center p-2.5 rounded-xl bg-[#0e0e11] border border-[#27272e] text-[#9d9bb0] hover:text-white transition-all group"
                    >
                      <IconComp
                        className={`w-4 h-4 ${soc.theme === "primary" ? "group-hover:text-[#d2bbff]" : "group-hover:text-[#ff8c61]"}`}
                      />
                      <span className="font-mono text-[10px] mt-1">
                        {soc.name}
                      </span>
                    </a>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Feedback & Review Form */}
        <div className="lg:col-span-7">
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="p-8 rounded-2xl bg-[#121215] border border-[#27272e] flex flex-col gap-6 shadow-xl"
          >
            <div className="flex items-center justify-between pb-3 border-b border-[#27272e]/60">
              <div>
                <h3 className="text-lg font-semibold text-[#f1f0f5]">
                  Share Your Feedback &amp; Ratings
                </h3>
                <p className="text-xs text-[#9d9bb0] mt-0.5">
                  Review portfolio depth, evaluate system architectures, or
                  request discussion.
                </p>
              </div>
              <span className="font-mono text-xs text-[#ff8c61] font-medium px-2.5 py-1 rounded bg-[#ff6b35]/10 border border-[#ff6b35]/20">
                Evaluation v2.4
              </span>
            </div>

            {/* Inputs Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="flex flex-col gap-2">
                <label className="font-mono text-xs text-[#9d9bb0]">
                  Full Name *
                </label>
                <input
                  type="text"
                  placeholder="Sarah Jenkins"
                  {...register("fullName")}
                  className="w-full px-4 py-3 rounded-xl bg-[#0e0e11] border border-[#27272e] text-[#f1f0f5] placeholder:text-[#4a4857] text-sm focus:outline-none focus:border-[#d2bbff] transition-colors"
                />
                {errors.fullName && (
                  <span className="font-mono text-[11px] text-red-400">
                    {errors.fullName.message}
                  </span>
                )}
              </div>

              <div className="flex flex-col gap-2">
                <label className="font-mono text-xs text-[#9d9bb0]">
                  Work Email *
                </label>
                <input
                  type="email"
                  placeholder="sarah@company.com"
                  {...register("email")}
                  className="w-full px-4 py-3 rounded-xl bg-[#0e0e11] border border-[#27272e] text-[#f1f0f5] placeholder:text-[#4a4857] text-sm focus:outline-none focus:border-[#d2bbff] transition-colors"
                />
                {errors.email && (
                  <span className="font-mono text-[11px] text-red-400">
                    {errors.email.message}
                  </span>
                )}
              </div>
            </div>

            {/* Star Rating Options */}
            <div className="flex flex-col gap-2.5">
              <label className="font-mono text-xs text-[#9d9bb0]">
                Overall Rating *
              </label>
              <div className="grid grid-cols-5 gap-2">
                {[5, 4, 3, 2, 1].map((star) => (
                  <label
                    key={star}
                    onClick={() => {
                      setSelectedRating(star);
                      setValue("overallRating", star);
                    }}
                    className={`cursor-pointer p-2 rounded-xl bg-[#0e0e11] border flex flex-col items-center justify-center gap-1 text-center transition-all ${
                      selectedRating === star
                        ? "border-[#ff8c61] bg-[#ff6b35]/10"
                        : "border-[#27272e] hover:border-[#ff8c61]/50"
                    }`}
                  >
                    <input
                      type="radio"
                      value={star}
                      {...register("overallRating")}
                      className="hidden"
                    />
                    <span className="text-sm text-[#ff8c61]">
                      {"★".repeat(star)}
                      {"☆".repeat(5 - star)}
                    </span>
                    <span
                      className={`font-mono text-[10px] font-medium ${
                        selectedRating === star
                          ? "text-[#ff8c61]"
                          : "text-[#9d9bb0]"
                      }`}
                    >
                      {star} {star === 1 ? "Star" : "Stars"}
                    </span>
                  </label>
                ))}
              </div>
            </div>

            {/* Ratings Selects */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="flex flex-col gap-1.5">
                <label className="font-mono text-xs text-[#9d9bb0]">
                  Infrastructure Rigor
                </label>
                <select
                  {...register("infraRating")}
                  className="w-full px-3 py-2.5 rounded-xl bg-[#0e0e11] border border-[#27272e] text-[#f1f0f5] text-xs font-mono focus:outline-none focus:border-[#d2bbff] transition-colors"
                >
                  <option value="exceptional">
                    Exceptional / Production Grade
                  </option>
                  <option value="strong">Strong / Highly Capable</option>
                  <option value="solid">Solid Fundamentals</option>
                </select>
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="font-mono text-xs text-[#9d9bb0]">
                  Code Quality &amp; Clarity
                </label>
                <select
                  {...register("codeRating")}
                  className="w-full px-3 py-2.5 rounded-xl bg-[#0e0e11] border border-[#27272e] text-[#f1f0f5] text-xs font-mono focus:outline-none focus:border-[#d2bbff] transition-colors"
                >
                  <option value="exceptional">
                    Clean &amp; Architecturally Sound
                  </option>
                  <option value="strong">Well-Structured</option>
                  <option value="acceptable">Standard</option>
                </select>
              </div>
            </div>

            {/* Message Textarea */}
            <div className="flex flex-col gap-2">
              <label className="font-mono text-xs text-[#9d9bb0]">
                Comment / Message *
              </label>
              <textarea
                rows={4}
                placeholder="Share your feedback, architectural critique, or project impressions..."
                {...register("message")}
                className="w-full px-4 py-3 rounded-xl bg-[#0e0e11] border border-[#27272e] text-[#f1f0f5] placeholder:text-[#4a4857] text-sm focus:outline-none focus:border-[#d2bbff] transition-colors resize-none"
              />
              {errors.message && (
                <span className="font-mono text-[11px] text-red-400">
                  {errors.message.message}
                </span>
              )}
            </div>

            {/* Submit Bar */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2 border-t border-[#27272e]/60">
              <span className="text-xs text-[#4a4857] font-mono flex items-center gap-1.5">
                <Lock className="w-4 h-4 text-emerald-400" />
                <span>Encrypted / Secure transmission via TLS 1.3</span>
              </span>
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-[#ff6b35] hover:bg-[#ff5517] text-white font-medium text-xs font-mono shadow-[0_0_20px_-3px_rgba(255,107,53,0.5)] transition-all active:scale-95 disabled:opacity-50"
              >
                <span>Submit Feedback &amp; Review</span>
                <Send className="w-4 h-4" />
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

// Footer Component
const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="w-full border-t border-[#27272e] bg-[#0a0a0c] py-10 mt-auto">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <span className="font-mono text-xs font-semibold text-[#d2bbff]">
            PHILIP_OYELEGBIN // SYS::ARCH
          </span>
          <span className="text-[#4a4857] font-mono text-xs">
            © 2026 Philip Oyelegbin. All rights reserved.
          </span>
        </div>

        {/* Live Status Badge */}
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#18181c] border border-[#27272e]">
          <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
          <span className="font-mono text-[11px] text-[#9d9bb0]">
            All systems operational (99.99%)
          </span>
        </div>

        {/* Quick Links & Back to Top */}
        <div className="flex items-center gap-6 text-xs font-mono text-[#9d9bb0]">
          <a
            href="#overview"
            className="hover:text-[#d2bbff] transition-colors"
          >
            Overview
          </a>
          <a
            href="#projects"
            className="hover:text-[#d2bbff] transition-colors"
          >
            Projects
          </a>
          <a href="#skills" className="hover:text-[#d2bbff] transition-colors">
            Skills
          </a>
          <a href="#contact" className="hover:text-[#d2bbff] transition-colors">
            Contact
          </a>
          <button
            onClick={scrollToTop}
            className="flex items-center gap-1 text-[#d2bbff] hover:text-white transition-colors"
          >
            <span>Top</span>
            <ChevronUp className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </footer>
  );
};

// ==========================================
// 5. MAIN APP COMPONENT
// ==========================================
export default function App() {
  return (
    <div className="bg-[#0a0a0c] text-[#f1f0f5] selection:bg-[#7c3aed] selection:text-[#f5f0ff] antialiased min-h-screen flex flex-col font-sans">
      <Toaster position="top-right" />
      <Header />
      <main className="grow">
        <Hero />
        <ProjectsSection />
        <SkillsSection />
        <ExperienceSection />
        <CertificationsSection />
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
}

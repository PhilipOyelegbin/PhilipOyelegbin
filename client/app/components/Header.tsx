"use client";

import { Code2, Eye } from "lucide-react";
import Link from "next/link";
import LinkBtn from "./ui/Btn";

const NAV_LINKS = [
  { label: "Overview", href: "#overview" },
  { label: "Projects", href: "#projects" },
  { label: "Skills", href: "#skills" },
  { label: "Experience", href: "#experience" },
  { label: "Contact", href: "#contact" },
];

function Header() {
  return (
    <header className="sticky top-0 w-full z-50 bg-[#0a0a0c]/80 backdrop-blur-xl border-b border-[#27272e]">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 h-20 flex items-center justify-between gap-5">
        <Link href="/" className="flex items-center gap-1 group">
          <Code2 className="w-10 h-10 text-emerald-500" />
          <span className="font-semibold text-xl tracking-tight text-[#f1f0f5] group-hover:text-[#d2bbff] transition-colors">
            Philip Oyelegbin
          </span>
        </Link>

        {/* Navigation Links */}
        <nav className="hidden md:flex items-center gap-4 text-sm font-mono text-[#9d9bb0]">
          {NAV_LINKS.map((link, idx) => (
            <Link
              key={idx}
              href={link.href}
              className="hover:text-[#d2bbff] transition-colors"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Action Buttons */}
        <LinkBtn
          url={process.env.NEXT_PUBLIC_CV_URL || "/"}
          style="cursor-pointer inline-flex items-center gap-1 px-4 py-2 rounded-lg bg-[#ff6b35] hover:bg-[#ff5517] text-white font-medium text-xs font-mono shadow-[0_0_20px_-3px_rgba(255,107,53,0.45)] transition-all active:scale-95"
          label="View Resume"
          icon={<Eye className="w-4 h-4" />}
        />
      </div>
    </header>
  );
}

export default Header;

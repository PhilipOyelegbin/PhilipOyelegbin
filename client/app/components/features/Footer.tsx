"use client";

import { NAV_LINKS } from "@/app/common/data";
import { ChevronUp } from "lucide-react";
import Link from "next/link";

function Footer() {
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

        {/* Quick Links & Back to Top */}
        <div className="flex flex-wrap items-center gap-6 text-xs font-mono text-[#9d9bb0]">
          {NAV_LINKS.map((link, idx) => (
            <Link
              key={idx}
              href={link.href}
              className="hover:text-[#d2bbff] transition-colors"
            >
              {link.label}
            </Link>
          ))}

          <button
            onClick={scrollToTop}
            className="cursor-pointer flex items-center gap-1 text-[#d2bbff] hover:text-white transition-colors"
          >
            <span>Top</span>
            <ChevronUp className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </footer>
  );
}

export default Footer;

"use client";

import { ArrowDown, CheckCircle, Copy, Zap } from "lucide-react";
import Image from "next/image";
import toast from "react-hot-toast";
import LinkBtn from "../ui/Btn";
import { directEmail } from "@/app/common/data";

function Hero() {
  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text).then(
      () => {
        toast.custom(
          (t) => (
            <div
              className={`${
                t.visible ? "animate-enter" : "animate-leave"
              } max-w-md w-full bg-[#282832]/95 border border-[#d2bbff]/30 text-[#f1f0f5] shadow-[0_12px_40px_rgba(0,0,0,0.8)] backdrop-blur-md rounded-xl p-4 flex items-center gap-3 pointer-events-auto`}
            >
              <CheckCircle className="w-5 h-5 text-[#d2bbff] shrink-0" />
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

  return (
    <section
      id="overview"
      className="max-w-7xl mx-auto px-6 lg:px-12 pt-10 pb-16 lg:pt-20 lg:pb-20 flex flex-col gap-10"
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
          <h1 className="text-4xl md:text-5xl font-semibold tracking-tight text-[#f1f0f5] leading-[1.12]">
            I bridge the gap between{" "}
            <span className="text-transparent bg-clip-text bg-linear-to-r from-[#ff8c61] to-amber-300">
              bulletproof infrastructure
            </span>{" "}
            and{" "}
            <span className="text-transparent bg-clip-text bg-linear-to-r from-[#d2bbff] to-purple-400">
              clean, scalable code.
            </span>
          </h1>
          <p className="text-lg md:text-xl text-[#9d9bb0] font-normal leading-relaxed max-w-2xl">
            Full-Stack &amp; DevOps Engineer specializing in Kubernetes
            orchestration, low-latency microservices, resilient CI/CD pipelines,
            and high-availability hosting platforms.
          </p>

          {/* Action CTAs */}
          <div className="flex flex-wrap items-center gap-4 pt-2">
            <LinkBtn
              url="#projects"
              style="inline-flex items-center gap-2 px-6 py-3.5 rounded-lg bg-[#7c3aed] hover:bg-[#6d28d9] text-white font-medium text-sm transition-all shadow-[0_0_24px_-4px_rgba(124,58,237,0.5)] active:scale-95"
              label="Explore Projects"
              icon={<ArrowDown className="w-4 h-4" />}
            />
            <LinkBtn
              url="#contact"
              style="inline-flex items-center gap-2 px-6 py-3.5 rounded-lg bg-[#18181c] hover:bg-[#202026] border border-[#27272e] text-[#f1f0f5] text-sm transition-all"
              label="Quick Contact"
              icon={<Zap className="w-4 h-4 text-[#ff8c61]" />}
            />

            {/* Email Copy Terminal Widget */}
            <div className="flex items-center gap-2 px-4 py-2.5 rounded-lg bg-[#0e0e11] border border-[#27272e] font-mono text-xs text-[#9d9bb0]">
              <span className="text-[#d2bbff] font-semibold">$</span>
              <span>{directEmail}</span>
              <button
                onClick={() => copyToClipboard(directEmail, "Email")}
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
            <div className="absolute -inset-1.5 bg-linear-to-r from-[#7c3aed]/20 to-[#ff6b35]/20 rounded-2xl blur-xl opacity-75 group-hover:opacity-100 transition duration-300"></div>
            <div className="relative rounded-2xl bg-[#121215] border border-[#27272e] group-hover:border-[#d2bbff]/50 transition-all p-3 shadow-xl">
              <div className="relative overflow-hidden rounded-xl border border-[#202026]/40">
                <Image
                  src="/profile.png"
                  width={300}
                  height={300}
                  alt="Philip Oyelegbin - Full-Stack & DevOps Engineer"
                  className="w-full max-w-85 sm:max-w-95 h-95 sm:h-105 object-cover rounded-xl"
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
}

export default Hero;

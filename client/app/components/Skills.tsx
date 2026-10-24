"use client";

import { Cpu } from "lucide-react";
import { SKILLS } from "../common/data";
import { usePortfolioStore } from "../stores/usePortfolioStore";

function Skills() {
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
              className={`cursor-pointer px-4 py-2 rounded-lg text-xs font-mono font-medium transition-all ${
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
            </div>
          );
        })}
      </div>
    </section>
  );
}

export default Skills;

"use client";

import { useCallback, useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import {
  ChevronLeft,
  ChevronRight,
  Code,
  ExternalLink,
  Terminal,
} from "lucide-react";
import { usePortfolioStore } from "../../stores/usePortfolioStore";
import Image from "next/image";
import Loading from "../ui/Loading";
import Link from "next/link";

function Projects() {
  const {
    projects,
    projectFilter,
    setProjectFilter,
    isLoading,
    error,
    getProjects,
  } = usePortfolioStore();
  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: "start",
    containScroll: "trimSnaps",
  });
  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(false);

  const filteredProjects = projects.filter((proj) => {
    if (projectFilter === "all") return true;
    return proj?.tag?.includes(projectFilter);
  });

  useEffect(() => {
    (async () => {
      await getProjects();
    })();
  }, [getProjects]);

  const updateScrollState = useCallback(() => {
    if (!emblaApi) {
      return;
    }

    setCanScrollPrev(emblaApi.canScrollPrev());
    setCanScrollNext(emblaApi.canScrollNext());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) {
      return;
    }

    const frameId = requestAnimationFrame(updateScrollState);
    emblaApi.on("select", updateScrollState);
    emblaApi.on("reInit", updateScrollState);

    return () => {
      cancelAnimationFrame(frameId);
      emblaApi.off("select", updateScrollState);
      emblaApi.off("reInit", updateScrollState);
    };
  }, [emblaApi, updateScrollState]);

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
          <h2 className="text-3xl md:text-4xl font-semibold tracking-tight text-[#f1f0f5]">
            Featured Production Systems
          </h2>
          <p className="text-sm text-[#9d9bb0] mt-2 max-w-xl">
            Real-world architectures battle-tested under heavy throughput,
            automated zero-downtime cutovers, and rigorous SLAs.
          </p>
        </div>

        <div className="flex flex-col items-end gap-3">
          {/* Filter Pills */}
          <div className="flex items-center gap-2 flex-wrap justify-end">
            {[
              { key: "all", label: "All Systems" },
              { key: "Cloud", label: "Cloud & DevOps" },
              { key: "Web", label: "Full-Stack Apps" },
            ].map((item) => (
              <button
                key={item.key}
                onClick={() => setProjectFilter(item.key)}
                className={`cursor-pointer px-4 py-2 rounded-lg text-xs font-mono font-medium transition-all ${
                  projectFilter === item.key
                    ? "bg-[#7c3aed] text-white"
                    : "bg-[#18181c] text-[#9d9bb0] hover:text-white border border-[#27272e]"
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => emblaApi?.scrollPrev()}
              disabled={!canScrollPrev}
              aria-label="Previous projects"
              className="flex items-center justify-center w-10 h-10 rounded-xl bg-[#121215] border border-[#27272e] text-[#d2bbff] transition-colors hover:border-[#d2bbff] disabled:opacity-40 disabled:cursor-not-allowed"
            >
              <ChevronLeft className="cursor-pointer w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={() => emblaApi?.scrollNext()}
              disabled={!canScrollNext}
              aria-label="Next projects"
              className="flex items-center justify-center w-10 h-10 rounded-xl bg-[#121215] border border-[#27272e] text-[#d2bbff] transition-colors hover:border-[#d2bbff] disabled:opacity-40 disabled:cursor-not-allowed"
            >
              <ChevronRight className="cursor-pointer w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {isLoading ? (
        <Loading />
      ) : error ? (
        <p className="text-red-500 text-xs">{error}</p>
      ) : (
        <div className="overflow-hidden" ref={emblaRef}>
          <div className="flex -ml-6">
            {filteredProjects.map((project) => (
              <div
                key={project?._id}
                className="min-w-0 flex-[0_0_100%] pl-6 md:flex-[0_0_50%] lg:flex-[0_0_50%]"
              >
                <article className="h-full flex flex-col justify-between p-7 rounded-2xl bg-[#121215] border border-[#27272e] transition-all duration-300 group hover:border-[#ff8c61]/50 hover:shadow-[0_8px_32px_rgba(255,107,53,0.12)]">
                  <div className="flex flex-col gap-5">
                    <Image
                      src={project?.cover_image}
                      alt={project?.title}
                      width={600}
                      height={400}
                      className="w-full h-48 object-cover rounded-xl border border-[#202026]/40 mb-4"
                    />
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <span className="font-mono text-[11px] uppercase tracking-wider text-[#7c3aed]">
                          {project?.tag}
                        </span>
                        <h3 className="text-xl font-semibold text-[#f1f0f5] mt-1 transition-colors group-hover:text-[#ff8c61]">
                          {project?.title}
                        </h3>
                      </div>
                    </div>
                    <p className="text-sm text-[#9d9bb0] leading-relaxed">
                      {project?.description}
                    </p>

                    <div className="w-fit p-3.5 rounded-xl bg-[#0e0e11] border border-[#27272e]/60 font-mono text-xs flex items-center justify-between gap-2 text-[#9d9bb0]">
                      <div className="flex flex-wrap gap-1.5">
                        {project?.tools?.map((tool, idx) => (
                          <span
                            key={idx}
                            className="px-2 py-1 rounded bg-[#202026] text-xs font-mono text-[#f1f0f5]"
                          >
                            {tool}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mt-6 pt-5 border-t border-[#27272e]/60">
                    {project?.github_url && (
                      <Link
                        href={project?.github_url}
                        className="inline-flex items-center gap-1.5 text-xs font-mono hover:text-white transition-colors text-[#ff8c61]"
                        target="_blank"
                        referrerPolicy="no-referrer"
                      >
                        <span>View on GitHub</span>
                        <Code className="w-3.5 h-3.5" />
                      </Link>
                    )}
                    {project?.project_url && (
                      <Link
                        href={project?.project_url}
                        className="inline-flex items-center gap-1.5 text-xs font-mono hover:text-white transition-colors text-[#ff8c61]"
                        target="_blank"
                        referrerPolicy="no-referrer"
                      >
                        <span>Live preview</span>
                        <ExternalLink className="w-3.5 h-3.5" />
                      </Link>
                    )}
                  </div>
                </article>
              </div>
            ))}
          </div>
        </div>
      )}
    </section>
  );
}

export default Projects;

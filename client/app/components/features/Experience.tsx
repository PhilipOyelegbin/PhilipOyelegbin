"use client";

import { useCallback, useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { EXPERIENCE } from "../../common/data";
import { ChevronLeft, ChevronRight } from "lucide-react";

function Experience() {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: "start",
    containScroll: "trimSnaps",
  });
  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(false);

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
      id="experience"
      className="max-w-7xl mx-auto px-6 lg:px-12 py-20 border-t border-[#27272e]"
    >
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
        <div>
          <div className="font-mono text-xs uppercase tracking-wider text-[#d2bbff] font-semibold mb-2">
            Track Record
          </div>
          <h2 className="text-3xl md:text-4xl font-semibold tracking-tight text-[#f1f0f5]">
            Career Experience &amp; Impact
          </h2>
        </div>
        <div className="flex items-center gap-2 self-end">
          <button
            type="button"
            onClick={() => emblaApi?.scrollPrev()}
            disabled={!canScrollPrev}
            aria-label="Previous experiences"
            className="flex items-center justify-center w-10 h-10 rounded-xl bg-[#121215] border border-[#27272e] text-[#d2bbff] transition-colors hover:border-[#d2bbff] disabled:opacity-40 disabled:cursor-not-allowed"
          >
            <ChevronLeft className="cursor-pointer w-4 h-4" />
          </button>
          <button
            type="button"
            onClick={() => emblaApi?.scrollNext()}
            disabled={!canScrollNext}
            aria-label="Next experiences"
            className="flex items-center justify-center w-10 h-10 rounded-xl bg-[#121215] border border-[#27272e] text-[#d2bbff] transition-colors hover:border-[#d2bbff] disabled:opacity-40 disabled:cursor-not-allowed"
          >
            <ChevronRight className="cursor-pointer w-4 h-4" />
          </button>
        </div>
      </div>

      <div className="overflow-hidden" ref={emblaRef}>
        <div className="flex -ml-6">
          {EXPERIENCE.map((exp, idx) => (
            <div
              key={`${exp.role}-${idx}`}
              className="min-w-0 flex-[0_0_100%] pl-6 md:flex-[0_0_50%] lg:flex-[0_0_33.333333%]"
            >
              <div className="h-full p-6 rounded-2xl bg-[#121215] border border-[#27272e] flex flex-col justify-between hover:border-[#4a4857] transition-all">
                <div>
                  <div className={`font-mono text-xs ${exp.theme} font-medium`}>
                    {exp.duration}
                  </div>
                  <h3 className="text-lg font-semibold text-[#f1f0f5] mt-1">
                    {exp.role}
                  </h3>
                  <div className="text-xs text-[#9d9bb0] mt-0.5">
                    {exp.company}
                  </div>
                  <p className="text-sm text-[#9d9bb0] mt-4 leading-relaxed">
                    {exp.desription}
                  </p>
                </div>
                <div className="flex flex-wrap gap-1.5 mt-6 pt-4 border-t border-[#27272e]/60">
                  {exp.skills.map((skill, skillIndex) => (
                    <span
                      key={skillIndex}
                      className={`px-2.5 py-1 rounded-md bg-[#202026] text-xs font-mono ${exp.theme}`}
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Experience;

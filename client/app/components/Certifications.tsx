"use client";

import { useCallback, useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { BadgeCheck, ChevronLeft, ChevronRight } from "lucide-react";
import { CERTIFICATIONS } from "../common/data";

function Certifications() {
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
      id="certifications"
      className="max-w-7xl mx-auto px-6 lg:px-12 py-20 border-t border-[#27272e]"
    >
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
        <div>
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
        <div className="flex items-center gap-2 self-end">
          <button
            type="button"
            onClick={() => emblaApi?.scrollPrev()}
            disabled={!canScrollPrev}
            aria-label="Previous certifications"
            className="flex items-center justify-center w-10 h-10 rounded-xl bg-[#121215] border border-[#27272e] text-[#d2bbff] transition-colors hover:border-[#d2bbff] disabled:opacity-40 disabled:cursor-not-allowed"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button
            type="button"
            onClick={() => emblaApi?.scrollNext()}
            disabled={!canScrollNext}
            aria-label="Next certifications"
            className="flex items-center justify-center w-10 h-10 rounded-xl bg-[#121215] border border-[#27272e] text-[#d2bbff] transition-colors hover:border-[#d2bbff] disabled:opacity-40 disabled:cursor-not-allowed"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      <div className="overflow-hidden" ref={emblaRef}>
        <div className="flex -ml-6">
          {CERTIFICATIONS.map((cert) => {
            const IconComp = cert.icon;
            const isPrimary = cert.theme === "primary";

            return (
              <div
                key={cert.id}
                className="min-w-0 flex-[0_0_100%] pl-6 md:flex-[0_0_50%] lg:flex-[0_0_33.333333%]"
              >
                <div
                  className={`h-full p-6 rounded-2xl bg-[#121215] border border-[#27272e] flex flex-col justify-between gap-5 transition-all ${
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
                      {cert.tags.map((tag, tagIndex) => (
                        <span
                          key={tagIndex}
                          className="px-2.5 py-1 rounded-md bg-[#202026] text-xs font-mono text-[#f1f0f5]"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default Certifications;

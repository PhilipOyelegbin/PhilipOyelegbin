"use client";

import { useCallback, useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { useTestimonialStore } from "../stores/useTestimonialStore";
import { ChevronLeft, ChevronRight, MessageCircleCheck } from "lucide-react";

function Testimonials() {
  const { testimonials, getTestimonials } = useTestimonialStore();
  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: "start",
    containScroll: "trimSnaps",
  });
  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(false);

  useEffect(() => {
    (async () => {
      await getTestimonials();
    })();
  }, [getTestimonials]);

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
      id="skills"
      className="max-w-7xl mx-auto px-6 lg:px-12 py-20 border-t border-[#27272e]"
    >
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
        <div>
          <div className="font-mono text-xs uppercase tracking-wider text-[#ff8c61] font-semibold mb-2 flex items-center gap-2">
            <MessageCircleCheck className="w-4 h-4" />
            <span>What Our Clients Say</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight text-[#f1f0f5]">
            Testimonials &amp; Client Feedback
          </h2>
          <p className="text-sm text-[#9d9bb0] mt-2 max-w-xl">
            Hear from our satisfied clients and partners who have experienced
            the impact of our work. Their feedback reflects our commitment to
            excellence and innovation in every project we undertake.
          </p>
        </div>
        <div className="flex items-center gap-2 self-end">
          <button
            type="button"
            onClick={() => emblaApi?.scrollPrev()}
            disabled={!canScrollPrev}
            aria-label="Previous testimonials"
            className="flex items-center justify-center w-10 h-10 rounded-xl bg-[#121215] border border-[#27272e] text-[#d2bbff] transition-colors hover:border-[#d2bbff] disabled:opacity-40 disabled:cursor-not-allowed"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button
            type="button"
            onClick={() => emblaApi?.scrollNext()}
            disabled={!canScrollNext}
            aria-label="Next testimonials"
            className="flex items-center justify-center w-10 h-10 rounded-xl bg-[#121215] border border-[#27272e] text-[#d2bbff] transition-colors hover:border-[#d2bbff] disabled:opacity-40 disabled:cursor-not-allowed"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      <div className="overflow-hidden" ref={emblaRef}>
        <div className="flex -ml-6">
          {testimonials.map((testimony) => (
            <div
              key={testimony._id}
              className="min-w-0 flex-[0_0_100%] pl-6 md:flex-[0_0_50%] lg:flex-[0_0_33.333333%]"
            >
              <div className="h-full p-6 rounded-2xl bg-[#121215] border border-[#27272e] flex flex-col justify-between gap-6 hover:border-[#4a4857] transition-all">
                <div className="flex flex-col gap-4">
                  <div>
                    <h4 className="font-semibold text-base text-[#f1f0f5]">
                      {testimony.full_name}
                    </h4>
                    <p className="text-xs leading-5 text-[#9d9bb0] mt-2">
                      {testimony.comment}
                    </p>
                  </div>
                  <div
                    className="flex gap-1.5 pt-2 text-[#ff8c61]"
                    aria-label={`${testimony.rating} out of 5 stars`}
                  >
                    {Array.from({ length: 5 }, (_, index) => (
                      <span key={index}>
                        {index < testimony.rating ? "★" : "☆"}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Testimonials;

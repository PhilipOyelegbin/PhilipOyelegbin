"use client";

import { useRef } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import Image from "next/image";

// Mock Data - Replace with your real e-commerce products or developer projects
const CAROUSEL_ITEMS = [
  {
    id: 1,
    title: "E-Commerce Platform",
    category: "Full Stack",
    image:
      "https://images.unsplash.com/photo-1667372393119-3d4c48d07fc9?q=80&w=800&auto=format&fit=crop",
    price: "$49.00",
  },
  {
    id: 2,
    title: "AI Chat Assistant",
    category: "Machine Learning",
    image:
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=800&auto=format&fit=crop",
    price: "$29.00",
  },
  {
    id: 3,
    title: "SaaS Dashboard Kit",
    category: "UI/UX Design",
    image:
      "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?q=80&w=800&auto=format&fit=crop",
    price: "$79.00",
  },
  {
    id: 4,
    title: "Crypto Wallet App",
    category: "Web3 / Blockchain",
    image:
      "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=800&auto=format&fit=crop",
    price: "$99.00",
  },
  {
    id: 5,
    title: "Analytics Suite",
    category: "Data Science",
    image:
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=800&auto=format&fit=crop",
    price: "$59.00",
  },
];

export function CardCarousel() {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const handleScroll = (direction: "left" | "right") => {
    const container = scrollContainerRef.current;
    if (!container) return;

    // Calculate width of one visible card dynamically to scroll exactly by one card width
    const cardWidth = container.clientWidth / 3;
    const scrollAmount = direction === "left" ? -cardWidth : cardWidth;

    container.scrollBy({
      left: scrollAmount,
      behavior: "smooth",
    });
  };

  return (
    <div className="w-full max-w-7xl mx-auto px-4 py-8 group">
      {/* Section Header with Independent Navigation Buttons */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <span className="text-sm font-semibold tracking-wider text-blue-600 uppercase">
            Showcase
          </span>
          <h2 className="text-2xl font-bold text-gray-900 md:text-3xl">
            Our Featured Projects
          </h2>
        </div>

        <div className="flex items-center space-x-2">
          <button
            onClick={() => handleScroll("left")}
            className="cursor-pointer flex h-10 w-10 items-center justify-center rounded-full border border-gray-200 bg-white text-gray-600 shadow-sm transition-all hover:bg-gray-50 active:scale-95"
            aria-label="Scroll left"
          >
            <ArrowLeft className="h-5 w-5" />
          </button>
          <button
            onClick={() => handleScroll("right")}
            className="cursor-pointer flex h-10 w-10 items-center justify-center rounded-full border border-gray-200 bg-white text-gray-600 shadow-sm transition-all hover:bg-gray-50 active:scale-95"
            aria-label="Scroll right"
          >
            <ArrowRight className="h-5 w-5" />
          </button>
        </div>
      </div>

      {/* Main Slider Track */}
      <div
        ref={scrollContainerRef}
        className="flex space-x-4 overflow-x-auto pb-4 scrollbar-none snap-x snap-mandatory scroll-smooth"
        style={{ scrollbarWidth: "none" }} // Hides scrollbar on Firefox
      >
        {CAROUSEL_ITEMS.map((item) => (
          <div
            key={item.id}
            className="min-w-[85%] sm:min-w-[45%] lg:min-w-[31%] bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow duration-300 snap-start overflow-hidden flex flex-col"
          >
            {/* Image Aspect Box */}
            <div className="relative w-full aspect-4/3 bg-gray-100">
              <Image
                src={item.image}
                alt={item.title}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-500"
                sizes="(max-w-7xl) 33vw, 100vw"
              />
            </div>

            {/* Meta Information Content */}
            <div className="p-5 flex flex-col grow">
              <span className="text-xs font-medium text-blue-600 tracking-wide uppercase mb-1">
                {item.category}
              </span>
              <h3 className="font-semibold text-lg text-gray-900 mb-2 line-clamp-1">
                {item.title}
              </h3>

              <div className="mt-auto pt-4 flex items-center justify-between border-t border-gray-50">
                <span className="font-bold text-gray-900 text-lg">
                  {item.price}
                </span>
                <button className="text-sm font-semibold text-blue-600 hover:text-blue-700 transition">
                  View Details →
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

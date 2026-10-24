import { create } from "zustand";
import { TestimonialItem } from "../common/interface";

export interface TestimonialState {
  testimonials: TestimonialItem[];
  isLoading: boolean;
  error: string | null;

  setTestimonials: (testimonials: TestimonialItem[]) => void;
  getTestimonials: () => Promise<void>;
}

export const useTestimonialStore = create<TestimonialState>((set) => ({
  testimonials: [],
  isLoading: false,
  error: null,

  setTestimonials: (testimonials) => set({ testimonials }),
  getTestimonials: async () => {
    set({ isLoading: true, error: null });
    try {
      const resp = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/testimonial/approved`,
      );

      if (!resp.ok) {
        throw new Error("Failed to fetch testimonials");
      }

      const result = await resp.json();
      set({ testimonials: result.data, isLoading: false, error: null });
      return result.data;
    } catch (error) {
      console.error("Error fetching testimonials:", error);
      set({
        isLoading: false,
        error:
          error?.message || "Unable to load all testimonials, try again later",
      });
      throw new Error("Unable to load all testimonials, try again later");
    }
  },
}));

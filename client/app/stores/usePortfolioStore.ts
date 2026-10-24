import { create } from "zustand";
import { ProjectItem } from "../common/interface";

export interface PortfolioState {
  projectFilter: string;
  skillFilter: string;
  selectedRating: number;
  projects: ProjectItem[];
  isLoading: boolean;
  error: string | null;

  setProjects: (projects: []) => void;
  setProjectFilter: (filter: string) => void;
  setSkillFilter: (filter: string) => void;
  setSelectedRating: (rating: number) => void;
  getProjects: () => Promise<void>;
}

export const usePortfolioStore = create<PortfolioState>((set) => ({
  projectFilter: "all",
  skillFilter: "all",
  selectedRating: 5,
  projects: [],
  isLoading: false,
  error: null,

  setProjects: (projects) => set({ projects }),
  setProjectFilter: (filter) => set({ projectFilter: filter }),
  setSkillFilter: (filter) => set({ skillFilter: filter }),
  setSelectedRating: (rating) => set({ selectedRating: rating }),
  getProjects: async () => {
    set({ isLoading: true, error: null });
    try {
      const resp = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/project`,
      );
      if (!resp.ok) {
        throw new Error("Failed to fetch projects");
      }

      const result = await resp.json();
      set({ projects: result.data, isLoading: false, error: null });
      return result.data;
    } catch (error) {
      console.error("Error fetching projects:", error);
      set({
        isLoading: false,
        error: error?.message || "Unable to load all projects, try again later",
      });
      throw new Error("Unable to load all projects, try again later");
    }
  },
}));

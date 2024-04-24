import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useThemeStore = create(
  persist(
    (set) => ({
      theme: "light",
      setTheme: (theme) => set((state) => ({ ...state, theme })),
    }),
    {
      name: "theme-store",
    }
  )
);

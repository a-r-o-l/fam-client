import { create, StateCreator } from "zustand";
import { persist } from "zustand/middleware";

export const useRentersStore = create(
  persist(
    (set) => ({
      renters: [],
      setRenters: (renters) =>
        set((state: () => void) => ({ ...state, renters })),
    }),
    {
      name: "renters-store",
    }
  )
);

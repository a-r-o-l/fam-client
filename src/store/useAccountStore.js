import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useAccountStore = create(
  persist(
    (set) => ({
      password: "asdqwe123",
      isLogged: false,
      setLogged: (isLogged) => set((state) => ({ ...state, isLogged })),
    }),
    {
      name: "loggin-store",
    }
  )
);

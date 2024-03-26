import { create, StateCreator } from "zustand";
import { persist } from "zustand/middleware";

export const useAccountStore = create(
  persist(
    (set) => ({
      account: null,
      setAccount: (account) =>
        set((state: () => void) => ({ ...state, account })),
    }),
    {
      name: "account-store",
    }
  )
);

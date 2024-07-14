import { jwtDecode } from "jwt-decode";
import { create } from "zustand";
// import { persist } from "zustand/middleware";

export const useAccountStore = create(
  // persist(
  (set) => ({
    account: null,
    accessToken: "",
    refreshToken: "",
    setAccount: (account) => set((state) => ({ ...state, account })),
    setAccessToken: (accessToken) =>
      set((state) => ({ ...state, accessToken })),
    setRefreshToken: (refreshToken) =>
      set((state) => ({ ...state, refreshToken })),
    setCloseSession: () => {
      localStorage.removeItem("access-token");
      localStorage.removeItem("refresh-token");
      set((state) => ({
        ...state,
        account: null,
        accessToken: "",
        refreshToken: "",
      }));
    },
    setCreateSession: (accessToken, refreshToken) => {
      localStorage.setItem("access-token", accessToken);
      localStorage.setItem("refresh-token", refreshToken);
      const decodedToken = jwtDecode(accessToken);
      set((state) => ({
        ...state,
        account: decodedToken,
        accessToken,
        refreshToken,
      }));
    },
  })
  // )
);

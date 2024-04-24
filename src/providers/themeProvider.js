import { createTheme } from "@mui/material";
import { useThemeStore } from "../store/useThemeStore";
import { useEffect, useMemo } from "react";

export const useThemeProvider = () => {
  const theme = useThemeStore((state) => state.theme);

  const storeTheme = useMemo(() => {
    return theme;
  }, [theme]);

  const darkTheme = createTheme({
    palette: {
      mode: storeTheme,
    },
  });

  useEffect(() => {
    if (theme === "dark") {
      document.querySelector("body").classList.add("dark");
    } else {
      document.querySelector("body").classList.remove("dark");
    }
  }, [theme]);

  return {
    darkTheme,
  };
};

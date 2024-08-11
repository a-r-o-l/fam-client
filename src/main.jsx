import React from "react";
import ReactDOM from "react-dom/client";
import "./styles.css";
import "@mantine/core/styles.css";
import "@mantine/dates/styles.css";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import "dayjs/locale/es";

import { MantineProvider, createTheme, virtualColor } from "@mantine/core";
import { RouterProvider } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "sonner";
import { fam_colors } from "./utils/colors";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { router } from "./routes/index";
import { DatesProvider } from "@mantine/dates";

const googleClientId = import.meta.env.VITE_GOOGLE_CLIENT_ID;

const queryClient = new QueryClient();
const theme = createTheme({
  colors: {
    primary: virtualColor({
      name: "primary",
      dark: "dark.2",
      light: "dark.7",
    }),
    ...fam_colors,
  },
});

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <MantineProvider theme={theme}>
      <GoogleOAuthProvider clientId={googleClientId}>
        <QueryClientProvider client={queryClient}>
          <DatesProvider
            settings={{
              locale: "es",
              firstDayOfWeek: 0,
              weekendDays: [0],
            }}
          >
            <RouterProvider router={router} />
            <Toaster richColors visibleToasts={1} />
          </DatesProvider>
        </QueryClientProvider>
      </GoogleOAuthProvider>
    </MantineProvider>
  </React.StrictMode>
);

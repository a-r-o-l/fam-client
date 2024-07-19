import { MantineProvider, createTheme, virtualColor } from "@mantine/core";
import { MemoryRouter, BrowserRouter } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "sonner";
import { fam_colors } from "./utils/colors";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { Router } from "./routes/Router";
// import { AccountProvider } from "./providers/AccountProvider";

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
function App() {
  return (
    <MantineProvider theme={theme}>
      <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
        <QueryClientProvider client={queryClient}>
          {/* <MemoryRouter> */}
          {/* <AccountProvider> */}
          <BrowserRouter>
            {/* <AppTemplate /> */}
            <Router />
          </BrowserRouter>
          {/* </AccountProvider> */}
          {/* </MemoryRouter> */}
          <Toaster richColors visibleToasts={1} />
        </QueryClientProvider>
      </GoogleOAuthProvider>
    </MantineProvider>
  );
}
export default App;

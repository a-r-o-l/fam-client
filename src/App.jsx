import { MantineProvider, createTheme, virtualColor } from "@mantine/core";
import { MemoryRouter } from "react-router-dom";
import { AppTemplate } from "./layouts/AppTemplate";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "sonner";
import { fam_colors } from "./utils/colors";

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
      <QueryClientProvider client={queryClient}>
        <MemoryRouter>
          <AppTemplate />
        </MemoryRouter>
        <Toaster richColors visibleToasts={1} />
      </QueryClientProvider>
    </MantineProvider>
  );
}
export default App;

import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { LoginScreen } from "./pages/LoginScreen";
import { HomeScreen } from "./pages/HomeScreen";
import { RentersScreen } from "./pages/RentersScreen";
import { Navbar } from "./Layouts/Navbar";
import { RenterScreen } from "./pages/RenterScreen";
import { PaymentsScreen } from "./pages/PaymentsScreen";
import { BuildingScreen } from "./pages/BuildingScreen";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: (
        <Navbar nav={true}>
          <HomeScreen />
        </Navbar>
      ),
      errorElement: <div>404</div>,
    },
    {
      path: "/login",
      element: <LoginScreen />,
    },
    {
      path: "/renters",
      element: (
        <Navbar nav={true}>
          <RentersScreen />
        </Navbar>
      ),
    },
    {
      path: "/renter/:id",
      element: (
        <Navbar nav={true}>
          <RenterScreen />
        </Navbar>
      ),
    },
    {
      path: "/payments",
      element: (
        <Navbar nav={true}>
          <PaymentsScreen />
        </Navbar>
      ),
    },
    {
      path: "/buildings",
      element: (
        <Navbar nav={true}>
          <BuildingScreen />
        </Navbar>
      ),
    },
  ]);
  return <RouterProvider router={router} />;
}

export default App;

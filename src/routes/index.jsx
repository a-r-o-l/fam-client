import { createBrowserRouter } from "react-router-dom";
import { PaymentsScreen } from "../pages/Payments/PaymentsScreen";
import { BuildingScreen } from "../pages/Building/BuildingScreen";
import { RentersScreen } from "../pages/Renters/RentersScreen";
import { HistoryScreen } from "../pages/History/HistoryScreen";
import { RenterScreen } from "../pages/Renter/RenterScreen";
import { OptionsScreen } from "../pages/Options/OptionsScreen";
import { SubscriptionSuccessScreen } from "../pages/Subscriptions/pages/SubscriptionSuccessScreen";
import { LoginScreen } from "../pages/Login/LoginScreen";
import { AnalyticsScreen } from "../pages/Analytics/AnalyticsScreen";
import { AppTemplate } from "../layouts/AppTemplate";
import Home from "../pages/Home/Home";
import LoungeScreen from "../pages/Lounge/LoungeScreen";
import NotFoundScreen from "../pages/NotFound/NotFoundScreen";
import HouseScreen from "../pages/House/HouseScreen";
import LoungeEventScreen from "../pages/Lounge/LoungeEventScreen/LoungeEventScreen";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <AppTemplate />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "/payments",
        element: <PaymentsScreen />,
      },
      {
        path: "/buildings/:index",
        element: <BuildingScreen />,
      },
      {
        path: "/renters",
        element: <RentersScreen />,
      },
      {
        path: "/renter/:id",
        element: <RenterScreen />,
      },
      {
        path: "/renter/history/:id",
        element: <HistoryScreen />,
      },
      {
        path: "/options",
        element: <OptionsScreen />,
      },
      // {
      //   path: "/subscriptions",
      //   element: <SubscriptionsScreen />,
      // },
      {
        path: "/subscriptions-success",
        element: <SubscriptionSuccessScreen />,
      },
      {
        path: "/subscriptions-pending",
        element: <SubscriptionSuccessScreen />,
      },
      {
        path: "/subscriptions-failure",
        element: <SubscriptionSuccessScreen />,
      },
      {
        path: "/houses/:index",
        element: <HouseScreen />,
      },
      {
        path: "/lounges/:index",
        element: <LoungeScreen />,
      },
      {
        path: "/lounges/calendar/:id",
        element: <LoungeEventScreen />,
      },
      {
        path: "/apartments",
        element: <div>apartments</div>,
      },
      {
        path: "/analytics",
        element: <AnalyticsScreen />,
      },
      {
        path: "/*",
        element: <NotFoundScreen />,
      },
    ],
  },
  {
    path: "/login",
    element: <LoginScreen />,
  },
]);

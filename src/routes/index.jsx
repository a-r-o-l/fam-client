import { createBrowserRouter } from "react-router-dom";
import { PaymentsScreen } from "../pages/Payments/PaymentsScreen";
import { BuildingScreen } from "../pages/Building/BuildingScreen";
import { RentersScreen } from "../pages/Renters/RentersScreen";
import { HistoryScreen } from "../pages/History/HistoryScreen";
import { RenterScreen } from "../pages/Renter/RenterScreen";

import { WorkInProgressScreen } from "../pages/WorkInProgress/WorkInProgressScreen";
import { OptionsScreen } from "../pages/Options/OptionsScreen";
import { SubscriptionsScreen } from "../pages/Subscriptions/SubscriptionsScreen";
import { SubscriptionSuccessScreen } from "../pages/Subscriptions/pages/SubscriptionSuccessScreen";
import { LoginScreen } from "../pages/Login/LoginScreen";
import { AppTemplate } from "../layouts/AppTemplate";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <AppTemplate />,
    children: [
      {
        index: true,
        element: <WorkInProgressScreen />,
      },
      {
        path: "/payments",
        element: <PaymentsScreen />,
      },
      {
        path: "/buildings",
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
      {
        path: "/subscriptions",
        element: <SubscriptionsScreen />,
      },
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
        path: "/houses",
        element: <div>houses</div>,
      },
      {
        path: "/lounges",
        element: <div>lounges</div>,
      },
      {
        path: "/apartments",
        element: <div>apartments</div>,
      },
    ],
  },
  {
    path: "/login",
    element: <LoginScreen />,
  },
]);

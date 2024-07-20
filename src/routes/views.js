import { PaymentsScreen } from "../pages/Payments/PaymentsScreen";
import { BuildingScreen } from "../pages/Building/BuildingScreen";
import { RentersScreen } from "../pages/Renters/RentersScreen";
import { HistoryScreen } from "../pages/History/HistoryScreen";
import { RenterScreen } from "../pages/Renter/RenterScreen";
import { AnalitycsScreen } from "../pages/Analitycs/AnalitycsScreen";
import { WorkInProgressScreen } from "../pages/WorkInProgress/WorkInProgressScreen";
import { OptionsScreen } from "../pages/Options/OptionsScreen";
import { IoIosNotificationsOutline } from "react-icons/io";
import { GiSettingsKnobs } from "react-icons/gi";
import { IoHomeOutline } from "react-icons/io5";
import { PiMoneyLight } from "react-icons/pi";
import { LiaBuilding } from "react-icons/lia";
import { MdPeopleOutline } from "react-icons/md";
import { SubscriptionsScreen } from "../pages/Subscriptions/SubscriptionsScreen";
import { SubscriptionSuccessScreen } from "../pages/Subscriptions/pages/SubscriptionSuccessScreen";
const views = [
  {
    path: "/",
    name: "Inicio",
    component: WorkInProgressScreen,
    icon: IoHomeOutline,
  },
  {
    path: "/payments",
    component: PaymentsScreen,
    exact: true,
    name: "Pagos",
    icon: PiMoneyLight,
  },
  {
    path: "/buildings",
    name: "Complejos",
    component: BuildingScreen,
    icon: LiaBuilding,
  },
  {
    path: "/renters",
    name: "Inquilinos",
    component: RentersScreen,
    icon: MdPeopleOutline,
  },

  {
    path: "/opciones",
    name: "Opciones",
    icon: GiSettingsKnobs,
    component: OptionsScreen,
  },
  {
    path: "/subscriptions",
    name: "Suscripcion",
    icon: IoIosNotificationsOutline,
    component: SubscriptionsScreen,
  },
  {
    path: "/subscriptions/success",
    component: SubscriptionSuccessScreen,
  },
  {
    path: "/subscriptions/pending",
    component: SubscriptionSuccessScreen,
  },
  {
    path: "/subscriptions/failure",
    component: SubscriptionSuccessScreen,
  },
  {
    path: "/renter/:id",
    component: RenterScreen,
  },
  {
    path: "/renter/history/:id",
    component: HistoryScreen,
  },
];

export default views;

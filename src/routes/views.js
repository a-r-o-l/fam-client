import { PaymentsScreen } from "../Screens/Payments/PaymentsScreen";
import { BuildingScreen } from "../Screens/Building/BuildingScreen";
import { RentersScreen } from "../Screens/Renters/RentersScreen";
import { HistoryScreen } from "../Screens/History/HistoryScreen";
import { RenterScreen } from "../Screens/Renter/RenterScreen";
import { AnalitycsScreen } from "../Screens/Analitycs/AnalitycsScreen";
import { WorkInProgressScreen } from "../Screens/WorkInProgress/WorkInProgressScreen";
import { OptionsScreen } from "../Screens/Options/OptionsScreen";
const views = [
  {
    path: "/analitycs",
    name: "Analiticas",
    component: WorkInProgressScreen,
  },
  {
    path: "/payments",
    component: PaymentsScreen,
    exact: true,
    name: "Pagos",
  },
  {
    path: "/buildings",
    name: "Complejos",
    component: BuildingScreen,
  },
  {
    path: "/renters",
    name: "Inquilinos",
    component: RentersScreen,
  },

  {
    path: "/opciones",
    name: "Opciones",
    component: OptionsScreen,
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

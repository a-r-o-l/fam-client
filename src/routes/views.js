import { PaymentsScreen } from "../Screens/Payments/PaymentsScreen";
import { BuildingScreen } from "../Screens/Building/BuildingScreen";
import { RentersScreen } from "../Screens/Renters/RentersScreen";
import { RenterScreen } from "../Screens/Renter/RenterScreen";
import { AnalitycsScreen } from "../Screens/Analitycs/AnalitycsScreen";
const views = [
  {
    path: "/",
    name: "Analiticas",
    component: AnalitycsScreen,
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
    component: RentersScreen,
  },
  {
    path: "/renter/:id",
    component: RenterScreen,
  },
];

export default views;

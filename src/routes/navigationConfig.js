import { IoIosNotificationsOutline } from "react-icons/io";
import { GiSettingsKnobs } from "react-icons/gi";
import { IoHomeOutline } from "react-icons/io5";
import { PiMoneyLight } from "react-icons/pi";
import { LiaBuilding } from "react-icons/lia";
import { MdPeopleOutline } from "react-icons/md";

const navigationConfig = [
  {
    path: "/",
    name: "Inicio",
    icon: IoHomeOutline,
  },
  {
    path: "/payments",
    exact: true,
    name: "Pagos",
    icon: PiMoneyLight,
  },
  {
    path: "/buildings",
    name: "Complejos",
    icon: LiaBuilding,
  },
  {
    path: "/renters",
    name: "Inquilinos",
    icon: MdPeopleOutline,
  },

  {
    path: "/options",
    name: "Opciones",
    icon: GiSettingsKnobs,
  },
  {
    path: "/subscriptions",
    name: "Suscripcion",
    icon: IoIosNotificationsOutline,
  },
];

export default navigationConfig;

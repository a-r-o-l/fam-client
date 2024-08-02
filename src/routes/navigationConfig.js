import { IoHomeOutline } from "react-icons/io5";
import {
  Building2,
  Home,
  Building,
  DoorClosed,
  Store,
  House,
  StoreIcon,
} from "lucide-react";
import { Users } from "lucide-react";
import { Coins } from "lucide-react";
import { Settings2 } from "lucide-react";
import { ShieldCheck } from "lucide-react";

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
    icon: Coins,
  },
  {
    path: "/buildings",
    name: "Propiedades",
    icon: Building2,
    children: [
      {
        path: "/buildings",
        name: "Edificios",
        icon: Building,
      },
      {
        path: "/houses",
        name: "Casas",
        icon: House,
      },
      {
        path: "/lounges",
        name: "Salones",
        icon: StoreIcon,
      },
      {
        path: "/apartments",
        name: "Departamentos",
        icon: DoorClosed,
      },
    ],
  },
  // {
  //   path: "/renters",
  //   name: "Inquilinos",
  //   icon: Users,
  // },

  {
    path: "/options",
    name: "Opciones",
    icon: Settings2,
  },
  {
    path: "/subscriptions",
    name: "Suscripciones",
    icon: ShieldCheck,
  },
];

export default navigationConfig;

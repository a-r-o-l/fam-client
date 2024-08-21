import {
  Banknote,
  Building,
  Building2,
  ChartNoAxesColumn,
  DoorClosed,
  Home,
  House,
  Settings2,
  StoreIcon,
  Users,
} from "lucide-react";

const navigationConfig = [
  {
    path: "/",
    name: "Inicio",
    icon: Home,
  },
  // {
  //   path: "/payments",
  //   exact: true,
  //   name: "Pagos",
  //   icon: Banknote,
  // },
  {
    path: "/buildings",
    name: "Propiedades",
    icon: Building2,
    children: [
      {
        path: "/buildings/0",
        name: "Edificios",
        icon: Building,
      },
      {
        path: "/houses/0",
        name: "Casas",
        icon: House,
      },
      {
        path: "/lounges/0",
        name: "Salones",
        icon: StoreIcon,
      },
      {
        path: "/apartments",
        name: "Alquiler Diario",
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
    path: "/analytics",
    name: "Analiticas",
    icon: ChartNoAxesColumn,
  },
];

export default navigationConfig;

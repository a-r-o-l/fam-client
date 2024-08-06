import {
  Banknote,
  Building,
  Building2,
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
  {
    path: "/payments",
    exact: true,
    name: "Pagos",
    icon: Banknote,
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
  {
    path: "/renters",
    name: "Inquilinos",
    icon: Users,
  },

  {
    path: "/options",
    name: "Opciones",
    icon: Settings2,
  },
];

export default navigationConfig;

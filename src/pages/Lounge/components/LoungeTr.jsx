import { Table } from "@mantine/core";
import { Avatar } from "@mui/material";
import StateBadge from "../../../components/Badges/StateBadge";
import CustomMenu from "../../../components/Menu/CustomMenu";
import { useMemo } from "react";
import {
  CalendarCheck,
  CalendarClock,
  House,
  Pencil,
  Trash2,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

function LoungeTr({ lounge, onOpenReservationModal, onClick }) {
  console.log(lounge);
  const navigate = useNavigate();
  const options = useMemo(() => {
    return [
      {
        label: "Editar",
        icon: <Pencil size={18} />,
        onClick: () => {
          console.log(lounge);
        },
      },

      // {
      //   label: "Ver casa",
      //   icon: <House size={18} />,
      //   onClick: () => {
      //     console.log(lounge);
      //   },
      // },
      // {
      //   label: "Crear reserva",
      //   icon: <CalendarClock size={18} />,
      //   onClick: () => onOpenReservationModal(),
      // },
      {
        label: "Eventos",
        icon: <CalendarCheck size={18} />,
        onClick: () => {
          navigate(`/lounges/calendar/${lounge.id}`);
        },
      },
      {
        label: "Eliminar",
        icon: <Trash2 size={18} />,
        divider: true,
        color: "red",
        onClick: () => {
          console.log(lounge);
        },
      },
    ];
  }, [lounge]);

  return (
    <Table.Tr key={lounge.id} onClick={onClick} className="cursor-pointer">
      <Table.Td>
        <Avatar
          sx={{ width: 57, height: 57 }}
          src={lounge?.image_url || "./placeholder-lounge.webp"}
        />
      </Table.Td>
      <Table.Td>{lounge?.name}</Table.Td>
      <Table.Td>{lounge?.address}</Table.Td>
      <Table.Td>
        <StateBadge
          rentedCondition={lounge?.rented}
          soldCondition={lounge?.it_was_sold}
        />
      </Table.Td>
      <Table.Td align="center">
        <CustomMenu options={options} title={lounge.name.toUpperCase()} />
      </Table.Td>
    </Table.Tr>
  );
}

export default LoungeTr;

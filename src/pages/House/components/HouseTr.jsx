import { Table } from "@mantine/core";
import { Avatar } from "@mui/material";
import StateBadge from "../../../components/Badges/StateBadge";
import CustomMenu from "../../../components/Menu/CustomMenu";
import { useMemo } from "react";
import { Handshake, House, Pencil, Trash2 } from "lucide-react";

function HouseTr({ house }) {
  const options = useMemo(() => {
    return [
      {
        label: "Editar",
        icon: <Pencil size={18} />,
        onClick: () => {
          console.log(house);
        },
      },

      {
        label: "Ver casa",
        icon: <House size={18} />,
        onClick: () => {
          console.log(house);
        },
      },
      {
        label: "Crear contrato",
        icon: <Handshake size={18} />,
        onClick: () => {
          console.log(house);
        },
      },
      {
        label: "Vender casa",
        icon: <Handshake size={18} />,
        onClick: () => {
          console.log(house);
        },
      },
      {
        label: "Eliminar",
        icon: <Trash2 size={18} />,
        divider: true,
        color: "red",
        onClick: () => {
          console.log(house);
        },
      },
    ];
  }, [house]);

  return (
    <Table.Tr key={house.id}>
      <Table.Td>
        <Avatar
          sx={{ width: 57, height: 57 }}
          src={house?.image_url || "./placeholder-house.webp"}
        />
      </Table.Td>
      <Table.Td>{house?.name}</Table.Td>
      <Table.Td>{house?.address}</Table.Td>
      <Table.Td>
        <StateBadge
          rentedCondition={house?.rented}
          soldCondition={house?.it_was_sold}
        />
      </Table.Td>
      <Table.Td>{house?.renter?.name}</Table.Td>
      <Table.Td>{house?.rent_amount || "-"}</Table.Td>
      <Table.Td>{house?.rent_start_date || "-"}</Table.Td>
      <Table.Td>{house?.contract_date || "-"}</Table.Td>
      <Table.Td>{house?.updated_at || "-"}</Table.Td>
      <Table.Td>{house?.contract_expiration_date || "-"}</Table.Td>
      <Table.Td>
        <CustomMenu options={options} title={house.name.toUpperCase()} />
      </Table.Td>
    </Table.Tr>
  );
}

export default HouseTr;

import { Table, useMantineColorScheme, useMantineTheme } from "@mantine/core";
import React from "react";
import { useNavigate } from "react-router-dom";
import { useDeleteRenterMutation } from "../../../../services/hooks/Renter/useRenterMutation";
import dayjs from "dayjs";
import { RenterRowItem } from "./RenterRowItem";

const headerItems = [
  { id: 1, label: "Avatar" },
  { id: 2, label: "Nombre" },
  { id: 3, label: "Apellido" },
  { id: 4, label: "Dni" },
  { id: 5, label: "Tel" },
  { id: 6, label: "Email" },
  { id: 7, label: "Complejo" },
  { id: 8, label: "Depto" },
  { id: 9, label: "Monto" },
  { id: 10, label: "Inicio" },
  { id: 11, label: "Contrato" },
  { id: 12, label: "Tiempo" },
  { id: 13, label: "Acciones" },
];

export const RentersTable = ({ renters }) => {
  const navigate = useNavigate();
  const deleteRenter = useDeleteRenterMutation();
  const { colorScheme } = useMantineColorScheme();

  const onEdit = (itemId) => {
    navigate(`/renter/${itemId}`);
  };

  const onHistoryClick = () => {
    console.log("report");
  };

  const onDelete = async (id) => {
    deleteRenter.mutate(id);
    console.log("delete");
  };

  return (
    <Table.ScrollContainer minWidth={900} type="native" h={650}>
      <Table stickyHeader striped="even" verticalSpacing={20} highlightOnHover>
        <Table.Thead bg={colorScheme === "dark" ? "dark.9" : "gray.2"}>
          <Table.Tr>
            {headerItems.map((item) => (
              <Table.Th key={item.id} className="text-black dark:text-white">
                {item.label}
              </Table.Th>
            ))}
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>
          {!!renters ? (
            renters.map((item) => (
              <RenterRowItem
                item={item}
                key={item.id}
                onHistoryClick={onHistoryClick}
                onEdit={onEdit}
                onDelete={onDelete}
              />
            ))
          ) : (
            <></>
          )}
        </Table.Tbody>
      </Table>
    </Table.ScrollContainer>
  );
};

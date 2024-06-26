import { Table, useMantineColorScheme } from "@mantine/core";
import { useNavigate } from "react-router-dom";
import { useDeleteRenterMutation } from "../../../../services/hooks/Renter/useRenterMutation";
import { RenterRowItem } from "./RenterRowItem";
import { useState } from "react";
import { CustomDialog } from "../../../../components/Dialog/CustomDialog";
import { toast } from "sonner";

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
  { id: 12, label: "Expira" },
  { id: 13, label: "Actualizacion" },
  { id: 14, label: "Acciones" },
];

export const RentersTable = ({ renters, completeInfo }) => {
  const navigate = useNavigate();
  const deleteRenter = useDeleteRenterMutation();
  const { colorScheme } = useMantineColorScheme();
  const [renterToDelete, setRenterToDelete] = useState(null);
  const [openAlert, setOpenAlert] = useState(false);

  const onEdit = (itemId) => {
    navigate(`/renter/${itemId}`);
  };

  const onHistoryClick = () => {
    console.log("report");
  };

  const onDelete = async () => {
    try {
      await deleteRenter.mutateAsync(renterToDelete);
    } catch (error) {
      if (error.response.status === 410) {
        toast.error(
          "No se pueden eliminar un inquilino con un contrato activo"
        );
      }
    } finally {
      setRenterToDelete(null);
      setOpenAlert(false);
    }
  };

  const onPrevDelete = async (id) => {
    setRenterToDelete(id);
    setOpenAlert(true);
  };

  return (
    <Table.ScrollContainer minWidth={900} type="native" h={650}>
      <Table stickyHeader striped="even" verticalSpacing={20} highlightOnHover>
        <Table.Thead bg={colorScheme === "dark" ? "dark.9" : "gray.2"}>
          <Table.Tr>
            {headerItems.map((item) => {
              if (!completeInfo && item.id > 1 && item.id < 7) {
                return null;
              }
              return (
                <Table.Th
                  key={item.id}
                  className="text-black dark:text-white"
                  align="justify"
                >
                  {item.label}
                </Table.Th>
              );
            })}
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>
          {renters ? (
            renters.map((item) => (
              <RenterRowItem
                item={item}
                key={item.id}
                onHistoryClick={onHistoryClick}
                onEdit={onEdit}
                onDelete={onPrevDelete}
                completeInfo={completeInfo}
              />
            ))
          ) : (
            <></>
          )}
        </Table.Tbody>
      </Table>
      <CustomDialog
        open={openAlert}
        onClose={() => setOpenAlert(false)}
        onConfirm={onDelete}
        text="Estas seguro de eliminar un inquilino?"
      />
    </Table.ScrollContainer>
  );
};

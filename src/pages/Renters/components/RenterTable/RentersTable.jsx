import { Table, useMantineColorScheme } from "@mantine/core";
import { useNavigate } from "react-router-dom";
import { useDeleteRenterMutation } from "../../../../services/hooks/Renter/useRenterMutation";
import { RenterRowItem } from "./RenterRowItem";
import { useState } from "react";
import { CustomDialog } from "../../../../components/Dialog/CustomDialog";
import { toast } from "sonner";

const headerItems = [
  { id: 1, label: "Avatar", align: "left" },
  { id: 2, label: "Nombre", align: "left" },
  { id: 3, label: "Apellido", align: "left" },
  { id: 4, label: "Dni", align: "left" },
  { id: 5, label: "Tel", align: "left" },
  { id: 6, label: "Email", align: "left" },
  { id: 7, label: "Complejo", align: "left" },
  { id: 8, label: "Depto", align: "left" },
  { id: 9, label: "Monto", align: "left" },
  { id: 10, label: "Inicio", align: "left" },
  { id: 11, label: "Contrato", align: "left" },
  { id: 12, label: "Actualizacion", align: "center" },
  { id: 13, label: "Expira", align: "center" },
  { id: 14, label: "Acciones", align: "center" },
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

  const onHistoryClick = (itemId) => {
    navigate(`/renter/history/${itemId}`);
  };

  const onDelete = async () => {
    deleteRenter.mutate(renterToDelete, {
      onSuccess: () => {
        toast.success("Inquilino eliminado correctamente");
        setRenterToDelete(null);
        setOpenAlert(false);
      },
      onError: (error) => {
        if (error.response.status === 410) {
          toast.error(
            "No se pueden eliminar un inquilino con un contrato activo"
          );
        } else {
          toast.error("Ocurrio un error al eliminar el inquilino");
        }
      },
    });
  };

  const onPrevDelete = async (id) => {
    setRenterToDelete(id);
    setOpenAlert(true);
  };

  return (
    <Table.ScrollContainer minWidth={900} type="native" h={650}>
      <Table
        layout="fixed"
        stickyHeader
        striped="even"
        verticalSpacing="sm"
        horizontalSpacing="sm"
        highlightOnHover
        align="left"
        withTableBorder
      >
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
                  style={{ textAlign: item.align }}
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

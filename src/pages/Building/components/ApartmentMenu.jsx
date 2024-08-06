import { ActionIcon, Menu } from "@mantine/core";
import {
  CircleDollarSign,
  EllipsisVertical,
  FileX2,
  Pencil,
  Trash2,
} from "lucide-react";
import { useState } from "react";
import { CustomDialog } from "../../../components/Dialog/CustomDialog";
import {
  useDeleteApartmentMutation,
  useUpdateApartmentMutation,
} from "../../../services/hooks/Apartment/useApartmentMutation";
import { useCancelContractMutation } from "../../../services/hooks/Contract/useContractMutation";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

function ApartmentMenu({ apt, building, onEdit }) {
  const [openAlert, setOpenAlert] = useState(false);
  const [sellAlert, setSellAlert] = useState(false);
  const deleteApt = useDeleteApartmentMutation();
  const updateApt = useUpdateApartmentMutation();
  const cancelContract = useCancelContractMutation();

  const queryClient = useQueryClient();
  return (
    <Menu shadow="xl" width={250} position="bottom-start">
      <Menu.Target>
        <ActionIcon radius="xl" variant="light">
          <EllipsisVertical size={16} />
        </ActionIcon>
      </Menu.Target>

      <Menu.Dropdown p={10}>
        <Menu.Label
          styles={{
            label: {
              fontWeight: 900,
              fontSize: 16,
            },
          }}
        >
          Departamento{" "}
          {apt.floor
            ? `${apt.floor}° ${apt.number.toUpperCase()}`
            : `${apt.number}`}
        </Menu.Label>
        <Menu.Divider />

        <Menu.Item
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            onEdit(apt);
          }}
          rightSection={<Pencil size={20} />}
          disabled={apt.rented}
        >
          Editar
        </Menu.Item>
        <Menu.Item
          onClick={() => {
            cancelContract.mutate(
              { id: apt.Contracts[0].id },
              {
                onSuccess: () => {
                  queryClient.invalidateQueries(["getApartments", building.id]);
                  toast.success("Contrato cancelado correctamente");
                },
                onError: () => {
                  toast.error(
                    "Hubo un error al intentar cancelar el contrato."
                  );
                },
              }
            );
          }}
          rightSection={<FileX2 size={20} />}
          disabled={!apt.rented}
        >
          Cancelar contrato
        </Menu.Item>
        <Menu.Item
          onClick={() => {
            setSellAlert(true);
          }}
          rightSection={<CircleDollarSign size={20} />}
          disabled={apt?.rented}
        >
          Vender
        </Menu.Item>
        <Menu.Divider />
        <Menu.Item
          onClick={() => {
            setOpenAlert(true);
          }}
          rightSection={<Trash2 size={20} />}
          color="red"
          disabled={apt?.rented}
        >
          Eliminar
        </Menu.Item>
      </Menu.Dropdown>
      <CustomDialog
        open={openAlert}
        onClose={() => setOpenAlert(false)}
        text={`¿Estas seguro que deseas eliminar el departamento ${
          apt?.number || ""
        }?`}
        onConfirm={() => {
          deleteApt.mutate(
            { id: apt.id },
            {
              onSuccess: () => {
                queryClient.invalidateQueries(["getApartments", building.id]);
                toast.success("Departamento eliminado correctamente");
                setOpenAlert(false);
              },
              onError: () => {
                toast.error(
                  "Hubo un error al intentar eliminar el departamento."
                );
              },
            }
          );
        }}
      />
      <CustomDialog
        open={sellAlert}
        onClose={() => setSellAlert(false)}
        text={`¿Estas seguro que deseas vender el departamento ${
          apt?.number || ""
        }?`}
        description="Si lo vendes no podrás interactuar mas con el departamento."
        onConfirm={() => {
          updateApt.mutate(
            { id: apt.id, data: { it_was_sold: true } },
            {
              onSuccess: () => {
                queryClient.invalidateQueries(["getApartments", building.id]);
                toast.success("Departamento vendido correctamente");
                setSellAlert(false);
              },
              onError: () => {
                toast.error(
                  "Hubo un error al intentar vender el departamento."
                );
              },
            }
          );
        }}
      />
    </Menu>
  );
}

export default ApartmentMenu;

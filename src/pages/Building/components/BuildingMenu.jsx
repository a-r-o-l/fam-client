import { ActionIcon, Menu } from "@mantine/core";
import { EllipsisVertical, Pencil, Trash2 } from "lucide-react";
import { CustomDialog } from "../../../components/Dialog/CustomDialog";
import { useState } from "react";
import { useDeleteBuildingMutation } from "../../../services/hooks/Building/useBuildingMutation";
import { toast } from "sonner";

function BuildingMenu({ building, onEdit }) {
  const [openAlert, setOpenAlert] = useState(false);
  const deleteBuilding = useDeleteBuildingMutation();

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
              //   fontWeight: 900,
              //   fontSize: 16,
            },
          }}
        >
          {building?.name?.toUpperCase() ?? ""}
        </Menu.Label>

        <Menu.Item
          onClick={() => {
            onEdit(building);
          }}
          rightSection={<Pencil size={20} />}
        >
          Editar
        </Menu.Item>
        <Menu.Divider />
        <Menu.Item
          onClick={() => {
            setOpenAlert(true);
          }}
          rightSection={<Trash2 size={20} />}
          color="red"
        >
          Eliminar
        </Menu.Item>
      </Menu.Dropdown>
      <CustomDialog
        open={openAlert}
        onClose={() => setOpenAlert(false)}
        loading={deleteBuilding.isPending}
        text={`¿Estas seguro que deseas eliminar el complejo ${
          building?.name?.toUpperCase() ?? ""
        }?`}
        onConfirm={() => {
          deleteBuilding.mutate(
            { id: building.id },
            {
              onSuccess: () => {
                toast.success("Complejo eliminado correctamente");
                setOpenAlert(false);
              },
              onError: () => {
                toast.error("Error al eliminar el complejo");
                setOpenAlert(false);
              },
            }
          );
        }}
      />
    </Menu>
  );
}

export default BuildingMenu;

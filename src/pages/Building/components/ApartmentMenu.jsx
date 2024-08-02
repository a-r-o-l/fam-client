import { ActionIcon, Menu } from "@mantine/core";
import { CircleDollarSign, EllipsisVertical, User } from "lucide-react";
import { useMemo, useState } from "react";
import { CustomDialog } from "../../../components/Dialog/CustomDialog";
import { useUpdateApartmentMutation } from "../../../services/hooks/Apartment/useApartmentMutation";
import { toast } from "sonner";

function ApartmentMenu({ apartment, renter, setSelectedRenter }) {
  const [openAlert, setOpenAlert] = useState(false);
  const updateApartment = useUpdateApartmentMutation();

  const buySell = useMemo(() => {
    if (apartment?.it_was_sold) {
      return { may: "Comprar", min: "comprar" };
    } else {
      return { may: "Vender", min: "vender" };
    }
  }, [apartment]);

  return (
    <Menu shadow="xl" width={250} position="bottom-start">
      <Menu.Target>
        <ActionIcon variant="transparent" color="" size={25}>
          <EllipsisVertical />
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
          Departamento {apartment?.number}
        </Menu.Label>

        <Menu.Divider />

        <Menu.Item
          onClick={() => {
            setSelectedRenter(renter);
          }}
          rightSection={<User />}
          disabled={apartment.it_was_sold || !apartment.rented}
        >
          Inquilino
        </Menu.Item>
        <Menu.Divider />
        <Menu.Item
          rightSection={<CircleDollarSign />}
          color={apartment.it_was_sold ? undefined : "red"}
          onClick={() => {
            setOpenAlert(true);
          }}
        >
          {buySell.may}
        </Menu.Item>
      </Menu.Dropdown>
      <CustomDialog
        open={openAlert}
        onClose={() => setOpenAlert(false)}
        text={`¿Estas seguro que deseas ${buySell.min} el departamento ${apartment.number}?`}
        onConfirm={() => {
          updateApartment.mutate(
            {
              id: apartment.id,
              data: {
                it_was_sold: !apartment.it_was_sold,
              },
            },
            {
              onSuccess: () => {
                setOpenAlert(false);
              },
              onError: () => {
                toast.error(
                  `Ocurrió un error al intentar ${buySell.min} el departamento`
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

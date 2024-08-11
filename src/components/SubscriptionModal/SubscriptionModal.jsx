import { Button, Divider, Loader, Modal, Badge } from "@mantine/core";
import { useCallback, useEffect, useState } from "react";
import { useAccountStore } from "../../store/useAccountStore";
import { toast } from "sonner";
import { initMercadoPago, Wallet } from "@mercadopago/sdk-react";
import { usePreferenceMutation } from "../../services/hooks/Subscription/useSubscriptionMutation";
import { v4 } from "uuid";
import { ShieldMinus, LogOut } from "lucide-react";
import { Avatar } from "@mui/material";

const mercadopagoPublicKey = import.meta.env.VITE_MERCADOPAGO_PUBLIC_KEY;

const SubscriptionModal = ({ open, onCloseModal }) => {
  initMercadoPago(mercadopagoPublicKey, {
    locale: "es-AR",
  });
  const { account, setCloseSession } = useAccountStore();
  const [preferenceId, setPreferenceId] = useState("");
  const createPreference = usePreferenceMutation();

  useEffect(() => {
    if (open) {
      const data = {
        title: "Suscripcion",
        unit_price: 100,
        id: v4(),
        description: "Suscripcion mensual",
      };
      createPreference.mutate(data, {
        onSuccess: (response) => {
          setPreferenceId(response.result.id);
        },
        onError: (error) => {
          toast.error("Error al crear la preferencia", error);
        },
      });
    }
  }, [open]);

  const renderBody = useCallback(() => {
    if (createPreference.isPending) {
      return (
        <div className="flex flex-1 justify-center items-center h-full">
          <Loader color="blue" />
        </div>
      );
    } else {
      return (
        <div className="flex flex-1 flex-col justify-end">
          <div className="flex flex-col my-5 justify-center items-center gap-2">
            <Avatar
              src={account.image_url}
              className="filter grayscale border-4 border-white"
              sx={{ width: 70, height: 70 }}
            />
            <p>{account.email}</p>
          </div>
          <div className="flex items-center gap-2 justify-center">
            <ShieldMinus size={40} />
            <h1 className="font-bold text-2xl">Cuenta desactivada</h1>
          </div>

          <div className="mt-5">
            <p className="text-left font-bold text-lg">
              Tu cuenta se encuentra desactivada hasta que se realice el pago de
              una nueva suscripcion.
            </p>
          </div>

          <div className="mt-5 text-zinc-400">
            <p className="text-left">
              Una vez realizado el pago, el modal se cerrará automáticamente.
            </p>
            <p className="text-left">
              Para abonar la suscripción debes hacer click en el boton de
              mercadopago.
            </p>
          </div>
          <div className="flex flex-row gap-2 justify-start">
            <p className="text-fam_deep_red-8 text-sm mt-5">
              Tu suscripcion expiro el
            </p>
            <Badge
              color="red"
              className="mt-5"
              radius="xl"
              styles={{
                label: {
                  color: "black",
                },
              }}
            >
              12/04/24
            </Badge>
          </div>
          <Divider mt={30} />

          <div className="flex justify-center w-full mt-10">
            <Wallet
              initialization={{
                preferenceId: preferenceId,
                redirectMode: "self",
              }}
              locale="es-AR"
              onSubmit={(data) => {
                console.log("data from onSubmit: ", data);
              }}
            />
          </div>
          <div className="flex w-full justify-end mt-20">
            <Button
              leftSection={<LogOut />}
              color="dark"
              radius="xl"
              size="sm"
              variant="subtle"
              onClick={() => setCloseSession()}
            >
              Cerrar sesion
            </Button>
          </div>
        </div>
      );
    }
  }, [account, createPreference, preferenceId, setCloseSession]);

  return (
    <Modal
      withCloseButton={false}
      opened={open}
      onClose={onCloseModal}
      centered
      size="md"
      radius="md"
      overlayProps={{
        blur: 3,
        backgroundOpacity: 0.4,
      }}
      styles={{
        header: {
          justifyContent: "flex-start",
          paddingLeft: 40,
        },
        title: {
          fontSize: "1rem",
        },
        body: {
          padding: 40,
          height: 800,
        },
      }}
    >
      {renderBody()}
    </Modal>
  );
};

export default SubscriptionModal;

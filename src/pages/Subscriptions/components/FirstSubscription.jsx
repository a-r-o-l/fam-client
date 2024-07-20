import { useEffect, useState } from "react";
import { Loader } from "@mantine/core";
import { v4 } from "uuid";
import { usePreferenceMutation } from "../../../services/hooks/Subscription/useSubscriptionMutation";
import { toast } from "sonner";
import { initMercadoPago, Wallet } from "@mercadopago/sdk-react";

const mercadopagoPublicKey = import.meta.env.VITE_MERCADOPAGO_PUBLIC_KEY;

export const FirstSubscription = () => {
  initMercadoPago(mercadopagoPublicKey, {
    locale: "es-AR",
  });
  const createPreference = usePreferenceMutation();

  const [preferenceId, setPreferenceId] = useState("");

  useEffect(() => {
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
  }, []);

  return (
    <div className="flex flex-1 flex-col justify-center items-center gap-10">
      <div className="flex gap-2">
        <h1>Primer pago</h1>
      </div>
      <div className="flex flex-col justify-center items-center gap-1">
        <div className="flex mt-10">
          {createPreference.isPending ? (
            <Loader color="blue" />
          ) : (
            <Wallet
              initialization={{
                preferenceId: preferenceId,
                redirectMode: "modal",
              }}
              locale="es-AR"
              onSubmit={(data) => {
                console.log("data from onSubmit: ", data);
              }}
            />
          )}
        </div>
      </div>
    </div>
  );
};

import { useEffect, useMemo, useState } from "react";
import { useAccountStore } from "../../../store/useAccountStore";
import { Loader, Progress } from "@mantine/core";
import dayjs from "dayjs";
import { v4 } from "uuid";
import { usePreferenceMutation } from "../../../services/hooks/Subscription/useSubscriptionMutation";
import { toast } from "sonner";
import { initMercadoPago, Wallet } from "@mercadopago/sdk-react";

const mercadopagoPublicKey = import.meta.env.VITE_MERCADOPAGO_PUBLIC_KEY;

export const ExpiredSubscription = () => {
  initMercadoPago(mercadopagoPublicKey, {
    locale: "es-AR",
  });
  const { account } = useAccountStore();
  const createPreference = usePreferenceMutation();

  const [preferenceId, setPreferenceId] = useState("");

  const subscription = useMemo(() => {
    return account.Subscriptions[0];
  }, [account]);

  const timeRemaining = useMemo(() => {
    const today = dayjs();
    const start = dayjs(subscription.start_date);
    const end = dayjs(subscription.end_date);
    const totalDays = end.diff(start, "days");
    const daysPassed = today.diff(start, "days");
    const validDaysPassed = Math.max(0, Math.min(daysPassed, totalDays));
    const percentage = (validDaysPassed / totalDays) * 100;
    return { daysPassed: validDaysPassed, percentage, totalDays };
  }, [subscription]);

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
        <h1>La suscripcion expiró el:</h1>
        <h1>{dayjs(subscription.end_date).format("DD/MM/YY")}</h1>
      </div>
      <div className="flex flex-col justify-center items-center gap-1">
        <div className="flex w-full justify-center items-center">
          <p className="text-center font-bold text-xs">Expirado</p>
        </div>
        <div className="min-w-40">
          <Progress
            value={timeRemaining.percentage}
            color="famdeepred.6"
            size="md"
          />
        </div>
        <div className="flex mt-10">
          {createPreference.isPending ? (
            <Loader color="blue" />
          ) : (
            <Wallet
              initialization={{
                preferenceId: preferenceId,
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

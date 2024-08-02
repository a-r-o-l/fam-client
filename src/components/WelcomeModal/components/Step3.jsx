import { Button, Divider, Loader } from "@mantine/core";
import { initMercadoPago, Wallet } from "@mercadopago/sdk-react";
import { Gift, LogOut, ShieldCheck } from "lucide-react";
import { useEffect, useState } from "react";
import { v4 } from "uuid";
import { usePreferenceMutation } from "../../../services/hooks/Subscription/useSubscriptionMutation";
import { toast } from "sonner";
import { useAccountStore } from "../../../store/useAccountStore";
import dayjs from "dayjs";
import BackButton from "./BackButton";
import { useUpdateAccountMutation } from "../../../services/hooks/Account/useAccountMutation";
import { useSubscriptionMutation } from "../../../services/hooks/Subscription/useSubscriptionMutation";

const mercadopagoPublicKey = import.meta.env.VITE_MERCADOPAGO_PUBLIC_KEY;

function Step3({ setActive }) {
  initMercadoPago(mercadopagoPublicKey, {
    locale: "es-AR",
  });
  const { account, setCloseSession } = useAccountStore();
  const [preferenceId, setPreferenceId] = useState("");
  const [timeout, settimeout] = useState(false);
  const createPreference = usePreferenceMutation();
  const updateAccount = useUpdateAccountMutation();
  const createSubscription = useSubscriptionMutation();

  const today = dayjs();
  const expiration = dayjs(today).add(1, "month").format("DD/MM/YYYY");

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

  if (createPreference.isPending) {
    return (
      <div className="flex flex-1 justify-center items-center h-full">
        <Loader color="blue" />
      </div>
    );
  } else {
    return (
      <div className="flex flex-1 flex-col h-full">
        <BackButton action={() => setActive(1)}>
          <Button
            leftSection={<LogOut size={16} />}
            color="dark"
            radius="xl"
            size="xs"
            variant="default"
            onClick={() => setCloseSession()}
          >
            Cerrar sesion
          </Button>
        </BackButton>
        {/* <div className="flex flex-col justify-center items-center gap-2">
          <Avatar
            src={account.image_url}
            className="border-4 border-white"
            sx={{ width: 70, height: 70 }}
          />
          <p>{account.email}</p>
        </div> */}
        <div className="flex items-center gap-2 justify-center mt-5">
          <ShieldCheck size={30} className="text-fam_green-6" />
          <h1 className="font-bold text-xl">Completa tu suscripción</h1>
        </div>

        <div className="mt-5">
          <p className="text-left font-bold text-md">
            Estás a solo un paso de desbloquear todas las funcionalidades de
            Complex. Realiza el pago de tu suscripción mensual de forma segura y
            rápida a través de MercadoPago.
          </p>
        </div>

        <div className="text-zinc-400 mt-2">
          <p className="text-left">
            Al completar el pago, tu cuenta se activará automáticamente y podrás
            comenzar a gestionar tus inmuebles e inquilinos sin restricciones.
          </p>
          <p className="text-left">
            Para abonar la suscripción debes hacer click en el boton de
            mercadopago.
          </p>
        </div>
        <div className="mt-5">
          <p className="text-center text-sm">
            Si abonas hoy, la suscripción expirará:
          </p>
          <p className="text-center text-sm font-bold text-fam_red-5">
            {expiration}
          </p>
        </div>
        <div className="flex justify-center w-full mt-5">
          <Wallet
            initialization={{
              preferenceId: preferenceId,
              redirectMode: "self",
            }}
            locale="es-AR"
            onSubmit={() => {
              updateAccount.mutate(
                { accountId: account.id, data: { is_new: false } },
                {
                  onSuccess: () => {
                    console.log("Account updated");
                  },
                  onError: () => {
                    console.log("Error updating account");
                  },
                }
              );
            }}
          />
        </div>
        <div className="px-20">
          <Divider label="O" my={20} />
        </div>
        <div className="flex flex-col gap-10 px-20 items-center justify-end mt-5">
          <Button
            variant="transparent"
            color="dark"
            leftSection={<Gift size={20} />}
            size="md"
            w={290}
            loading={createSubscription.isPending || timeout}
            onClick={() => {
              createSubscription.mutate(
                {
                  status: "free",
                  start_date: today.toISOString(),
                  end_date: today.add(1, "day").toISOString(),
                  value: 0,
                },
                {
                  onSuccess: () => {
                    updateAccount.mutate(
                      { accountId: account.id, data: { is_new: false } },
                      {
                        onSuccess: () => {
                          settimeout(true);
                          setTimeout(() => {
                            setCloseSession();
                            toast.info(
                              "Suscripción gratuita activada, debes iniciar sesión nuevamente"
                            );
                            settimeout(false);
                          }, 2000);
                        },
                        onError: () => {
                          console.log("Error updating account");
                          settimeout(false);
                        },
                      }
                    );
                  },
                  onError: () => {
                    toast.error("Error al activar la suscripción gratuita");
                  },
                }
              );
            }}
          >
            Probar el servicio por 24 hs
          </Button>
          {/* <Button
            onClick={() => {
              console.log(account);
            }}
          >
            test
          </Button> */}
        </div>
      </div>
    );
  }
}

export default Step3;

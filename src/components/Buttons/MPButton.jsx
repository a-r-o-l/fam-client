import { useEffect, useState } from "react";
import { initMercadoPago, Wallet } from "@mercadopago/sdk-react";
import { suscriptionsApiService } from "../../services/subscriptionsApiService";
import { Button } from "@mantine/core";
import { v4 as uuidv4 } from "uuid";

export const MercadoPagoButton = () => {
  const [preferenceId, setPreferenceId] = useState("");
  const [loading, setLoading] = useState(false);

  initMercadoPago("APP_USR-71cfd048-c2ed-4bc6-a05a-27014ae2f6ed", {
    locale: "es-AR",
  });

  const createPreference = async () => {
    try {
      setLoading(true);
      const data = {
        title: "Suscripcion",
        unit_price: 100,
        id: uuidv4(),
        description: "Suscripcion mensual",
      };
      const response = await suscriptionsApiService.createPreference(data);
      if (response) {
        const id = response.result.id;
        return id;
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Button
        variant="outline"
        color="blue"
        loading={loading}
        onClick={async () => {
          const id = await createPreference();
          setPreferenceId(id);
        }}
      >
        Suscribete
      </Button>
      {preferenceId && (
        <>
          <h1>mercadopago</h1>
          <Wallet
            initialization={{
              preferenceId: preferenceId,
            }}
          />
        </>
      )}
    </div>
  );
};

import { Avatar, Image, Paper, Badge } from "@mantine/core";
import { useAnalitycsFeaturesQuery } from "../../services/hooks/Analitycs/useAnalitycsQuery";
import { useAccountStore } from "../../store/useAccountStore";

import PropertiesFeatures from "./components/PropertiesFeatures";
import RentersFeatures from "./components/RentersFeatures";
import PaymentsFeatures from "./components/PaymentsFeatures";
import { useEffect } from "react";

function Home() {
  const { data, refetch } = useAnalitycsFeaturesQuery();
  const { account } = useAccountStore();

  console.log(account);

  useEffect(() => {
    refetch();
  }, []);

  return (
    <div className="flex flex-col gap-10 px-20">
      <h1 className="text-2xl font-bold">Colecciones</h1>
      <div className="flex flex-1 gap-10">
        <Paper
          shadow="xl"
          radius="xl"
          p="xl"
          className="flex flex-1 flex-col"
          withBorder
        >
          <PropertiesFeatures
            buildings={data?.buildings}
            houses={data?.houses}
            apartments={data?.apartments}
            lounges={data?.lounges}
          />
        </Paper>
        <Paper
          shadow="xl"
          radius="xl"
          p="xl"
          className="flex flex-1 flex-col"
          withBorder
        >
          <RentersFeatures
            activeRenters={data?.activeRenters}
            inactiveRenters={data?.inactiveRenters}
          />
        </Paper>
        <Paper
          shadow="xl"
          radius="xl"
          p="xl"
          className="flex flex-1 flex-col"
          withBorder
        >
          <PaymentsFeatures
            donePayments={data?.donePayments}
            pendingPayments={data?.pendingPayments}
            totalAmountPayments={data?.totalAmountPayments}
          />
        </Paper>
      </div>
    </div>
  );
}

export default Home;

import { Card } from "@mantine/core";
import { useAnalitycsQuery } from "../../services/hooks/Analitycs/useAnalitycsQuery";
import { LineChart } from "./components/LineChart";
import { BarChart } from "./components/BarChart";
import { PieChart } from "./components/PieChart";
import { useMemo } from "react";

const uData = [4000, 3000, 2000, 2780, 1890, 2390, 3490];
const pData = [2400, 1398, 9800, 3908, 4800, 3800, 4300];
const xLabels = [
  "Page A",
  "Page B",
  "Page C",
  "Page D",
  "Page E",
  "Page F",
  "Page G",
];
const series = [
  { data: pData, label: "pv", id: "pvId" },
  { data: uData, label: "uv", id: "uvId" },
];

export const AnalitycsScreen = () => {
  const { data } = useAnalitycsQuery();

  const renterXasis = useMemo(() => {
    if (data) {
      const { renters } = data;
      const arr = renters.map((renter) => {
        return `${renter.name} ${renter.lastname}`;
      });
      return arr;
    }
    return [];
  }, [data]);

  const renterSeriesPandP = useMemo(() => {
    if (data) {
      const { renters } = data;
      let payedsArr = [];
      let pendings = [];
      renters.forEach((renter) => {
        payedsArr.push(renter.payedPayments);
        pendings.push(renter.pendingPayments);
      });
      const series = [
        {
          data: payedsArr,
          label: "Pagados",
          id: "payedId",
          stack: "A",
        },
        {
          data: pendings,
          label: "Pendientes",
          id: "pendingId",
          stack: "A",
        },
      ];
      return series;
    }
    return [];
  }, [data]);

  return (
    <div className="flex flex-col flex-1 gap-10">
      <Card withBorder radius="md" shadow="md">
        <LineChart series={renterSeriesPandP} xasis={renterXasis} />
      </Card>
      <Card withBorder radius="md" shadow="md">
        <BarChart series={renterSeriesPandP} xasis={renterXasis} />
      </Card>
      <Card withBorder radius="md" shadow="md">
        <PieChart />
      </Card>
    </div>
  );
};

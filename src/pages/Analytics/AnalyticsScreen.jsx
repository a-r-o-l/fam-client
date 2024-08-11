import { Select } from "@mantine/core";
import { useAnalitycsQuery } from "../../services/hooks/Analitycs/useAnalitycsQuery";
import {
  Building,
  Building2,
  Calendar,
  DoorClosed,
  House,
  Store,
} from "lucide-react";
import { MonthPickerInput } from "@mantine/dates";
import dayjs from "dayjs";
import ApexCharts from "apexcharts";
import { useMemo, useState } from "react";
import { CChartBar } from "@coreui/react-chartjs";

// const uData = [4000, 3000, 2000, 2780, 1890, 2390, 3490];
// const pData = [2400, 1398, 9800, 3908, 4800, 3800, 4300];
// const xLabels = [
//   "Page A",
//   "Page B",
//   "Page C",
//   "Page D",
//   "Page E",
//   "Page F",
//   "Page G",
// ];
// const series = [
//   { data: pData, label: "pv", id: "pvId" },
//   { data: uData, label: "uv", id: "uvId" },
// ];

const chartOptions = {
  series: [
    {
      name: "Net Profit",
      data: [44, 55, 57, 56, 61, 58, 63, 60, 66],
    },
    {
      name: "Revenue",
      data: [76, 85, 101, 98, 87, 105, 91, 114, 94],
    },
    {
      name: "Free Cash Flow",
      data: [35, 41, 36, 26, 45, 48, 52, 53, 41],
    },
  ],
  options: {
    chart: {
      type: "bar",
      height: 350,
    },
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: "55%",
        endingShape: "rounded",
      },
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      show: true,
      width: 2,
      colors: ["transparent"],
    },
    xaxis: {
      categories: [
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
      ],
    },
    yaxis: {
      title: {
        text: "$ (thousands)",
      },
    },
    fill: {
      opacity: 1,
    },
    tooltip: {
      y: {
        formatter: function (val) {
          return "$ " + val + " thousands";
        },
      },
    },
  },
};

export const AnalyticsScreen = () => {
  const [propertyType, setPropertyType] = useState("buildings");
  const [fromState, setFromState] = useState(dayjs().toDate());
  const [toState, setToState] = useState(dayjs().add(1, "month").toDate());
  const { data } = useAnalitycsQuery({
    type: "buildings",
    from: fromState,
    to: toState,
  });

  console.log(data);

  // const parsedData = useMemo(() => {
  //   if (data?.buildings?.length) {
  //     const buildings = data?.buildings;
  //     const mappedBuildings = buildings?.map((b) => {
  //       const apartments = b.Apartments;
  //       const aptsWithPayments = apartments?.map((apartment) => {
  //         const payments = b.payments;
  //         const filteredPayments = payments.filter(
  //           (payment) => payment.apartment_id === apartment.id
  //         );
  //         const paymentsAmount = filteredPayments.reduce(
  //           (acc, payment) =>
  //             typeof acc === "string"
  //               ? parseInt(acc)
  //               : acc + parseInt(payment.value),
  //           0
  //         );
  //         return { ...apartment, payments: paymentsAmount };
  //       });
  //       return { ...b, Apartments: aptsWithPayments };
  //     });
  //     return mappedBuildings;
  //   }
  //   return [];
  // }, [data]);

  return (
    <div className="flex flex-col flex-1 gap-10">
      <div className="flex flex-row gap-10">
        <div>
          <Select
            value={propertyType}
            onChange={setPropertyType}
            leftSection={<Building2 size={20} />}
            rightSectionPointerEvents="auto"
            label="Propiedades"
            data={[
              { id: 1, label: "Edificios", value: "buildings", icon: Building },
              { id: 2, label: "Casas", value: "houses", icon: House },
              { id: 3, label: "Salones", value: "lounges", icon: Store },
              {
                id: 4,
                label: "Departamentos",
                value: "apartments",
                icon: DoorClosed,
              },
            ]}
            styles={{
              label: {
                width: "100%",
              },
            }}
            renderOption={({ option }) => {
              return (
                <div className="flex gap-2" key={option.id}>
                  <option.icon size={20} />
                  <span>{option.label}</span>
                </div>
              );
            }}
          />
        </div>
        <div className="w-60">
          <MonthPickerInput
            label="Desde"
            leftSection={<Calendar size={20} format="DD/MM/YYYY" />}
            value={fromState}
            onChange={setFromState}
          />
        </div>
        <div className="w-60">
          <MonthPickerInput
            label="Hasta"
            leftSection={<Calendar size={20} format="DD/MM/YYYY" />}
            value={toState}
            onChange={setToState}
          />
        </div>
      </div>
      {/* <div className="flex flex-col flex-1">
        {parsedData.length ? (
          parsedData?.map((building) => {
            let xasis = [];
            let series = [];
            if (building.Apartments.length) {
              xasis = building.Apartments.map((apt) => apt.number);
              series = building.Apartments.map((apt) => {
                return {
                  data: [apt.payments],
                  label: apt.number,
                  radius: 50,
                  backgroundColor: "#f87979",
                };
              });
            }

            return (
              <div
                key={building.id}
                className="flex w-3/4 border justify-center"
              >
                <CChartBar
                  style={{ width: "50%" }}
                  data={{
                    labels: xasis,
                    datasets: [
                      {
                        barPercentage: 0.2,
                        // barThickness: 6,
                        // maxBarThickness: 8,
                        // minBarLength: 2,
                        axis: "y",
                        fill: false,
                        backgroundColor: [
                          "rgba(255, 99, 132, 0.5)",
                          "rgba(255, 159, 64, 0.5)",
                          "rgba(255, 205, 86, 0.5)",
                          "rgba(75, 192, 192, 0.5)",
                          "rgba(54, 162, 235, 0.5)",
                          "rgba(153, 102, 255, 0.5)",
                          "rgba(201, 203, 207, 0.5)",
                        ],
                        borderColor: [
                          "rgb(255, 99, 132)",
                          "rgb(255, 159, 64)",
                          "rgb(255, 205, 86)",
                          "rgb(75, 192, 192)",
                          "rgb(54, 162, 235)",
                          "rgb(153, 102, 255)",
                          "rgb(201, 203, 207)",
                        ],
                        borderWidth: 4,
                        data: [65, 59, 90, 81, 56, 55, 40],
                      },
                    ],
                  }}
                  options={{
                    plugins: {
                      title: {
                        text: "Pagos por departamento",
                        display: true,
                        fullSize: true,
                        align: "start",
                        font: { size: 18 },
                        padding: 40,
                      },
                      legend: {
                        display: false,
                      },
                      tooltip: {
                        enabled: true,
                        bodyColor: "#ff0000",
                      },
                    },
                    aspectRatio: 1.2,
                  }}
                />
              </div>
            );
          })
        ) : (
          <></>
        )}
      </div> */}
      <div className="flex flex-1 w-1/2">
        {/* <CChartBar
          data={{
            labels: [
              "January",
              "February",
              "March",
              "April",
              "May",
              "June",
              "July",
            ],
            datasets: [
              {
                label: "2019",
                backgroundColor: "#f87979",
                // borderColor: "rgba(179,181,198,1)",
                // pointBackgroundColor: "rgba(179,181,198,1)",
                // pointBorderColor: "#fff",
                // pointHoverBackgroundColor: "#fff",
                // pointHoverBorderColor: "rgba(179,181,198,1)",
                // tooltipLabelColor: "rgba(179,181,198,1)",
                data: [65, 59, 90, 81, 56, 55, 40],
                radius: 50,
              },
              {
                label: "2020",
                backgroundColor: "rgba(255,99,132,0.2)",
                borderColor: "rgba(255,99,132,1)",
                pointBackgroundColor: "rgba(255,99,132,1)",
                pointBorderColor: "#fff",
                pointHoverBackgroundColor: "#fff",
                pointHoverBorderColor: "rgba(255,99,132,1)",
                tooltipLabelColor: "rgba(255,99,132,1)",
                data: [28, 48, 40, 19, 96, 27, 100],
              },
            ],
          }}
          options={{
            aspectRatio: 1.5,
            tooltips: {
              enabled: true,
            },
          }}
        /> */}
      </div>
      {/* <Card withBorder radius="md" shadow="md">
        <LineChart series={renterSeriesPandP} xasis={renterXasis} />
      </Card>
      <Card withBorder radius="md" shadow="md">
        <BarChart series={renterSeriesPandP} xasis={renterXasis} />
      </Card>
      <Card withBorder radius="md" shadow="md">
        <PieChart />
      </Card> */}
    </div>
  );
};

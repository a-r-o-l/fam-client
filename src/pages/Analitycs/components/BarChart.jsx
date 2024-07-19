import { BarChart as BarChartMaterial } from "@mui/x-charts/BarChart";

export const BarChart = ({ series, xasis }) => {
  return (
    <BarChartMaterial
      xAxis={[{ scaleType: "band", data: xasis }]}
      series={series}
      width={1500}
      height={300}
      layout="vertical"
    />
  );
};

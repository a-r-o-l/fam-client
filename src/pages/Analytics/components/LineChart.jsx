import { LineChart as LineChartMaterial } from "@mui/x-charts";

export const LineChart = ({ series, xasis }) => {
  return (
    <LineChartMaterial
      width={1500}
      height={300}
      series={series}
      xAxis={[{ scaleType: "point", data: xasis }]}
      sx={{
        ".MuiLineElement-root, .MuiMarkElement-root": {
          strokeWidth: 1,
        },
        ".MuiLineElement-series-pvId": {
          strokeDasharray: "5 5",
        },
        ".MuiLineElement-series-uvId": {
          strokeDasharray: "3 4 5 2",
        },
        ".MuiMarkElement-root:not(.MuiMarkElement-highlighted)": {
          fill: "#fff",
        },
        "& .MuiMarkElement-highlighted": {
          stroke: "none",
        },
      }}
    />
  );
};

import { Progress, Text } from "@mantine/core";
import dayjs from "dayjs";
import React, { useMemo } from "react";

export const CustomProgress = ({ item }) => {
  const progressValue = useMemo(() => {
    const today = dayjs();
    const start = dayjs(item?.start_date);
    const end = dayjs(item?.end_date);
    const totalDuration = end.diff(start, "month");
    const elapsedDuration = today.diff(start, "month");

    return (elapsedDuration / totalDuration) * 100;
  }, [item]);

  const progressColor = useMemo(() => {
    if (progressValue < 50) {
      return "green";
    } else if (progressValue < 80) {
      return "yellow";
    } else {
      return "red";
    }
  }, [progressValue]);

  return (
    <div>
      {item ? <Progress value={progressValue} color={progressColor} /> : ""}
    </div>
  );
};

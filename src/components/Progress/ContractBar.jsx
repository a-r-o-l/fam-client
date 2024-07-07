import { Progress } from "@mantine/core";
import dayjs from "dayjs";
import { useMemo } from "react";

export const ContractBar = ({ item }) => {
  const progressValue = useMemo(() => {
    const today = dayjs();
    const start = dayjs(item?.start_date);
    const end = dayjs(item?.end_date);
    const totalDuration = end.diff(start, "month");
    const elapsedDuration = today.diff(start, "month");

    return Math.round((elapsedDuration / totalDuration) * 100);
  }, [item]);

  const progressColor = useMemo(() => {
    if (progressValue < 25) {
      return "famblue.4";
    }
    if (progressValue < 50) {
      return "famgreen.6";
    } else if (progressValue < 75) {
      return "famyellow.4";
    } else {
      return "famdeepred.6";
    }
  }, [progressValue]);

  if (!item) {
    return <></>;
  }

  return (
    <div className="flex flex-col justify-center items-center gap-1">
      <div className="flex w-full justify-center items-center">
        <p className="text-center font-bold text-xs">
          {progressValue.toString()} %
        </p>
      </div>
      <div className="min-w-40">
        <Progress value={progressValue} color={progressColor} size="md" />
      </div>
    </div>
  );
};

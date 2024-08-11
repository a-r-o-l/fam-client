import { Progress } from "@mantine/core";
import dayjs from "dayjs";
import { useMemo } from "react";

export const ContractBar = ({ item }) => {
  const progressValue = useMemo(() => {
    const today = dayjs();
    const start = dayjs(item?.start_date);
    const end = dayjs(item?.end_date);
    const totalDuration = end.diff(start, "days");
    const elapsedDuration = today.diff(start, "days");
    return Math.round((elapsedDuration / totalDuration) * 100);
  }, [item]);

  const parsedProgress = useMemo(() => {
    if (isNaN(progressValue)) {
      return 100;
    }
    if (progressValue > 100) {
      return 100;
    }
    return progressValue;
  }, [progressValue]);

  const progressColor = useMemo(() => {
    if (parsedProgress < 25) {
      return "famblue.4";
    }
    if (parsedProgress < 50) {
      return "famgreen.6";
    } else if (parsedProgress < 75) {
      return "famyellow.4";
    } else {
      return "famdeepred.6";
    }
  }, [parsedProgress]);

  if (!item) {
    return <></>;
  }

  return (
    <div className="flex flex-col justify-center items-center gap-1">
      <div className="flex w-full justify-center items-center">
        <p className="text-center font-bold text-xs">
          {parsedProgress.toString()} %
        </p>
      </div>
      <div className="min-w-24">
        <Progress value={parsedProgress} color={progressColor} size="sm" />
      </div>
    </div>
  );
};

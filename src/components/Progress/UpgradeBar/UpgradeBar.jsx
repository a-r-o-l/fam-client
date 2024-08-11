import { Progress } from "@mantine/core";
import dayjs from "dayjs";
import { useMemo } from "react";
import { UpgradeExpiredBar } from "./UpgradeExpiredBar";

export const UpgradeBar = ({ item }) => {
  const hasUpgrade = useMemo(() => {
    if (item?.months_upgrade) {
      return true;
    }
    return false;
  }, [item]);

  const daysLeft = useMemo(() => {
    if (hasUpgrade) {
      const today = dayjs();
      const start = dayjs(item?.upgrade_start_date);
      const end = dayjs(item?.upgrade_end_date);
      const tiempoTotal = end.diff(start, "day");
      let tiempoTranscurrido = today.diff(start, "day");
      const totalDuration = end.diff(start, "day");
      const elapsedDuration = today.diff(start, "day");

      const progressValue = Math.round((elapsedDuration / totalDuration) * 100);
      tiempoTranscurrido = Math.max(0, tiempoTranscurrido);
      tiempoTranscurrido = Math.min(tiempoTranscurrido, tiempoTotal);
      return { tiempoTranscurrido, tiempoTotal, progressValue };
    } else {
      return {
        tiempoTranscurrido: 0,
        tiempoTotal: 0,
        progressValue: 0,
      };
    }
  }, [item, hasUpgrade]);

  const progressColor = useMemo(() => {
    if (daysLeft?.progressValue < 25) {
      return "famblue.4";
    }
    if (daysLeft?.progressValue < 50) {
      return "famgreen.6";
    } else if (daysLeft?.progressValue < 75) {
      return "famyellow.4";
    } else {
      return "famdeepred.6";
    }
  }, [daysLeft]);

  if (!hasUpgrade) {
    return <></>;
  }

  if (daysLeft?.progressValue < 100) {
    return (
      <div className="flex flex-col justify-center items-center gap-1">
        <div className="flex w-full justify-center items-center">
          <p className="text-center font-bold text-xs">
            {daysLeft.tiempoTranscurrido} / {daysLeft.tiempoTotal}
          </p>
        </div>
        <div className="min-w-24">
          <Progress
            value={daysLeft.progressValue}
            color={progressColor}
            size="sm"
          />
        </div>
      </div>
    );
  }

  return (
    <UpgradeExpiredBar
      item={item}
      progressColor={progressColor}
      progressValue={daysLeft.progressValue}
    />
  );
};

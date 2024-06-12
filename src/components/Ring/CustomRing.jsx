import { RingProgress, Text } from "@mantine/core";
import dayjs from "dayjs";
import { useMemo } from "react";

export const CustomRing = ({ item }) => {
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

  return (
    <div className="w-3/4">
      {item ? (
        <RingProgress
          size={70}
          thickness={5}
          value={progressValue}
          sections={[{ value: progressValue, color: progressColor }]}
          label={
            <Text
              // c={progressColor}
              fw={400}
              ta="center"
              size="xs"
              className="text-black dark:text-white"
            >
              {progressValue}%
            </Text>
          }
        />
      ) : (
        ""
      )}
    </div>
  );
};

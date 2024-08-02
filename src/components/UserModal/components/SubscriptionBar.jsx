import { Progress, Text } from "@mantine/core";
import dayjs from "dayjs";
import { useMemo } from "react";

function SubscriptionBar({ account }) {
  const subscription = useMemo(() => {
    if (account?.Subscriptions?.length) {
      return account.Subscriptions[0];
    } else {
      return null;
    }
  }, [account]);

  const daysLeft = useMemo(() => {
    if (subscription) {
      const today = dayjs();
      const start = dayjs(subscription?.start_date);
      const end = dayjs(subscription?.end_date);

      const totalDuration = end.diff(start, "hour");
      const elapsedDuration = today.diff(start, "hour");

      const progressValue =
        totalDuration > 0
          ? Math.round((elapsedDuration / totalDuration) * 100)
          : 0;

      let timeRemaining = end.diff(today, "hour");
      timeRemaining = Math.max(0, timeRemaining);
      timeRemaining = Math.min(timeRemaining, totalDuration);

      return { timeRemaining, totalDuration, progressValue, elapsedDuration };
    } else {
      return null;
    }
  }, [subscription]);

  console.log(daysLeft);

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

  return (
    <div className="flex flex-col w-full gap-1">
      <div className="flex w-full"></div>

      <Progress
        value={daysLeft?.progressValue}
        size="md"
        color={progressColor}
      />
      <div className="flex w-full justify-end">
        <Text size="xs">
          {daysLeft?.elapsedDuration || 0} / {daysLeft?.totalDuration}
        </Text>
      </div>
    </div>
  );
}

export default SubscriptionBar;

import { Progress } from "@mantine/core";
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
      const start = dayjs(subscription?.start_day);
      const end = dayjs(subscription?.end_day);
      const totalTime = end.diff(start, "day");
      const totalDuration = end.diff(start, "day");
      let timeRemaining = today.diff(start, "day");
      const elapsedDuration = today.diff(start, "day");

      const progressValue = Math.round((elapsedDuration / totalDuration) * 100);
      timeRemaining = Math.max(0, timeRemaining);
      timeRemaining = Math.min(timeRemaining, totalTime);
      return { timeRemaining, totalTime, progressValue };
    } else {
      return null;
    }
  }, [subscription]);

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
        {daysLeft && (
          <p className="text-xs font-light text-white">
            {daysLeft?.timeRemaining} / {daysLeft?.totalTime}
          </p>
        )}
      </div>
    </div>
  );
}

export default SubscriptionBar;

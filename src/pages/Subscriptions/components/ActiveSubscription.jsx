import { useMemo } from "react";
import { useAccountStore } from "../../../store/useAccountStore";
import { Progress } from "@mantine/core";
import dayjs from "dayjs";

export const ActiveSubscription = () => {
  const { account } = useAccountStore();
  const subscription = useMemo(() => {
    return account.Subscriptions[0];
  }, [account]);

  const timeRemaining = useMemo(() => {
    const today = dayjs();
    const start = dayjs(subscription.start_date);
    const end = dayjs(subscription.end_date);
    const totalDays = end.diff(start, "days");
    const daysPassed = today.diff(start, "days");
    const validDaysPassed = Math.max(0, Math.min(daysPassed, totalDays));
    const percentage = (validDaysPassed / totalDays) * 100;
    return { daysPassed: validDaysPassed, percentage, totalDays };
  }, [subscription]);

  return (
    <div className="flex flex-1 flex-col">
      <h1>La suscripcion vence el:</h1>
      <h1>{dayjs(subscription.end_date).format("DD/MM/YY")}</h1>

      <Progress value={timeRemaining.percentage} />
      <p>
        {timeRemaining.daysPassed}/{timeRemaining.totalDays}
      </p>
    </div>
  );
};

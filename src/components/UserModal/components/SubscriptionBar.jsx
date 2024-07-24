import { Progress } from "@mantine/core";

function SubscriptionBar() {
  return (
    <div className="flex flex-col w-full gap-1">
      <div className="flex w-full"></div>

      <Progress value={50} size="md" color="green" />
      <div className="flex w-full justify-end">
        <p className="text-xs font-light text-white">14/30</p>
      </div>
    </div>
  );
}

export default SubscriptionBar;

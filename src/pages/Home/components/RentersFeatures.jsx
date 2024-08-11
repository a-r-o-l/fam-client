import { Divider, Timeline, Badge } from "@mantine/core";
import { UserRoundCheck, UserRoundX, Users } from "lucide-react";

function RentersFeatures({ activeRenters, inactiveRenters }) {
  return (
    <div className="flex flex-1 flex-col gap-3 px-10 rounded-2xl  mt-10">
      <div>
        <div className="flex w-full items-center justify-between">
          <div className="flex items-center gap-3">
            <Users />
            <h1 className="text-lg font-semibold">Inquilinos</h1>
          </div>
          <Badge color="blue" size="lg" variant="dot">
            {activeRenters + inactiveRenters}
          </Badge>
        </div>
        <Divider my={10} />
      </div>
      <Timeline active={2} bulletSize={30} lineWidth={2}>
        <Timeline.Item bullet={<UserRoundCheck size={18} />} title="Activos">
          <p className="text-fam_green-8 text-sm">{activeRenters}</p>
        </Timeline.Item>
        <Timeline.Item bullet={<UserRoundX size={18} />} title="Inactivos">
          <p className="text-fam_red-6 text-sm">{inactiveRenters}</p>
        </Timeline.Item>
      </Timeline>
    </div>
  );
}

export default RentersFeatures;

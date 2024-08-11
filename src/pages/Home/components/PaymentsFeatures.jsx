import { Divider, Timeline, Badge, Text } from "@mantine/core";
import { Banknote, DollarSign } from "lucide-react";

function PaymentsFeatures({
  donePayments,
  pendingPayments,
  totalAmountPayments,
}) {
  return (
    <div className="flex flex-1 flex-col gap-3 px-10 rounded-2xl  mt-10">
      <div>
        <div className="flex w-full justify-between items-center">
          <div className="flex items-center gap-3">
            <Banknote />
            <h1 className="text-lg font-semibold">Pagos</h1>
          </div>
          <Badge color="blue" size="lg" variant="dot">
            {donePayments + pendingPayments}
          </Badge>
        </div>
        <Divider my={10} />
      </div>
      <Timeline active={2} bulletSize={30} lineWidth={2} autoContrast>
        <Timeline.Item bullet={<DollarSign size={16} />} title="Cobros">
          <Text size="sm" c="dimmed">
            {donePayments}
          </Text>
        </Timeline.Item>
        <Timeline.Item bullet={<DollarSign size={16} />} title="Pendientes">
          <Text size="sm" c="dimmed">
            {pendingPayments}
          </Text>
        </Timeline.Item>
        <Timeline.Item bullet={<DollarSign size={16} />} title="Total">
          <p className="text-fam_green-8 text-sm">${totalAmountPayments}</p>
        </Timeline.Item>
      </Timeline>
    </div>
  );
}

export default PaymentsFeatures;

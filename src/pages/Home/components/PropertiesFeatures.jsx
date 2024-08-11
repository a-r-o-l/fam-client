import { Divider, Timeline, Text, Badge } from "@mantine/core";
import { Building, Building2, DoorClosed, House, Store } from "lucide-react";

function PropertiesFeatures({ buildings, houses, apartments, lounges }) {
  return (
    <div className="flex flex-1 flex-col gap-3 px-10 rounded-2xl mt-10">
      <div>
        <div className="flex w-full justify-between items-center">
          <div className="flex items-center gap-3">
            <Building2 />
            <h1 className="text-lg font-semibold">Propiedades</h1>
          </div>
          <Badge color="blue" size="lg" variant="dot">
            {buildings + houses + lounges + apartments}
          </Badge>
        </div>
        <Divider my={10} />
      </div>
      <Timeline active={3} bulletSize={30} lineWidth={2}>
        <Timeline.Item bullet={<Building size={16} />} title="Edificios">
          <Text size="xs" mt={4}>
            {buildings}
          </Text>
        </Timeline.Item>
        <Timeline.Item bullet={<House size={16} />} title="Casas">
          <Text size="xs" mt={4}>
            {houses}
          </Text>
        </Timeline.Item>
        <Timeline.Item bullet={<Store size={16} />} title="Salones">
          <Text size="xs" mt={4}>
            {lounges}
          </Text>
        </Timeline.Item>
        <Timeline.Item bullet={<DoorClosed size={16} />} title="Departamentos">
          <Text size="xs" mt={4}>
            {apartments}
          </Text>
        </Timeline.Item>
      </Timeline>
    </div>
  );
}

export default PropertiesFeatures;

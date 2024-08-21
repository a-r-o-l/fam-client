import { ActionIcon, Button, Popover, Title } from "@mantine/core";
import dayjs from "dayjs";
import { Dot } from "lucide-react";

function DayHoverCard({
  events,
  date,
  onAddEvent,
  hasEvents,
  opened,
  setOpenedPopover,
}) {
  const day = date.getDate();

  const handleToggle = () => {
    if (opened) {
      setOpenedPopover(null);
    } else {
      setOpenedPopover(date);
    }
  };

  return (
    <Popover
      width={320}
      shadow="md"
      withArrow
      //   keepMounted={true}
      closeOnClickOutside
      closeOnEscape
      clickOutsideEvents={["click"]}
      opened={opened}
    >
      <Popover.Target>
        {hasEvents ? (
          <ActionIcon radius="xl" onClick={handleToggle}>
            <p className="font-black">{day}</p>
          </ActionIcon>
        ) : (
          <button
            className="flex flex-1 justify-center items-center h-full"
            onClick={handleToggle}
          >
            <p className="">{day}</p>
          </button>
        )}
      </Popover.Target>
      <Popover.Dropdown>
        <Title order={4} className="text-left">
          {dayjs(date).format("D [de] MMMM")}
        </Title>
        <div className="mt-5">
          {events.length ? (
            events.map((r) => (
              <div key={r.id} className="flex flex-col">
                <div className="flex items-center">
                  <Dot size={40} />
                  <div className="flex gap-3 items-center">
                    <p className="text-xs font-bold">
                      {dayjs(r.start_date).format("HH:mm A")}
                    </p>
                    <p className="text-md">
                      {r?.renter?.name} {r?.renter?.lastname}
                    </p>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p className="text-md">No tienes eventos en este dia.</p>
          )}
        </div>
        <div className="flex w-full justify-end mt-10 gap-3">
          <Button
            variant="outline"
            radius="xl"
            size="xs"
            onClick={() => setOpenedPopover(null)}
          >
            Cerrar
          </Button>
          <Button
            variant="light"
            radius="xl"
            size="xs"
            onClick={() => {
              setOpenedPopover(null);
              onAddEvent(date);
            }}
          >
            Crear evento
          </Button>
        </div>
      </Popover.Dropdown>
    </Popover>
  );
}

export default DayHoverCard;

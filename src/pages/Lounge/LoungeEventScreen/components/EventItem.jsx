import {
  ActionIcon,
  Button,
  Checkbox,
  NumberFormatter,
  NumberInput,
  Popover,
  Table,
} from "@mantine/core";
import dayjs from "dayjs";
import { Pencil, Plus, Trash2 } from "lucide-react";
import { useEffect, useState } from "react";
import { useUpdateReservationMutation } from "../../../../services/hooks/Reservation/useReservationMutation";
import { FaRegMoneyBill1 } from "react-icons/fa6";
import { toast } from "sonner";
import { useQueryClient } from "@tanstack/react-query";

function EventItem({ event, onDeleteEvent, loungeId }) {
  const updateEvent = useUpdateReservationMutation();
  const queryClient = useQueryClient();

  const [bookingValue, setBookingValue] = useState(0);
  const [opened, setOpened] = useState(false);

  useEffect(() => {
    if (!opened) {
      setBookingValue(0);
    }
  }, [opened]);

  return (
    <Table.Tr
      key={event.id}
      onClick={() => {
        console.log(event);
      }}
    >
      <Table.Td>
        {event?.renter.name} {event?.renter.lastname}
      </Table.Td>
      <Table.Td>{dayjs(event?.start_date).format("DD-MM-YYYY")}</Table.Td>
      <Table.Td>
        {`${dayjs(event?.start_date).format("HH:mm")}
                    a ${dayjs(event?.end_date).format("HH:mm")}
                    
                    `}
      </Table.Td>

      <Table.Td>
        {event.payed ? (
          "-"
        ) : (
          <div className="flex items-center">
            <div className="w-20">
              <NumberFormatter
                thousandSeparator="."
                decimalSeparator=","
                value={event?.booking}
                prefix="$ "
              />
            </div>
            <Popover
              opened={opened}
              onClose={() => setOpened(false)}
              position="top"
              closeOnEscape={true}
              closeOnClickOutside={true}
              keepMounted={false}
              clickOutsideEvents={["mouseup", "touchend"]}
              width={400}
              styles={{
                dropdown: {
                  padding: "20px",
                },
              }}
            >
              <Popover.Target>
                <ActionIcon
                  radius="xl"
                  size="xs"
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    setOpened(true);
                  }}
                >
                  <Plus size={12} />
                </ActionIcon>
              </Popover.Target>
              <Popover.Dropdown className="flex flex-1 flex-row gap-5">
                <div>
                  <NumberInput
                    prefix="$"
                    thousandSeparator=" "
                    leftSectionPointerEvents="none"
                    leftSection={<FaRegMoneyBill1 />}
                    value={bookingValue}
                    onChange={(e) => setBookingValue(e)}
                  />
                  <Button
                    onClick={() => {
                      const totalPayed =
                        Number(bookingValue) + Number(event.booking);
                      if (totalPayed > event.value) {
                        toast.error(
                          "El monto ingresado es mayor al total a pagar"
                        );
                        return;
                      }
                      const werePayed = totalPayed === event.value;
                      updateEvent.mutate(
                        {
                          id: event.id,
                          data: {
                            booking: bookingValue + Number(event.booking),
                            payed: werePayed ? true : false,
                          },
                        },
                        {
                          onSuccess: () => {
                            queryClient.invalidateQueries([
                              "getLounge",
                              loungeId,
                            ]);
                            toast.success("Evento actualizado correctamente");
                            setOpened(false);
                          },
                        }
                      );
                    }}
                  >
                    Guardar
                  </Button>
                </div>
              </Popover.Dropdown>
            </Popover>
          </div>
        )}
      </Table.Td>
      <Table.Td>
        {event.payed ? (
          "-"
        ) : (
          <NumberFormatter
            thousandSeparator="."
            decimalSeparator=","
            value={Number(event?.value) - Number(event?.booking)}
            prefix="$ "
          />
        )}
      </Table.Td>
      <Table.Td>
        <NumberFormatter
          thousandSeparator="."
          decimalSeparator=","
          value={event.value}
          prefix="$ "
        />
      </Table.Td>
      <Table.Td>
        <Checkbox
          label={event?.payed ? "Pagado" : "Pendiente"}
          checked={event.payed}
          readOnly
          color="green"
          onClick={() => {
            updateEvent.mutate(
              {
                id: event.id,
                data: { payed: !event.payed },
              },
              {
                onSuccess: () => {
                  queryClient.invalidateQueries(["getLounge", loungeId]);
                  toast.success("Evento actualizado correctamente");
                },
              }
            );
          }}
        ></Checkbox>
      </Table.Td>
      <Table.Td>
        <div className="flex gap-3">
          <ActionIcon radius="xl" size="sm" color="dark">
            <Pencil size={12} />
          </ActionIcon>
          <ActionIcon
            radius="xl"
            size="sm"
            color="dark"
            onClick={onDeleteEvent}
          >
            <Trash2 size={12} />
          </ActionIcon>
        </div>
      </Table.Td>
    </Table.Tr>
  );
}

export default EventItem;

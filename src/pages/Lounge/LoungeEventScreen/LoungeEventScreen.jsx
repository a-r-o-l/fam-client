// import { Calendar } from "@mantine/dates";
import { useNavigate, useParams } from "react-router-dom";
import { useGetLoungeQuery } from "../../../services/hooks/Lounge/useLoungeQuery";
import { Badge, Button, Loader, Table, Title } from "@mantine/core";
import { useMemo, useState } from "react";
import dayjs from "dayjs";
import { ArrowLeft } from "lucide-react";
import "dayjs/locale/es";
import ReservationModal from "../components/ReservationModal";
import { CustomDialog } from "../../../components/Dialog/CustomDialog";
import { useDeleteReservationMutation } from "../../../services/hooks/Reservation/useReservationMutation";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import "react-big-calendar/lib/css/react-big-calendar.css";
import "./calendar.css";
import { Calendar, dayjsLocalizer } from "react-big-calendar";

import EventItem from "./components/EventItem";

function LoungeEventScreen() {
  const localizer = dayjsLocalizer(dayjs);
  dayjs.locale("es");
  const navigate = useNavigate();
  const params = useParams();
  const deleteEvent = useDeleteReservationMutation();
  const queryClient = useQueryClient();
  const { data: lounge, isLoading } = useGetLoungeQuery(params.id);

  const [open, setOpen] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedEvent, setSelectedEvent] = useState(null);

  const components = {
    event: (props) => {
      const isDisabled = dayjs(props.event.end).isBefore(dayjs());
      return (
        <div
          className={`flex justify-between px-2 items-center ${
            isDisabled ? "opacity-50" : ""
          }`}
        >
          <h1 className="font-bold text-center">{props.event.title}</h1>
          {/* <Indicator
            inline
            size={15}
            position="middle-center"
            color={props.event.payed ? "green" : "red"}
            withBorder
          ></Indicator> */}
          <Badge color={props.event.payed ? "green" : "red"} w={90}>
            {props.event.payed ? "Pagado" : "Pendiente"}
          </Badge>
        </div>
      );
    },
  };

  const reservations = useMemo(() => {
    if (lounge?.Reservations?.length) {
      const parsedArr = lounge.Reservations.map((r) => {
        return {
          title: `${r.renter.name} ${r.renter.lastname}`,
          start: dayjs(r.start_date).toDate(),
          end: dayjs(r.end_date).toDate(),
          ...r,
        };
      });
      return parsedArr;
    }
    return [];
  }, [lounge]);

  if (isLoading) {
    return (
      <div>
        <Loader />
      </div>
    );
  }
  return (
    <div className="flex flex-1 flex-col overflow-hidden h-full">
      <div className="flex justify-between">
        <div className="w-60 flex items-center">
          <Button
            variant="subtle"
            onClick={() => navigate("/lounges/0")}
            leftSection={<ArrowLeft size={20} />}
          >
            Volver
          </Button>
        </div>
        <div className="w-full flex flex-col justify-center items-center">
          <h1 className="font-bold">{lounge?.name.toUpperCase()}</h1>
          <p className="text-neutral-500">{lounge?.address}</p>
        </div>
        <div className="w-60 flex items-center justify-end">
          <Button variant="light" radius="xl" onClick={() => setOpen(true)}>
            Agregar evento
          </Button>
        </div>
      </div>
      <div className="flex flex-col mt-10 items-center h-full">
        <div className="w-4/5 h-full">
          <Calendar
            localizer={localizer}
            events={reservations}
            style={{ height: "600px" }}
            messages={{
              allDay: "Todo el día",
              previous: "Anterior",
              next: "Siguiente",
              today: "Hoy",
              month: "Mes",
              week: "Semana",
              day: "Día",
              agenda: "Agenda",
              date: "Fecha",
              time: "Hora",
              event: "Evento",
              noEventsInRange: "Sin eventos",
              showMore: (total) => `+${total} más`,
            }}
            components={components}
          />
        </div>
        {/* <Calendar
          // hideOutsideDates
          static
          getDayProps={(date) => {
            const tds = document.querySelectorAll("td");

            tds.forEach((td) => {
              const div = td.querySelector(
                'div[data-hidden="true"][data-outside="true"]'
              );
              if (div) {
                td.style.pointerEvents = "none";
              }
            });
          }}
          numberOfColumns={3}
          size="md"
          renderDay={(date) => {
            const formattedDate = dayjs(date).format("YYYY-MM-DD").toString();
            const reservation = reservations.filter((i) => {
              return (
                dayjs(i.start_date).format("YYYY-MM-DD").toString() ===
                formattedDate
              );
            });

            const shouldBeOpen =
              dayjs(date).format("YYYY-MM-DD") ===
              dayjs(openedPopover).format("YYYY-MM-DD");

            if (reservation?.length) {
              return (
                <DayHoverCard
                  key={date}
                  events={reservation}
                  date={date}
                  hasEvents={true}
                  onAddEvent={() => {
                    setSelectedDate(date);
                    setOpen(true);
                  }}
                  opened={shouldBeOpen}
                  setOpenedPopover={setOpenedPopover}
                />
              );
            } else {
              return (
                <DayHoverCard
                  key={date}
                  events={reservation}
                  date={date}
                  hasEvents={false}
                  onAddEvent={() => {
                    setSelectedDate(date);
                    setOpen(true);
                  }}
                  opened={shouldBeOpen}
                  setOpenedPopover={setOpenedPopover}
                />
              );
            }
          }}
        /> */}
        <div className="flex flex-col w-full mt-10 px-40">
          <Title order={2} className="text-center">
            Eventos
          </Title>
          <Table mt={20}>
            <Table.Thead>
              <Table.Tr>
                <Table.Th>Cliente</Table.Th>
                <Table.Th>Fecha</Table.Th>
                <Table.Th>Horario</Table.Th>
                <Table.Th>Seña</Table.Th>
                <Table.Th>Saldo</Table.Th>
                <Table.Th>Total</Table.Th>
                <Table.Th>Estado</Table.Th>
                <Table.Th>Acciones</Table.Th>
              </Table.Tr>
            </Table.Thead>
            <Table.Tbody>
              {reservations.map((event) => (
                <EventItem
                  key={event.id}
                  event={event}
                  loungeId={lounge.id}
                  onDeleteEvent={() => {
                    setSelectedEvent(event);
                    setOpenDialog(true);
                  }}
                />
              ))}
            </Table.Tbody>
          </Table>
        </div>
      </div>
      <ReservationModal
        open={open}
        lounge={lounge}
        date={selectedDate}
        onCloseModal={() => {
          setSelectedDate(null);
          setOpen(false);
        }}
      />
      <CustomDialog
        open={openDialog}
        onClose={() => {
          setOpenDialog(false);
          setSelectedEvent(null);
        }}
        text={"¿Está seguro que desea eliminar este evento?"}
        onConfirm={() => {
          deleteEvent.mutate(
            { id: selectedEvent.id },
            {
              onSuccess: () => {
                queryClient.invalidateQueries(["getLounge", lounge.id]);
                toast.success("Evento eliminado correctamente");
              },
            }
          );
          setOpenDialog(false);
        }}
      />
    </div>
  );
}

export default LoungeEventScreen;

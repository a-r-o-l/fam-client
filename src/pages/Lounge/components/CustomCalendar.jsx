import {
  ActionIcon,
  Button,
  Indicator,
  Input,
  TextInput,
  Modal,
  useMantineColorScheme,
} from "@mantine/core";
import { Calendar, TimeInput, DateInput } from "@mantine/dates";
import { useField } from "@mantine/form";
import dayjs from "dayjs";
import { CalendarPlus, Clock } from "lucide-react";
import { useMemo, useRef, useState } from "react";

const parseHours = (time) => {
  const [startHours, startMinutes] = time.split(":").map(Number);

  const parsedTime = new Date();
  parsedTime.setHours(startHours, startMinutes, 0, 0);

  return parsedTime;
};

function CustomCalendar() {
  const startTime = useField({
    initialValue: "",
    validateOnChange: true,
    validate: (value) => {
      if (!value) {
        return "La hora de inicio es requerida";
      }
      if (parseHours(value) > parseHours(endTime.getValue())) {
        return "La hora de comienzo no puede ser después de la hora de fin";
      }
      return null;
    },
  });
  const endTime = useField({
    initialValue: "",
    validateOnChange: true,
    validate: (value) => {
      if (!value) {
        return "La hora de fin es requerida";
      }
      if (parseHours(value) < parseHours(startTime.getValue())) {
        return "La hora de fin no puede ser antes de la hora de inicio";
      }
      return null;
    },
  });
  const { colorScheme } = useMantineColorScheme();
  const [selected, setSelected] = useState("");
  const [openModal, setOpenModal] = useState(false);
  const startTimeRef = useRef(null);
  const endTimeRef = useRef(null);

  const handleSelect = (date) => {
    const isSelected = dayjs(date).isSame(selected, "date");
    if (isSelected) {
      setSelected("");
    } else {
      setSelected(date);
    }
  };

  const watchColor = useMemo(() => {
    return colorScheme === "dark" ? "white" : "black";
  }, [colorScheme]);

  return (
    <div className="flex flex-1 flex-col justify-center gap-20">
      <Calendar
        getDayProps={(date) => ({
          selected: dayjs(date).isSame(selected, "date"),
          onClick: () => handleSelect(date),
          style: {
            backgroundColor: dayjs(date).isSame(selected, "date")
              ? "rgba(0, 0, 0, 1)"
              : "transparent",
            borderRadius: 40,
          },
        })}
        numberOfColumns={4}
        size="lg"
        renderDay={(date) => {
          const day = date.getDate();
          return (
            <Indicator size={8} color="red" offset={-2} disabled={day !== 16}>
              <div>{day}</div>
            </Indicator>
          );
        }}
      />
      <div className="flex justify-center">
        <Button
          rightSection={<CalendarPlus />}
          onClick={() => setOpenModal(true)}
        >
          crear evento
        </Button>
      </div>
      <Modal
        opened={openModal}
        onClose={() => setOpenModal(false)}
        centered
        size="xl"
      >
        <div className="flex flex-1 flex-col">
          <div className="flex flex-1 flex-row">
            <div className="flex flex-1 flex-col justify-around">
              <div className="w-full px-10 ">
                <DateInput
                  value={selected}
                  label="Fecha"
                  placeholder="Selecciona una fecha"
                />
              </div>

              <div className="w-full px-10">
                <TimeInput
                  label="Hora de inicio"
                  description="Click en el icono para seleccionar la hora"
                  ref={startTimeRef}
                  rightSection={
                    <ActionIcon
                      variant="transparent"
                      onClick={() => startTimeRef.current?.showPicker()}
                    >
                      <Clock color={startTime.error ? "red" : watchColor} />
                    </ActionIcon>
                  }
                  {...startTime.getInputProps()}
                />
              </div>
              <div className="w-full px-10">
                <TimeInput
                  label="Hora de fin"
                  description="Click en el icono para seleccionar la hora"
                  ref={endTimeRef}
                  rightSection={
                    <ActionIcon
                      variant="transparent"
                      onClick={() => endTimeRef.current?.showPicker()}
                    >
                      <Clock color={endTime.error ? "red" : watchColor} />
                    </ActionIcon>
                  }
                  {...endTime.getInputProps()}
                />
              </div>
            </div>
            <div className="flex flex-1 flex-col gap-4 justify-around">
              <div className="w-full px-10">
                <TextInput placeholder="asdasd" label="Nombre" />
              </div>
              <div className="w-full px-10">
                <TextInput placeholder="asdasd" label="Apellido" />
              </div>
              <div className="w-full px-10">
                <TextInput placeholder="asdasd" label="Dni" />
              </div>
              <div className="w-full px-10">
                <TextInput placeholder="asdasd" label="Telefono" />
              </div>
            </div>
          </div>
          <div className="flex w-full justify-center items-center gap-10 p-10 py-20">
            <Button
              onClick={() => setOpenModal(false)}
              variant="outline"
              radius="md"
            >
              Cancelar
            </Button>
            <Button radius="md">Guardar</Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}

export default CustomCalendar;

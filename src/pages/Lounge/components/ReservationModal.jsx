import {
  Modal,
  Button,
  TextInput,
  NumberInput,
  Fieldset,
  Switch,
  Input,
} from "@mantine/core";
import { DateTimePicker } from "@mantine/dates";
import { Banknote, Fingerprint, Phone, User } from "lucide-react";
import { useField } from "@mantine/form";
import dayjs from "dayjs";
import { IMaskInput } from "react-imask";
import { useCreateReservationMutation } from "../../../services/hooks/Reservation/useReservationMutation";
import { toast } from "sonner";
import { useCallback, useEffect, useState } from "react";
import { useQueryClient } from "@tanstack/react-query";

function ReservationModal({ open, onCloseModal, lounge, date }) {
  const queryClient = useQueryClient();
  const [payedValue, setPayedValue] = useState(false);
  const createReservation = useCreateReservationMutation();

  const startDateField = useField({
    initialValue: null,
    validateOnChange: true,
    validate: (value) => {
      if (!value) {
        return "La fecha inicial es requerida";
      }
      if (dayjs(value).isAfter(endDateField.getValue())) {
        return "La fecha inicial no puede ser mayor a la fecha de finalizacion";
      }
      const normalizedValue = dayjs(value).second(0).millisecond(0);
      const normalizedEndDate = dayjs(endDateField.getValue())
        .second(0)
        .millisecond(0);

      if (normalizedValue.isSame(normalizedEndDate)) {
        return "Las fechas y horas no pueden ser iguales";
      }
    },
  });
  const endDateField = useField({
    initialValue: null,
    validateOnChange: true,
    validate: (value) => {
      if (!value) {
        return "La fecha final es requerida";
      }
      if (dayjs(startDateField.getValue()).isAfter(dayjs(value))) {
        return "La fecha final no puede ser menor a la inicial";
      }
      const normalizedValue = dayjs(value).second(0).millisecond(0);
      const normalizedStartDate = dayjs(startDateField.getValue())
        .second(0)
        .millisecond(0);

      if (normalizedValue.isSame(normalizedStartDate)) {
        return "Las fechas y horas no pueden ser iguales";
      }
    },
  });
  const nameField = useField({
    initialValue: "",
    validateOnChange: true,
    validate: (value) => {
      if (!value) {
        return "El nombre es requerido";
      }
    },
  });
  const lastnameField = useField({
    initialValue: "",
    validateOnChange: true,
    validate: (value) => {
      if (!value) {
        return "El apellido es requerido";
      }
    },
  });
  const dniField = useField({
    initialValue: "",
    validateOnChange: true,
    validate: (value) => {
      if (!value) {
        return "El dni es requerido";
      }
    },
  });
  const phoneField = useField({
    initialValue: "",
    validateOnChange: true,
    validate: (value) => {
      if (!value) {
        return "El telefono es requerido";
      }
    },
  });
  const valueField = useField({
    initialValue: "",
    validateOnChange: true,
    validate: (value) => {
      if (!value) {
        return "El monto es requerido";
      }
    },
  });

  const bookingField = useField({
    initialValue: 0,
    validateOnChange: true,
    validate: (value) => {},
  });

  const cleanForm = useCallback(() => {
    startDateField.reset();
    endDateField.reset();
    nameField.reset();
    lastnameField.reset();
    dniField.reset();
    phoneField.reset();
    valueField.reset();
    bookingField.reset();
  }, [
    endDateField,
    nameField,
    lastnameField,
    dniField,
    phoneField,
    valueField,
    startDateField,
    bookingField,
  ]);

  useEffect(() => {
    if (open) {
      if (dayjs(date).isValid() && !startDateField.getValue()) {
        const pdate = dayjs(date).set("hour", 13).set("minute", 0).toDate();
        startDateField.setValue(pdate);
      }
    } else {
      cleanForm();
    }
  }, [date, open, startDateField, cleanForm]);

  return (
    <Modal
      withCloseButton={false}
      opened={open}
      onClose={onCloseModal}
      closeOnEscape={false}
      closeOnClickOutside={false}
      centered
      size="xl"
      radius="md"
      styles={{
        header: {
          justifyContent: "flex-start",
          paddingLeft: 40,
        },
        title: {
          fontSize: "1rem",
        },
        body: {},
      }}
    >
      <div className="flex flex-1 flex-col">
        <h1>Crear evento</h1>
        <div className="flex flex-1 flex-row my-10">
          <div className="flex flex1 flex-col gap-5 justify-center items-center"></div>
          <div className="flex flex-1 flex-col items-center">
            <Fieldset
              className="flex flex-col w-full px-10 gap-5"
              legend="Datos del cliente"
            >
              <DateTimePicker
                valueFormat="D [de] MMMM, hh:mm A"
                label="Fecha de inicio"
                clearable
                {...startDateField.getInputProps()}
              />
              <DateTimePicker
                valueFormat="D [de] MMMM, hh:mm A"
                label="Fecha de finalizacion"
                clearable
                {...endDateField.getInputProps()}
              />
              <TextInput
                leftSection={<User />}
                label="Nombre"
                {...nameField.getInputProps()}
              />
              <TextInput
                leftSection={<User />}
                label="Apellido"
                {...lastnameField.getInputProps()}
              />
              <NumberInput
                leftSection={<Fingerprint />}
                label="Dni"
                {...dniField.getInputProps()}
              />
              <Input.Wrapper>
                <Input.Label>Telefono</Input.Label>
                <Input
                  component={IMaskInput}
                  mask="+54 (000) 0-000000"
                  leftSectionPointerEvents="none"
                  leftSection={<Phone />}
                  {...phoneField.getInputProps()}
                />
              </Input.Wrapper>

              <NumberInput
                withAsterisk
                prefix="$"
                thousandSeparator=" "
                leftSectionPointerEvents="none"
                leftSection={<Banknote />}
                label="Monto"
                {...valueField.getInputProps()}
              />
              <NumberInput
                withAsterisk
                prefix="$"
                thousandSeparator=" "
                leftSectionPointerEvents="none"
                leftSection={<Banknote />}
                label="Seña"
                {...bookingField.getInputProps()}
              />
              <Switch
                label="Pagado"
                size="md"
                description="Declara si el pago fue realizado"
                checked={payedValue}
                onChange={() => setPayedValue(!payedValue)}
              />
            </Fieldset>
          </div>
        </div>
        <div className="flex w-full justify-end gap-10">
          <Button
            variant="outline"
            color="blue"
            radius="xl"
            onClick={onCloseModal}
            w={140}
          >
            Cerrar
          </Button>
          <Button
            variant="filled"
            color="blue"
            radius="xl"
            onClick={() => {
              const startDate = startDateField.getValue();
              const endDate = endDateField.getValue();
              const data = {
                value: valueField.getValue(),
                lounge_id: lounge.id,
                start_date: startDate,
                end_date: endDate,
                payed: payedValue,
                booking: bookingField.getValue(),
                renter: {
                  name: nameField.getValue(),
                  lastname: lastnameField.getValue(),
                  dni: dniField.getValue(),
                  phone: phoneField.getValue(),
                },
              };
              createReservation.mutate(data, {
                onSuccess: () => {
                  queryClient.invalidateQueries(["getLounge", lounge.id]);
                  toast.success("Evento creado correctamente");
                  onCloseModal();
                },
                onError: (err) => {
                  if (err.response.status === 415) {
                    startDateField.setError(err.response.data.message);
                    return;
                  }
                  toast.error("Hubo un error");
                },
              });
            }}
            w={140}
            disabled={
              startDateField.error ||
              endDateField.error ||
              nameField.error ||
              lastnameField.error ||
              dniField.error ||
              phoneField.error ||
              valueField.error ||
              bookingField.error
            }
          >
            Guardar
          </Button>
        </div>
      </div>
    </Modal>
  );
}

export default ReservationModal;

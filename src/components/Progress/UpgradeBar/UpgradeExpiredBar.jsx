import {
  ActionIcon,
  Button,
  FocusTrap,
  NumberInput,
  Popover,
  Progress,
} from "@mantine/core";
import { DateInput } from "@mantine/dates";
import { FaCalendarDay } from "react-icons/fa6";
import { GrUpdate } from "react-icons/gr";
import { useUpdateContractMutation } from "../../../services/hooks/Contract/useContractMutation";
import { useField } from "@mantine/form";
import dayjs from "dayjs";
import { useMemo, useState } from "react";
import { toast } from "sonner";

export const UpgradeExpiredBar = ({ progressColor, progressValue, item }) => {
  const updateContract = useUpdateContractMutation();

  const newValueField = useField({
    initialValue: item?.upgrade_value,
    validateOnBlur: true,
    validate: (value) => {
      if (!value) {
        return "El monto es requerido";
      }
      if (isNaN(value)) {
        return "El monto no es valido";
      }
      if (Number(value) < 0) {
        return "El monto no puede ser negativo";
      }
      if (value === "0") {
        return "El monto no puede ser 0";
      }
      return null;
    },
  });

  const [open, setOpen] = useState(false);

  const dateField = useField({
    initialValue: "",
    validateOnBlur: true,
    validate: (value) => {
      if (!value) {
        return "La fecha es requerida";
      }
      if (!dayjs(value).isValid) {
        return "La fecha no es valida";
      }
      return null;
    },
  });

  const handleSubmit = () => {
    const upgrade_start_date = dayjs(dateField.getValue()).format("YYYY/MM/DD");
    const upgrade_end_date = dayjs(autoDate).format("YYYY/MM/DD");
    const upgrade_value = newValueField.getValue();
    updateContract.mutate(
      {
        id: item.id,
        data: {
          upgrade_start_date,
          upgrade_end_date,
          upgrade_value,
        },
      },
      {
        onSuccess: () => {
          toast.success("Actualizacion exitosa");
          setOpen(false);
        },
        onError: () => {
          toast.error("Error al actualizar");
        },
      }
    );
  };

  const autoDate = useMemo(() => {
    if (!dateField.getValue()) {
      return "";
    }
    const monthsUpgrade = item?.months_upgrade;
    const day = dayjs(dateField.getValue());
    const endDate = dayjs(day).add(monthsUpgrade, "month");
    return endDate;
  }, [dateField, item]);

  const disabledSubmit = useMemo(() => {
    if (updateContract.isPending) {
      return true;
    }
    if (dateField.error || !dateField.getValue()) {
      return true;
    }
    if (newValueField.error || !newValueField.getValue()) {
      return true;
    }
    return false;
  }, [newValueField, dateField, updateContract.isPending]);

  return (
    <div className="flex flex-col justify-center items-center gap-1">
      <div className="flex w-full justify-center items-center">
        <Popover
          position="top"
          opened={open}
          closeOnEscape={true}
          closeOnClickOutside={true}
          keepMounted={false}
          clickOutsideEvents={["mouseup", "touchend"]}
        >
          <Popover.Target>
            <ActionIcon
              variant="subtle"
              color="famdeepred.6"
              radius="xl"
              size="xs"
              onClick={(e) => {
                e.stopPropagation();
                setOpen(!open);
              }}
            >
              <GrUpdate size={16} />
            </ActionIcon>
          </Popover.Target>
          <Popover.Dropdown className="flex flex-1 flex-col gap-5 items-center">
            <DateInput
              withAsterisk
              valueFormat="DD/MM/YYYY"
              label="Fecha Inicial"
              leftSection={<FaCalendarDay />}
              {...dateField.getInputProps()}
            />
            <DateInput
              disabled
              valueFormat="DD/MM/YYYY"
              label="Fecha final"
              leftSection={<FaCalendarDay />}
              value={autoDate}
            />
            <FocusTrap active={open}>
              <NumberInput
                label="Nuevo valor"
                prefix="$ "
                thousandSeparator=","
                {...newValueField.getInputProps()}
              />
            </FocusTrap>
            <div className="flex w-full justify-between py-5">
              <Button
                onClick={(e) => {
                  e.stopPropagation();
                  setOpen(false);
                }}
                variant="outline"
                color="blue"
                radius="xl"
                disabled={updateContract.isPending}
              >
                Cancelar
              </Button>
              <Button
                loading={updateContract.isPending}
                disabled={disabledSubmit}
                variant="filled"
                color="blue"
                radius="xl"
                onClick={handleSubmit}
              >
                Guardar
              </Button>
            </div>
          </Popover.Dropdown>
        </Popover>
      </div>
      <div className="min-w-24">
        <Progress value={progressValue} color={progressColor} size="sm" />
      </div>
    </div>
  );
};

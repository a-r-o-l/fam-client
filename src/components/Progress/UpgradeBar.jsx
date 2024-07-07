import {
  ActionIcon,
  Button,
  FocusTrap,
  NumberInput,
  Popover,
  Progress,
} from "@mantine/core";
import dayjs from "dayjs";
import { useMemo, useState } from "react";
import { GrUpdate } from "react-icons/gr";
import { useCreateUpgradeMutation } from "../../services/hooks/Upgrade/useUpgradeMutation";
import { toast } from "sonner";
import { useField } from "@mantine/form";
import { DateInput } from "@mantine/dates";
import { FaCalendarDay } from "react-icons/fa6";

export const UpgradeBar = ({ item }) => {
  const upgrade = useMemo(() => {
    if (item?.Upgrades?.length) {
      const upgrade = item?.Upgrades[item?.Upgrades.length - 1];
      return upgrade;
    } else {
      return null;
    }
  }, [item]);

  const newValueField = useField({
    initialValue: upgrade?.newValue,
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

  const [open, setOpen] = useState(false);
  const createUpgrade = useCreateUpgradeMutation();

  const autoDate = useMemo(() => {
    if (!dateField.getValue()) {
      return "";
    }
    const monthsUpgrade = item?.months_upgrade;
    const day = dayjs(dateField.getValue());
    const endDate = dayjs(day).add(monthsUpgrade, "month");
    return endDate;
  }, [dateField, item]);

  const daysLeft = useMemo(() => {
    const today = dayjs();
    const start = dayjs(upgrade?.startDate);
    const end = dayjs(upgrade?.endDate);

    const tiempoTotal = end.diff(start, "day");
    let tiempoTranscurrido = today.diff(start, "day");
    const totalDuration = end.diff(start, "day");
    const elapsedDuration = today.diff(start, "day");

    const progressValue = Math.round((elapsedDuration / totalDuration) * 100);
    tiempoTranscurrido = Math.max(0, tiempoTranscurrido);
    tiempoTranscurrido = Math.min(tiempoTranscurrido, tiempoTotal);

    return { tiempoTranscurrido, tiempoTotal, progressValue };
  }, [upgrade]);

  const progressColor = useMemo(() => {
    if (daysLeft.progressValue < 25) {
      return "famblue.4";
    }
    if (daysLeft.progressValue < 50) {
      return "famgreen.6";
    } else if (daysLeft.progressValue < 75) {
      return "famyellow.4";
    } else {
      return "famdeepred.6";
    }
  }, [daysLeft.progressValue]);

  const disabledSubmit = useMemo(() => {
    if (createUpgrade.isPending) {
      return true;
    }
    if (dateField.error || !dateField.getValue()) {
      return true;
    }
    if (newValueField.error || !newValueField.getValue()) {
      return true;
    }
    return false;
  }, [newValueField, dateField, createUpgrade.isPending]);

  const handleSubmit = (e) => {
    e.stopPropagation();
    const data = {
      startDate: dayjs(dateField.getValue()).format("YYYY/MM/DD"),
      endDate: dayjs(autoDate).format("YYYY/MM/DD"),
      newValue: newValueField.getValue(),
      contractId: item?.id,
    };
    createUpgrade.mutate(data, {
      onSuccess: () => {
        toast.success("Actualizacion éxitosa");
        setOpen(false);
      },
      onError: () => {
        toast.error("Error al actualizar");
      },
    });
  };

  if (!upgrade) {
    return <></>;
  }

  if (daysLeft.progressValue < 100) {
    return (
      <div className="flex flex-col justify-center items-center gap-1">
        <div className="flex w-full justify-center items-center">
          <p className="text-center font-bold text-xs">
            {daysLeft.tiempoTranscurrido} / {daysLeft.tiempoTotal}
          </p>
        </div>
        <div className="min-w-40">
          <Progress
            value={daysLeft.progressValue}
            color={progressColor}
            size="md"
          />
        </div>
      </div>
    );
  }

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
                onClick={(e) => setOpen(false)}
                variant="outline"
                color="blue"
                radius="xl"
                disabled={createUpgrade.isPending}
              >
                Cancelar
              </Button>
              <Button
                loading={createUpgrade.isPending}
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
      <div className="min-w-40">
        <Progress
          value={daysLeft.progressValue}
          color={progressColor}
          size="md"
        />
      </div>
    </div>
  );
};

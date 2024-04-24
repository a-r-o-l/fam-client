import {
  Button,
  Popover,
  NumberInput,
  NumberFormatter,
  Chip,
  FocusTrap,
} from "@mantine/core";
import { useCallback, useEffect, useState } from "react";
import { LuLoader2 } from "react-icons/lu";
import { useUpdatePaymentMutation } from "../../../services/hooks/Payment/usePaymentMutation";
import { DatePickerInput } from "@mantine/dates";
import dayjs from "dayjs";

export const DateViewer = ({ payment }) => {
  const [open, setOpen] = useState(false);
  const [firstRender, setFirstRender] = useState(true);
  const [value, setValue] = useState(payment?.date);
  const [loading, setLoading] = useState(false);
  const updatePayment = useUpdatePaymentMutation();

  const onUpdatePayment = useCallback(async () => {
    let res;
    setLoading(true);
    try {
      setFirstRender(false);
      res = await updatePayment.mutateAsync({
        id: payment.id,
        data: { date: dayjs(value).format("YYYY-MM-DD") },
      });
    } catch (error) {
      console.log(error);
    } finally {
      setTimeout(() => {
        setOpen(false);
        setLoading(false);
      }, 2000);
    }
  }, [value, payment]);

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (open) {
        if (loading) {
          return;
        }
        if (event.key === "Escape") {
          setOpen(false);
        }
        if (event.key === "Enter") {
          onUpdatePayment();
        }
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [loading, payment, open, value]);

  const renderButton = useCallback(() => {
    if (loading) {
      return (
        <Chip
          color="blue"
          checked={true}
          icon={<LuLoader2 className="animate-spin" />}
        >
          Guardando
        </Chip>
      );
    } else if (!firstRender) {
      return (
        <Chip color="green" checked={true}>
          Guardado
        </Chip>
      );
    } else {
      return (
        <Chip
          color="blue"
          checked={true}
          styles={{
            iconWrapper: { display: "none" },
          }}
          onClick={onUpdatePayment}
        >
          Guardar
        </Chip>
      );
    }
  }, [loading, firstRender, value, payment.id, updatePayment]);

  return (
    <Popover
      position="top"
      opened={open}
      closeOnEscape={true}
      closeOnClickOutside={true}
      keepMounted={false}
      clickOutsideEvents={["mouseup", "touchend"]}
    >
      <Popover.Target>
        <Button
          p={0}
          variant="transparent"
          onClick={() => {
            setFirstRender(true);
            setLoading(false);
            setValue(payment?.date);
            setOpen(!open);
          }}
        >
          {dayjs(payment?.date).format("DD/MM/YY")}
        </Button>
      </Popover.Target>
      <Popover.Dropdown className="flex flex-1 flex-row gap-5">
        <div className="flex flex-1 items-end justify-end">
          <DatePickerInput
            label="Fecha"
            popoverProps={{ withinPortal: false }}
            mt="md"
            valueFormat="DD/MM/YY"
            value={dayjs(value)}
            onChange={(date) => setValue(date)}
          />
        </div>
        <div className="flex flex-1 items-end">{renderButton()}</div>
      </Popover.Dropdown>
    </Popover>
  );
};

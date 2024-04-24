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

export const ValueViewer = ({ payment }) => {
  const [open, setOpen] = useState(false);
  const [firstRender, setFirstRender] = useState(true);
  const [value, setValue] = useState(payment?.value);
  const [loading, setLoading] = useState(false);
  const updatePayment = useUpdatePaymentMutation();

  const onUpdatePayment = useCallback(async () => {
    let res;
    setLoading(true);
    try {
      setFirstRender(false);
      res = await updatePayment.mutateAsync({
        id: payment.id,
        data: { value: value },
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
            setOpen(!open);
          }}
        >
          <NumberFormatter
            prefix="$ "
            value={payment?.value}
            thousandSeparator
          />
        </Button>
      </Popover.Target>
      <Popover.Dropdown className="flex flex-1 flex-row gap-5 items-center">
        <FocusTrap active={open}>
          <NumberInput
            prefix="$ "
            thousandSeparator=","
            value={value}
            data-autofocus
            onChange={(e) => setValue(e)}
          />
        </FocusTrap>
        {renderButton()}
      </Popover.Dropdown>
    </Popover>
  );
};

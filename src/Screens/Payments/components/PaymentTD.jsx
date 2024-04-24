import { useCallback, useMemo, useState } from "react";
import { Table, Text } from "@mantine/core";
import { useUpdatePaymentMutation } from "../../../services/hooks/Payment/usePaymentMutation";
import { toast } from "sonner";
import { CustomDialog } from "../../../components/Dialog/CustomDialog";
import { ReceiptViewer } from "./ReceiptViewer";
import { PaymentSwitch } from "./PaymentSwitch";
import { ValueViewer } from "./ValueViewer";
import { DateViewer } from "./DateViewer";
import { textFormat } from "../../../utils/textFormat";

export const PaymentTD = ({ payment }) => {
  const updatePayment = useUpdatePaymentMutation();
  const [payed, setPayed] = useState(payment.payed || false);
  const [openAlert, setOpenAlert] = useState(false);

  const renter = useMemo(() => {
    return payment?.Contract?.Renter || null;
  }, [payment]);

  const apartment = useMemo(() => {
    return payment?.Contract?.Apartment || null;
  }, [payment]);

  const onConfirm = useCallback(
    (e) => {
      e.stopPropagation();
      updatePayment.mutate(
        { id: payment?.id, data: { payed: !payed } },
        {
          onSuccess: () => {
            toast.success("Pago actualizado correctamente", {
              description: `El pago numero ${payment?.id} ahora se encuentra ${
                payed ? "pendiente" : "saldado"
              }`,
            });
            setPayed(!payed);
          },
          onError: () => {
            toast.error("Error al actualizar el pago");
          },
        }
      );
      setOpenAlert(false);
    },
    [payed, payment?.id, updatePayment]
  );

  return (
    <Table.Tr>
      <Table.Td colSpan={1}>
        <ReceiptViewer payment={payment} />
      </Table.Td>
      <Table.Td colSpan={1}>
        <Text fw={900} c="green">
          {textFormat([apartment?.Building?.name || ""], "uppercase")}
        </Text>
      </Table.Td>
      <Table.Td colSpan={1}>
        <Text fw={900} c="green">
          {apartment?.number}
        </Text>
      </Table.Td>
      <Table.Td colSpan={1}>
        <ValueViewer payment={payment} />
      </Table.Td>
      <Table.Td colSpan={1}>
        <DateViewer payment={payment} />
      </Table.Td>
      <Table.Td colSpan={1}>{payment.payment_number}</Table.Td>
      <Table.Td colSpan={1}>{`${renter?.name} ${renter?.lastname}`}</Table.Td>
      <Table.Td colSpan={1}>
        <PaymentSwitch
          checked={payed}
          onChange={(e) => {
            e.stopPropagation();
            if (!e.target.checked) {
              setOpenAlert(true);
              return;
            } else {
              onConfirm(e);
            }
          }}
        />
      </Table.Td>

      <CustomDialog
        open={openAlert}
        onClose={() => setOpenAlert(false)}
        onConfirm={onConfirm}
        text="Estas seguro de cancelar un pago?"
      />
    </Table.Tr>
  );
};

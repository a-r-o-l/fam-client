import { useCallback, useMemo, useState } from "react";
import dayjs from "dayjs";
import { textFormat } from "../../../utils/textFormat";
import { useUpdatePaymentMutation } from "../../../services/hooks/Payment/usePaymentMutation";
import { AlertDialog } from "../../../components/Dialog/AlertDialog";
import { toast } from "sonner";
import {
  useMantineTheme,
  Switch,
  rem,
  Avatar,
  Text,
  useMantineColorScheme,
} from "@mantine/core";
import {
  FaBuilding,
  FaCircleCheck,
  FaCircleXmark,
  FaDoorClosed,
} from "react-icons/fa6";
import { SiCashapp } from "react-icons/si";

export const PaymentCard = ({ payment }) => {
  const theme = useMantineTheme();
  const { colorScheme } = useMantineColorScheme();
  const updatePayment = useUpdatePaymentMutation();

  const switchColor = useMemo(() => {
    return colorScheme === "dark" ? "white" : "black";
  }, [colorScheme]);

  const [payed, setPayed] = useState(payment.paid || false);
  const [openAlert, setOpenAlert] = useState(false);

  const renter = useMemo(() => {
    return payment.Renter || null;
  }, [payment]);

  const building = useMemo(() => {
    return renter.Building || null;
  }, [renter]);

  const onConfirm = useCallback(
    (e) => {
      e.stopPropagation();
      updatePayment.mutate(
        { id: payment.id, data: { paid: !payed } },
        {
          onSuccess: () => {
            toast.success("Pago actualizado correctamente", {
              description: `El pago numero ${payment.id} ahora se encuentra ${
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
    [payed, payment.id, updatePayment]
  );
  return (
    <div
      className={`border shadow-md w-full rounded-md overflow-hidden flex-row flex pr-5 mt-5 justify-between items-center max-w-screen-md bg-${
        colorScheme === "dark" ? "black" : "slate-600"
      }`}
    >
      <div
        className={`flex max-h-32 py-2 px-2 justify-center items-start flex-col w-40 ${
          payed ? "bg-green-600" : "bg-red-600"
        } pl-5`}
        style={{
          clipPath: "polygon(0 0, 70% 0, 100% 100%, 0 100%)",
        }}
      >
        <div className="flex flex-row gap-2 items-center">
          <FaDoorClosed color={switchColor} />
          <Text c="" fw={900} size="lg">
            {renter.apartment}
          </Text>
        </div>
        <div className="flex flex-row gap-2 items-center">
          <FaBuilding color={switchColor} />
          <Text c="">{building?.name}</Text>
        </div>
      </div>
      <div className="flex flex-row gap-1 items-center">
        <SiCashapp
          className="w-5 h-5"
          color={colorScheme === "dark" ? "white" : "black"}
        />
        <Text>{payment?.fee || "0.00"}</Text>
      </div>
      <div className="sm:hidden md:flex lg:flex flex justify-start items-center flex-row gap-4">
        <Avatar
          alt={renter?.name + " " + renter?.lastname}
          src={renter?.image_url}
          sx={{ width: rem(160), height: rem(160) }}
        />
        <Text className="md:hidden xl:block lg:block sm:hidden">
          {textFormat([renter?.name, renter?.lastname], "allcapitalize")}
        </Text>
      </div>
      <div className="flex justify-end items-center gap-5">
        <Text>{dayjs(payment?.date).format("DD/MM/YYYY")}</Text>
        <Switch
          size="lg"
          onLabel="SALDADO"
          offLabel="PENDIENTE"
          color="teal"
          checked={payed}
          styles={{
            track: {
              backgroundColor: !payed ? "red" : "",
              color: "white",
            },
          }}
          onChange={(e) => {
            e.stopPropagation();
            if (!e.target.checked) {
              setOpenAlert(true);
              return;
            } else {
              onConfirm(e);
            }
          }}
          onClick={(e) => {
            e.stopPropagation();
          }}
          thumbIcon={
            payed ? (
              <FaCircleCheck
                style={{ width: rem(20), height: rem(20) }}
                color={theme.colors.teal[6]}
                stroke={3}
              />
            ) : (
              <FaCircleXmark
                style={{ width: rem(20), height: rem(20) }}
                color={theme.colors.red[6]}
                stroke={3}
              />
            )
          }
        />
      </div>
      <AlertDialog
        handleClose={(e) => {
          e.stopPropagation();
          setOpenAlert(false);
        }}
        open={openAlert}
        title="Alerta"
        text="Estas seguro de cancelar un pago?"
        acceptTitle="Aceptar"
        onConfirm={onConfirm}
      />
    </div>
  );
};

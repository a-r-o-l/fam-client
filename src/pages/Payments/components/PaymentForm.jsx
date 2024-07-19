import {
  Button,
  Fieldset,
  NumberInput,
  Select as MSelect,
} from "@mantine/core";
import { useEffect, useMemo, useState } from "react";
import {
  FaBuilding,
  FaCalendarDay,
  FaRegMoneyBill1,
  FaUserLarge,
} from "react-icons/fa6";
import { useGetBuildingsQuery } from "../../../services/hooks/Building/useBuildingQuery";
import { textFormat } from "../../../utils/textFormat";
import { useGetRentersQuery } from "../../../services/hooks/Renter/useRenterQuery";
import { DateInput } from "@mantine/dates";
import { PaymentSwitch } from "./PaymentSwitch";
import { useCreatePaymentMutation } from "../../../services/hooks/Payment/usePaymentMutation";
import dayjs from "dayjs";
import { useField } from "@mantine/form";
import { toast } from "sonner";

export const PaymentForm = ({ onCloseModal, selectedPayment = null }) => {
  const amountField = useField({
    initialValue: "0",
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

  const [selectedBuilding, setSelectedBuilding] = useState("");
  const [selectedRenter, setSelectedRenter] = useState("");
  const [payed, setPayed] = useState(false);
  const [creating, setCreating] = useState(false);

  const createPayement = useCreatePaymentMutation();
  const { data: buildingsData } = useGetBuildingsQuery();
  const { data: rentersData } = useGetRentersQuery();

  const buildingSelect = useMemo(() => {
    let data = [];
    if (buildingsData) {
      data = [
        ...data,
        ...buildingsData.map((building) => {
          return {
            label: textFormat([building?.name], "allcapitalize"),
            value: building.id.toString(),
          };
        }),
      ];
    }
    return data || [];
  }, [buildingsData]);

  const rentersSelect = useMemo(() => {
    if (!rentersData?.length) {
      return [];
    }

    const rentersOptions = rentersData.map((renter) => ({
      ...renter,
      label: textFormat([renter?.name, renter?.lastname], "allcapitalize"),
      value: renter?.id?.toString(),
    }));

    if (!selectedBuilding) {
      return rentersOptions;
    }

    const rentersInSelectedBuildings = rentersOptions.filter((renterOption) => {
      const activeContract = renterOption?.Contracts.find(
        (contract) => contract.id === renterOption?.active_contract_id
      );
      const apartment = activeContract?.Apartment;
      return selectedBuilding.includes(apartment?.building_id?.toString());
    });

    return rentersInSelectedBuildings;
  }, [selectedBuilding, rentersData]);

  const onSubmit = async () => {
    setCreating(true);
    try {
      const renterData = rentersSelect.find(
        (renter) => renter.id === parseInt(selectedRenter)
      );
      const payload = {
        contract_id: renterData.active_contract_id,
        apartment_id: renterData.active_apartment_id,
        renter_id: parseInt(selectedRenter),
        value: amountField.getValue(),
        date: dayjs(dateField.getValue()).format("YYYY/MM/DD"),
        payed: payed,
      };
      createPayement.mutate(payload, {
        onSuccess: () => {
          toast.success("Pago creado correctamente");
          onCloseModal();
        },
        onError: () => {
          toast.error("Error al crear el pago");
        },
      });
    } catch (error) {
      toast.error(error?.message);
    } finally {
      setCreating(false);
    }
  };

  const disabledSubmit = useMemo(() => {
    if (
      !selectedBuilding ||
      !selectedRenter ||
      !amountField.getValue() ||
      !dateField.getValue()
    ) {
      return true;
    } else {
      if (amountField.error || dateField.error) {
        return true;
      }
      return false;
    }
  }, [selectedBuilding, selectedRenter, amountField, dateField]);

  useEffect(() => {
    if (selectedPayment) {
      setSelectedBuilding(
        selectedPayment?.Contract?.Apartment?.building_id.toString()
      );
      setSelectedRenter(selectedPayment?.Contract?.renter_id.toString());
      amountField.setValue(selectedPayment?.value.toString());
      // dateField.setValue(selectedPayment?.date);
      setPayed(selectedPayment?.payed);
    }
  }, [selectedPayment]);

  return (
    <div className="flex flex-1 flex-col justify-end px-10" onSubmit={onSubmit}>
      <Fieldset
        legend="informacion del pago"
        style={{ padding: 0 }}
        px={20}
        py={10}
        mt={40}
      >
        <div className="w-full h-20 flex flex-row items-center justify-between">
          <MSelect
            label="Complejo"
            leftSection={<FaBuilding />}
            data={buildingSelect}
            value={selectedBuilding}
            onChange={(e) => {
              setSelectedBuilding(e);
            }}
            size="md"
          />
          <MSelect
            label="Inquilino"
            leftSection={<FaUserLarge />}
            data={rentersSelect}
            value={selectedRenter}
            onChange={(e) => {
              setSelectedRenter(e);
            }}
            size="md"
          />
        </div>
        <div className="w-full h-20 mt-5">
          <NumberInput
            withAsterisk
            prefix="$"
            thousandSeparator=" "
            leftSectionPointerEvents="none"
            leftSection={<FaRegMoneyBill1 />}
            label="Monto"
            {...amountField.getInputProps()}
          />
        </div>
        <div className="w-full h-20">
          <DateInput
            withAsterisk
            valueFormat="DD/MM/YYYY"
            label="Fecha"
            leftSection={<FaCalendarDay />}
            {...dateField.getInputProps()}
          />
        </div>
        <div className="w-full h-20 mt-5 flex justify-end">
          <PaymentSwitch checked={payed} onChange={() => setPayed(!payed)} />
        </div>
      </Fieldset>
      <div className="flex w-full mt-10 justify-end gap-10">
        <Button
          radius="xl"
          w={150}
          size="sm"
          type="button"
          color="blue"
          variant="outline"
          onClick={onCloseModal}
        >
          Cancelar
        </Button>

        <Button
          disabled={disabledSubmit}
          radius="xl"
          w={150}
          size="sm"
          type="button"
          loading={creating || createPayement.isPending}
          onClick={onSubmit}
        >
          Guardar
        </Button>
      </div>
    </div>
  );
};

import {
  Button,
  Fieldset,
  NumberInput,
  Select as MSelect,
} from "@mantine/core";
import { useMemo, useState } from "react";
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

export const PaymentForm = ({ onCloseModal }) => {
  const [selectedBuilding, setSelectedBuilding] = useState("");
  const [selectedRenter, setSelectedRenter] = useState("");
  const [payed, setPayed] = useState(false);
  const [value, setValue] = useState("");
  const [date, setDate] = useState("");
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
        (contract) => contract.id === renterOption?.activeContractId
      );
      const apartment = activeContract?.Apartment;
      return selectedBuilding.includes(apartment?.buildingId?.toString());
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
        contractId: renterData.activeContractId,
        apartmentId: renterData.activeApartmentId,
        renterId: parseInt(selectedRenter),
        value: value,
        date: dayjs(date).format("YYYY/MM/DD"),
        payed: payed,
      };
      await createPayement.mutateAsync(payload);
    } catch (error) {
      console.log(error);
    } finally {
      setCreating(false);
    }
  };

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
            value={value}
            onChange={setValue}
          />
        </div>
        <div className="w-full h-20">
          <DateInput
            withAsterisk
            valueFormat="DD/MM/YYYY"
            label="Fecha"
            leftSection={<FaCalendarDay />}
            value={date}
            onChange={setDate}
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
          radius="xl"
          w={150}
          size="sm"
          type="button"
          loading={creating}
          onClick={onSubmit}
        >
          Guardar
        </Button>
      </div>
    </div>
  );
};

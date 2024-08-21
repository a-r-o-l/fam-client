import { useMemo } from "react";
import {
  Button,
  Fieldset,
  Select as MSelect,
  NumberInput,
} from "@mantine/core";
import { useField } from "@mantine/form";
import {
  FaBusinessTime,
  FaCalendarDay,
  FaRegMoneyBill1,
} from "react-icons/fa6";
import { DateInput } from "@mantine/dates";
import { useGetBuildingsQuery } from "../../../../services/hooks/Building/useBuildingQuery";
import { useGetApartmentsQuery } from "../../../../services/hooks/Apartment/useApartmentQuery";
import { textFormat } from "../../../../utils/textFormat";
import dayjs from "dayjs";
import { useCreateContractMutation } from "../../../../services/hooks/Contract/useContractMutation";
import { toast } from "sonner";
import { Building, DoorClosed } from "lucide-react";

export const ContractForm = ({ renter = null, disabled }) => {
  const buildingSelectField = useField({
    initialValue: "",
    validateOnChange: true,
    validate: (value) => {
      if (!value) {
        return "El edificio es requerido";
      }
    },
  });

  const apartmentSelectField = useField({
    initialValue: "",
    validateOnChange: true,
    validate: (value) => {
      if (!value) {
        return "El departamento es requerido";
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

  const dateField = useField({
    initialValue: "",
    validateOnChange: true,
    validate: (value) => {
      if (!value) {
        return "La fecha es requerida";
      }
    },
  });

  const contractField = useField({
    initialValue: "",
    validateOnChange: true,
    validate: (value) => {
      if (!value) {
        return "El contrato es requerido";
      }
    },
  });

  const upgradeField = useField({
    initialValue: "",
    validateOnChange: true,
    validate: (value) => {
      if (!value) {
        return "La actualizacion es requerida";
      }
    },
  });

  const createContract = useCreateContractMutation();

  const { data: buildings } = useGetBuildingsQuery();

  const { data: apartments } = useGetApartmentsQuery(
    {
      buildingId: buildingSelectField.getValue(),
    },
    {
      enabled: !!buildingSelectField.getValue(),
    }
  );

  const buildingSelectData = useMemo(() => {
    if (buildings) {
      const data = buildings.map((building) => {
        return {
          label: textFormat([building?.name], "allcapitalize"),
          value: building?.id?.toString(),
        };
      });
      return data;
    }
    return [];
  }, [buildings]);

  const apartmentSelectData = useMemo(() => {
    if (!buildingSelectField.getValue()) {
      return [];
    }
    const data = apartments?.map((apartment) => {
      return {
        label: apartment.number,
        value: apartment?.id?.toString(),
        disabled: !!apartment?.active_contract_id || apartment.it_was_sold,
      };
    });
    return data || [];
  }, [apartments, buildingSelectField]);

  const onSubmit = async () => {
    const start_date = dayjs(dateField.getValue()).format("YYYY/MM/DD");
    const payload = {
      value: valueField.getValue(),
      months_amount: contractField.getValue(),
      apartment_id: parseInt(apartmentSelectField.getValue()),
      renter_id: renter?.id,
      months_upgrade: upgradeField.getValue(),
      start_date,
      end_date: dayjs(start_date)
        .add(contractField.getValue(), "months")
        .format("YYYY/MM/DD"),
    };
    try {
      createContract.mutate(payload, {
        onSuccess: () => {
          toast.success("Contrato creado correctamente");
        },
        onError: (error) => {
          if (error.response.status === 414) {
            toast.error(error.response.data.message);
          } else {
            toast.error("Ocurrio un error al crear el contrato");
          }
        },
      });
    } catch (error) {
      console.log(error);
    }
  };

  const disabledSubmit = useMemo(() => {
    if (
      buildingSelectField.error ||
      apartmentSelectField.error ||
      valueField.error ||
      dateField.error ||
      contractField.error ||
      upgradeField.error
    ) {
      return true;
    }
    return false;
  }, [
    buildingSelectField,
    apartmentSelectField,
    valueField,
    dateField,
    contractField,
    upgradeField,
  ]);

  return (
    <div
      className="flex flex-1 flex-col justify-center items-end"
      // onSubmit={onSubmit}
    >
      <Fieldset
        legend="informacion de contrato"
        style={{ padding: 0 }}
        px={20}
        pt={10}
        py={10}
        w="100%"
      >
        <div className="flex flex-row w-full gap-10 items-center">
          <div className="w-4/5 h-20">
            <MSelect
              disabled={disabled}
              withAsterisk
              data={buildingSelectData}
              leftSection={<Building />}
              label="Complejo"
              size="md"
              comboboxProps={{ shadow: "xl" }}
              styles={{
                label: {
                  fontSize: "14px",
                },
              }}
              {...buildingSelectField.getInputProps()}
            />
          </div>
          <div className="w-1/4 h-20">
            <MSelect
              disabled={disabled}
              withAsterisk
              data={apartmentSelectData}
              leftSection={<DoorClosed />}
              label="Depto"
              size="md"
              comboboxProps={{ shadow: "xl" }}
              styles={() => {
                return {
                  label: {
                    fontSize: "14px",
                  },
                };
              }}
              {...apartmentSelectField.getInputProps()}
            />
          </div>
        </div>
        <div className="h-20">
          <NumberInput
            disabled={disabled}
            withAsterisk
            prefix="$"
            thousandSeparator=" "
            leftSectionPointerEvents="none"
            leftSection={<FaRegMoneyBill1 />}
            label="Monto"
            {...valueField.getInputProps()}
          />
        </div>
        <div className="w-full h-20">
          <DateInput
            disabled={disabled}
            withAsterisk
            valueFormat="DD/MM/YYYY"
            label="Fecha de inicio"
            leftSection={<FaCalendarDay />}
            {...dateField.getInputProps()}
          />
        </div>
        <div className="flex flex-row w-full gap-10 items-center">
          <div className="w-full h-20">
            <NumberInput
              disabled={disabled}
              withAsterisk
              clampBehavior="strict"
              min={0}
              max={36}
              leftSectionPointerEvents="none"
              leftSection={<FaBusinessTime />}
              label="Contrato"
              {...contractField.getInputProps()}
            />
          </div>
          <div className="w-full h-20">
            <NumberInput
              disabled={disabled}
              min={0}
              max={12}
              leftSectionPointerEvents="none"
              leftSection={<FaBusinessTime />}
              label="Actualizacion de contrato"
              {...upgradeField.getInputProps()}
            />
          </div>
        </div>
      </Fieldset>
      <div className="flex w-full mt-10 justify-end">
        {disabled ? (
          <></>
        ) : (
          <Button
            radius="xl"
            w={150}
            size="sm"
            variant="outline"
            type="submit"
            loading={createContract.isPending}
            disabled={createContract.isPending || disabledSubmit}
            onClick={onSubmit}
          >
            Crear
          </Button>
        )}
      </div>
    </div>
  );
};

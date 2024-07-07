import { useEffect, useMemo, useState } from "react";
import {
  Button,
  Fieldset,
  Select as MSelect,
  NumberInput,
} from "@mantine/core";
import {
  FaBed,
  FaBuilding,
  FaBusinessTime,
  FaCalendarDay,
  FaRegMoneyBill1,
} from "react-icons/fa6";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { Controller, useForm } from "react-hook-form";
import { DateInput } from "@mantine/dates";
import { useGetBuildingsQuery } from "../../../../services/hooks/Building/useBuildingQuery";
import { useGetApartmentsQuery } from "../../../../services/hooks/Apartment/useApartmentQuery";
import { textFormat } from "../../../../utils/textFormat";
import dayjs from "dayjs";
import { useCreateContractMutation } from "../../../../services/hooks/Contract/useContractMutation";
import { toast } from "sonner";

const schema = yup.object({
  value: yup
    .number()
    .required("El monto es requerido")
    .typeError("El monto es requerido"),
  start_date: yup.string().required("La fecha de inicio es requerida"),
  months_amount: yup
    .number()
    .required("El contrato es requerido")
    .typeError("El contrato es requerido"),
  months_upgrade: yup
    .number()
    .oneOf([0, 6, 12], "las actualizaciones son de 6 o 12 meses")
    .typeError("mes invalido")
    .default(0),
});

const defaultValues = {
  value: "",
  start_date: "",
  months_amount: 0,
  months_upgrade: 0,
};

export const ContractForm = ({ renter = null, disabled }) => {
  const createContract = useCreateContractMutation();

  const [selectedBuilding, setSelectedBuilding] = useState("");
  const [selectedApartment, setSelectedApartment] = useState("");

  const { data: buildings } = useGetBuildingsQuery();

  const { data: apartments, refetch } = useGetApartmentsQuery(
    {
      BuildingId: selectedBuilding,
    },
    {
      enabled: !!selectedBuilding,
    }
  );

  const {
    reset,
    setError,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues,
    mode: "onBlur",
  });

  const buildingSelectData = useMemo(() => {
    if (buildings) {
      const data = buildings.map((building) => {
        return {
          label: textFormat([building?.name], "allcapitalize"),
          value: building.id.toString(),
        };
      });
      return data;
    }
    return [];
  }, [buildings]);

  const apartmentSelectData = useMemo(() => {
    const data = apartments?.map((apartment) => {
      return {
        label: apartment.number,
        value: apartment.id.toString(),
        disabled: !!apartment?.activeContractId,
      };
    });
    return data || [];
  }, [apartments]);

  const onSubmit = async (data) => {
    if (!selectedApartment) {
      return setError("apartment", { message: "El departamento es requerido" });
    }
    const start_date = dayjs(data.start_date).format("YYYY/MM/DD");
    const payload = {
      ...data,
      apartmentId: parseInt(selectedApartment),
      renterId: renter.id,
      months_upgrade: data.months_upgrade,
      start_date,
      end_date: dayjs(start_date)
        .add(data.months_amount, "months")
        .format("YYYY/MM/DD"),
    };
    try {
      createContract.mutate(payload, {
        onSuccess: () => {
          toast.success("Contrato creado correctamente");
          reset(defaultValues);
        },
        onError: (error) => {
          if (error.response.status === 414) {
            toast.error(error.response.data.message);
          } else {
            toast.error("Ocurrio un error al crear el contrato");
          }
        },
      });
      // await createContract.mutateAsync(payload);
      // if (createContract.isSuccess) {
      //   toast.success("Contrato creado correctamente");
      //   reset(defaultValues);
      // }
    } catch (error) {
      console.log(error);
      // if (error.response.status === 414) {
      //   toast.error(error.response.data.message);
      // } else {
      //   toast.error("Ocurrio un error al crear el contrato");
      // }
    }
  };

  useEffect(() => {
    refetch();
  }, [selectedBuilding]);

  useEffect(() => {
    if (buildingSelectData) {
      setSelectedBuilding(buildings[0].id.toString());
    }
  }, [buildingSelectData]);

  return (
    <form
      className="flex flex-1 flex-col justify-center items-end"
      onSubmit={handleSubmit(onSubmit)}
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
              leftSection={<FaBuilding />}
              label="Complejo"
              value={selectedBuilding}
              onChange={(e) => {
                console.log(selectedBuilding);
                setSelectedBuilding(e);
              }}
              fullWidth
              size="md"
              comboboxProps={{ shadow: "xl" }}
              styles={{
                label: {
                  fontSize: "14px",
                },
              }}
            />
          </div>
          <div className="w-1/4 h-20">
            <MSelect
              disabled={disabled}
              withAsterisk
              data={apartmentSelectData}
              leftSection={<FaBed />}
              label="Depto"
              value={selectedApartment}
              onChange={(e) => {
                setSelectedApartment(e);
              }}
              fullWidth
              size="md"
              comboboxProps={{ shadow: "xl" }}
              styles={() => {
                return {
                  label: {
                    fontSize: "14px",
                  },
                };
              }}
            />
          </div>
        </div>
        <div className="h-20">
          <Controller
            name="value"
            control={control}
            defaultValue={""}
            render={({ field }) => (
              <NumberInput
                disabled={disabled}
                withAsterisk
                prefix="$"
                thousandSeparator=" "
                leftSectionPointerEvents="none"
                leftSection={<FaRegMoneyBill1 />}
                value={field.value}
                onChange={field.onChange}
                label="Monto"
                error={errors?.value?.message}
                errorMessage={errors?.value?.message}
              />
            )}
          />
        </div>
        <div className="w-full h-20">
          <Controller
            name="start_date"
            control={control}
            defaultValue={""}
            render={({ field }) => (
              <DateInput
                disabled={disabled}
                withAsterisk
                valueFormat="DD/MM/YYYY"
                label="Fecha de inicio"
                leftSection={<FaCalendarDay />}
                error={errors?.start_date?.message}
                onChange={field.onChange}
                value={field.value}
              />
            )}
          />
        </div>
        <div className="flex flex-row w-full gap-10 items-center">
          <div className="w-full h-20">
            <Controller
              name="months_amount"
              control={control}
              render={({ field }) => (
                <NumberInput
                  disabled={disabled}
                  withAsterisk
                  clampBehavior="strict"
                  min={0}
                  max={36}
                  leftSectionPointerEvents="none"
                  leftSection={<FaBusinessTime />}
                  value={field.value}
                  onChange={field.onChange}
                  label="Contrato"
                  error={errors?.months_amount?.message}
                  errorMessage={errors?.months_amount?.message}
                />
              )}
            />
          </div>
          <div className="w-full h-20">
            <Controller
              name="months_upgrade"
              control={control}
              render={({ field }) => (
                <NumberInput
                  disabled={disabled}
                  min={0}
                  max={12}
                  leftSectionPointerEvents="none"
                  leftSection={<FaBusinessTime />}
                  value={field.value}
                  onChange={field.onChange}
                  label="Actualizacion de contrato"
                  error={errors?.months_upgrade?.message}
                  errorMessage={errors?.months_upgrade?.message}
                />
              )}
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
            type="submit"
            loading={createContract.isPending}
            disabled={createContract.isPending}
          >
            Crear
          </Button>
        )}
      </div>
    </form>
  );
};

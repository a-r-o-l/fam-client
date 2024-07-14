import {
  useCreateBuildingMutation,
  useUpdateBuildingMutation,
} from "../../../services/hooks/Building/useBuildingMutation";
import { Controller, useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { TextInput, Button, Text, NumberInput } from "@mantine/core";
import { useEffect } from "react";
import { FaBuilding, FaLocationDot, FaBed } from "react-icons/fa6";
import { toast } from "sonner";

const schema = yup.object({
  name: yup.string().required("El nombre es requerido"),
  address: yup.string().required("La dirección es requerida"),
  apartments: yup
    .number()
    .transform((value, originalValue) => {
      return typeof originalValue === "string" && originalValue.trim() === ""
        ? undefined
        : value;
    })
    .min(1, "El número de apartamentos no puede ser 0")
    .required("la cantidad de deptos es requerida"),
});

export const BuildingForm = ({ building }) => {
  const createBuilding = useCreateBuildingMutation();
  const updateBuilding = useUpdateBuildingMutation();

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors, isDirty },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data) => {
    try {
      if (building) {
        updateBuilding.mutate(
          { id: building.id, data },
          {
            onSuccess: () => {
              toast.success("Complejo actualizado con éxito");
            },
            onError: () => {
              toast.error("Error al actualizar el complejo");
            },
          }
        );
        return;
      }
      createBuilding.mutate(data, {
        onSuccess: () => {
          toast.success("Complejo registrado con éxito");
        },
        onError: () => {
          toast.error("Error al registrar el complejo");
        },
      });
    } catch (error) {
      console.log("error-> ", error.response.status);
      if (error.response.status === 410) {
        toast.error(
          "No se pueden eliminar departamentos con un contrato activo"
        );
      }
    }
  };

  useEffect(() => {
    if (building) {
      const { name, address, apartments } = building;
      reset({ name, address, apartments });
    } else {
      reset({ name: "", address: "", apartments: "" });
    }
  }, [building, reset]);

  return (
    <div
      className="flex flex-1 justify-center "
      onClick={(e) => e.stopPropagation()}
    >
      <form
        className="flex w-2/3 flex-col gap-5 rounded-lg p-10"
        onSubmit={handleSubmit(onSubmit)}
      >
        <Text>☉ Registro de complejo</Text>
        <div>
          <Controller
            name="name"
            control={control}
            defaultValue={""}
            render={({ field }) => (
              <TextInput
                withAsterisk
                leftSectionPointerEvents="none"
                leftSection={<FaBuilding />}
                label="Nombre"
                value={field.value}
                error={errors?.name?.message}
                onChange={field.onChange}
              />
            )}
          />
        </div>
        <div>
          <Controller
            name="address"
            control={control}
            defaultValue={""}
            render={({ field }) => (
              <TextInput
                withAsterisk
                leftSectionPointerEvents="none"
                leftSection={<FaLocationDot />}
                label="Direccion"
                value={field.value}
                error={errors?.address?.message}
                onChange={field.onChange}
              />
            )}
          />
        </div>
        <div>
          <Controller
            name="apartments"
            control={control}
            defaultValue={1}
            render={({ field }) => (
              <NumberInput
                withAsterisk
                thousandSeparator=""
                leftSectionPointerEvents="none"
                leftSection={<FaBed />}
                value={field.value}
                onChange={field.onChange}
                label="Deptos"
                error={errors?.apartments?.message}
                errorMessage={errors?.apartments?.message}
              />
            )}
          />
        </div>
        <div className="mt-10 w-full flex justify-end gap-7">
          <Button
            radius="xl"
            w={150}
            size="sm"
            type="submit"
            color="blue"
            variant="light"
            disabled={!isDirty}
            loading={createBuilding.isPending || updateBuilding.isPending}
          >
            {building ? "Guardar" : "Registrar"}
          </Button>
        </div>
      </form>
    </div>
  );
};

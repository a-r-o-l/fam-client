import {
  useCreateBuildingMutation,
  useUpdateBuildingMutation,
} from "../../../../services/hooks/Building/useBuildingMutation";
import { TextInput, Button, Text, NumberInput, Select } from "@mantine/core";
import { useField } from "@mantine/form";
import { useMemo } from "react";
import { toast } from "sonner";
import {
  Building2,
  DoorClosed,
  Hotel,
  House,
  MapPin,
  Store,
} from "lucide-react";

export const BuildingForm = ({ building, onClose }) => {
  const createBuilding = useCreateBuildingMutation();
  const updateBuilding = useUpdateBuildingMutation();

  const typeField = useField({
    initialValue: "building",
    validateOnChange: true,
    validate: (value) => {
      if (!value) {
        return "El tipo es requerido";
      }
    },
  });

  const nameField = useField({
    initialValue: building?.name || "",
    validateOnChange: true,
    validate: (value) => {
      if (!value) {
        return "El nombre es requerido";
      }
    },
  });
  const addressField = useField({
    initialValue: building?.address || "",
    validateOnChange: true,
    validate: (value) => {
      if (!value) {
        return "La dirección es requerida";
      }
    },
  });

  const apartmentsField = useField({
    initialValue: building?.apartments || 1,
    validateOnChange: true,
    validate: (value) => {
      if (typeField.getValue() !== building) {
        return null;
      }
      if (!value) {
        return "La cantidad de departamentos es requerida";
      }
      if (Number(value) < 1) {
        return "La cantidad de departamentos no puede ser 0";
      }
    },
  });

  const disabled = useMemo(() => {
    if (
      (typeField === "building" && !nameField.getValue()) ||
      !addressField.getValue() ||
      !apartmentsField.getValue()
    ) {
      return true;
    }
    if (
      (typeField !== "building" && !nameField.getValue()) ||
      !addressField.getValue()
    ) {
      return true;
    }
    if (
      typeField.error ||
      nameField.error ||
      addressField.error ||
      apartmentsField.error
    ) {
      return true;
    }
    return false;
  }, [apartmentsField, addressField, nameField, typeField]);

  const onSubmit = async (data) => {
    try {
      if (building) {
        updateBuilding.mutate(
          { id: building.id, data },
          {
            onSuccess: () => {
              toast.success("Complejo actualizado con éxito");
              onClose();
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
          onClose();
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

  return (
    <div
      className="flex flex-col flex-1 items-center  border-gray-200"
      onClick={(e) => e.stopPropagation()}
    >
      <div className="flex flex-col w-full pl-5">
        <Text size="xl" fw={500} c="dark.2">
          Formulario
        </Text>
        <Text size="sm" fw={300} mb={20} c="dark.2">
          Crear un nuevo complejo
        </Text>
      </div>
      <div className="flex w-11/12 flex-col gap-5 rounded-lg">
        {/* <Fieldset style={{ padding: 0 }} px={40} py={40} w="100%"> */}
        <div className="">
          <Select
            disabled={!!building}
            withAsterisk
            data={[
              { label: "edificio", value: "building" },
              { label: "casa", value: "house" },
              { label: "departamento", value: "apartment" },
              { label: "salon", value: "lounge" },
            ]}
            leftSection={<Building2 size={20} />}
            label="Tipo"
            size="md"
            comboboxProps={{ shadow: "xl" }}
            renderOption={({ option }) => {
              if (option.value === "house") {
                return (
                  <div className="flex items-center justify-start gap-3 w-full">
                    <House size={16} color="gray" />
                    <p>{option.label}</p>
                  </div>
                );
              }
              if (option.value === "building") {
                return (
                  <div className="flex items-center justify-start gap-3 w-full">
                    <Hotel size={16} color="gray" />
                    <p>{option.label}</p>
                  </div>
                );
              }
              if (option.value === "apartment") {
                return (
                  <div className="flex items-center justify-start gap-3 w-full">
                    <DoorClosed size={16} color="gray" />
                    <p>{option.label}</p>
                  </div>
                );
              }
              return (
                <div className="flex items-center justify-start gap-3 w-full">
                  <Store size={16} color="gray" />
                  <p>{option.label}</p>
                </div>
              );
            }}
            styles={{
              label: {
                fontSize: "14px",
              },
              option: {
                fontSize: "14px",
              },
            }}
            {...typeField.getInputProps()}
          />
        </div>
        <div className="">
          <TextInput
            withAsterisk
            leftSectionPointerEvents="none"
            leftSection={<Building2 size={20} />}
            label="Nombre"
            {...nameField.getInputProps()}
          />
        </div>
        <div className="">
          <TextInput
            withAsterisk
            leftSectionPointerEvents="none"
            leftSection={<MapPin size={20} />}
            label="Direccion"
            {...addressField.getInputProps()}
          />
        </div>
        {typeField.getValue() === "building" && (
          <div className="">
            <NumberInput
              disabled={!!building}
              withAsterisk
              thousandSeparator=""
              leftSectionPointerEvents="none"
              leftSection={<DoorClosed size={20} />}
              label="Departamentos"
              {...apartmentsField.getInputProps()}
            />
          </div>
        )}
        <div className="mt-10 w-full flex justify-end gap-7">
          <Button
            variant="outline"
            radius="xl"
            size="sm"
            w={150}
            onClick={() => onClose()}
          >
            Cancel
          </Button>
          <Button
            radius="xl"
            w={150}
            size="sm"
            type="submit"
            color="blue"
            variant="light"
            loading={createBuilding.isPending || updateBuilding.isPending}
            disabled={disabled}
            onClick={() => {
              const type = typeField.getValue();
              const name = nameField.getValue();
              const address = addressField.getValue();
              const apartments = apartmentsField.getValue();
              const data = {
                type,
                name,
                address,
                apartments: type === "building" ? apartments : 1,
              };
              onSubmit(data);
            }}
          >
            {building ? "Guardar" : "Registrar"}
          </Button>
        </div>
        {/* </Fieldset> */}
      </div>
    </div>
  );
};

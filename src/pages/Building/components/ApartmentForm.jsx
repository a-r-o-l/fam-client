import {
  useUpdateApartmentMutation,
  useCreateApartmentMutation,
} from "../../../services/hooks/Apartment/useApartmentMutation";
import { TextInput, Button, Text, Select } from "@mantine/core";
import { useField } from "@mantine/form";
import { toast } from "sonner";
import { CaseUpper, CircleHelp, DoorClosed, Hash } from "lucide-react";
import HelpPopover from "../../../components/HelpPopover/HelpPopover";
import { useQueryClient } from "@tanstack/react-query";

function ApartmentForm({ apt, building, onClose }) {
  const createApartment = useCreateApartmentMutation();
  const updateApartment = useUpdateApartmentMutation();
  const queryClient = useQueryClient();
  const typeField = useField({
    initialValue: building?.apartments_with_floor ? "pyd" : "sd",
    validateOnChange: true,
    validate: (value) => {
      if (!value) {
        return "El tipo es requerido";
      }
    },
  });

  const floorField = useField({
    initialValue: apt?.floor || "",
    validateOnChange: true,
    validate: (value) => {
      if (typeField.getValue() === "pyd") {
        if (value === "") {
          return "El campo es requerido";
        }
      }
    },
  });

  const aptField = useField({
    initialValue: apt?.number || "",
    validateOnChange: true,
    validate: (value) => {
      if (value === "") {
        return "El campo es requerido";
      }
    },
  });

  const onSubmit = async (data) => {
    try {
      if (apt) {
        updateApartment.mutate(
          { id: apt.id, data },
          {
            onSuccess: () => {
              queryClient.invalidateQueries(["getApartments", building.id]);
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
      createApartment.mutate(data, {
        onSuccess: () => {
          queryClient.invalidateQueries(["getApartments", building.id]);
          toast.success("Complejo registrado con éxito");
          onClose();
        },
        onError: (err) => {
          if (err?.response?.status === 400) {
            return toast.error(err.response.data.message);
          }
          toast.error("Error al registrar el departamento");
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
          Crear un nuevo departamento
        </Text>
      </div>
      <div className="flex w-11/12 flex-col gap-5 rounded-lg">
        <div className="">
          <Select
            disabled
            rightSectionPointerEvents="auto"
            label={
              <div className="flex flex-1 w-full flex-row gap-2 items-center justify-between">
                <Text>Identificacion</Text>
                {/* <HelpPopover
                  icon={<CircleHelp size={18} />}
                  title="Identificación"
                  description="Selecciona el tipo de identificación que tendrá el departamento"
                /> */}
              </div>
            }
            data={[
              { label: "piso y depto", value: "pyd" },
              { label: "solo depto", value: "sd" },
            ]}
            {...typeField.getInputProps()}
            styles={{
              label: {
                width: "100%",
              },
            }}
          />
        </div>
        {typeField.getValue() === "pyd" && (
          <div>
            <TextInput
              withAsterisk
              leftSectionPointerEvents="none"
              leftSection={<Hash size={20} />}
              label="Piso"
              {...floorField.getInputProps()}
            />
          </div>
        )}
        <div>
          <TextInput
            withAsterisk
            leftSectionPointerEvents="none"
            leftSection={<DoorClosed size={20} />}
            label="Depto"
            {...aptField.getInputProps()}
          />
        </div>
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
            loading={createApartment.isPending || updateApartment.isPending}
            onClick={() => {
              const floor = floorField.getValue();
              const apt = aptField.getValue();
              const data = {
                floor,
                number: apt,
                building_id: building.id,
              };
              onSubmit(data);
            }}
          >
            {apt ? "Guardar" : "Registrar"}
          </Button>
        </div>
      </div>
    </div>
  );
}

export default ApartmentForm;

import {
  useCreateBuildingMutation,
  useUpdateBuildingMutation,
} from "../../../services/hooks/Building/useBuildingMutation";
import { useDeleteImageMutation } from "../../../services/hooks/images/useImagesMutation";
import {
  TextInput,
  Button,
  Text,
  NumberInput,
  Radio,
  Group,
  Fieldset,
  ActionIcon,
} from "@mantine/core";
import { useField } from "@mantine/form";
import { useCallback, useMemo, useRef, useState } from "react";
import { toast } from "sonner";
import { Building, Camera, DoorClosed, MapPin } from "lucide-react";
import { Avatar } from "@mui/material";
import { uploadImage } from "../../../utils/uploadImage";
import { useAccountStore } from "../../../store/useAccountStore";

export const BuildingForm = ({ building, onClose }) => {
  const fileInputRef = useRef(null);
  const { accessToken } = useAccountStore();
  const createBuilding = useCreateBuildingMutation();
  const updateBuilding = useUpdateBuildingMutation();
  const deleteImage = useDeleteImageMutation();
  const [radioValue, setRadioValue] = useState("pyd");
  const [localImage, setLocalImage] = useState(null);
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
      if (!value) {
        return "La cantidad de departamentos es requerida";
      }
      if (Number(value) < 1) {
        return "La cantidad de departamentos no puede ser 0";
      }
    },
  });

  const srcImg = useMemo(() => {
    if (localImage) {
      const urlimg = URL.createObjectURL(localImage);
      return urlimg;
    }
    if (building) {
      if (building?.image_url) {
        return building.image_url;
      }
    }
    return "./placeholder-building.png";
  }, [localImage, building]);

  const onImageChange = (e) => {
    const files = e.target.files;
    const file = files[0];
    setLocalImage(file);
  };

  const getFileNameFromUrl = useCallback((url) => {
    return url.substring(url.lastIndexOf("/") + 1);
  }, []);

  const disabled = useMemo(() => {
    if (
      !nameField.getValue() ||
      !addressField.getValue() ||
      !apartmentsField.getValue()
    ) {
      return true;
    }

    if (nameField.error || addressField.error || apartmentsField.error) {
      return true;
    }
    return false;
  }, [apartmentsField, addressField, nameField]);

  const onSubmit = async () => {
    const name = nameField.getValue();
    const address = addressField.getValue();
    const apartments = apartmentsField.getValue();
    let data = {
      name,
      address,
      apartments,
      apartments_with_floor: radioValue === "pyd" ? true : false,
    };
    if (localImage) {
      try {
        const response = await uploadImage(localImage, accessToken);
        if (response) {
          data.image_url = response.imageUrl;
          console.log(response.imageUrl);
        }
      } catch (error) {
        toast.error("Error al subir la imagen");
        console.error(error);
      }
    }
    if (building) {
      updateBuilding.mutate(
        { id: building.id, data },
        {
          onSettled: () => {
            if (building.image_url) {
              const imageName = getFileNameFromUrl(building.image_url);
              deleteImage.mutate(imageName);
            }
          },
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
        <div className="flex w-full justify-center items-center">
          <div className="relative self-start">
            {!building?.image_url || localImage ? (
              <Avatar
                className="w-20 h-20  font-bold border-4 border-white"
                sx={{ width: 87, height: 87 }}
                src={srcImg}
              />
            ) : (
              <div className="flex justify-center items-center w-14 h-14 border-2 rounded-full bg-black">
                <Building size={30} color="white" />
              </div>
            )}
            <ActionIcon
              radius="xl"
              pos="absolute"
              size="md"
              color="black"
              top={70}
              left={50}
              onClick={() => {
                fileInputRef.current?.click?.();
              }}
            >
              <Camera size={20} />
            </ActionIcon>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              style={{ display: "none" }}
              onChange={onImageChange}
            />
          </div>
        </div>
        <div className="">
          {/* <Select
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
          /> */}
        </div>
        <div className="">
          <TextInput
            withAsterisk
            leftSectionPointerEvents="none"
            leftSection={<Building size={20} />}
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

        <Fieldset
          className="flex flex-row w-full justify-center mt-5 gap-5"
          legend="Departamentos"
        >
          <Radio.Group
            label="Identificación para departamentos"
            description="elige el tipo de identificación que tendrá cada departamento"
            value={radioValue}
            onChange={setRadioValue}
          >
            <Group mt="md">
              <Radio value="pyd" label="Piso y Depto" description={`(1 "A")`} />
              <Radio value="sd" label="Solo Depto" description="(1)" />
            </Group>
          </Radio.Group>
          <div className="flex justify-center items-end">
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
        </Fieldset>
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
            onClick={() => onSubmit()}
          >
            {building ? "Guardar" : "Registrar"}
          </Button>
          <Button onClick={() => {}}>test</Button>
        </div>
      </div>
    </div>
  );
};

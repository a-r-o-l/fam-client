import {
  useCreateHouseMutation,
  useUpdateHouseMutation,
} from "../../../services/hooks/House/useHouseMutation";
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

export const HouseForm = ({ house, onClose }) => {
  const fileInputRef = useRef(null);
  const { accessToken } = useAccountStore();
  const createHouse = useCreateHouseMutation();
  const updateHouse = useUpdateHouseMutation();
  const deleteImage = useDeleteImageMutation();
  const [radioValue, setRadioValue] = useState("pyd");
  const [localImage, setLocalImage] = useState(null);
  const nameField = useField({
    initialValue: house?.name || "",
    validateOnChange: true,
    validate: (value) => {
      if (!value) {
        return "El nombre es requerido";
      }
    },
  });
  const addressField = useField({
    initialValue: house?.address || "",
    validateOnChange: true,
    validate: (value) => {
      if (!value) {
        return "La dirección es requerida";
      }
    },
  });

  const srcImg = useMemo(() => {
    if (localImage) {
      const urlimg = URL.createObjectURL(localImage);
      return urlimg;
    }
    if (house) {
      if (house?.image_url) {
        return house.image_url;
      }
    }
    return "./placeholder-house.webp";
  }, [localImage, house]);

  const onImageChange = (e) => {
    const files = e.target.files;
    const file = files[0];
    setLocalImage(file);
  };

  const getFileNameFromUrl = useCallback((url) => {
    return url.substring(url.lastIndexOf("/") + 1);
  }, []);

  const disabled = useMemo(() => {
    if (!nameField.getValue() || !addressField.getValue()) {
      return true;
    }

    if (nameField.error || addressField.error) {
      return true;
    }
    return false;
  }, [addressField, nameField]);

  const onSubmit = async () => {
    const name = nameField.getValue();
    const address = addressField.getValue();
    let data = {
      name,
      address,
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
    if (house) {
      updateHouse.mutate(
        { id: house.id, data },
        {
          onSettled: () => {
            if (house.image_url) {
              const imageName = getFileNameFromUrl(house.image_url);
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
    createHouse.mutate(data, {
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
          Crear nueva casa
        </Text>
      </div>
      <div className="flex w-11/12 flex-col gap-5 rounded-lg">
        <div className="flex w-full justify-center items-center">
          <div className="relative self-start">
            <Avatar
              className="w-20 h-20  font-bold border-4 border-white"
              sx={{ width: 87, height: 87 }}
              src={srcImg}
            />

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
        <div className=""></div>
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
            loading={createHouse.isPending || updateHouse.isPending}
            disabled={disabled}
            onClick={() => onSubmit()}
          >
            {house ? "Guardar" : "Registrar"}
          </Button>
        </div>
      </div>
    </div>
  );
};

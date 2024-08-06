import {
  useCreateRenterMutation,
  useUpdateRenterMutation,
} from "../../../../services/hooks/Renter/useRenterMutation";
import { useDeleteImageMutation } from "../../../../services/hooks/images/useImagesMutation";
import { Controller, useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { Button, Flex, NumberInput, TextInput, Fieldset } from "@mantine/core";
import { FaFingerprint, FaMobileScreen, FaRegUser } from "react-icons/fa6";
import { useCallback, useEffect, useMemo, useState } from "react";
import { ImagePicker } from "../../../../components/Inputs/ImagePicker";
import { toast } from "sonner";
import { HiAtSymbol } from "react-icons/hi";
import { Input } from "@mantine/core";
import { IMaskInput } from "react-imask";
import { uploadImage } from "../../../../utils/uploadImage";
import { useAccountStore } from "../../../../store/useAccountStore";

const defaultValues = {
  name: "",
  lastname: "",
  email: "",
  dni: "",
  phone: "",
  image_url: "",
};

const schema = yup
  .object({
    name: yup.string().required("El nombre es requerido"),
    lastname: yup.string().required("El apellido es requerido"),
    email: yup.string().email("El email no es valido"),
    dni: yup.string().required("El dni es requerido"),
    phone: yup.string(),
    image_url: yup.string(),
  })
  .required();

export const RenterForm = ({ onCancel, renter = null }) => {
  const { accessToken } = useAccountStore();
  const createRenter = useCreateRenterMutation();
  const updateRenter = useUpdateRenterMutation();
  const deleteImage = useDeleteImageMutation();
  const [localImage, setLocalImage] = useState(null);
  const [creating, setCreating] = useState(false);

  const onImageChange = (e) => {
    const files = e.target.files;
    const file = files[0];
    setLocalImage(file);
  };

  const getFileNameFromUrl = useCallback((url) => {
    return url.substring(url.lastIndexOf("/") + 1);
  }, []);

  const srcImg = useMemo(() => {
    if (localImage) {
      const urlimg = URL.createObjectURL(localImage);
      return urlimg;
    }
    if (renter?.image_url) {
      return renter.image_url;
    }
    return "";
  }, [localImage, renter]);

  const {
    reset,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues,
  });

  const onSubmit = async (data) => {
    setCreating(true);
    let payload = { ...data };
    try {
      if (localImage) {
        try {
          const response = await uploadImage(localImage, accessToken);
          if (response) {
            payload.image_url = response.imageUrl;
          }
        } catch (error) {
          toast.error("Error al subir la imagen");
          console.error(error);
        }
      }
      if (renter) {
        updateRenter.mutate(
          {
            id: renter.id,
            data: {
              ...payload,
              dni: data.dni.toString(),
            },
          },
          {
            onSettled: () => {
              if (renter.image_url) {
                const imageName = getFileNameFromUrl(renter.image_url);
                deleteImage.mutate(imageName);
              }
            },
            onSuccess: () => {
              toast.success("Inquilino actualizado correctamente");
            },
            onError: () => {
              toast.error("Error al actualizar el inquilino");
            },
          }
        );
      } else {
        createRenter.mutate(payload, {
          onSuccess: () => {
            toast.success("Inquilino creado correctamente");
          },
          onError: () => {
            toast.error("Error al crear el inquilino");
          },
        });
        onCancel();
      }
    } catch (error) {
      console.log(error);
    } finally {
      setCreating(false);
    }
  };

  useEffect(() => {
    if (renter) {
      const { name, lastname, email, dni, phone, image_url } = renter;
      reset({
        name,
        lastname,
        email,
        dni,
        phone,
        image_url,
      });
    }
  }, [renter, reset]);

  return (
    <form
      className="flex flex-1 flex-col justify-end"
      onSubmit={handleSubmit(onSubmit)}
    >
      <Flex align="center" justify="center">
        <ImagePicker
          avh={90}
          avw={90}
          imgSrc={srcImg}
          onImgChanged={onImageChange}
        />
      </Flex>
      <Fieldset
        legend="informacion personal"
        style={{ padding: 0 }}
        px={20}
        py={10}
        mt={40}
      >
        <div className="w-full h-20">
          <Controller
            name="name"
            control={control}
            defaultValue={""}
            render={({ field }) => (
              <TextInput
                withAsterisk
                leftSectionPointerEvents="none"
                leftSection={<FaRegUser />}
                label="Nombre"
                value={field.value}
                error={errors?.name?.message}
                onChange={field.onChange}
              />
            )}
          />
        </div>
        <div className="w-full h-20">
          <Controller
            name="lastname"
            control={control}
            defaultValue={""}
            render={({ field }) => (
              <TextInput
                withAsterisk
                leftSectionPointerEvents="none"
                leftSection={<FaRegUser />}
                label="Apellido"
                value={field.value}
                error={errors?.lastname?.message}
                onChange={field.onChange}
              />
            )}
          />
        </div>
        <div className="w-full h-20">
          <Controller
            name="email"
            control={control}
            defaultValue={""}
            render={({ field }) => (
              <TextInput
                leftSectionPointerEvents="none"
                leftSection={<HiAtSymbol />}
                label="Correo electronico"
                value={field.value}
                error={errors?.email?.message}
                onChange={field.onChange}
              />
            )}
          />
        </div>
        <div className="flex flex-row w-full gap-10 items-center">
          <div className="w-full h-20">
            <Controller
              name="dni"
              control={control}
              defaultValue={""}
              render={({ field }) => (
                <NumberInput
                  withAsterisk
                  leftSectionPointerEvents="none"
                  leftSection={<FaFingerprint />}
                  label="Dni"
                  value={field.value}
                  error={errors?.dni?.message}
                  onChange={field.onChange}
                  maxLength={8}
                />
              )}
            />
          </div>
          <div className="w-full h-20">
            <Controller
              name="phone"
              control={control}
              defaultValue={""}
              render={({ field }) => (
                <Input.Wrapper>
                  <Input.Label>Telefono</Input.Label>
                  <Input
                    component={IMaskInput}
                    mask="+54 (000) 0-000000"
                    leftSectionPointerEvents="none"
                    leftSection={<FaMobileScreen />}
                    value={field.value}
                    error={errors?.phone?.message}
                    onChange={field.onChange}
                  />
                </Input.Wrapper>
              )}
            />
          </div>
        </div>
      </Fieldset>
      <div className="flex w-full mt-10 justify-end gap-10">
        {!renter ? (
          <Button
            radius="xl"
            w={150}
            size="sm"
            type="button"
            color="blue"
            variant="outline"
            onClick={onCancel}
          >
            Cancelar
          </Button>
        ) : (
          <></>
        )}
        <Button radius="xl" w={150} size="sm" type="submit" loading={creating}>
          Guardar
        </Button>
      </div>
    </form>
  );
};

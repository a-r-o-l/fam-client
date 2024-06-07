import {
  useCreateRenterMutation,
  useUpdateRenterMutation,
} from "../../../../services/hooks/Renter/useRenterMutation";
import { Controller, useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { Button, Flex, NumberInput, TextInput, Fieldset } from "@mantine/core";
import { FaFingerprint, FaMobileScreen, FaRegUser } from "react-icons/fa6";
import { useEffect, useMemo, useRef, useState } from "react";
import { ImagePicker } from "../../../../components/Inputs/ImagePicker";
import { toast } from "sonner";
import { HiAtSymbol } from "react-icons/hi";
import { Input } from "@mantine/core";
import { IMaskInput } from "react-imask";

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
  const fileInputRef = useRef(null);
  const createRenter = useCreateRenterMutation();
  const updateRenter = useUpdateRenterMutation();
  const [localImage, setLocalImage] = useState(null);
  const [creating, setCreating] = useState(false);

  const onImageChange = (e) => {
    const files = e.target.files;
    const file = files[0];
    setLocalImage(file);
  };

  const onImageChange2 = async (e) => {
    const files = e.target.files;
    const file = files[0];
    const data = new FormData();
    data.append("image", file);

    try {
      // Reemplaza 'http://localhost:3000/upload' con la URL de tu endpoint
      const response = await fetch("http://localhost:3000/uploads", {
        method: "POST",
        body: data,
      });

      if (!response.ok) {
        throw new Error("Error al subir el archivo");
      }

      const responseData = await response.json();
      console.log(responseData); // Aquí puedes manejar la respuesta del servidor
    } catch (error) {
      console.error(error); // Aquí puedes manejar los errores
    }
  };

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
    setError,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues,
  });

  const onSubmit = async (data) => {
    setCreating(true);
    let imgUrl;
    let payload = { ...data };
    try {
      if (localImage) {
        const data = new FormData();
        data.append("file", localImage);
        data.append("upload_preset", "images");
        const res = await fetch(
          "https://api.cloudinary.com/v1_1/dbb2vknkm/image/upload",
          {
            method: "POST",
            body: data,
          }
        );
        imgUrl = await res.json();
        if (imgUrl?.secure_url) {
          payload.image_url = imgUrl?.secure_url;
        }
      }

      if (renter) {
        const response = updateRenter.mutateAsync({
          id: renter.id,
          data: {
            ...payload,
            dni: data.dni.toString(),
          },
        });
        console.log(response);
        toast.success("Inquilino actualizado correctamente");
      } else {
        createRenter.mutateAsync(payload);
        if (createRenter.isError) {
          toast.error(createRenter.error.response.data.message);
          setError("apartment", {
            type: "manual",
            message: "Departamento no disponible",
          });
          return;
        }
        toast.success("Inquilino creado correctamente");
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
                label="E-mail"
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
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          // style={{ display: "none" }}
          onChange={onImageChange2}
        />

        <Button radius="xl" w={150} size="sm" type="submit" loading={creating}>
          Guardar
        </Button>
      </div>
    </form>
  );
};

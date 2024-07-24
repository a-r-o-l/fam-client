import {
  Badge,
  Button,
  Fieldset,
  Input,
  Modal,
  PasswordInput,
  TextInput,
} from "@mantine/core";
import { FaMobileScreen, FaRegUser } from "react-icons/fa6";
import { HiAtSymbol } from "react-icons/hi";
import { ImagePicker } from "../Inputs/ImagePicker";
import { IMaskInput } from "react-imask";
import { useCallback, useEffect, useMemo, useState } from "react";
import { RiLockPasswordLine } from "react-icons/ri";
import { useAccountStore } from "../../store/useAccountStore";
import { useUpdateAccountMutation } from "../../services/hooks/Account/useAccountMutation";
import { toast } from "sonner";
import { uploadImage } from "../../utils/uploadImage";
import { useDeleteImageMutation } from "../../services/hooks/images/useImagesMutation";
import SubscriptionBar from "./components/SubscriptionBar";
const UserModal = ({ open, onCloseModal }) => {
  const { account, setCloseSession, accessToken } = useAccountStore();
  const [localImage, setLocalImage] = useState(null);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const deleteImage = useDeleteImageMutation();

  const updateAccount = useUpdateAccountMutation();

  const srcImg = useMemo(() => {
    if (localImage) {
      const urlimg = URL.createObjectURL(localImage);
      return urlimg;
    }
    if (account?.image_url) {
      return account.image_url;
    }
    return "";
  }, [localImage, account]);

  const getFileNameFromUrl = useCallback((url) => {
    return url.substring(url.lastIndexOf("/") + 1);
  }, []);

  useEffect(() => {
    if (account) {
      setUsername(account.user_name);
      setEmail(account.email);
      setPhone(account.phone);
    }
  }, [account]);

  const onImageChange = (e) => {
    const files = e.target.files;
    const file = files[0];
    setLocalImage(file);
  };

  const handleSubmit = async () => {
    const data = {
      user_name: username,
      email,
      phone,
    };
    if (localImage) {
      try {
        const response = await uploadImage(localImage, accessToken);
        if (response) {
          data.image_url = response.imageUrl;
        }
      } catch (error) {
        toast.error("Error al subir la imagen");
        console.error(error);
      }
    }
    updateAccount.mutate(
      { accountId: account.id, data },
      {
        onSettled: () => {
          if (account.image_url) {
            const imageName = getFileNameFromUrl(account.image_url);
            deleteImage.mutate(imageName);
          }
        },
        onSuccess: () => {
          onCloseModal();
          toast.success("Usuario actualizado correctamente");
          setCloseSession();
        },
        onError: () => {
          toast.error("Error al actualizar el usuario");
        },
      }
    );
  };

  return (
    <Modal
      withCloseButton={false}
      opened={open}
      onClose={onCloseModal}
      centered
      size="lg"
      radius="md"
      overlayProps={{
        blur: 3,
        backgroundOpacity: 0.4,
      }}
      styles={{
        header: {
          justifyContent: "flex-start",
          paddingLeft: 40,
        },
        title: {
          fontSize: "1rem",
        },
        body: {
          paddingTop: 40,
        },
      }}
    >
      <div className="flex flex-1 flex-col justify-end">
        {/* <div>
          <Button
            onClick={() => {
              console.log(account);
              // const imageName = getFileNameFromUrl(account.image_url);
              // deleteImage.mutate(imageName);
            }}
          >
            delete image
          </Button>
        </div> */}
        <div className="flex flex-row w-full justify-start items-center gap-4">
          <div className="flex items-center justify-center pl-4">
            <ImagePicker
              avh={120}
              avw={120}
              imgSrc={srcImg}
              onImgChanged={onImageChange}
            />
          </div>
          <div className="flex flex-col w-1/3 items-start justify-center">
            <Badge color="green" size="xs">
              Activo
            </Badge>
            <div className="flex flex-col w-1/2 items-start mt-5 gap-1">
              <p className="text-xs">suscripcion</p>
              <SubscriptionBar />
            </div>
          </div>
        </div>

        <Fieldset
          legend="informacion personal"
          style={{ padding: 0 }}
          px={20}
          py={10}
          mt={40}
        >
          <div className="w-full h-20">
            <TextInput
              withAsterisk
              leftSectionPointerEvents="none"
              leftSection={<FaRegUser />}
              label="Nombre de usuario"
              value={username}
              onChange={({ target }) => setUsername(target.value)}
            />
          </div>
          <div className="w-full h-20">
            <PasswordInput
              label="Contraseña"
              leftSection={<RiLockPasswordLine />}
              value={password}
              onChange={({ target }) => setPassword(target.value)}
            />
          </div>
          <div className="w-full h-20">
            <TextInput
              leftSectionPointerEvents="none"
              leftSection={<HiAtSymbol />}
              label="Correo electrónico"
              value={email}
              onChange={({ target }) => setEmail(target.value)}
            />
          </div>
          <div className="w-full h-20">
            <Input.Wrapper>
              <Input.Label>Telefono</Input.Label>
              <Input
                component={IMaskInput}
                mask="+54 (000) 0-000000"
                leftSectionPointerEvents="none"
                leftSection={<FaMobileScreen />}
                value={phone}
                onChange={({ target }) => setPhone(target.value)}
              />
            </Input.Wrapper>
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
            onClick={handleSubmit}
            loading={updateAccount.isPending}
          >
            Guardar
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default UserModal;

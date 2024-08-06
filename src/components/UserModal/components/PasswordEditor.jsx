import { useCallback, useMemo, useState } from "react";
import PasswordPopup from "./PasswordPopup";
import { Button, Loader, PasswordInput } from "@mantine/core";
import { useField } from "@mantine/form";
import { useAccountStore } from "../../../store/useAccountStore";
import { http } from "../../../services/http";
import { toast } from "sonner";
import {
  useCheckPasswordtMutation,
  useUpdatePasswordtMutation,
} from "../../../services/hooks/Account/useAccountMutation";
import { Check } from "lucide-react";

function PasswordEditor() {
  const { account, setCreateSession, setCloseSession } = useAccountStore();
  const checkPassword = useCheckPasswordtMutation();
  const updatePassword = useUpdatePasswordtMutation();
  const [createPasswordModal, setCreatePasswordModal] = useState(false);

  const validateAsync = async (value) => {
    if (!value.length) {
      return null;
    } else {
      try {
        const res = await checkPassword.mutateAsync({
          accountId: account.id,
          password: value,
        });
        if (res?.matching) {
          return null;
        } else {
          return "La contraseña no coincide";
        }
      } catch (error) {
        console.log(error);
        return "La contraseña no coincide";
      }
    }
  };

  const oldPassword = useField({
    initialValue: "",
    validateOnChange: true,
    validate: validateAsync,
  });

  const newPassword = useField({
    initialValue: "",
    validateOnChange: true,
    validate: (value) => {
      if (!value) {
        return null;
      }
      if (value === oldPassword.getValue()) {
        return "La nueva contraseña no puede ser igual a la actual";
      }
      if (value.length < 8) {
        return "Las contraseña debe tener al menos 8 caracteres";
      }
      return null;
    },
  });

  const renderPasswordIcon = useCallback(() => {
    if (checkPassword.isPending) {
      return <Loader size={20} color="blue" />;
    }
    if (oldPassword.error || !oldPassword.getValue()) {
      return <></>;
    } else {
      return <Check color="green" />;
    }
  }, [oldPassword, checkPassword]);

  const handlerSubmit = () => {
    updatePassword.mutate(
      {
        accountId: account.id,
        password: newPassword.getValue(),
      },
      {
        onSuccess: async () => {
          toast.success("Contraseña actualizada correctamente");
          const refreshToken = localStorage.getItem("refresh-token");
          if (refreshToken) {
            try {
              const response = await http.post("/refreshtoken", {
                refreshToken,
              });
              if (response.status === 200) {
                const { accessToken } = response.data;
                setCreateSession(accessToken, refreshToken);
              }
            } catch (error) {
              toast.error("Hubo un error, por favor inicie sesión nuevamente");
              setCloseSession();
            }
          }
        },
        onError: () => {
          toast.error("Error al cambiar la contraseña, intente de nuevo");
        },
      }
    );
  };

  const oldPasswordBorderColor = useMemo(() => {
    const { error, isValidating } = oldPassword;
    if (!error && !isValidating && !!oldPassword.getValue().length) {
      return "rgb(34 197 94)";
    }
    return "";
  }, [oldPassword]);

  const newPasswordBorderColor = useMemo(() => {
    const { error, isValidating } = newPassword;
    if (
      !error &&
      !isValidating &&
      !!newPassword.getValue().length &&
      !oldPassword.error &&
      !!oldPassword.getValue().length &&
      !oldPassword.isValidating
    ) {
      return "rgb(34 197 94)";
    }
    return "";
  }, [newPassword, oldPassword]);

  return (
    <PasswordPopup
      buttonTitle="Cambiar contraseña"
      open={createPasswordModal}
      setOpen={() => {
        setCreatePasswordModal(!createPasswordModal);
      }}
      onClose={() => {
        setCreatePasswordModal(false);
        newPassword.reset();
        oldPassword.reset();
      }}
    >
      <div className="flex flex-col gap-5 w-full">
        <div className="h-20 w-full flex">
          <div className="flex w-full">
            <PasswordInput
              label="Contraseña actual"
              placeholder="********"
              required
              {...oldPassword.getInputProps()}
              style={{ width: "100%" }}
              styles={{
                input: {
                  borderColor: oldPasswordBorderColor,
                },
              }}
            />
          </div>
          <div className="w-8 flex justify-end items-center">
            {renderPasswordIcon()}
          </div>
        </div>
        <div className="h-20 w-full flex">
          <div className="flex w-full">
            <PasswordInput
              label="Nueva contraseña"
              placeholder="********"
              disabled={
                !oldPassword.getValue() ||
                oldPassword.error ||
                oldPassword.isValidating
              }
              required
              {...newPassword.getInputProps()}
              style={{ width: "100%" }}
              styles={{
                input: {
                  borderColor: newPasswordBorderColor,
                },
              }}
            />
          </div>
          <div className="w-8 flex justify-end items-center">
            {newPassword.getValue().length > 7 &&
              !newPassword.error &&
              !oldPassword.error &&
              !!oldPassword.getValue().length &&
              !oldPassword.isValidating && <Check color="green" />}
          </div>
        </div>
        <div className="flex justify-end gap-5 mt-10">
          <Button
            radius="xl"
            variant="outline"
            color="blue"
            onClick={() => {
              setCreatePasswordModal(false);
            }}
          >
            Cancelar
          </Button>
          <Button
            onClick={handlerSubmit}
            loading={updatePassword.isPending}
            disabled={
              oldPassword.error ||
              newPassword.error ||
              !oldPassword.getValue() ||
              !newPassword.getValue() ||
              oldPassword.isValidating
            }
            variant="light"
            radius="xl"
            color="blue"
          >
            Actualizar
          </Button>
        </div>
      </div>
    </PasswordPopup>
  );
}

export default PasswordEditor;

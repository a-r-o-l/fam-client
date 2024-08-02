import { useState } from "react";
import PasswordPopup from "./PasswordPopup";
import { Button, PasswordInput } from "@mantine/core";
import { useField } from "@mantine/form";
import { useAccountStore } from "../../../store/useAccountStore";
import { useCreatePasswordtMutation } from "../../../services/hooks/Account/useAccountMutation";
import { http } from "../../../services/http";
import { toast } from "sonner";

function PasswordCreater() {
  const { account, setCreateSession, setCloseSession } = useAccountStore();
  const [createPassword, setCreatePasswordModal] = useState(false);
  const createNewPassword = useCreatePasswordtMutation();
  const firstInp = useField({
    initialValue: "",
    validateOnChange: true,
    validate: (value) => {
      if (!value) {
        return null;
      }
      if (value.length < 8) {
        return "La contraseña debe tener al menos 8 caracteres";
      }
      return null;
    },
  });

  const secondInp = useField({
    initialValue: "",
    validateOnChange: true,
    validate: (value) => {
      if (value !== firstInp.getValue()) {
        return "Las contraseña no coinciden";
      }
      if (!value) {
        return null;
      }
      return null;
    },
  });

  const handleSubmit = async () => {
    createNewPassword.mutate(
      {
        accountId: account.id,
        password: firstInp.getValue(),
      },
      {
        onSuccess: async () => {
          toast.success("Contraseña creada correctamente");
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
          toast.error("Error al crear la contraseña, intente de nuevo");
        },
      }
    );
  };

  return (
    <PasswordPopup
      buttonTitle="Crear una contraseña"
      open={createPassword}
      setOpen={() => {
        setCreatePasswordModal(!createPassword);
      }}
      onClose={() => {
        setCreatePasswordModal(false);
        firstInp.reset();
        secondInp.reset();
      }}
    >
      <div className="flex flex-col gap-5 w-full">
        <div className="h-20 w-full">
          <PasswordInput
            label="Contraseña"
            placeholder="********"
            required
            {...firstInp.getInputProps()}
          />
        </div>
        <div className="h-20 w-full">
          <PasswordInput
            disabled={createNewPassword.isPending || !firstInp.getValue()}
            label="Confirmar contraseña"
            placeholder="********"
            required
            {...secondInp.getInputProps()}
          />
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
            onClick={handleSubmit}
            loading={createNewPassword.isPending}
            disabled={
              firstInp.error ||
              secondInp.error ||
              !firstInp.getValue() ||
              !secondInp.getValue()
            }
            variant="light"
            radius="xl"
            color="blue"
          >
            Guardar
          </Button>
        </div>
      </div>
    </PasswordPopup>
  );
}

export default PasswordCreater;

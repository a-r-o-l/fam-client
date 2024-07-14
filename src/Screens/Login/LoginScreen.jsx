import { Anchor, Button, Card, Image, TextInput } from "@mantine/core";
import { useState } from "react";
import { FaKey, FaRegUser } from "react-icons/fa6";
import { toast } from "sonner";
import { accountApiService } from "../../services/accountApiService";
import { useAccountStore } from "../../store/useAccountStore";

export const LoginScreen = () => {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [loginMode, setLoginMode] = useState(true);
  const [logging, setLogging] = useState(false);
  const { setCreateSession } = useAccountStore();

  const handlerLoggin = async () => {
    try {
      if (loginMode) {
        accountApiService
          .createSession({
            user_name: userName,
            password: password,
          })
          .then(async (response) => {
            if (response) {
              const { accessToken, refreshToken } = response;
              setLogging(true);
              await new Promise((resolve) => setTimeout(resolve, 4000));
              setCreateSession(accessToken, refreshToken);
              toast.success(`Bienvenido de vuelta ${userName}`);
            }
          })
          .catch((error) => {
            if (error.response.status === 404) {
              toast.error("Usuario o contraseña invalida");
              return;
            } else {
              toast.error("Error en el servidor");
              return;
            }
          });
      } else {
        accountApiService
          .createAccount({
            email: email,
            user_name: userName,
            password,
            verified: true,
            role: "user",
          })
          .then((response) => {
            setLogging(true);
            if (response) {
              toast.success("Cuenta creada exitosamente");
              setLoginMode(true);
              return;
            }
            return;
          })
          .catch((error) => {
            if (error.response.status === 400) {
              toast.error("Nombre de usuario o correo ya existente");
              return;
            } else {
              toast.error("Error en el servidor");
              return;
            }
          })
          .finally(() => {
            setLogging(false);
          });
      }
    } catch (error) {
      console.log(error);
      toast.error("Error en el servidor");
    } finally {
      setLogging(false);
    }
  };

  return (
    <div className="flex flex-1 justify-center items-center py-40 h-screen">
      <Card
        withBorder
        styles={{
          root: {
            padding: 60,
            backgroundColor: "transparent",
            width: 400,
          },
        }}
      >
        <div className="flex flex-col items-center">
          <div className="flex justify-center items-center w-full px-3 pb-2 pt-4 rounded-xl">
            <Image src="./complex2.png" fit="contain" />
          </div>
          <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight text-black dark:text-white mt-5">
            {loginMode ? "Iniciar session" : "Crear cuenta"}
          </h3>
          {loginMode ? (
            <div className="flex flex-row gap-2 mt-2">
              <h2>¿No tienes una cuenta?</h2>
              <Anchor onClick={() => setLoginMode(false)}>Registrate</Anchor>
            </div>
          ) : (
            <div className="flex flex-row gap-2 mt-2">
              <h2>¿Ya tienes una cuenta?</h2>
              <Anchor onClick={() => setLoginMode(true)}>Iniciar sesión</Anchor>
            </div>
          )}
          {loginMode ? (
            <div className="w-full flex flex-col gap-5 mt-10">
              <TextInput
                withAsterisk
                leftSectionPointerEvents="none"
                leftSection={<FaRegUser />}
                label="Nombre de usuario"
                autoFocus
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
                disabled={logging}
                size="md"
              />
              <TextInput
                withAsterisk
                leftSectionPointerEvents="none"
                leftSection={<FaKey />}
                label="Contraseña"
                autoFocus
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                type="password"
                disabled={logging}
                size="md"
              />
            </div>
          ) : (
            <div className="w-full flex flex-col gap-5 mt-10">
              <TextInput
                withAsterisk
                leftSectionPointerEvents="none"
                leftSection={<FaRegUser />}
                label="Correo electrónico"
                autoFocus
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={logging}
                size="md"
              />
              <TextInput
                withAsterisk
                leftSectionPointerEvents="none"
                leftSection={<FaRegUser />}
                label="Nombre de usuario"
                autoFocus
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
                disabled={logging}
                size="md"
              />
              <TextInput
                withAsterisk
                leftSectionPointerEvents="none"
                leftSection={<FaKey />}
                label="Contraseña"
                autoFocus
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                type="password"
                disabled={logging}
                size="md"
              />
            </div>
          )}
          <div className="mt-20 w-full">
            <Button
              onClick={handlerLoggin}
              loading={logging}
              disabled={logging}
              variant="filled"
              radius="xl"
              size="md"
            >
              {loginMode ? "Iniciar sesión" : "Crear cuenta"}
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
};

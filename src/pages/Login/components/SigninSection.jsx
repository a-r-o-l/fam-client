import {
  Anchor,
  Button,
  Card,
  Divider,
  Image,
  TextInput,
  useMantineColorScheme,
} from "@mantine/core";
import { useGoogleLogin } from "@react-oauth/google";
import axios from "axios";
import { FaGoogle, FaKey, FaRegUser } from "react-icons/fa6";
import { useLoginMutation } from "../../../services/hooks/Login/useLoginMutation";
import { useAccountStore } from "../../../store/useAccountStore";
import { toast } from "sonner";
import { useState } from "react";

export const SigninSection = ({ setLogging, logging, setLoginMode }) => {
  const createSession = useLoginMutation();
  const { setCreateSession } = useAccountStore();
  const { colorScheme } = useMantineColorScheme();
  const colorGoogleButton = colorScheme === "dark" ? "white" : "dark";
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const getUserInfo = async (accessToken) => {
    try {
      const response = await axios.get(
        "https://www.googleapis.com/oauth2/v3/userinfo",
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      return response.data || null;
    } catch (error) {
      console.error("Error de Google api:", error);
    }
  };
  const signin = useGoogleLogin({
    onSuccess: async (codeResponse) => {
      const code = await getUserInfo(codeResponse.access_token);
      if (code.email_verified) {
        createSession.mutate(
          { googleId: code.sub },
          {
            onSuccess: async (response) => {
              if (response) {
                const { accessToken, refreshToken } = response;
                setCreateSession(accessToken, refreshToken);
                toast.success(`Bienvenido de vuelta ${code.name}`);
                setLogging(false);
              }
            },
            onError: (error) => {
              setLogging(false);
              if (error.response.status === 404) {
                toast.error("Email invalido");
                return;
              } else {
                toast.error("Error en el servidor");
                return;
              }
            },
          }
        );
      }
    },
    error_callback: () => {
      setLogging(false);
    },
  });

  const handlerLoggin = async () => {
    createSession.mutate(
      {
        user_name: userName,
        password: password,
      },
      {
        onSuccess: async (response) => {
          if (response) {
            const { accessToken, refreshToken } = response;
            setLogging(true);
            await new Promise((resolve) => setTimeout(resolve, 4000));
            setCreateSession(accessToken, refreshToken);
            toast.success(`Bienvenido de vuelta ${userName}`);
          }
        },
        onError: (error) => {
          if (error.response.status === 404) {
            toast.error("Usuario o contraseña invalida");
            return;
          } else {
            toast.error("Error en el servidor");
            return;
          }
        },
      }
    );
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
            Iniciar session
          </h3>

          <div className="flex flex-row gap-2 mt-2">
            <h2>¿No tienes una cuenta?</h2>
            <Anchor onClick={() => setLoginMode(false)}>Registrate</Anchor>
          </div>
          <div className="w-full flex flex-col gap-5 mt-10">
            <div className="flex w-full justify-center items-center">
              <Button
                leftSection={<FaGoogle />}
                onClick={() => {
                  setLogging(true);
                  signin();
                }}
                fullWidth
                variant="outline"
                color={colorGoogleButton}
                radius="xl"
              >
                Iniciar sesion con google
              </Button>
            </div>

            <div>
              <Divider my="xs" label="O" labelPosition="center" />
            </div>

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

          <div className="mt-20 w-full flex justify-center">
            <Button
              onClick={handlerLoggin}
              loading={logging || createSession.isPending}
              disabled={logging}
              variant="filled"
              radius="xl"
              size="md"
              fullWidth
            >
              Iniciar sesión
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
};

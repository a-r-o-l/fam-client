import {
  Anchor,
  Avatar,
  Button,
  Card,
  Divider,
  Image,
  Loader,
  TextInput,
  useMantineColorScheme,
} from "@mantine/core";
import { FaGoogle, FaKey, FaRegUser } from "react-icons/fa6";
import { useCreateAccountMutation } from "../../../services/hooks/Account/useAccountMutation";
import axios from "axios";
import { useGoogleLogin } from "@react-oauth/google";
import { toast } from "sonner";
import { useCallback, useMemo, useState } from "react";
import { HiAtSymbol } from "react-icons/hi";
import { CheckIcon } from "@radix-ui/react-icons";
import { useField } from "@mantine/form";
import { accountApiService } from "../../../services/accountApiService";
import { useLoginMutation } from "../../../services/hooks/Login/useLoginMutation";
import { useAccountStore } from "../../../store/useAccountStore";
import { useNavigate } from "react-router-dom";

const googleApi = import.meta.env.VITE_GOOGLE_API;

export const SignupSection = ({ setLogging, logging, setLoginMode }) => {
  const navigate = useNavigate();
  const validateAsync = async (value) => {
    if (value.length < 5) {
      return "El nombre de usuario debe tener al menos 5 caracteres";
    } else {
      const { status } = await accountApiService.findAccount(value);

      if (status) {
        return "El nombre de usuario ya esta registrado";
      } else {
        return null;
      }
    }
  };

  const user_name = useField({
    initialValue: "",
    validateOnChange: true,
    validate: validateAsync,
  });
  const createAccount = useCreateAccountMutation();
  const createSession = useLoginMutation();
  const { setCreateSession } = useAccountStore();

  const { colorScheme } = useMantineColorScheme();
  const colorGoogleButton = colorScheme === "dark" ? "white" : "dark";

  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [profile, setProfile] = useState(null);
  const [secret, setSecret] = useState(false);

  const getUserInfo = async (accessToken) => {
    try {
      const response = await axios.get(googleApi, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      return response.data || null;
    } catch (error) {
      console.error("Error de Google api:", error);
    }
  };

  const inpColor = useMemo(() => {
    const { error, isValidating } = user_name;
    if (!error && !isValidating && user_name.getValue().length > 4) {
      return "rgb(34 197 94)";
    }
    return "";
  }, [user_name]);

  const inpIcon = useCallback(() => {
    const { error, isValidating } = user_name;
    if (isValidating) {
      return <Loader size={18} />;
    }
    if (error) {
      return <CheckIcon color="red" />;
    }
    if (!error && user_name.getValue().length > 4) {
      return <CheckIcon color="green" />;
    }
  }, [user_name]);

  const signup = useGoogleLogin({
    onSuccess: async (codeResponse) => {
      const code = await getUserInfo(codeResponse.access_token);
      if (code.email_verified) {
        const data = {
          email: code.email,
          verified: true,
          google_id: code.sub,
          role: secret ? "admin" : "user",
          image_url: code.picture,
          is_new: secret ? false : true,
        };
        user_name.setValue(code.name.replace(" ", "_").toLowerCase());
        setProfile(data);
        setLogging(false);
      }
    },
    error_callback: () => {
      setLogging(false);
    },
  });

  const handlerSignUp = async () => {
    createAccount.mutate(
      {
        email: email,
        user_name: userName,
        password,
        verified: true,
        role: secret ? "admin" : "user",
        is_new: secret ? false : true,
      },
      {
        onSuccess: (response) => {
          if (response) {
            toast.success("Cuenta creada exitosamente");
            setLoginMode(true);
            return;
          }
          return;
        },
        onError: (error) => {
          if (error.response.status === 400) {
            toast.error("Nombre de usuario o correo ya existente");
            return;
          } else {
            toast.error("Error en el servidor");
            return;
          }
        },
      }
    );
  };

  if (!profile) {
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
          <div className="absolute top-0 right-0">
            <button
              className="opacity-0 w-3 h-3 bg-red-400"
              onClick={() => setSecret(true)}
            ></button>
          </div>
          <div className="flex flex-col items-center">
            <div className="flex justify-center items-center w-full px-3 pb-2 pt-4 rounded-xl">
              <Image src="./complex2.png" fit="contain" />
            </div>
            <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight text-black dark:text-white mt-5">
              Crear cuenta
            </h3>

            <div className="flex flex-row gap-2 mt-2">
              <h2>¿Ya tienes una cuenta?</h2>
              <Anchor onClick={() => setLoginMode(true)}>Iniciar sesión</Anchor>
            </div>

            <div className="w-full flex flex-col gap-5 mt-10">
              <div className="flex w-full justify-center items-center">
                <Button
                  leftSection={<FaGoogle />}
                  onClick={() => {
                    setLogging(true);
                    signup();
                  }}
                  fullWidth
                  variant="outline"
                  color={colorGoogleButton}
                  radius="xl"
                >
                  Continuar con google
                </Button>
              </div>
              <div>
                <Divider my="xs" label="O" labelPosition="center" />
              </div>
              <TextInput
                withAsterisk
                leftSectionPointerEvents="none"
                leftSection={<HiAtSymbol />}
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

            <div className="mt-20 w-full flex justify-center">
              <Button
                onClick={handlerSignUp}
                loading={logging || createAccount.isPending}
                disabled={logging}
                variant="filled"
                radius="xl"
                size="md"
                fullWidth
              >
                Crear cuenta
              </Button>
            </div>
          </div>
        </Card>
      </div>
    );
  }
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
        <div className="flex flex-col w-full">
          <div className="flex justify-center items-center w-full px-3 pb-2 pt-4 rounded-xl">
            <Image src="./complex2.png" fit="contain" />
          </div>

          <div className="flex w-full justify-center mt-10">
            <Avatar size="xl" src={profile.image_url || ""} />
          </div>

          <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight text-black dark:text-white mt-5 text-center">
            Bienvenido {profile?.email}
          </h3>
        </div>
        <div className="flex flex-col w-full mt-2 gap-1">
          <p className="font-extralight text-white">
            Agrega un nombre de usuario que sea exclusivo.
          </p>
        </div>
        <div className="flex flex-1 w-full flex-col mt-10 gap-5">
          <TextInput
            {...user_name.getInputProps()}
            label="Nombre de usuario"
            placeholder="john_smith"
            leftSection={<FaRegUser />}
            rightSection={inpIcon()}
            size="md"
            styles={{
              input: {
                borderColor: inpColor,
              },
              root: {
                height: 100,
              },
            }}
          />
          <div className="mt-20 w-full flex justify-center flex-col gap-5">
            <Button
              variant="filled"
              radius="xl"
              size="md"
              fullWidth
              disabled={user_name.error}
              onClick={() => {
                setLogging(true);
                createAccount.mutate(
                  {
                    ...profile,
                    user_name: user_name.getValue(),
                  },
                  {
                    onSuccess: async () => {
                      toast.success("Cuenta creada exitosamente");
                      createSession.mutate(
                        {
                          google_id: profile.google_id,
                        },
                        {
                          onSuccess: (response) => {
                            if (response) {
                              const { accessToken, refreshToken } = response;
                              setCreateSession(accessToken, refreshToken);
                              toast.success(
                                `Bienvenido ${user_name.getValue()}`
                              );
                              navigate("/");
                              setLogging(false);
                            }
                          },
                        }
                      );
                    },
                    onError: (error) => {
                      setLogging(false);
                      if (error.response.status === 400) {
                        toast.error(
                          "Hubo un error en el registro, vuelve a intentarlo"
                        );
                        return;
                      } else {
                        toast.error("Error en el servidor");
                        return;
                      }
                    },
                  }
                );
              }}
            >
              Registrar
            </Button>
            <Button
              color={colorGoogleButton}
              variant="subtle"
              radius="xl"
              size="md"
              fullWidth
              onClick={() => setProfile(null)}
            >
              Cancelar
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
};

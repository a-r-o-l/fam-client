import {
  ActionIcon,
  AppShell,
  Burger,
  Group,
  Text,
  useMantineColorScheme,
  Image,
  Card,
  TextInput,
  Button,
} from "@mantine/core";
import { useCallback, useEffect, useState } from "react";
import { Router } from "../routes/Router";
import { createStyles } from "@mantine/styles";
import { MoonIcon, SunIcon } from "@radix-ui/react-icons";
import views from "../routes/views";
import { NavLink } from "react-router-dom";
import { MdLogout, MdPeopleOutline } from "react-icons/md";
import { LiaBuilding } from "react-icons/lia";
import { PiMoneyLight } from "react-icons/pi";
import { IoAnalytics } from "react-icons/io5";
import { GiSettingsKnobs } from "react-icons/gi";
import Typography from "@mui/material/Typography";
import { textFormat } from "../utils/textFormat";
import { motion } from "framer-motion";
import { useAccountStore } from "../store/useAccountStore";
import { FaKey } from "react-icons/fa";
import { toast } from "sonner";

export const AppTemplate = () => {
  const { colorScheme, setColorScheme } = useMantineColorScheme();

  const [opened, setOpened] = useState(false);
  const [logging, setLogging] = useState(false);
  const [title, setTitle] = useState("");
  const [password, setPassword] = useState("");
  const isLogged = useAccountStore((state) => state.isLogged);
  const psw = useAccountStore((state) => state.password);

  const toggleColorScheme = (value) => {
    const newValue = value || (colorScheme === "dark" ? "light" : "dark");
    setColorScheme(newValue);
  };

  const handlerLoggin = async () => {
    if (!password || psw !== password) {
      toast.error("Password incorrecto");
      return;
    } else {
      setLogging(true);
      try {
        await new Promise((resolve) => setTimeout(resolve, 4000));
        if (psw === password) {
          useAccountStore.setState({ isLogged: true });
          return;
        } else {
          toast.error("Hubo un error, vuelve a intentarlo");
        }
      } catch (error) {
        console.log(error);
      } finally {
        setLogging(false);
      }
    }
  };

  const useStyles = createStyles((theme) => ({
    navLink: {
      display: "block",
      width: "100%",
      padding: theme.spacing.md,
      borderRadius: theme.radius.sm,
      color: colorScheme === "dark" ? "white" : "black",
      textDecoration: "none",

      "&:hover": {
        backgroundColor:
          colorScheme === "dark" ? theme.colors.dark[2] : theme.colors.gray[1],
      },
    },
    navLinkActive: {
      backgroundColor:
        colorScheme === "dark" ? theme.colors.gray[2] : theme.colors.dark[9],
      color: colorScheme === "dark" ? "black" : "white",
    },
  }));

  const { classes } = useStyles();

  const renderTitle = useCallback(() => {
    return (
      <motion.div
        animate={{ opacity: 1, x: 0 }}
        initial={{ opacity: 0, x: -50 }}
        transition={{ duration: 0.3 }}
        key={title}
      >
        <Typography variant="h4" fontWeight={900} className="text-white">
          {textFormat([title], "uppercase")}
        </Typography>
      </motion.div>
    );
  }, [title]);

  useEffect(() => {
    if (colorScheme === "dark") {
      document.querySelector("body").classList.add("dark");
    } else {
      document.querySelector("body").classList.remove("dark");
    }
  }, [colorScheme]);

  useEffect(() => {
    setPassword("");
  }, [isLogged]);

  return (
    <AppShell
      header={{ height: 150 }}
      layout="default"
      navbar={{
        width: 300,
        zIndex: 1,

        breakpoint: "sm",
        collapsed: { mobile: !opened },
      }}
      padding="xl"
    >
      <AppShell.Header>
        <Group h="100%" px="xl" align="center" justify="center" bg="famblue.6">
          <Burger
            opened={opened}
            onClick={() => setOpened(!opened)}
            hiddenFrom="sm"
            size="sm"
          />
          <div className="flex flex-1 flex-row justify-between items-center">
            <div className="min-w-72">
              <div className="w-20 h-20 rounded-full overflow-hidden flex justify-center items-center dark:border-white border-fam_blue-8 border-4 ">
                <Image src="./fam-logo4.jpg" fit="cover" h={80} w={100} />
              </div>
            </div>
            <div className="flex justify-start w-full">{renderTitle()}</div>
            <div style={{ marginLeft: "auto" }} className="flex gap-10">
              <ActionIcon
                variant="default"
                onClick={() => {
                  toggleColorScheme();
                }}
                size={40}
                radius="xl"
              >
                {colorScheme === "dark" ? (
                  <SunIcon width={20} height={20} />
                ) : (
                  <MoonIcon width={20} height={20} />
                )}
              </ActionIcon>
              <ActionIcon
                variant="default"
                disabled={!isLogged}
                onClick={() => {
                  useAccountStore.setState({ isLogged: false });
                }}
                size={40}
                radius="xl"
              >
                <MdLogout />
              </ActionIcon>
            </div>
          </div>
        </Group>
      </AppShell.Header>
      {isLogged && (
        <AppShell.Navbar p="md">
          {views?.map((view, index) => {
            if (!view.name) {
              return null;
            }
            return (
              <NavLink
                align="left"
                to={view.path}
                key={index}
                onClick={() => {
                  setOpened(false);
                }}
                className={({ isActive }) => {
                  if (isActive) {
                    setTitle(view.name);
                  }
                  return (
                    classes.navLink +
                    " " +
                    (isActive ? classes.navLinkActive : "")
                  );
                }}
              >
                <Group>
                  {view.name === "Pagos" && <PiMoneyLight fontSize={25} />}
                  {view.name === "Complejos" && <LiaBuilding fontSize={25} />}
                  {view.name === "Inquilinos" && (
                    <MdPeopleOutline fontSize={25} />
                  )}
                  {view.name === "Analiticas" && <IoAnalytics fontSize={25} />}
                  {view.name === "Opciones" && (
                    <GiSettingsKnobs fontSize={25} />
                  )}
                  <Text size="xl">{view.name}</Text>
                </Group>
              </NavLink>
            );
          })}
        </AppShell.Navbar>
      )}
      <AppShell.Main>
        {isLogged ? (
          <Router />
        ) : (
          <div className="flex flex-1 justify-center items-center py-40">
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
              <div className="flex flex-col items-center gap-10">
                <div className="w-20 h-20 rounded-full overflow-hidden flex justify-center items-center dark:border-fam_blue-8 border-fam_blue-8 border-4">
                  <Image src="./fam-logo4.jpg" fit="cover" h={80} w={100} />
                </div>
                <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight text-black dark:text-white">
                  Iniciar session
                </h3>
                <div className="w-full">
                  <TextInput
                    withAsterisk
                    leftSectionPointerEvents="none"
                    leftSection={<FaKey />}
                    label="Password"
                    autoFocus
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    type="password"
                    disabled={logging}
                    size="md"
                  />
                </div>
                <div className="mt-20 w-full">
                  <Button
                    onClick={handlerLoggin}
                    loading={logging}
                    disabled={logging}
                    variant="filled"
                    radius="xl"
                    size="md"
                    fullWidth
                  >
                    Ingresar
                  </Button>
                </div>
              </div>
            </Card>
          </div>
        )}
      </AppShell.Main>
    </AppShell>
  );
};

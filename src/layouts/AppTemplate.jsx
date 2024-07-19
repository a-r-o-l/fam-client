import {
  AppShell,
  Burger,
  Group,
  Text,
  useMantineColorScheme,
  Image,
  BackgroundImage,
} from "@mantine/core";
import { useEffect, useState } from "react";
import { createStyles } from "@mantine/styles";
import views from "../routes/views";
import { NavLink } from "react-router-dom";
import { UserMenu } from "../components/UserMenu/UserMenu";
import UserModal from "../components/UserModal/UserModal";
import { MercadoPagoButton } from "../components/Buttons/MPButton";
export const AppTemplate = ({ children }) => {
  const { colorScheme, setColorScheme } = useMantineColorScheme();

  const [opened, setOpened] = useState(false);
  const [openUserModal, setOpenUserModal] = useState(false);

  const toggleColorScheme = (value) => {
    const newValue = value || (colorScheme === "dark" ? "light" : "dark");
    setColorScheme(newValue);
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

  useEffect(() => {
    if (colorScheme === "dark") {
      document.querySelector("body").classList.add("dark");
    } else {
      document.querySelector("body").classList.remove("dark");
    }
  }, [colorScheme]);

  return (
    <AppShell
      header={{ height: 150 }}
      layout="default"
      navbar={{
        width: 300,
        zIndex: 1,
        breakpoint: "sm",
        collapsed: { desktop: opened },
      }}
      padding="xl"
    >
      <AppShell.Header>
        <BackgroundImage
          src="./stars_background.png"
          className="flex flex-1 h-full"
        >
          <div className="flex justify-start absolute left-2 top-2">
            <Burger onClick={() => setOpened(!opened)} />
          </div>
          <div className="flex flex-1 justify-between items-center h-full px-10">
            <div className="flex justify-center items-center w-1/6 px-3 pb-2 pt-4 rounded-xl">
              <Image src="./complex2.png" fit="contain" />
            </div>
            <div className="flex justify-start w-full ml-40">
              <MercadoPagoButton />
            </div>
            <div>
              <UserMenu
                onChangeTheme={() => {
                  toggleColorScheme();
                }}
                onOpenUserModal={() => setOpenUserModal(true)}
                theme={colorScheme}
              />
            </div>
          </div>
        </BackgroundImage>
      </AppShell.Header>

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
              color="blue"
              onClick={() => {
                setOpened(false);
              }}
              className={({ isActive }) => {
                return (
                  classes.navLink +
                  " " +
                  (isActive ? classes.navLinkActive : "")
                );
              }}
            >
              <Group>
                {view.icon && <view.icon fontSize={25} />}

                <Text size="xl">{view.name}</Text>
              </Group>
            </NavLink>
          );
        })}
      </AppShell.Navbar>

      <AppShell.Main>{children}</AppShell.Main>
      <UserModal
        open={openUserModal}
        onCloseModal={() => setOpenUserModal(false)}
      />
    </AppShell>
  );
};

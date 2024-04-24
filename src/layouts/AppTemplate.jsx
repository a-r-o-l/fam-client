import {
  ActionIcon,
  AppShell,
  Burger,
  Group,
  Text,
  useMantineColorScheme,
  Image,
  Avatar,
  Title,
  Box,
} from "@mantine/core";
import React, { useCallback, useEffect, useState } from "react";
import { Router } from "../routes/Router";
import { createStyles, useMantineTheme } from "@mantine/styles";
import { MoonIcon, SunIcon } from "@radix-ui/react-icons";
import views from "../routes/views";
import { NavLink } from "react-router-dom";
import { MdPeopleOutline } from "react-icons/md";
import { LiaBuilding } from "react-icons/lia";
import { PiMoneyLight } from "react-icons/pi";
import { IoAnalytics } from "react-icons/io5";
import { GiSettingsKnobs } from "react-icons/gi";
import { HeaderTitle } from "../components/Header/HeaderTitle";
import Typography from "@mui/material/Typography";
import { textFormat } from "../utils/textFormat";
import { motion } from "framer-motion";

export const AppTemplate = () => {
  const { colorScheme, setColorScheme } = useMantineColorScheme();

  const [opened, setOpened] = useState(false);
  const [title, setTitle] = useState("");

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

  const { colors } = useMantineTheme();

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
            <div style={{ marginLeft: "auto" }}>
              <ActionIcon
                variant="default"
                onClick={() => toggleColorScheme()}
                size={40}
                radius="xl"
              >
                {colorScheme === "dark" ? (
                  <SunIcon width={20} height={20} />
                ) : (
                  <MoonIcon width={20} height={20} />
                )}
              </ActionIcon>
            </div>
          </div>
        </Group>
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
                {view.name === "Opciones" && <GiSettingsKnobs fontSize={25} />}
                <Text size="xl">{view.name}</Text>
              </Group>
            </NavLink>
          );
        })}
      </AppShell.Navbar>
      <AppShell.Main>
        <Router />
      </AppShell.Main>
    </AppShell>
  );
};

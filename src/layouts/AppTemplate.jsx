import { AppShell, Burger, useMantineColorScheme, Image } from "@mantine/core";
import { useEffect, useMemo, useState } from "react";
import { createStyles } from "@mantine/styles";
import navigationConfig from "../routes/navigationConfig";
import { Outlet, useNavigate, useSearchParams } from "react-router-dom";
import { UserMenu } from "../components/UserMenu/UserMenu";
import UserModal from "../components/UserModal/UserModal";
import { useAccountStore } from "../store/useAccountStore";
import SubscriptionModal from "../components/SubscriptionModal/SubscriptionModal";
import WelcomeModal from "../components/WelcomeModal/WelcomeModal";
import SuccessModal from "../components/SuccessModal/SuccessModal";
import CustomNavLink from "../components/CustomNavLink/CustomNavLink";
export const AppTemplate = () => {
  const { colorScheme, setColorScheme } = useMantineColorScheme();
  const { account, accessToken, setCreateSession } = useAccountStore();
  const navigate = useNavigate();
  const [opened, setOpened] = useState(false);
  const [openUserModal, setOpenUserModal] = useState(false);
  const [welcomeModal, setWelcomeModal] = useState(false);
  const [subscriptionModal, setSubscriptionModal] = useState(false);
  const [successModal, setSuccessModal] = useState(false);
  const [searchParams] = useSearchParams();

  const toggleColorScheme = (value) => {
    const newValue = value || (colorScheme === "dark" ? "light" : "dark");
    setColorScheme(newValue);
  };

  const status = useMemo(() => {
    if (searchParams.get("status")) {
      return searchParams.get("status");
    }
  }, [searchParams]);

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

  useEffect(() => {
    if (!account) {
      const accessToken = localStorage.getItem("access-token");
      const refreshToken = localStorage.getItem("refresh-token");
      if (accessToken) {
        setCreateSession(accessToken, refreshToken);
      } else {
        navigate("/login");
      }
    } else {
      if (status && status === "approved" && account.role !== "admin") {
        setSuccessModal(true);
      } else {
        if (account.is_new && account.role !== "admin") {
          setWelcomeModal(true);
        } else if (
          account.status !== "active" &&
          account.status !== "free" &&
          account.role !== "admin"
        ) {
          setSubscriptionModal(true);
        }
      }
    }
  }, [account, accessToken, setCreateSession, navigate, status]);

  if (!account) {
    return <></>;
  }

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
        <div
          className="relative flex flex-1 bg-no-repeat bg-contain bg-left h-full bg-black"
          // style={{ backgroundImage: "url('./cityBlack.png')" }}
        >
          <div className="flex justify-start absolute left-2 top-2">
            <Burger onClick={() => setOpened(!opened)} />
          </div>
          <div className="flex flex-1 justify-between items-center h-full px-10">
            <div className="flex justify-center items-center px-3 pb-2 pt-4 rounded-xl">
              <Image
                src="/logo.png"
                fit="contain"
                width={300}
                height={300}
                w={160}
              />
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
        </div>
      </AppShell.Header>

      <AppShell.Navbar p="md">
        {navigationConfig?.map((view, index) => {
          if (!view.name) {
            return null;
          }
          return (
            <CustomNavLink
              key={index}
              view={view}
              classes={classes}
              onClick={() => setOpened(false)}
            />
          );
        })}
      </AppShell.Navbar>

      <AppShell.Main>
        <Outlet />
      </AppShell.Main>
      <UserModal
        open={openUserModal}
        onCloseModal={() => setOpenUserModal(false)}
      />
      <SubscriptionModal open={subscriptionModal} />
      <WelcomeModal open={welcomeModal} />
      <SuccessModal open={successModal} status={status} />
    </AppShell>
  );
};

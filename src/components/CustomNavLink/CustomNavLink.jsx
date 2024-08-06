import { useNavigate } from "react-router-dom";
import { NavLink, useMantineColorScheme } from "@mantine/core";
import { createStyles } from "@mantine/styles";

function CustomNavLink({ view, onClick }) {
  const { colorScheme } = useMantineColorScheme();
  const navigate = useNavigate();
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

  if (view?.children?.length) {
    return (
      <NavLink
        label={view.name}
        leftSection={<view.icon fontSize={25} />}
        // childrenOffset={40}
        variant="light"
        description="mis propiedades"
        styles={{
          label: {
            fontSize: 20,
            fontWeight: 400,
          },
          section: { height: 60 },
          root: { borderRadius: 8 },
        }}
      >
        {view.children.map((child, index) => {
          return (
            <NavLink
              key={index}
              onClick={() => navigate(child.path)}
              label={child.name}
              variant="light"
              active={child.path === window.location.pathname}
              leftSection={<child.icon fontSize={2} />}
              styles={{
                label: {
                  fontSize: 16,
                  fontWeight: 400,
                },
                section: {
                  height: 60,
                },

                root: { borderRadius: 8 },
              }}
            />
          );
        })}
      </NavLink>
    );
  } else {
    return (
      <NavLink
        label={view.name}
        leftSection={<view.icon fontSize={25} />}
        childrenOffset={40}
        variant="light"
        active={view.path === window.location.pathname}
        onClick={() => navigate(view.path)}
        styles={{
          label: {
            fontSize: 20,
            fontWeight: 400,
          },
          section: { height: 60 },
          root: { borderRadius: 8 },
        }}
      />
    );
  }
}

export default CustomNavLink;

import { Menu, Switch } from "@mantine/core";
import { Avatar } from "@mui/material";
import { useState } from "react";
import { MdLogout, MdOutlineMessage } from "react-icons/md";
import { MoonIcon, SunIcon } from "@radix-ui/react-icons";
import { useAccountStore } from "../../store/useAccountStore";
import { CustomDialog } from "../Dialog/CustomDialog";
import { FaRegUser } from "react-icons/fa6";
import { IoSettingsOutline } from "react-icons/io5";
export const UserMenu = ({ onChangeTheme, theme, onOpenUserModal }) => {
  const { setCloseSession, account } = useAccountStore();
  const [openAlert, setOpenAlert] = useState(false);

  return (
    <Menu shadow="xl" width={250} position="bottom-end">
      <Menu.Target>
        <Avatar src={account?.image_url} sx={{ width: 65, height: 65 }} />
      </Menu.Target>

      <Menu.Dropdown p={10}>
        <Menu.Label
          styles={{
            label: {
              color: theme === "dark" ? "white" : "black",
              fontWeight: 900,
              fontSize: 16,
              margin: 0,
              padding: 0,
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
            },
          }}
        >
          {account?.user_name || ""}
          <Switch
            size="md"
            onLabel={<SunIcon width={20} height={20} />}
            offLabel={<MoonIcon width={20} height={20} />}
            checked={theme !== "dark"}
            onChange={onChangeTheme}
            color="dark"
          />
        </Menu.Label>
        <Menu.Label
          styles={{
            label: {
              margin: 0,
              padding: 0,
            },
          }}
        >
          {account?.email || ""}
        </Menu.Label>
        <Menu.Divider />

        <Menu.Item onClick={onOpenUserModal} rightSection={<FaRegUser />}>
          Mi cuenta
        </Menu.Item>
        <Menu.Item onClick={() => {}} rightSection={<MdOutlineMessage />}>
          Mensajes
        </Menu.Item>
        <Menu.Item
          onClick={() => {}}
          rightSection={<IoSettingsOutline size={16} />}
        >
          Configuraciones
        </Menu.Item>
        <Menu.Divider />
        <Menu.Item
          rightSection={<MdLogout size={16} />}
          color="red"
          onClick={() => {
            setOpenAlert(true);
          }}
        >
          Cerrar sesion
        </Menu.Item>
      </Menu.Dropdown>
      <CustomDialog
        open={openAlert}
        onClose={() => setOpenAlert(false)}
        text="¿Estas seguro que deseas cerrar sesion?"
        onConfirm={() => setCloseSession()}
      />
    </Menu>
  );
};

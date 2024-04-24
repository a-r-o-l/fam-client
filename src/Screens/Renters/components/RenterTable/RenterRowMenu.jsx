import { ActionIcon, Menu, rem } from "@mantine/core";
import React from "react";
import { FaPencilAlt } from "react-icons/fa";
import { FaEllipsisVertical, FaTrashCan } from "react-icons/fa6";
import { TbFileReport } from "react-icons/tb";

export const RenterRowMenu = ({ onHistoryClick, onEdit, onDelete }) => {
  return (
    <Menu>
      <Menu.Target>
        <ActionIcon variant="subtle" color="gray">
          <FaEllipsisVertical />
        </ActionIcon>
      </Menu.Target>
      <Menu.Dropdown>
        <Menu.Item
          leftSection={
            <FaPencilAlt style={{ width: rem(14), height: rem(14) }} />
          }
          onClick={onEdit}
        >
          Editar perfil
        </Menu.Item>
        <Menu.Item
          leftSection={
            <TbFileReport style={{ width: rem(14), height: rem(14) }} />
          }
          onClick={onHistoryClick}
        >
          Historial
        </Menu.Item>

        <Menu.Item
          color="red"
          leftSection={
            <FaTrashCan style={{ width: rem(14), height: rem(14) }} />
          }
          onClick={onDelete}
        >
          Eliminar
        </Menu.Item>
      </Menu.Dropdown>
    </Menu>
  );
};

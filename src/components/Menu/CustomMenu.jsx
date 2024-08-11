import { ActionIcon, Divider, Menu } from "@mantine/core";
import { EllipsisVertical } from "lucide-react";

function CustomMenu({ title, options, redZone, icon = null }) {
  return (
    <Menu shadow="xl" width={250} position="bottom-start">
      <Menu.Target>
        <ActionIcon radius="xl" variant="light">
          {icon ? icon : <EllipsisVertical size={16} />}
        </ActionIcon>
      </Menu.Target>

      <Menu.Dropdown p={10}>
        {title && (
          <Menu.Label
            styles={{
              label: {},
            }}
          >
            {title}
          </Menu.Label>
        )}
        <Divider my={10} />

        {options.map((option, index) => {
          if (option.divider) {
            return (
              <>
                <Divider my={10} />
                <Menu.Item
                  key={index}
                  onClick={option.onClick}
                  rightSection={option.icon}
                  color={option.color}
                >
                  {option.label}
                </Menu.Item>
              </>
            );
          }
          return (
            <Menu.Item
              key={index}
              onClick={option.onClick}
              rightSection={option.icon}
              color={option.color}
            >
              {option.label}
            </Menu.Item>
          );
        })}
      </Menu.Dropdown>
    </Menu>
  );
}

export default CustomMenu;

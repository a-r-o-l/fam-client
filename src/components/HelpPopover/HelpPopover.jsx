import { ActionIcon, Popover, Text } from "@mantine/core";
import { useState } from "react";

function HelpPopover({ title = "", icon, description = "" }) {
  const [opened, setOpened] = useState();

  const ClosePopup = () => {
    setOpened(false);
  };

  const openPopup = () => {
    setOpened(true);
  };

  return (
    <Popover
      width={200}
      position="bottom"
      withArrow
      shadow="md"
      opened={opened}
    >
      <Popover.Target>
        <ActionIcon
          variant="transparent"
          color="gray"
          onMouseEnter={openPopup}
          onMouseLeave={ClosePopup}
        >
          {icon}
        </ActionIcon>
      </Popover.Target>
      <Popover.Dropdown style={{ pointerEvents: "none" }}>
        <Text size="sm">{title}</Text>
        <Text size="sm">{description}</Text>
      </Popover.Dropdown>
    </Popover>
  );
}

export default HelpPopover;

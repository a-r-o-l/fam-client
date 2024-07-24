import { ActionIcon } from "@mantine/core";
import { ChevronLeft } from "lucide-react";

function BackButton({ action, children }) {
  return (
    <div className="flex w-full justify-between items-center">
      <ActionIcon
        size="xl"
        variant="subtle"
        onClick={action}
        color="white"
        radius="xl"
      >
        <ChevronLeft />
      </ActionIcon>
      {children}
    </div>
  );
}

export default BackButton;

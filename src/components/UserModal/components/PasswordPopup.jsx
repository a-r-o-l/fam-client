import { Button, Popover } from "@mantine/core";
import { RiLockPasswordLine } from "react-icons/ri";

const PasswordPopup = ({
  open,
  setOpen,
  onClose,
  buttonTitle = "",
  children,
}) => {
  return (
    <Popover
      position="top"
      opened={open}
      onClose={onClose}
      closeOnEscape={false}
      closeOnClickOutside={true}
      keepMounted={false}
      clickOutsideEvents={["mouseup", "touchend"]}
      width={400}
      styles={{
        dropdown: {
          padding: "20px",
        },
      }}
    >
      <Popover.Target>
        <Button
          rightSection={<RiLockPasswordLine />}
          variant="subtle"
          color="dark"
          size="sm"
          radius="xl"
          onClick={setOpen}
        >
          {buttonTitle}
        </Button>
      </Popover.Target>
      <Popover.Dropdown className="flex flex-1 flex-row gap-5">
        {children}
      </Popover.Dropdown>
    </Popover>
  );
};

export default PasswordPopup;

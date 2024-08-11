import { ActionIcon } from "@mantine/core";
import { FaArrowLeftLong } from "react-icons/fa6";

export const BackButton = ({ backTo, ...rest }) => {
  return (
    <ActionIcon
      {...rest}
      variant="filled"
      onClick={backTo}
      size={40}
      radius="xl"
      pos="absolute"
    >
      <FaArrowLeftLong />
    </ActionIcon>
  );
};

import { ActionIcon } from "@mantine/core";
import React from "react";
import { FaArrowLeftLong } from "react-icons/fa6";

export const BackButton = ({ backTo, ...rest }) => {
  console.log(backTo);
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

import { ActionIcon } from "@mantine/core";
import { Avatar } from "@mui/material";
import React, { useRef } from "react";
import { FaCamera } from "react-icons/fa6";
import { LuLoader2 } from "react-icons/lu";

export const ImagePicker = ({ uploading, imgSrc, onImgChanged, avw, avh }) => {
  const fileInputRef = useRef(null);
  return (
    <div className="relative self-start">
      <Avatar
        className="w-20 h-20  font-bold border-4 border-white"
        sx={{ width: avw, height: avh }}
        src={imgSrc}
      />
      <ActionIcon
        radius="xl"
        pos="absolute"
        size="lg"
        color="dark"
        top={60}
        right={5}
        onClick={() => {
          fileInputRef.current?.click?.();
        }}
      >
        {uploading ? <LuLoader2 className="animate-spin" /> : <FaCamera />}
      </ActionIcon>
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        style={{ display: "none" }}
        onChange={onImgChanged}
      />
    </div>
  );
};

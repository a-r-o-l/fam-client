import { Input } from "@mantine/core";
import React from "react";

export const MInput = ({ label, errorMessage, error, value, ...rest }) => {
  return (
    <Input.Wrapper>
      <Input.Label>{label}</Input.Label>
      <Input error={error} value={value} {...rest} />
      <Input.Error>{errorMessage}</Input.Error>
    </Input.Wrapper>
  );
};

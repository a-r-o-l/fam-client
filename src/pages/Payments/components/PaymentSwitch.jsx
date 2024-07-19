import { Switch, rem, useMantineTheme } from "@mantine/core";
import { FaCircleCheck, FaCircleXmark } from "react-icons/fa6";
export const PaymentSwitch = ({ onChange, checked }) => {
  const theme = useMantineTheme();

  return (
    <Switch
      size="lg"
      onLabel="SALDADO"
      offLabel="PENDIENTE"
      color="teal"
      checked={checked}
      cursor="pointer"
      radius="xl"
      styles={{
        root: {
          cursor: "pointer",
        },
        track: {
          backgroundColor: !checked ? "red" : "",
          color: "white",
          cursor: "pointer",
          padding: "2px",
          boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.2)",
          minWidth: "120px",
        },
        input: {
          cursor: "pointer",
          boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.2)",
        },
        trackLabel: {
          padding: "10px",
          fontSize: "12px",
        },
      }}
      onChange={(e) => {
        onChange(e);
      }}
      onClick={(e) => {
        e.stopPropagation();
      }}
      thumbIcon={
        checked ? (
          <FaCircleCheck
            style={{ width: rem(20), height: rem(20) }}
            color={theme.colors.teal[6]}
          />
        ) : (
          <FaCircleXmark
            style={{ width: rem(20), height: rem(20) }}
            color={theme.colors.red[6]}
          />
        )
      }
    />
  );
};

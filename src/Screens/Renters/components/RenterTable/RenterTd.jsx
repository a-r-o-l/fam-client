import { Table, Tooltip, Text } from "@mantine/core";

export const RenterTd = ({
  value = "",
  textSize = "sm",
  color = "",
  fw,
  render = true,
}) => {
  if (!render) return null;
  return (
    <Table.Td align="justify">
      <div className="w-3/4 truncate">
        <Tooltip label={value} position="top-start" color="blue">
          <Text
            truncate
            size={textSize}
            className="text-black dark:text-white"
            c={color}
            fw={fw}
          >
            {value}
            {/* <p>{value}</p> */}
          </Text>
        </Tooltip>
      </div>
    </Table.Td>
  );
};

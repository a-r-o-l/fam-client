import { useMemo } from "react";
import { Avatar, Indicator, Table, Text } from "@mantine/core";
import { textFormat } from "../../../../utils/textFormat";
import dayjs from "dayjs";
import { CustomProgress } from "../../../../components/Progress/CustomProgress";
import { RenterRowMenu } from "./RenterRowMenu";

export const RenterRowItem = ({ item, onHistoryClick, onEdit, onDelete }) => {
  const contract = useMemo(() => {
    if (item?.Contracts?.length) {
      const contract = item?.Contracts.find(
        (con) => con.id === item.activeContractId
      );
      return contract;
    } else {
      return null;
    }
  }, [item]);

  const isRenting = useMemo(() => {
    return !!item?.activeContractId;
  }, [item]);

  return (
    <Table.Tr key={item.id}>
      <Table.Td>
        <Indicator
          inline
          size={14}
          offset={7}
          position="bottom-end"
          color={isRenting ? "green" : "red"}
          withBorder
        >
          <Avatar src={item.image_url} size="lg" />
        </Indicator>
      </Table.Td>
      <Table.Td>{item.name}</Table.Td>
      <Table.Td>{item.lastname}</Table.Td>
      <Table.Td>{item.dni}</Table.Td>
      <Table.Td>{item.phone}</Table.Td>
      <Table.Td>{item.email}</Table.Td>
      <Table.Td>
        <Text fw={900} c={isRenting ? "green" : "dark.2"}>
          {textFormat([contract?.Apartment?.Building?.name || ""], "uppercase")}
        </Text>
      </Table.Td>
      <Table.Td>
        <Text fw={900} c={isRenting ? "green" : "dark.2"}>
          {contract?.Apartment?.number || ""}
        </Text>
      </Table.Td>
      <Table.Td>{contract ? `$ ${contract?.value}` : ""}</Table.Td>
      <Table.Td>
        {contract ? dayjs(contract?.start_date).format("DD-MM-YY") : ""}
      </Table.Td>
      <Table.Td>{contract?.months_amount || ""}</Table.Td>
      <Table.Td>
        <CustomProgress item={contract} />
      </Table.Td>
      <Table.Td align="center">
        <RenterRowMenu
          onEdit={() => onEdit(item?.id)}
          onDelete={() => onDelete(item?.id)}
          onHistoryClick={onHistoryClick}
        />
      </Table.Td>
    </Table.Tr>
  );
};

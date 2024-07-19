import { ActionIcon, Badge, NumberFormatter, Table } from "@mantine/core";
import dayjs from "dayjs";
import { useCallback } from "react";
import { FaRegTrashAlt } from "react-icons/fa";

export const ContractsRow = ({ contract, onDeleteContract }) => {
  const contractState = useCallback(() => {
    const today = dayjs();
    if (contract.is_cancelled) {
      return (
        <Badge size="md" miw={80} color="red.8">
          Cancelado
        </Badge>
      );
    } else {
      if (dayjs(contract.end_date).isBefore(today)) {
        return (
          <Badge size="md" miw={80} color="red.8">
            Vencido
          </Badge>
        );
      } else {
        return (
          <Badge size="md" miw={80} color="green.8">
            Vigente
          </Badge>
        );
      }
    }
  }, [contract]);

  return (
    <Table.Tr
      key={contract?.id}
      onClick={() => {
        console.log("contract", contract);
      }}
    >
      <Table.Td>{contract?.Apartment?.Building?.name}</Table.Td>
      <Table.Td>{contract?.Apartment?.number}</Table.Td>
      <Table.Td
        style={{
          whiteSpace: "nowrap",
          overflow: "hidden",
          textOverflow: "ellipsis",
        }}
      >
        <NumberFormatter
          prefix="$ "
          value={contract?.value}
          thousandSeparator
        />
      </Table.Td>
      <Table.Td>{dayjs(contract.start_date).format("DD/MM/YY")}</Table.Td>
      <Table.Td>{dayjs(contract.end_date).format("DD/MM/YY")}</Table.Td>
      <Table.Td>{contractState()}</Table.Td>
      <Table.Td>
        <ActionIcon
          variant="filled"
          radius="xl"
          size="lg"
          onClick={(e) => {
            e.stopPropagation();
            onDeleteContract(contract.id);
          }}
          bg="dark"
        >
          <FaRegTrashAlt size={14} />
        </ActionIcon>
      </Table.Td>
    </Table.Tr>
  );
};

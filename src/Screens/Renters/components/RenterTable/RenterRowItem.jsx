import { useMemo } from "react";
import { Avatar, Indicator, NumberFormatter, Table } from "@mantine/core";
import { textFormat } from "../../../../utils/textFormat";
import dayjs from "dayjs";
import { RenterRowMenu } from "./RenterRowMenu";
import { RenterTd } from "./RenterTd";
import { ContractBar } from "../../../../components/Progress/ContractBar";
import { UpgradeBar } from "../../../../components/Progress/UpgradeBar";

export const RenterRowItem = ({
  item,
  onHistoryClick,
  onEdit,
  onDelete,
  completeInfo,
}) => {
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
    <Table.Tr key={item.id} onClick={() => console.log(item)}>
      <Table.Td align="left">
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
      <RenterTd value={item.name} render={completeInfo} />
      <RenterTd value={item.lastname} render={completeInfo} />
      <RenterTd value={item.dni} render={completeInfo} />
      <RenterTd value={item.phone} render={completeInfo} />
      <RenterTd value={item.email} render={completeInfo} />
      <RenterTd
        value={textFormat(
          [contract?.Apartment?.Building?.name || ""],
          "uppercase"
        )}
        color={isRenting ? "green" : "dark.2"}
        fw={900}
      />
      <RenterTd
        value={contract?.Apartment?.number || ""}
        color={isRenting ? "green" : "dark.2"}
        fw={900}
      />

      {/* <RenterTd value={contract ? `$ ${contract?.value}` : ""} color="green" /> */}
      <Table.Td align="left">
        <NumberFormatter
          prefix="$ "
          value={contract?.value}
          thousandSeparator
          className="text-fam_blue-4 font-bold"
        />
      </Table.Td>

      <RenterTd
        value={contract ? dayjs(contract?.start_date).format("DD-MM-YY") : ""}
      />
      <RenterTd value={contract?.months_amount || ""} />

      <Table.Td>
        <UpgradeBar item={contract} />
      </Table.Td>
      <Table.Td>
        <ContractBar item={contract} />
      </Table.Td>
      <Table.Td align="center">
        <RenterRowMenu
          historyDisabled={!isRenting}
          onEdit={() => onEdit(item?.id)}
          onDelete={() => onDelete(item?.id)}
          onHistoryClick={() => onHistoryClick(item?.id)}
        />
      </Table.Td>
    </Table.Tr>
  );
};

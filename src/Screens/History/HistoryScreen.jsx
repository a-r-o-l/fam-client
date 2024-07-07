import { useNavigate, useParams } from "react-router-dom";
import { useGetRenterQuery } from "../../services/hooks/Renter/useRenterQuery";
import {
  Avatar,
  Checkbox,
  NumberFormatter,
  Table,
  Text,
  useMantineColorScheme,
} from "@mantine/core";
import { BackButton } from "../../components/Buttons/BackButton";
import { useMemo } from "react";
import { FaBed, FaBuilding, FaUserLarge } from "react-icons/fa6";
import { useGetPaymentQuery } from "../../services/hooks/Payment/usePaymentQuery";
import dayjs from "dayjs";
import { getMonthName } from "../../utils/getMonthName";

export const HistoryScreen = () => {
  const params = useParams();
  const navigate = useNavigate();
  const { colorScheme } = useMantineColorScheme();

  const { data: renter } = useGetRenterQuery(
    { id: params.id },
    { enabled: !!params.id }
  );

  const { data: payments } = useGetPaymentQuery({ renterId: params.id });

  console.log(payments);

  const renterFeatures = useMemo(() => {
    if (renter?.Contracts?.length) {
      const contractId = renter?.activeContractId;
      const contract = renter?.Contracts.find((con) => con.id === contractId);
      return {
        contract: contract,
        apartment: contract?.Apartment,
        building: contract?.Apartment?.Building,
      };
    } else {
      return null;
    }
  }, [renter]);

  return (
    <div className="flex flex-col gap-5">
      <div className="flex flex-1 flex-col overflow-hidden relative">
        <BackButton backTo={() => navigate("/renters")} />
        <div className="flex flex-row justify-start items-center mt-20 mb-10 gap-5">
          <Avatar src={renter?.image_url} size="xl" />
          <div className="flex flex-col gap-2">
            <div className="flex flex-row items-center">
              <FaUserLarge />
              <Text fw={900} size="xl" pl={20}>
                {renter?.name} {renter?.lastname}
              </Text>
            </div>
            <div className="flex flex-row items-center justify-start">
              <FaBuilding />
              <Text fw={600} size="md" pl={20}>
                {renterFeatures?.building?.name}
              </Text>
            </div>
            <div className="flex flex-row items-center">
              <FaBed />
              <Text fw={600} size="md" pl={20}>
                {renterFeatures?.apartment?.number}
              </Text>
            </div>
          </div>
        </div>
        <Table.ScrollContainer minWidth={900} type="native" h={650}>
          <Table
            stickyHeader
            striped="even"
            verticalSpacing={20}
            highlightOnHover
          >
            <Table.Thead bg={colorScheme === "dark" ? "dark.9" : "gray.2"}>
              <Table.Tr>
                <Table.Th
                  className="text-black dark:text-white"
                  align="justify"
                >
                  Indice
                </Table.Th>
                <Table.Th
                  className="text-black dark:text-white"
                  align="justify"
                >
                  Mes
                </Table.Th>
                <Table.Th
                  className="text-black dark:text-white"
                  align="justify"
                >
                  Estado
                </Table.Th>

                <Table.Th
                  className="text-black dark:text-white"
                  align="justify"
                >
                  Importe
                </Table.Th>
              </Table.Tr>
            </Table.Thead>
            <Table.Tbody>
              {payments?.length ? (
                payments.map((payment) => (
                  <Table.Tr key={payment.id}>
                    <Table.Td align="justify">
                      <p>{payment.payment_number}</p>
                    </Table.Td>
                    <Table.Td align="justify">
                      <p>{getMonthName(dayjs(payment.date).format("MM"))}</p>
                    </Table.Td>
                    <Table.Td align="justify">
                      <NumberFormatter
                        prefix="$ "
                        value={payment.value}
                        thousandSeparator
                      />
                    </Table.Td>
                    <Table.Td align="justify">
                      <Checkbox
                        label={payment?.payed ? "Pagado" : "Pendiente"}
                        checked={payment?.payed || false}
                        indeterminate={!payment?.payed}
                        color={payment?.payed ? "green" : "red"}
                      />
                    </Table.Td>
                  </Table.Tr>
                ))
              ) : (
                <></>
              )}
            </Table.Tbody>
          </Table>
        </Table.ScrollContainer>
      </div>
    </div>
  );
};

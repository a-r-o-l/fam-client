import { NumberFormatter, Table } from "@mantine/core";
import { getMonthName } from "../../../utils/getMonthName";
import dayjs from "dayjs";
import { FaCheck } from "react-icons/fa6";

export const HistoryPrintComponent = ({ payments, renter, renterFeatures }) => {
  return (
    <div className="flex flex-col flex-1 justify-center items-center p-3">
      <div className="flex w-full flex-col justify-start items-start py-5">
        <div className="flex gap-2 items-center">
          <p>Inquilino:</p>
          <h1 className="font-black text-sm">
            {(renter?.name || "").toUpperCase()}{" "}
            {(renter?.lastname || "").toUpperCase()}
          </h1>
        </div>
        <div className="flex gap-2 items-center">
          <p>Complejo:</p>
          <h1 className="font-black text-sm">
            {renterFeatures?.building.name}
          </h1>
        </div>
        <div className="flex gap-2 items-center">
          <p>Departamento:</p>
          <h1 className="font-black text-sm">
            {renterFeatures?.apartment.number}
          </h1>
        </div>
        <div className="flex gap-2 items-center">
          <p>Inicio:</p>
          <h1 className="font-black text-sm">
            {renterFeatures?.contract.start_date}
          </h1>
        </div>
      </div>
      <Table>
        <Table.Thead>
          <Table.Tr>
            <Table.Th className="text-black" align="justify">
              Numero de pago
            </Table.Th>
            <Table.Th className="text-black" align="justify">
              Periodo
            </Table.Th>
            <Table.Th className="text-black" align="justify">
              Fecha
            </Table.Th>
            <Table.Th className="text-black" align="justify">
              Importe
            </Table.Th>

            <Table.Th className="text-black" align="justify">
              Estado
            </Table.Th>
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>
          {payments?.length ? (
            payments.map((payment) => (
              <Table.Tr key={payment?.id}>
                <Table.Td align="justify">
                  <p>{payment?.payment_number}</p>
                </Table.Td>
                <Table.Td align="justify">
                  <p>{getMonthName(dayjs(payment?.date).format("MM"))}</p>
                </Table.Td>
                <Table.Td align="justify">
                  <p>{payment?.date}</p>
                </Table.Td>
                <Table.Td align="justify">
                  <NumberFormatter
                    prefix="$ "
                    value={payment?.value}
                    thousandSeparator
                  />
                </Table.Td>
                <Table.Td align="justify">
                  {payment?.payed ? <FaCheck size={16} /> : "-"}
                </Table.Td>
              </Table.Tr>
            ))
          ) : (
            <></>
          )}
        </Table.Tbody>
      </Table>
    </div>
  );
};

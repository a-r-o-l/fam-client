import { ActionIcon, Badge, NumberFormatter, Table } from "@mantine/core";
import dayjs from "dayjs";
import { useDeleteContractMutation } from "../../../../services/hooks/Contract/useContractMutation";
import { FaRegTrashAlt } from "react-icons/fa";
import { toast } from "sonner";
import { CustomDialog } from "../../../../components/Dialog/CustomDialog";
import { useState } from "react";

const headerTitles = [
  "Complejo",
  "Depto",
  "Importe",
  "Fecha inicial",
  "Fecha final",
  "Estado",
  "Eliminar",
];

export const ContractsTable = ({ contracts }) => {
  const [openAlert, setOpenAlert] = useState(false);
  const [selectedContractId, setSelectedContractId] = useState(null);
  const deleteContract = useDeleteContractMutation();
  const today = dayjs();

  return (
    <Table.ScrollContainer type="native" h={250} px={10} mt={20}>
      <Table highlightOnHover striped>
        <Table.Thead>
          <Table.Tr>
            {headerTitles.map((title, index) => (
              <Table.Th key={index}>{title}</Table.Th>
            ))}
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>
          {contracts?.length ? (
            contracts?.map((contract) => (
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
                <Table.Td>
                  {dayjs(contract.start_date).format("DD/MM/YY")}
                </Table.Td>
                <Table.Td>
                  {dayjs(contract.end_date).format("DD/MM/YY")}
                </Table.Td>
                <Table.Td>
                  {dayjs(contract.end_date).isBefore(today) ? (
                    <Badge size="md" miw={80} color="red.8">
                      Vencido
                    </Badge>
                  ) : (
                    <Badge size="md" miw={80} color="green.8">
                      Vigente
                    </Badge>
                  )}
                </Table.Td>
                <Table.Td>
                  <ActionIcon
                    variant="filled"
                    radius="xl"
                    size="lg"
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedContractId(contract.id);
                      setOpenAlert(true);
                    }}
                    bg="dark"
                  >
                    <FaRegTrashAlt size={14} />
                  </ActionIcon>
                </Table.Td>
              </Table.Tr>
            ))
          ) : (
            <Table.Td colSpan={5} className="col-span-5 text-center h-20">
              No hay contratos
            </Table.Td>
          )}
        </Table.Tbody>
      </Table>
      <CustomDialog
        handleClose={(e) => {
          e.stopPropagation();
          setOpenAlert(false);
        }}
        open={openAlert}
        onClose={() => setOpenAlert(false)}
        onConfirm={() =>
          deleteContract.mutate(
            { id: selectedContractId },
            {
              onSuccess: () => {
                toast.success("Contrato eliminado correctamente");
              },
              onError: () => {
                toast.error("Ocurrio un error al eliminar el contrato");
              },
            }
          )
        }
        text="Estas seguro de Eliminar un contrato?"
        acceptTitle="Aceptar"
        loading={deleteContract.isPending}
      />
    </Table.ScrollContainer>
  );
};

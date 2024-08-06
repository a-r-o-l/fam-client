import { Table } from "@mantine/core";
import { useDeleteContractMutation } from "../../../../services/hooks/Contract/useContractMutation";
import { toast } from "sonner";
import { CustomDialog } from "../../../../components/Dialog/CustomDialog";
import { useState } from "react";
import { ContractsRow } from "./ContractsRow";

const headerTitles = [
  "Complejo",
  "Depto",
  "Importe",
  "Fecha inicial",
  "Fecha final",
  "Estado",
  "Acciones",
];

export const ContractsTable = ({ contracts }) => {
  const [openAlert, setOpenAlert] = useState(false);
  const [selectedContractId, setSelectedContractId] = useState(null);
  const deleteContract = useDeleteContractMutation();

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
              <ContractsRow
                key={contract.id}
                contract={contract}
                onDeleteContract={(id) => {
                  console.log(id);
                  setSelectedContractId(id);
                  setOpenAlert(true);
                }}
              />
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
                setOpenAlert(false);
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

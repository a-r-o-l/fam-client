import { useNavigate, useParams } from "react-router-dom";
import { useGetRenterQuery } from "../../services/hooks/Renter/useRenterQuery";
import { Card, Text } from "@mantine/core";
import { BackButton } from "../../components/Buttons/BackButton";
import { RenterForm } from "../Renters/components/RenterForm/RenterForm";
import { ContractForm } from "./components/Contracts/ContractForm";
import { ContractsTable } from "./components/Contracts/ContractsTable";

export const RenterScreen = () => {
  const params = useParams();
  const navigate = useNavigate();

  const { data: renter } = useGetRenterQuery(
    { id: params.id },
    { enabled: !!params.id }
  );

  return (
    <div className="flex flex-row gap-5">
      <div className="flex w-2/5 flex-col overflow-hidden relative">
        <BackButton backTo={() => navigate("/renters")} />
        <Card h="100%" className="flex justify-start mt-20" withBorder>
          <Text fw={900} size="xl" pl={20} pt={20}>
            Inquilino
          </Text>
          <RenterForm renter={renter} />
        </Card>
      </div>
      <div className="flex flex-1 flex-col overflow-hidden">
        <Card h="100%" className="flex justify-start mt-20" withBorder>
          <Text fw={900} size="xl" pl={20} pt={20}>
            Contratos
          </Text>
          <ContractsTable contracts={renter?.Contracts} />
          <ContractForm
            renter={renter}
            disabled={!!renter?.active_contract_id}
          />
        </Card>
      </div>
    </div>
  );
};

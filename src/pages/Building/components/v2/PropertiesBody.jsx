import { Table, Text } from "@mantine/core";
import PropertyTr from "./PropertyTr";

function PropertiesBody({ property }) {
  if (property) {
    return <PropertyTr property={property} />;
  } else {
    return (
      <Table.Tr>
        <Table.Td colSpan={5} height={200}>
          <Text align="center">El complejo no tiene viviendas creadas aún</Text>
        </Table.Td>
      </Table.Tr>
    );
  }
}

export default PropertiesBody;

import { Table, Text } from "@mantine/core";
import ApartmentTr from "./ApartmentTr";

function ApartmentBody({ building, onEdit }) {
  if (building) {
    return <ApartmentTr building={building} onEdit={onEdit} />;
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

export default ApartmentBody;

import { Badge } from "@mantine/core";

function StateBadge({ rentedCondition, soldCondition }) {
  if (rentedCondition) {
    return (
      <Badge color="blue" variant="light" w={100}>
        Alquilado
      </Badge>
    );
  }
  if (soldCondition) {
    return (
      <Badge color="dark" variant="light" w={100}>
        Vendido
      </Badge>
    );
  }
  return (
    <Badge color="green" variant="light" w={100}>
      Disponible
    </Badge>
  );
}

export default StateBadge;

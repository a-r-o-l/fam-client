import { Badge, Table } from "@mantine/core";
import dayjs from "dayjs";

function PropertyTr({ property }) {
  const renderBadge = (apts) => {
    if (apts.rented) {
      return (
        <Badge color="blue" variant="light" w={100}>
          Alquilado
        </Badge>
      );
    }
    if (apts.it_was_sold) {
      return (
        <Badge color="red" variant="light" w={100}>
          Vendido
        </Badge>
      );
    }
    return (
      <Badge color="green" variant="light" w={100}>
        Disponible
      </Badge>
    );
  };

  const renderRenter = (apt) => {
    if (apt?.rented) {
      const renter = apt?.Contracts[0]?.Renter;
      return (
        <Table.Td className="">
          {/* <Avatar src={renter.image_url} /> */}
          <p>{`${renter.name} ${renter.lastname}`}</p>
        </Table.Td>
      );
    }
    return <Table.Td>{""}</Table.Td>;
  };

  const renderInitContract = (apt) => {
    if (apt?.rented) {
      const contract = apt?.Contracts[0];
      return (
        <Table.Td>
          <p>{`${dayjs(contract.start_date).format("DD/MM/YY")}`}</p>
        </Table.Td>
      );
    }
    return <Table.Td>{""}</Table.Td>;
  };

  if (property?.type === "building") {
    if (property?.Apartments?.length) {
      const orderApts = property?.Apartments?.sort(
        (a, b) => a.number - b.number
      );
      return orderApts.map((apts) => (
        <Table.Tr key={apts.id} onClick={() => console.log(apts)}>
          <Table.Td width={200}>
            <div className="w-8 h-8 rounded-lg flex justify-center items-center border">
              {apts?.number}
            </div>
          </Table.Td>
          <Table.Td align="left">{renderBadge(apts)}</Table.Td>
          {renderInitContract(apts)}
          {renderRenter(apts)}
          <Table.Td>{/* <ApartmentMenu apartment={apts} /> */}</Table.Td>
        </Table.Tr>
      ));
    } else {
      return <div>no apartments yet</div>;
    }
  }
  return <div>asdasd</div>;
}

export default PropertyTr;

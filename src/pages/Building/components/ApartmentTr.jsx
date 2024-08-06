import { Badge, Table } from "@mantine/core";
import dayjs from "dayjs";
import ApartamentMenu from "./ApartmentMenu";
import { useGetApartmentsQuery } from "../../../services/hooks/Apartment/useApartmentQuery";

function ApartmentTr({ building, onEdit }) {
  const { data } = useGetApartmentsQuery(
    { buildingId: building?.id },
    { enabled: !!building?.id }
  );

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

  if (data?.length) {
    const orderApts = data.sort((a, b) => a.number - b.number);
    return orderApts.map((apt) => (
      <Table.Tr key={apt.id}>
        {building?.apartments_with_floor && (
          <Table.Td width={200}>{apt.floor || ""}</Table.Td>
        )}
        <Table.Td width={200}>
          {/* <div className="w-8 h-8 rounded-full flex justify-center items-center text-neutral-400 font-black bg-neutral-700"> */}
          {apt?.floor ? apt.number.toUpperCase() : apt.number}
          {/* </div> */}
        </Table.Td>
        <Table.Td align="left">{renderBadge(apt)}</Table.Td>
        {renderInitContract(apt)}
        {renderRenter(apt)}
        <Table.Td>
          <ApartamentMenu apt={apt} building={building} onEdit={onEdit} />
        </Table.Td>
      </Table.Tr>
    ));
  } else {
    return <div>no apartments yet</div>;
  }
}

export default ApartmentTr;

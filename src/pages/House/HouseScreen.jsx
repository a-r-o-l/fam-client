import { ActionIcon, Title, Table, useMantineColorScheme } from "@mantine/core";
import { House, Plus } from "lucide-react";
import { useState } from "react";
import HouseModal from "./components/HouseModal";
import { useGetHousesQuery } from "../../services/hooks/House/useHouseQuery";
import HouseTr from "./components/HouseTr";

const headerItems = [
  { id: 1, label: "Imagen", align: "left" },
  { id: 2, label: "Nombre", align: "left" },
  { id: 3, label: "Direccion", align: "left" },
  { id: 4, label: "Estado", align: "left" },
  { id: 5, label: "Inquilino", align: "left" },
  { id: 6, label: "Monto", align: "left" },
  { id: 7, label: "Inicio", align: "left" },
  { id: 8, label: "Contrato", align: "left" },
  { id: 9, label: "Actualizacion", align: "center" },
  { id: 10, label: "Expira", align: "center" },
  { id: 11, label: "Acciones", align: "center" },
];

function HouseScreen() {
  const { colorScheme } = useMantineColorScheme();
  const [selectedHouse, setSelectedHouse] = useState(null);
  const [houseModal, setHouseModal] = useState(false);
  const [houseToEdit, setHouseToEdit] = useState(null);
  const { data: houses, isLoading } = useGetHousesQuery();

  return (
    <div className="flex flex-1 flex-row overflow-hidden mt-20">
      <div className="flex flex-col px-10">
        <div className="flex w-full items-center justify-between px-3 py-3 rounded-lg mb-5 text-neutral-300">
          <div className="flex flex-row items-center gap-4">
            <House size={20} />
            <Title order={3}>Mis Casas</Title>
          </div>
          <ActionIcon
            size="lg"
            radius="xl"
            color="blue"
            variant="light"
            onClick={() => setHouseModal(true)}
          >
            <Plus size={16} />
          </ActionIcon>
        </div>
        {/* <ScrollArea h={400} className="flex w-full">
          {houses?.length ? (
            houses?.map((house) => (
              <NavLink
                key={house.id}
                label={house?.name?.toUpperCase() ?? ""}
                description={house.address}
                p={10}
                rightSection={<HouseMenu house={house} />}
                leftSection={
                  <Avatar
                    sx={{ width: 57, height: 57 }}
                    src={house.image_url || "./placeholder-building.png"}
                  />
                }
                variant="light"
                color="blue"
                onClick={(e) => {
                  e.preventDefault();
                  setSelectedHouse(house);
                }}
                active={selectedHouse?.id === house.id}
                styles={{
                  label: { fontSize: 20 },
                  description: { fontSize: 15 },
                  root: {
                    borderRadius: 20,
                  },
                }}
              />
            ))
          ) : (
            <div className="flex justify-center items-center h-80">
              <Text align="center">
                No tienes casas
                <br />
                creadas aún.
              </Text>
            </div>
          )}
        </ScrollArea> */}
        <Table.ScrollContainer minWidth={900} type="native" h={650}>
          <Table
            layout="fixed"
            stickyHeader
            striped="even"
            verticalSpacing="sm"
            horizontalSpacing="sm"
            highlightOnHover
            align="left"
            withTableBorder
          >
            <Table.Thead bg={colorScheme === "dark" ? "dark.9" : "gray.2"}>
              <Table.Tr>
                {headerItems.map((item) => {
                  return (
                    <Table.Th
                      key={item.id}
                      className="text-black dark:text-white"
                      style={{ textAlign: item.align }}
                    >
                      {item.label}
                    </Table.Th>
                  );
                })}
              </Table.Tr>
            </Table.Thead>
            <Table.Tbody>
              {houses ? (
                houses.map((house) => <HouseTr key={house.id} house={house} />)
              ) : (
                <></>
              )}
            </Table.Tbody>
          </Table>
        </Table.ScrollContainer>
      </div>
      <HouseModal
        house={selectedHouse}
        open={houseModal}
        onCloseModal={() => {
          setHouseModal(false);
          setHouseToEdit(null);
        }}
      />
    </div>
  );
}

export default HouseScreen;

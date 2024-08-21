import { useEffect, useState } from "react";
import { useGetBuildingsQuery } from "../../../../services/hooks/Building/useBuildingQuery";
import BuildingModal from "../BuildingModal";
import ApartmentModal from "../ApartmentModal";
import {
  Avatar,
  Button,
  NavLink,
  ScrollArea,
  Table,
  Title,
  Text,
} from "@mantine/core";
import ApartmentBody from "../ApartmentBody";
import BuildingMenu from "../BuildingMenu";

function BuildingsSection({ isDark }) {
  const [selectedBuilding, setSelectedBuilding] = useState(null);
  const [BuildingToEdit, setBuildingToEdit] = useState(null);
  const [buildingModal, setBuildingModal] = useState(false);
  const [ApartmentToEdit, setApartmentToEdit] = useState(null);
  const [apartmentModal, setApartmentModal] = useState(false);
  const { data: buildings } = useGetBuildingsQuery();
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        setSelectedBuilding(null);
        setApartmentModal(false);
        setBuildingModal(false);
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  const onEditBuilding = (building) => {
    setBuildingToEdit(building);
    setBuildingModal(true);
  };

  const onEditApartment = (apt) => {
    setApartmentToEdit(apt);
    setApartmentModal(true);
  };

  return (
    <div className="flex flex-1 flex-row overflow-hidden mt-10">
      <div className="flex flex-col w-1/4">
        <div className="flex w-full items-center justify-between px-3 py-3 rounded-lg mb-5 text-neutral-300">
          <div className="flex flex-row items-center gap-4">
            {/* <Building size={20} /> */}
            <Title order={3}>Edificios</Title>
          </div>
          <Button
            radius="xl"
            variant="light"
            onClick={() => setBuildingModal(true)}
          >
            Crear edificio
          </Button>
        </div>
        <ScrollArea h={400} className="flex w-full">
          {buildings?.length ? (
            buildings?.map((building) => (
              <NavLink
                key={building.id}
                label={building?.name?.toUpperCase() ?? ""}
                description={building.address}
                p={10}
                rightSection={
                  <BuildingMenu building={building} onEdit={onEditBuilding} />
                }
                leftSection={
                  <Avatar
                    sx={{ width: 57, height: 57 }}
                    src={building.image_url || "./placeholder-building.png"}
                  />
                }
                variant="light"
                color="blue"
                onClick={(e) => {
                  e.preventDefault();
                  setSelectedBuilding(building);
                }}
                active={selectedBuilding?.id === building.id}
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
                No tienes complejo
                <br />
                creados aún.
              </Text>
            </div>
          )}
        </ScrollArea>
      </div>
      <div className="flex flex-1 flex-col px-10">
        <div className="flex w-full items-center justify-center gap-20 px-5 py-3 rounded-lg mb-5 text-neutral-300">
          <div className="flex flex-1 justify-end items-center gap-5">
            {/* <LucideDoorOpen size={20} /> */}
            <Title order={3}>Departamentos</Title>
          </div>
          <div className="flex flex-1 justify-end">
            <Button
              radius="xl"
              variant="light"
              onClick={() => setApartmentModal(true)}
            >
              Crear departamento
            </Button>
          </div>
        </div>
        <Table.ScrollContainer type="native" h={500} px={10}>
          <Table
            verticalSpacing="sm"
            stickyHeader
            // layout="fixed"
            horizontalSpacing="sm"
            highlightOnHover
            // align="left"
            withTableBorder
          >
            <Table.Thead
              bg={isDark ? "dark.9" : "gray.2"}
              style={{ position: "sticky", top: -1 }}
              h={60}
            >
              <Table.Tr>
                {selectedBuilding?.apartments_with_floor && (
                  <Table.Th>
                    <p>Piso</p>
                  </Table.Th>
                )}
                <Table.Th>
                  <p>Depto</p>
                </Table.Th>
                <Table.Th>
                  <p>Estado</p>
                </Table.Th>
                <Table.Th>
                  <p>Fin del contrato</p>
                </Table.Th>
                <Table.Th>
                  <p>Inquilino</p>
                </Table.Th>
                <Table.Th>Acciones</Table.Th>
              </Table.Tr>
            </Table.Thead>
            <Table.Tbody>
              {selectedBuilding ? (
                <ApartmentBody
                  building={selectedBuilding}
                  onEdit={onEditApartment}
                />
              ) : (
                <Table.Tr>
                  <Table.Td colSpan={5} height={200}>
                    <Text align="center">Selecciona un edificio</Text>
                  </Table.Td>
                </Table.Tr>
              )}
            </Table.Tbody>
          </Table>
        </Table.ScrollContainer>
      </div>
      <BuildingModal
        open={buildingModal}
        onCloseModal={() => {
          setBuildingModal(false);
          setBuildingToEdit(null);
        }}
        building={BuildingToEdit}
      />
      <ApartmentModal
        open={apartmentModal}
        onCloseModal={() => {
          setApartmentModal(false);
          setApartmentToEdit(null);
        }}
        building={selectedBuilding}
        apt={ApartmentToEdit}
      />
    </div>
  );
}

export default BuildingsSection;

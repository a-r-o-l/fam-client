import { useEffect, useMemo, useState } from "react";
import {
  ActionIcon,
  Divider,
  NavLink,
  ScrollArea,
  Table,
  Text,
  Title,
  useMantineColorScheme,
} from "@mantine/core";
import { useGetBuildingsQuery } from "../../services/hooks/Building/useBuildingQuery";
import { Building, Plus } from "lucide-react";
import BuildingModal from "./components/BuildingModal";
import ApartmentBody from "./components/ApartmentBody";
import BuildingMenu from "./components/BuildingMenu";
import ApartmentModal from "./components/ApartmentModal";
import { Avatar } from "@mui/material";

export const BuildingScreen = () => {
  const [selectedBuilding, setSelectedBuilding] = useState(null);
  const [BuildingToEdit, setBuildingToEdit] = useState(null);
  const [buildingModal, setBuildingModal] = useState(false);
  const [ApartmentToEdit, setApartmentToEdit] = useState(null);
  const [apartmentModal, setApartmentModal] = useState(false);

  const { data: buildings } = useGetBuildingsQuery();
  const { colorScheme } = useMantineColorScheme();

  const isDark = useMemo(() => {
    return colorScheme === "dark";
  }, [colorScheme]);

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
    <div className="flex flex-1 flex-row overflow-hidden mt-20">
      <div className="flex flex-col px-10 w-1/3">
        <div className="flex w-full items-center justify-between px-3 py-3 rounded-lg mb-5 text-neutral-300">
          <div className="flex flex-row items-center gap-4">
            <Building size={20} />
            <Title order={3}>Mis edificios</Title>
          </div>
          <ActionIcon
            size="lg"
            radius="xl"
            color="blue"
            variant="light"
            onClick={() => setBuildingModal(true)}
          >
            <Plus size={16} />
          </ActionIcon>
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
      <Divider size="sm" color="gray" orientation="vertical" />
      <div className="flex flex-1 flex-col px-10">
        <div className="flex w-full items-center justify-center gap-20 px-5 py-3 rounded-lg mb-5 text-neutral-300">
          <Title order={3}>Departamentos</Title>
          <ActionIcon
            radius="xl"
            color="blue"
            variant="light"
            size="lg"
            disabled={!selectedBuilding}
            onClick={() => setApartmentModal(true)}
          >
            <Plus size={16} />
          </ActionIcon>
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
            <Table.Thead bg={colorScheme === "dark" ? "dark.9" : "gray.2"}>
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
                // <PropertiesBody property={selectedProperty} />
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
};

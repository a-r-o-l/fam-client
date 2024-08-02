import { useEffect, useMemo, useState } from "react";
import {
  ActionIcon,
  Divider,
  NavLink,
  ScrollArea,
  Table,
  Text,
  useMantineColorScheme,
} from "@mantine/core";
import { useGetBuildingsQuery } from "../../services/hooks/Building/useBuildingQuery";
import { Building, DoorClosed, Hotel, House, Plus, Store } from "lucide-react";
import PropertiesBody from "./components/v2/PropertiesBody";
import BuildingModal from "./components/v2/BuildingModal";
import BuildingMenu from "./components/v2/BuildingMenu";

export const BuildingScreen = () => {
  const [selectedProperty, setSelectedBuilding] = useState(null);
  const [BuildingToEdit, setBuildingToEdit] = useState(null);
  const [buildingModal, setBuildingModal] = useState(false);

  const { data: properties } = useGetBuildingsQuery();
  const { colorScheme } = useMantineColorScheme();

  const isDark = useMemo(() => {
    return colorScheme === "dark";
  }, [colorScheme]);

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        setSelectedBuilding(null);
      }
    };
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  const buildingIcon = (building) => {
    switch (building?.type) {
      case "building":
        return <Building size={30} />;
      case "house":
        return <House size={30} />;
      case "apartment":
        return <DoorClosed size={30} />;
      case "lounge":
        return <Store size={30} />;
      default:
        return <Hotel size={30} />;
    }
  };

  const onEditBuilding = (building) => {
    setBuildingToEdit(building);
    setBuildingModal(true);
  };

  return (
    <div className="flex flex-1 flex-row overflow-hidden mt-20">
      <div className="flex flex-col px-10">
        <div className="flex w-full items-center justify-between px-3 py-3 rounded-lg mb-5 text-neutral-500 gap-20">
          <h1 className="font-bold text-2xl">Mis complejos</h1>
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
        <ScrollArea h={400}>
          {properties?.length ? (
            properties?.map((building) => (
              <NavLink
                w={300}
                key={building.id}
                label={building?.name?.toUpperCase() ?? ""}
                description={building.address}
                rightSection={
                  <BuildingMenu building={building} onEdit={onEditBuilding} />
                }
                leftSection={buildingIcon(building)}
                variant="light"
                color="blue"
                onClick={(e) => {
                  e.preventDefault();
                  console.log(building);
                  setSelectedBuilding(building);
                }}
                active={selectedProperty?.id === building.id}
                styles={{
                  label: { fontSize: 20 },
                  description: { fontSize: 15 },
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
        <div className="flex w-full items-center justify-center gap-20 px-5 py-3 rounded-lg mb-5 text-neutral-500">
          <h1 className="font-bold text-2xl">Viviendas</h1>
          <ActionIcon radius="xl" color="blue" variant="light" size="lg">
            <Plus size={16} />
          </ActionIcon>
        </div>
        <Table.ScrollContainer type="native" h={500} px={10}>
          <Table verticalSpacing="lg" stickyHeader mah={500}>
            <Table.Thead bg={colorScheme === "dark" ? "dark.9" : "gray.2"}>
              <Table.Tr>
                <Table.Th width={200}>
                  <p>Numero</p>
                </Table.Th>
                <Table.Th align="left">
                  <p>Estado</p>
                </Table.Th>
                <Table.Th align="left">
                  <p>Fin del contrato</p>
                </Table.Th>
                <Table.Th>
                  <p>Inquilino</p>
                </Table.Th>
                <Table.Th width={200}>Acciones</Table.Th>
              </Table.Tr>
            </Table.Thead>
            <Table.Tbody>
              {selectedProperty ? (
                <PropertiesBody property={selectedProperty} />
              ) : (
                <Table.Tr>
                  <Table.Td colSpan={5} height={200}>
                    <Text align="center">Selecciona una propiedad</Text>
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
    </div>
  );
};

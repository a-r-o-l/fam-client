import { useEffect, useMemo, useState } from "react";
import {
  ActionIcon,
  Button,
  Divider,
  Image,
  NavLink,
  ScrollArea,
  Table,
  Text,
  useMantineColorScheme,
} from "@mantine/core";
import { useGetBuildingsByTypeQuery } from "../../services/hooks/Building/useBuildingQuery";
import { Building, DoorClosed, Hotel, House, Plus, Store } from "lucide-react";
import PropertiesBody from "../Building/components/v2/PropertiesBody";
import BuildingModal from "../Building/components/v2/BuildingModal";
import BuildingMenu from "../Building/components/v2/BuildingMenu";
import { Calendar } from "@mantine/dates";
import { Indicator } from "@mantine/core";
import dayjs from "dayjs";
import CustomCalendar from "./components/CustomCalendar";

export const LoungeScreen = () => {
  const [selectedProperty, setSelectedBuilding] = useState(null);
  const [BuildingToEdit, setBuildingToEdit] = useState(null);
  const [buildingModal, setBuildingModal] = useState(false);

  const { data: properties } = useGetBuildingsByTypeQuery({ type: "lounge" });
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
      <div className="flex flex-col px-10 w-1/4">
        <div className="flex w-full items-center justify-between px-3 py-3 rounded-lg mb-5 text-neutral-500">
          <div className="flex flex-row items-center gap-4">
            <div className="w-12 h-12 border flex justify-center items-center rounded-full">
              <Store size={25} />
            </div>
            <h1 className="font-bold text-2xl">Salones</h1>
          </div>

          <Button
            radius="xl"
            variant="light"
            size="xs"
            rightSection={<Plus size={16} />}
          >
            Agregar
          </Button>
          {/* <ActionIcon
            size="lg"
            radius="xl"
            color="blue"
            variant="light"
            onClick={() => setBuildingModal(true)}
          >
            <Plus size={16} />
          </ActionIcon> */}
        </div>
        <ScrollArea h={400} className="flex w-full">
          {properties?.length ? (
            properties?.map((building) => (
              <NavLink
                // w={300}
                key={building.id}
                label={building?.name?.toUpperCase() ?? ""}
                description={building.address}
                rightSection={
                  <BuildingMenu building={building} onEdit={onEditBuilding} />
                }
                leftSection={
                  <Image
                    w={80}
                    h={80}
                    radius="sm"
                    src="https://scontent.fcor2-1.fna.fbcdn.net/v/t39.30808-6/301918848_461465549325304_4532544918980893162_n.jpg?_nc_cat=110&ccb=1-7&_nc_sid=cc71e4&_nc_eui2=AeHXvjtWejNpFTq9P3mfQ1B4ZebtzkQJJipl5u3ORAkmKouVFMNEk4toan5perPCSBM&_nc_ohc=BXhAX4ppT3QQ7kNvgEQ-KFl&_nc_ht=scontent.fcor2-1.fna&oh=00_AYAPecIhv7H20O_QXWt7FCyXZUOBr6UfBneSipuUkifNZQ&oe=66B234E7"
                  />
                }
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
          <h1 className="font-bold text-2xl">Eventos</h1>
          <ActionIcon radius="xl" color="blue" variant="light" size="lg">
            <Plus size={16} />
          </ActionIcon>
        </div>
        {/* <Table.ScrollContainer type="native" h={500} px={10}>
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
        </Table.ScrollContainer> */}
        <div className="flex w-full justify-center">
          <CustomCalendar />
        </div>
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

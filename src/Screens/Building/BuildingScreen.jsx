import { useEffect, useMemo, useState } from "react";
import { BuildingForm } from "./components/BuildingForm";
import { Card, Container, Text, useMantineColorScheme } from "@mantine/core";
import { FaBuilding } from "react-icons/fa6";
import { useGetBuildingsQuery } from "../../services/hooks/Building/useBuildingQuery";
import { ApartmentStep } from "./components/ApartmentStep";

export const BuildingScreen = () => {
  const [selectedBuilding, setSelectedBuilding] = useState(null);

  const { data: buildings } = useGetBuildingsQuery();
  const { colorScheme, setColorScheme } = useMantineColorScheme();

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

  return (
    <div
      className="flex flex-1 flex-row overflow-hidden mt-20"
      onClick={() => setSelectedBuilding(null)}
    >
      <BuildingForm building={selectedBuilding} />
      <div className="flex flex-1 justify-start flex-col items-center">
        <Text size="xl" fw={500} mb={20} c="dark.2">
          Complejos
        </Text>
        {buildings?.map((building) => (
          <div key={building.id}>
            <Container size="responsive" maw={300} miw={300} my={10}>
              <Card
                shadow="xl"
                radius="lg"
                p="xl"
                className="hover:cursor-pointer hover:opacity-80 hover:shadow-2xl"
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedBuilding(building);
                }}
                styles={{
                  root: {
                    border:
                      selectedBuilding?.id === building?.id
                        ? "2px solid #64a0ff"
                        : "",
                  },
                }}
              >
                <div className="flex flex-1 flew-row items-center gap-2">
                  <div className="">
                    <FaBuilding
                      width={60}
                      height={60}
                      fontSize={30}
                      color={isDark ? "white" : "black"}
                    />
                  </div>
                  <div className="flex flex-col justify-center">
                    <Text size="lg" fw={900}>
                      {building.name}
                    </Text>
                    <Text size="xs">{building.address}</Text>
                  </div>
                </div>
              </Card>
            </Container>
          </div>
        ))}
      </div>
      <div className="flex flex-1 flex-col">
        <Text size="xl" fw={500} mb={20} c="dark.2">
          Departamentos
        </Text>
        <ApartmentStep selectedBuilding={selectedBuilding} />
      </div>
    </div>
  );
};

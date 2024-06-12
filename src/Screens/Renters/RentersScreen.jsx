import {
  ActionIcon,
  Group,
  Input,
  Space,
  useMantineColorScheme,
  Modal,
  useMantineTheme,
  MultiSelect,
  Checkbox,
  Switch,
} from "@mantine/core";
import { useGetRentersQuery } from "../../services/hooks/Renter/useRenterQuery";
import {
  FaUserLarge,
  FaBuilding,
  FaPlus,
  FaCircleXmark,
} from "react-icons/fa6";
import { useMemo, useState } from "react";
import { useGetBuildingsQuery } from "../../services/hooks/Building/useBuildingQuery";
import { textFormat } from "../../utils/textFormat";
import { RentersTable } from "./components/RenterTable/RentersTable";
import { RenterForm } from "./components/RenterForm/RenterForm";

export const RentersScreen = () => {
  const { colorScheme } = useMantineColorScheme();
  const { colors } = useMantineTheme();

  const switchColor = useMemo(() => {
    return colorScheme === "dark" ? "white" : "black";
  }, [colorScheme]);

  const [searchParam, setSearchParam] = useState("");
  const [selectedBuilding, setSelectedBuilding] = useState([]);
  const [opened, setOpened] = useState(false);
  const [check, setCheck] = useState(true);
  const [completeInfo, setCompleteInfo] = useState(false);

  const { data } = useGetRentersQuery();
  const { data: buildings } = useGetBuildingsQuery();

  const buildingSelectData = useMemo(() => {
    let data = [];
    if (buildings) {
      data = [
        ...data,
        ...buildings.map((building) => {
          return {
            label: textFormat([building?.name], "allcapitalize"),
            value: building.id.toString(),
          };
        }),
      ];
    }

    return data || [];
  }, [buildings]);

  const rentersByContracts = useMemo(() => {
    if (data?.length) {
      if (!check) {
        return data.filter((renter) => !!renter?.activeContractId);
      } else {
        return data;
      }
    } else {
      return [];
    }
  }, [data, check]);

  const rentersByBuilding = useMemo(() => {
    if (selectedBuilding?.length) {
      return rentersByContracts.filter((renter) => {
        const contractId = renter?.activeContractId;
        const contract = renter?.Contracts.find((c) => c.id === contractId);
        const apt = contract?.Apartment;
        return selectedBuilding.includes(apt?.buildingId?.toString());
      });
    }
    return rentersByContracts;
  }, [rentersByContracts, selectedBuilding]);

  const renters = useMemo(() => {
    if (searchParam) {
      return rentersByBuilding.filter((renter) => {
        const fullName = `${renter?.name} ${renter?.lastname}`;
        return fullName.includes(searchParam);
      });
    }
    return rentersByBuilding;
  }, [rentersByBuilding, searchParam]);

  const onCloseModal = () => {
    setOpened(false);
  };

  return (
    <div className="flex flex-1 flex-col overflow-hidden">
      <div className="flex flex-1 items-center justify-between">
        <div className="flex flex-row items-center justify-start gap-10">
          <Group preventGrowOverflow maw={400}>
            <MultiSelect
              data={buildingSelectData}
              value={selectedBuilding}
              onChange={setSelectedBuilding}
              leftSection={<FaBuilding />}
              size="md"
              comboboxProps={{ shadow: "md" }}
              maw={400}
              miw={400}
              styles={{
                input: {
                  backgroundColor:
                    colorScheme === "dark" ? colors.dark[9] : colors.gray[2],
                  color: switchColor,
                },
                pill: {
                  backgroundColor:
                    colorScheme === "dark" ? colors.dark[4] : colors.gray[5],
                  color: switchColor,
                },
              }}
            />
          </Group>
          <Group preventGrowOverflow w={300}>
            <Input
              placeholder="Buscar inquilino"
              leftSection={<FaUserLarge />}
              rightSection={
                searchParam ? (
                  <FaCircleXmark
                    className="cursor-pointer bg-transparent"
                    onClick={(e) => {
                      e.stopPropagation();
                      setSearchParam("");
                    }}
                  />
                ) : null
              }
              rightSectionPointerEvents="painted"
              value={searchParam}
              onChange={({ target }) => setSearchParam(target.value)}
              size="md"
              className="w-64"
              styles={{
                input: {
                  backgroundColor:
                    colorScheme === "dark" ? colors.dark[9] : colors.gray[2],
                  color: switchColor,
                },
              }}
            />
          </Group>
          <Group preventGrowOverflow>
            <Checkbox
              defaultChecked
              label="sin contrato"
              value={check}
              onChange={() => setCheck(!check)}
              className="text-black dark:text-white"
            />
          </Group>
          <Switch
            label="vista completa"
            value={completeInfo}
            onChange={(e) => {
              setCompleteInfo(e.target.checked);
            }}
            className="text-black dark:text-white"
          />
        </div>
        <div className="flex h-20 items-center justify-end pr-10 gap-20">
          <ActionIcon
            variant="filled"
            radius="xl"
            size="xl"
            onClick={() => setOpened(true)}
            bg="famblue.4"
          >
            <FaPlus />
          </ActionIcon>
        </div>
      </div>

      <Space mt={40} />
      <RentersTable renters={renters} completeInfo={completeInfo} />
      <Modal
        title="☉ Registro de inquilino"
        withCloseButton={false}
        opened={opened}
        onClose={onCloseModal}
        centered
        size="xl"
        radius="md"
        overlayProps={{
          blur: 3,
          backgroundOpacity: 0.4,
        }}
        styles={{
          header: {
            justifyContent: "flex-start",
            paddingLeft: 40,
          },
          title: {
            fontSize: "1rem",
          },
        }}
      >
        <RenterForm onCancel={onCloseModal} />
      </Modal>
    </div>
  );
};

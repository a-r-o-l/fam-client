import { useMemo, useState } from "react";
import { textFormat } from "../../utils/textFormat";
import { useGetPaymentQuery } from "../../services/hooks/Payment/usePaymentQuery";
import { useGetRentersQuery } from "../../services/hooks/Renter/useRenterQuery";
import { useGetBuildingsQuery } from "../../services/hooks/Building/useBuildingQuery";
import { FaPlus, FaUserLarge } from "react-icons/fa6";
import { FaBuilding } from "react-icons/fa6";
import {
  Checkbox,
  Group,
  Select as MSelect,
  MultiSelect,
  Table,
  Text,
  useMantineColorScheme,
  useMantineTheme,
  Modal,
  ActionIcon,
} from "@mantine/core";
import { PaymentTD } from "./components/PaymentTD";
import { PaymentForm } from "./components/PaymentForm";

const tableHeadersTitles = [
  { id: 1, label: "Comprobante" },
  { id: 2, label: "Complejo" },
  { id: 3, label: "Depto" },
  { id: 4, label: "Importe" },
  { id: 5, label: "Fecha" },
  { id: 6, label: "Cuota" },
  { id: 7, label: "Inquilino" },
  { id: 8, label: "Estado" },
  { id: 9, label: "Eliminar" },
];

export const PaymentsScreen = () => {
  const { colorScheme } = useMantineColorScheme();
  const { colors } = useMantineTheme();

  const switchColor = useMemo(() => {
    return colorScheme === "dark" ? "white" : "black";
  }, [colorScheme]);

  const [selectedRenter, setSelectedRenter] = useState("");
  const [selectedBuilding, setSelectedBuilding] = useState([]);
  const [selectedPayment, setSelectedPayment] = useState(null);

  const [check1, setCheck1] = useState(true);
  const [check2, setCheck2] = useState(true);
  const [opened, setOpened] = useState(false);

  const { data: paymentsData } = useGetPaymentQuery();
  const { data: rentersData } = useGetRentersQuery();
  const { data: buildingsData } = useGetBuildingsQuery();

  const buildingSelect = useMemo(() => {
    let data = [];
    if (buildingsData) {
      data = [
        ...data,
        ...buildingsData.map((building) => {
          return {
            label: textFormat([building?.name], "allcapitalize"),
            value: building.id.toString(),
          };
        }),
      ];
    }

    return data || [];
  }, [buildingsData]);

  const rentersSelect = useMemo(() => {
    const allRentersOption = { label: "Todos", value: "all" };

    if (!rentersData?.length) {
      return [];
    }

    const rentersOptions = rentersData.map((renter) => ({
      ...renter,
      label: textFormat([renter?.name, renter?.lastname], "allcapitalize"),
      value: renter?.id?.toString(),
    }));

    if (!selectedBuilding?.length) {
      rentersOptions.unshift(allRentersOption);
      return rentersOptions;
    }

    const rentersInSelectedBuildings = rentersOptions.filter((renterOption) => {
      const activeContract = renterOption?.Contracts.find(
        (contract) => contract.id === renterOption?.active_contract_id
      );
      const apartment = activeContract?.Apartment;
      return selectedBuilding.includes(apartment?.building_id?.toString());
    });

    rentersInSelectedBuildings.unshift(allRentersOption);
    return rentersInSelectedBuildings;
  }, [selectedBuilding, rentersData]);

  const paymentsByBuilding = useMemo(() => {
    if (paymentsData?.length) {
      if (selectedBuilding?.length) {
        return paymentsData.filter((payment) => {
          const contract = payment?.Contract;
          const apartment = contract?.Apartment;
          return selectedBuilding.includes(apartment?.building_id?.toString());
        });
      } else {
        return paymentsData;
      }
    }
    return [];
  }, [selectedBuilding, paymentsData]);

  const paymentsByRenter = useMemo(() => {
    if (paymentsByBuilding?.length) {
      if (!!selectedRenter && selectedRenter !== "all") {
        return paymentsByBuilding?.filter(
          (payment) => payment?.Contract?.renter_id === parseInt(selectedRenter)
        );
      } else {
        return paymentsByBuilding;
      }
    }
    return [];
  }, [selectedRenter, paymentsByBuilding]);

  const filteredPayments = useMemo(() => {
    if (check1 && check2) {
      return paymentsByRenter;
    } else if (!check1 && !check2) {
      return [];
    } else {
      if (check1) {
        return paymentsByRenter.filter((payment) => payment?.payed);
      } else {
        return paymentsByRenter.filter((payment) => !payment?.payed);
      }
    }
  }, [paymentsByRenter, check1, check2]);

  const onCloseModal = () => {
    setOpened(false);
    setSelectedPayment(null);
  };

  const openModal = (payment) => {
    setSelectedPayment(payment || null);
    setOpened(true);
  };

  return (
    <div className="flex flex-1 flex-col h-full">
      <div className="flex flex-row items-center gap-10">
        <Group preventGrowOverflow maw={400}>
          <MultiSelect
            data={buildingSelect}
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
        <Group preventGrowOverflow w={500}>
          <MSelect
            leftSection={<FaUserLarge />}
            data={rentersSelect}
            value={selectedRenter}
            onChange={(e) => {
              setSelectedRenter(e);
            }}
            size="md"
            comboboxProps={{ shadow: "md" }}
            maw={400}
            miw={400}
            styles={{
              dropdown: {
                color: switchColor,
              },
              input: {
                backgroundColor:
                  colorScheme === "dark" ? colors.dark[9] : colors.gray[2],
                color: switchColor,
              },
            }}
          />
        </Group>
        <div className="flex flex-1 h-20 items-center justify-end pr-10">
          <div className="flex flex-row items-center flex-1 gap-20">
            <Checkbox
              defaultChecked
              label="pagados"
              value={check1}
              onChange={() => setCheck1(!check1)}
            />
            <Checkbox
              defaultChecked
              label="pendientes"
              value={check2}
              onChange={() => setCheck2(!check2)}
            />
          </div>
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
      <Table.ScrollContainer minWidth={900} type="native" h={650} mt={40}>
        <Table
          layout="fixed"
          stickyHeader
          striped="even"
          verticalSpacing={20}
          highlightOnHover
        >
          <Table.Thead bg={colorScheme === "dark" ? "dark.9" : "gray.2"}>
            <Table.Tr>
              {tableHeadersTitles.map((header) => (
                <Table.Th
                  key={header.id}
                  className="text-black dark:text-white"
                  colSpan={1}
                >
                  {header.label}
                </Table.Th>
              ))}
            </Table.Tr>
          </Table.Thead>
          <Table.Tbody>
            {filteredPayments?.length ? (
              filteredPayments.map((payment) => (
                <PaymentTD
                  key={payment.id}
                  payment={payment}
                  openModal={openModal}
                />
              ))
            ) : (
              <Table.Tr>
                <Table.Td colSpan={7} className="col-span-7 text-center h-80">
                  <Text>No hay pagos</Text>
                </Table.Td>
              </Table.Tr>
            )}
          </Table.Tbody>
        </Table>
      </Table.ScrollContainer>
      <Modal
        title="☉ Registro de Pago"
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
        <PaymentForm
          onCloseModal={onCloseModal}
          selectedPayment={selectedPayment}
          setSelectedPayment={setSelectedPayment}
        />
      </Modal>
    </div>
  );
};

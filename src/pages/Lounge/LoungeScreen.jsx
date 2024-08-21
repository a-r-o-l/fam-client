import { ActionIcon, Title, Table, useMantineColorScheme } from "@mantine/core";
import { Banknote, Calendar, Plus, Store } from "lucide-react";
import { useMemo, useState } from "react";
import { useGetLoungesQuery } from "../../services/hooks/Lounge/useLoungeQuery";
import LoungeTr from "./components/LoungeTr";
import CustomFloatingIndicator from "../../components/CustomFloatingIndicator/CustomFloatingIndicator";
import { useNavigate, useParams } from "react-router-dom";
import LoungeModal from "./components/LoungeModal";
import ReservationModal from "./components/ReservationModal";

const headerItems = [
  { id: 1, label: "Imagen", align: "left" },
  { id: 2, label: "Nombre", align: "left" },
  { id: 3, label: "Direccion", align: "left" },
  { id: 4, label: "Estado", align: "left" },
  { id: 5, label: "Acciones", align: "center" },
];

function LoungeScreen() {
  const navigate = useNavigate();
  const params = useParams();
  const index = useMemo(() => {
    if (params?.index) {
      return parseInt(params.index);
    }
    return 0;
  }, [params]);
  const { colorScheme } = useMantineColorScheme();
  const [selectedLounge, setSelectedLounge] = useState(null);
  const [houseModal, setHouseModal] = useState(false);
  const [reservationModal, setReservationModal] = useState(false);
  const [houseToEdit, setHouseToEdit] = useState(null);
  const { data: lounges } = useGetLoungesQuery();

  const data = [
    {
      label: "Salones",
      icon: <Store size={18} />,
      path: "/lounges/0",
      condition: 0,
    },
    {
      label: "Reservas",
      icon: <Calendar size={18} />,
      path: "/lounges/1",
      condition: 1,
    },
    {
      label: "Pagos",
      icon: <Banknote size={18} />,
      path: "/lounges/2",
      condition: 2,
    },
  ];

  const onOpenReservationModal = (lounge) => {
    setSelectedLounge(lounge);
    setReservationModal(true);
  };

  return (
    <div className="flex flex-1 flex-col overflow-hidden">
      <div className="flex justify-center w-full">
        <CustomFloatingIndicator data={data} condition index={index} />
      </div>
      {index === 0 && (
        <div className="flex flex-col px-10">
          <div className="flex w-full items-center justify-between px-3 py-3 rounded-lg mb-5 text-neutral-300">
            <div className="flex flex-row items-center gap-4">
              <Title order={3}>Salones</Title>
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

          <Table.ScrollContainer minWidth={900} type="native" h={500}>
            <Table
              // layout="fixed"
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
                {lounges ? (
                  lounges.map((lounge) => (
                    <LoungeTr
                      onClick={() => {
                        navigate(`/lounges/calendar/${lounge.id}`);
                      }}
                      key={lounge.id}
                      lounge={lounge}
                      onOpenReservationModal={() =>
                        onOpenReservationModal(lounge)
                      }
                    />
                  ))
                ) : (
                  <></>
                )}
              </Table.Tbody>
            </Table>
          </Table.ScrollContainer>
        </div>
      )}

      <LoungeModal
        lounge={selectedLounge}
        open={houseModal}
        onCloseModal={() => {
          setHouseModal(false);
          setHouseToEdit(null);
        }}
      />
    </div>
  );
}

export default LoungeScreen;

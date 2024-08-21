import { useMemo } from "react";
import BuildingsSection from "./components/Sections/BuildingsSection";
import { useMantineColorScheme } from "@mantine/core";
import RentersSection from "./components/Sections/RentersSection";
import { useParams } from "react-router-dom";
import PaymentSection from "./components/Sections/PaymentSection";
import { Banknote, Building, User } from "lucide-react";
import CustomFloatingIndicator from "../../components/CustomFloatingIndicator/CustomFloatingIndicator";

export const BuildingScreen = () => {
  const params = useParams();
  const index = useMemo(() => {
    if (params?.index) {
      return parseInt(params.index);
    }
    return 0;
  }, [params]);

  const { colorScheme } = useMantineColorScheme();

  const isDark = useMemo(() => {
    return colorScheme === "dark";
  }, [colorScheme]);

  const data = useMemo(() => {
    return [
      {
        label: "Edificios",
        icon: <Building size={18} />,
        path: "/buildings/0",
        condition: 0,
      },
      {
        label: "Inquilinos",
        icon: <User size={18} />,
        path: "/buildings/1",
        condition: 1,
      },
      {
        label: "Pagos",
        icon: <Banknote size={18} />,
        path: "/buildings/2",
        condition: 2,
      },
    ];
  }, []);

  return (
    <div className="flex flex-1 flex-col">
      <div className="flex justify-center w-full">
        <CustomFloatingIndicator data={data} condition index={index} />
      </div>
      {index === 0 && <BuildingsSection isDark={isDark} />}
      {index === 1 && <RentersSection />}
      {index === 2 && <PaymentSection />}
    </div>
  );
};

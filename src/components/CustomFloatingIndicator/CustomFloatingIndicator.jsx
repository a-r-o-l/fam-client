import {
  Button,
  FloatingIndicator,
  useMantineColorScheme,
} from "@mantine/core";
import { useMemo } from "react";
import { useNavigate } from "react-router-dom";

function CustomFloatingIndicator({ data, index }) {
  const navigate = useNavigate();

  const { colorScheme } = useMantineColorScheme();

  const isDark = useMemo(() => {
    return colorScheme === "dark";
  }, [colorScheme]);

  const controls = data.map((item, i) => {
    return (
      <Button
        size="compact-sm"
        key={item.label}
        onClick={() => navigate(item.path)}
        mod={{ active: index === item.condition }}
        leftSection={item.icon}
        variant={index === item.condition ? "filled" : "subtle"}
        color={index === item.condition ? "blue" : "grey"}
        radius="md"
        styles={{
          root: {
            transition: "background-color 0.3s ease, color 0.2s ease",
          },
          label: {
            fontWeight: 900,
            fontSize: 16,
            transition: "",
          },
        }}
      >
        <span>{item.label}</span>
      </Button>
    );
  });

  return (
    <div
      className={`relative ${
        isDark ? "bg-neutral-950 border-neutral-600" : "border-neutral-200"
      } rounded-xl p-3 border
          gap-5 flex justify-between`}
    >
      {controls}
      <FloatingIndicator />
    </div>
  );
}

export default CustomFloatingIndicator;

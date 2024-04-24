import {
  Divider,
  Title,
  useMantineColorScheme,
  useMantineTheme,
} from "@mantine/core";

export const HeaderTitle = ({ title, description }) => {
  const { colors } = useMantineTheme();
  const { colorScheme } = useMantineColorScheme();
  return <></>;
  return (
    <div
      className="w-full flex flex-col self-center justify-start bg-black rounded-md py-5"
      style={{
        backgroundColor:
          colorScheme === "dark" ? colors.dark[9] : colors.gray[2],
      }}
    >
      <Title
        fz={35}
        fw={900}
        ff="heading"
        className="dark:text-white text-black pl-6"
      >
        {title}
      </Title>
    </div>
  );
};

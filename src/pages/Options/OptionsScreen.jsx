import { NavLink } from "@mantine/core";
import { AngleIcon, CornerTopLeftIcon } from "@radix-ui/react-icons";
import { Button } from "flowbite-react";
import { useState } from "react";
import { WorkInProgressScreen } from "../WorkInProgress/WorkInProgressScreen";

export const OptionsScreen = () => {
  const [active, setActive] = useState(0);
  const dev = true;
  if (!dev) {
    return <WorkInProgressScreen />;
  }

  return (
    <div className="flex flex-1 flex-row overflow-hidden">
      {/* <div className="flex w-1/6 flex-col">
        <NavLink
          href="#required-for-focus"
          label="First parent link"
          leftSection={<AngleIcon size="1rem" stroke={1.5} />}
          childrenOffset={28}
          description="This is a description"
          variant="filled"
          active={0 === active}
          onClick={() => setActive(0)}
        />

        <NavLink
          href="#required-for-focus"
          label="Second parent link"
          leftSection={<CornerTopLeftIcon size="1rem" stroke={1.5} />}
          childrenOffset={28}
          defaultOpened
          active={1 === active}
          onClick={() => setActive(1)}
        />
        <h1 className="text-xl mb-10">hola victor</h1>
        <button
          className="border p-2 rounded-xl bg-blue-700 hover:opacity-80 hover:bg-blue-900"
          onClick={() => {
            console.log("hola victor");
          }}
        >
          save
        </button>
      </div>
      <div className="flex flex-1 bg-red-600">b2</div> */}
    </div>
  );
};

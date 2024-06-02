import { CiWarning } from "react-icons/ci";

export const WorkInProgressScreen = () => {
  return (
    <div className="flex flex-1 justify-center items-center p-20 flex-col">
      <CiWarning size={100} color="orange" />
      <h1 className="text-3xl ml-4 text-black dark:text-white">
        En construccion..
      </h1>
    </div>
  );
};

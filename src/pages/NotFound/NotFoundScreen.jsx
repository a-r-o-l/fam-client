import { CiWarning } from "react-icons/ci";

function NotFoundScreen() {
  return (
    <div className="flex flex-1 flex-col justify-center items-center gap-5 py-20">
      <CiWarning size={150} color="orange" />
      <h1 className="font-black text-6xl">404</h1>
      <div className="mt-2">
        <h1 className="font-semibold text-xl">No se encontro ninguna pagina</h1>
      </div>
    </div>
  );
}

export default NotFoundScreen;

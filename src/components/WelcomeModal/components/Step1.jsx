import { Image } from "@mantine/core";
import BackButton from "./BackButton";

function Step1({ setWelcome }) {
  return (
    <div className="flex flex-1 flex-col h-full">
      <div className="flex flex-col w-full">
        <BackButton action={() => setWelcome(true)} />
        <div className="mt-10">
          <p>
            <span className="font-black text-zinc-300">Complex</span> es una
            aplicación diseñada para ofrecer a los usuarios una forma intuitiva
            y organizada de gestionar inmuebles e inquilinos. Para acceder a
            todas las funcionalidades de Complex, es necesario contar con una
            suscripción mensual.
          </p>
        </div>
        <div className="flex flex-row justify-center items-center gap-5 mt-10">
          <Image src="./demo.png" fit="contain" w={200} />
          <div className="flex flex-row flex-grow h-full items-end">
            <p className="mt-1 text-zinc-400">
              Dentro de la sección
              <span className="font-black text-zinc-300">{` Mi cuenta `}</span>,
              podrás consultar toda la información relacionada con tu perfil,
              incluyendo el estado actual de tu suscripción. Este último se
              muestra a través de una barra de progreso, la cual indica
              gráficamente el tiempo restante de tu suscripción activa,
              permitiéndote así mantener un control claro y visual de tu acceso
              a la aplicación.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Step1;

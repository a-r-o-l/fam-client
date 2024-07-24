import { Image } from "@mantine/core";
import BackButton from "./BackButton";

function Step2({ setActive }) {
  return (
    <div className="flex flex-1 flex-col h-full">
      <div className="flex flex-col w-full">
        <BackButton action={() => setActive(0)} />
        <div className="mt-10 flex justify-center">
          <Image src="./demo1.png" fit="contain" w={450} />
        </div>
        <div className="flex flex-row justify-center items-center gap-5 mt-5">
          <div className="flex flex-row flex-grow h-full items-start">
            <p className="text-zinc-400">
              Cuando una suscripción expira, la cuenta del usuario queda
              inhabilitada para cualquier tipo de interacción hasta que se
              renueve la suscripción. Esta puede renovarse realizando el pago a
              través del botón de MercadoPago ubicado en el modal
              correspondiente. Al hacer clic en el botón, serás redirigido a la
              pasarela de pago de MercadoPago, donde podrás completar tu pago
              seleccionando el medio de pago que prefieras.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Step2;

import { Image, Modal } from "@mantine/core";
import { useAccountStore } from "../../store/useAccountStore";
import { useEffect, useState } from "react";
import { Progress } from "@mantine/core";
const SuccessModal = ({ open, status }) => {
  const { setCloseSession } = useAccountStore();
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (status) {
      if (progress >= 100) {
        setCloseSession();
        return;
      }
      const timer = setInterval(() => {
        setProgress((prevProgress) => {
          if (prevProgress < 100) {
            return prevProgress + 20;
          }
          clearInterval(timer);
          return 100;
        });
      }, 1000);

      return () => clearInterval(timer);
    }
  }, [progress, setCloseSession, status]);

  return (
    <Modal
      withCloseButton={false}
      opened={open}
      centered
      size="lg"
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
        body: {
          paddingTop: 40,
        },
      }}
    >
      <div className="flex flex-1 flex-col items-center">
        <div className="flex flex-col justify-center items-center gap-4">
          <Image src="./paymentSuccess.png" fit="contain" w={100} />
          <h1 className="text-2xl font-bold text-white">¡Pago Exitoso!</h1>
        </div>
        <p className="text-center mt-4 text-white">
          Tu pago ha sido procesado correctamente.
        </p>
        <p className="text-center mt-2 text-white font-light">
          Detalles del Pago:
        </p>
        <ul className="list-disc text-center text-zinc-400">
          <li>Monto: $20.000</li>
          <li>Fecha de Expiración: DD/MM/AAAA</li>
        </ul>

        <p className="text-center mt-5 text-zinc-400 ">
          Serás redirigido al inicio de sesión para refrescar los cambios en tu
          cuenta.
        </p>
        <div className="flex flex-col w-full gap-1 mt-5">
          <Progress value={progress} size="md" color="green" />
        </div>
      </div>
    </Modal>
  );
};

export default SuccessModal;

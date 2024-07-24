import { Button, Image } from "@mantine/core";
import { Avatar } from "@mui/material";
import { ChevronRight } from "lucide-react";

function Step0({ account, setWelcome }) {
  return (
    <div className="flex flex-1 flex-col justify-end h-full">
      <div className="flex flex-col">
        <div className="flex flex-col my-5 justify-center items-center gap-2">
          <Avatar
            src={account.image_url}
            className="filter grayscale border-4 border-white"
            sx={{ width: 70, height: 70 }}
          />
          <p>{account.email}</p>
        </div>
        <div className="flex flex-col items-center gap-2 justify-center">
          <h1 className="font-bold text-2xl">Bienvenido a </h1>
          <Image src="./complex2.png" fit="contain" w={240} />
        </div>

        <p className="text-center font-bold text-lg mt-10">
          Ya tienes una cuenta, ahora necesitas activarla.
        </p>
        <p className="mt-1 text-zinc-400 text-center">
          Para activar tu cuenta necesitas completar el tutorial que se
          realizara por unica vez. Hacer click en continuar para comenzar con el
          tutorial.
        </p>
      </div>
      <div className="flex flex-1 h-full justify-center items-center w-full mt-10">
        <Button
          size="md"
          rightSection={<ChevronRight />}
          onClick={() => setWelcome(false)}
        >
          Continuar
        </Button>
      </div>
    </div>
  );
}

export default Step0;

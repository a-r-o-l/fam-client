import { Stepper } from "@mantine/core";
import { useState } from "react";
import Step1 from "./Step1";
import Step2 from "./Step2";
import Step3 from "./Step3";

function WelcomeStepper({ setWelcome }) {
  const [active, setActive] = useState(0);

  const renderStep = () => {
    if (active === 0) {
      return <Step1 setWelcome={setWelcome} />;
    }
    if (active === 1) {
      return <Step2 setActive={setActive} />;
    }
    if (active === 2) {
      return <Step3 setActive={setActive} />;
    }
  };

  return (
    <div className="flex flex-1 flex-col h-full">
      {renderStep()}
      {active < 3 && (
        <div className="flex flex-1 h-full items-end justify-center">
          <Stepper
            active={active}
            onStepClick={setActive}
            iconPosition="right"
            size="sm"
            iconSize={30}
          >
            <Stepper.Step label="Paso 1" description="Suscripcion actual" />
            <Stepper.Step label="Paso 2" description="Expiracion" />
            <Stepper.Step label="Paso 3" description="Abonar" />
          </Stepper>
        </div>
      )}
    </div>
  );
}

export default WelcomeStepper;

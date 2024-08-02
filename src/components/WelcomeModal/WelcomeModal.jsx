import { Modal } from "@mantine/core";
import { useCallback, useState } from "react";
import { useAccountStore } from "../../store/useAccountStore";
import Step0 from "./components/Step0";
import WelcomeStepper from "./components/WelcomeStepper";

const WelcomeModal = ({ open }) => {
  const { account } = useAccountStore();
  const [welcome, setWelcome] = useState(true);

  const renderBody = useCallback(() => {
    if (welcome) {
      return <Step0 account={account} setWelcome={setWelcome} />;
    } else {
      return <WelcomeStepper setWelcome={setWelcome} />;
    }
  }, [account, welcome]);

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
          padding: 40,
          height: 750,
        },
      }}
    >
      {renderBody()}
    </Modal>
  );
};

export default WelcomeModal;

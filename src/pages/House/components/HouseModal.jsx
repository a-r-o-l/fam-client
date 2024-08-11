import { Modal } from "@mantine/core";
import { HouseForm } from "./HouseForm";

function houseModal({ open, onCloseModal, house }) {
  return (
    <Modal
      withCloseButton={false}
      opened={open}
      onClose={onCloseModal}
      closeOnEscape={false}
      closeOnClickOutside={false}
      centered
      size="lg"
      radius="md"
      overlayProps={
        {
          // blur: 3,
          // backgroundOpacity: 0.4,
        }
      }
      styles={{
        header: {
          justifyContent: "flex-start",
          paddingLeft: 40,
        },
        title: {
          fontSize: "1rem",
        },
        body: {},
      }}
    >
      <HouseForm onClose={onCloseModal} house={house} />
    </Modal>
  );
}

export default houseModal;

import ApartmentForm from "./ApartmentForm";
import { Modal } from "@mantine/core";

function ApartmentModal({ open, onCloseModal, apt, building }) {
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
      <ApartmentForm apt={apt} onClose={onCloseModal} building={building} />
    </Modal>
  );
}

export default ApartmentModal;

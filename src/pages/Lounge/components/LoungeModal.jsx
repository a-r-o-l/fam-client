import { Modal } from "@mantine/core";
import { LoungeForm } from "./LoungeForm";

function LoungeModal({ open, onCloseModal, lounge }) {
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
      <LoungeForm onClose={onCloseModal} lounge={lounge} />
    </Modal>
  );
}

export default LoungeModal;

import { Modal, Button, Text } from "@mantine/core";

export const CustomDialog = ({ open, onClose, onConfirm, text, loading }) => {
  return (
    <Modal
      opened={open}
      onClose={onClose}
      centered
      withCloseButton={false}
      radius="lg"
      size="sm"
      shadow="md"
    >
      <div className="flex flex-1 flex-col justify-end pt-5">
        <div className="flex justify-center items-center flex-1">
          <Text variant="text" size="md" fw={500}>
            {text}
          </Text>
        </div>
        <div className="flex justify-center items-center mt-14 gap-20">
          <Button
            onClick={onClose}
            radius="md"
            variant="outline"
            color="blue"
            disabled={loading}
          >
            Cancelar
          </Button>
          <Button
            onClick={onConfirm}
            radius="md"
            variant="filled"
            loading={loading}
          >
            Aceptar
          </Button>
        </div>
      </div>
    </Modal>
  );
};

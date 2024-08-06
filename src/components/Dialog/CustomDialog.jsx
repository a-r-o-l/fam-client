import { Modal, Button, Text } from "@mantine/core";

export const CustomDialog = ({
  open,
  onClose,
  onConfirm,
  text,
  loading,
  description = "",
}) => {
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
      <div className="flex flex-1 flex-col justify-end pt-5 px-5">
        <div className="flex flex-col justify-center items-center flex-1 gap-1">
          <Text variant="text" size="lg" fw={500}>
            {text}
          </Text>
          <Text variant="text" size="md" fw={250}>
            {!!description && description}
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

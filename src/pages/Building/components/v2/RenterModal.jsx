import { Button, Divider, Modal, Text } from "@mantine/core";
import { Avatar } from "@mui/material";
import { User } from "lucide-react";
import { FaFingerprint, FaMobileScreen } from "react-icons/fa6";
import { HiAtSymbol } from "react-icons/hi";

function RenterModal({ open, onCloseModal, renter }) {
  return (
    <Modal
      withCloseButton={false}
      opened={open}
      onClose={onCloseModal}
      closeOnEscape={false}
      closeOnClickOutside={false}
      centered
      size="xs"
      radius="xl"
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
      <div className="flex flex-col gap-2">
        <div className="flex justify-center">
          <Avatar src={renter?.image_url} sx={{ width: 80, height: 80 }} />
        </div>
        <Divider mt={20} />
        <div className="flex flex-row gap-5 items-center py-1 mt-2">
          <User color="#64a0ff" />
          <Text>
            {renter ? renter.name : ""} {renter ? renter.lastname : ""}
          </Text>
        </div>
        <div className="flex flex-row gap-5 items-center py-1">
          <FaFingerprint color="#64a0ff" />
          <Text>{renter ? renter.dni : ""}</Text>
        </div>
        <div className="flex flex-row gap-5 items-center py-1">
          <FaMobileScreen color="#64a0ff" />
          <Text>{renter ? renter.phone : ""}</Text>
        </div>
        <div className="flex flex-row gap-5 items-center py-1">
          <HiAtSymbol color="#64a0ff" />

          <Text>{renter ? renter.email : ""}</Text>
        </div>
        <div className="mt-5 flex w-full justify-end">
          <Button
            onClick={onCloseModal}
            variant="outline"
            radius="xl"
            color="gray"
          >
            Close
          </Button>
        </div>
      </div>
    </Modal>
  );
}

export default RenterModal;

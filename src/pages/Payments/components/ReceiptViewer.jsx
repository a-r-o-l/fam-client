import { useCallback, useRef, useState } from "react";
import { ActionIcon, Card, Image, Popover } from "@mantine/core";
import { FaReceipt, FaRegTrashCan } from "react-icons/fa6";
import { useUpdatePaymentMutation } from "../../../services/hooks/Payment/usePaymentMutation";
import { uploadImage } from "../../../utils/uploadImage";
import { useAccountStore } from "../../../store/useAccountStore";
import { toast } from "sonner";
import { useDeleteImageMutation } from "../../../services/hooks/images/useImagesMutation";

export const ReceiptViewer = ({ payment }) => {
  const { accessToken } = useAccountStore();
  const fileInputRef = useRef(null);
  const [loading, setLoading] = useState(false);
  const updatePayment = useUpdatePaymentMutation();
  const deleteImage = useDeleteImageMutation();

  const getFileNameFromUrl = useCallback((url) => {
    return url.substring(url.lastIndexOf("/") + 1);
  }, []);

  const onImgChanged = useCallback(
    async (e) => {
      setLoading(true);
      try {
        const files = e.target?.files;
        const file = files[0];
        if (!file) {
          return;
        }
        try {
          const response = await uploadImage(file, accessToken, false);
          if (response) {
            const image_url = response.imageUrl;
            updatePayment.mutate(
              {
                id: payment.id,
                data: { receipt: image_url },
              },
              {
                onSuccess: () => {
                  toast.success("Pago actualizado correctamente");
                },
              }
            );
          }
        } catch (error) {
          toast.error("Error al subir la imagen");
          console.error(error);
        }
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    },
    [payment, accessToken, updatePayment]
  );

  const renderButton = useCallback(() => {
    if (loading) {
      return (
        <ActionIcon loading={loading} variant="subtle" color="blue">
          <FaReceipt />
        </ActionIcon>
      );
    }
    if (payment?.receipt) {
      return (
        <ActionIcon loading={loading} variant="subtle" color="blue">
          <FaReceipt />
        </ActionIcon>
      );
    } else {
      return (
        <ActionIcon
          loading={loading}
          variant="subtle"
          color="dark"
          onClick={() => {
            fileInputRef.current?.click?.();
          }}
        >
          <FaReceipt />
        </ActionIcon>
      );
    }
  }, [loading, payment]);

  const renderViewer = useCallback(() => {
    if (payment?.receipt) {
      return (
        <Card shadow="sm" padding="xl" radius="md">
          <Card.Section className="">
            <Image src={payment?.receipt || ""} w={250} h={250} />
          </Card.Section>
          <div className="flex w-full justify-center pt-5">
            <ActionIcon
              variant="filled"
              color="dark"
              radius="xl"
              size="xl"
              onClick={() => {
                const imageName = getFileNameFromUrl(payment?.receipt);
                deleteImage.mutate(imageName, {
                  onSuccess: () => {
                    updatePayment.mutate({
                      id: payment.id,
                      data: { receipt: "" },
                    });
                    toast.success("Imagen eliminada correctamente");
                  },
                });
              }}
            >
              <FaRegTrashCan />
            </ActionIcon>
          </div>
        </Card>
      );
    } else {
      return (
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          style={{ display: "none" }}
          onChange={onImgChanged}
        />
      );
    }
  }, [onImgChanged, payment, renderButton]);

  const renderComponent = useCallback(() => {
    if (payment?.receipt) {
      return (
        <Popover position="top" closeOnEscape={true} keepMounted={true}>
          <Popover.Target>{renderButton()}</Popover.Target>
          <Popover.Dropdown>{renderViewer()}</Popover.Dropdown>
        </Popover>
      );
    } else {
      return (
        <div>
          {renderButton()}
          {renderViewer()}
        </div>
      );
    }
  }, [loading, onImgChanged, payment, renderButton, renderViewer]);

  return renderComponent();
};

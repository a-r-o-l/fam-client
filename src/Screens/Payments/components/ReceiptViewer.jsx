import React, { useCallback, useRef, useState } from "react";
import { ActionIcon, Avatar, Card, Image, Popover } from "@mantine/core";
import { FaReceipt } from "react-icons/fa6";
import { useUpdatePaymentMutation } from "../../../services/hooks/Payment/usePaymentMutation";

export const ReceiptViewer = ({ payment }) => {
  const fileInputRef = useRef(null);
  const [loading, setLoading] = useState(false);
  const updatePayment = useUpdatePaymentMutation();

  const onImgChanged = useCallback(
    async (e) => {
      setLoading(true);
      try {
        const files = e.target?.files;
        const file = files[0];
        if (!file) {
          return;
        }
        const data = new FormData();
        data.append("file", file);
        data.append("upload_preset", "receipt");
        const res = await fetch(
          "https://api.cloudinary.com/v1_1/dbb2vknkm/image/upload",
          {
            method: "POST",
            body: data,
          }
        );
        const imgUrl = await res.json();
        if (imgUrl?.secure_url) {
          await updatePayment.mutateAsync({
            id: payment.id,
            data: { receipt: imgUrl.secure_url },
          });
        }
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    },
    [payment]
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
  }, [loading, payment, onImgChanged]);

  const renderViewer = useCallback(() => {
    if (payment?.receipt) {
      return (
        <Card shadow="sm" padding="lg" radius="md">
          <Card.Section>
            <Image src={payment?.receipt || ""} w={250} h={250} />
          </Card.Section>
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

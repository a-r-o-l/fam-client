import { useSearchParams } from "react-router-dom";

export const SubscriptionSuccessScreen = () => {
  const [searchParams] = useSearchParams();
  const collectionId = searchParams.get("collection_id");
  const collectionStatus = searchParams.get("collection_status");
  const paymentId = searchParams.get("payment_id");
  const status = searchParams.get("status");
  const externalReference = searchParams.get("external_reference");
  const paymentType = searchParams.get("payment_type");
  const merchantOrederId = searchParams.get("merchant_order_id");
  const preferenceId = searchParams.get("preference_id");
  const siteId = searchParams.get("site_id");
  const processingMode = searchParams.get("processing_mode");
  const merchantAccountId = searchParams.get("merchant_account_id");

  const data = {
    collectionId,
    collectionStatus,
    paymentId,
    status,
    externalReference,
    paymentType,
    merchantOrederId,
    preferenceId,
    siteId,
    processingMode,
    merchantAccountId,
  };

  console.log(data);

  return <div>SubscriptionSuccessScreen</div>;
};

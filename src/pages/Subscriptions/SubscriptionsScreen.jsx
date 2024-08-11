import { useAccountStore } from "../../store/useAccountStore";
import { ActiveSubscription } from "./components/ActiveSubscription";
import { ExpiredSubscription } from "./components/ExpiredSubscription";
import { FirstSubscription } from "./components/FirstSubscription";

export const SubscriptionsScreen = () => {
  const { account } = useAccountStore();
  return <></>;
  // if (!account?.Subscriptions?.length) {
  //   return <FirstSubscription />;
  // }

  // if (account.status === "expired") {
  //   return <ExpiredSubscription />;
  // }

  // return <ActiveSubscription />;
};

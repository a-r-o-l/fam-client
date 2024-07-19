import { createContext, useEffect, useState } from "react";
import { useAccountStore } from "../store/useAccountStore";

export const AccountContext = createContext();
export const AccountProvider = ({ children }) => {
  const { account, setCreateSession } = useAccountStore();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!account) {
      setIsLoading(true);
      const accessToken = localStorage.getItem("access-token");
      const refreshToken = localStorage.getItem("refresh-token");
      if (accessToken) {
        setCreateSession(accessToken, refreshToken);
        setIsLoading(false);
      }
    }
  }, [account, setCreateSession]);

  return (
    <AccountContext.Provider value={{ account, isLoading }}>
      {children}
    </AccountContext.Provider>
  );
};

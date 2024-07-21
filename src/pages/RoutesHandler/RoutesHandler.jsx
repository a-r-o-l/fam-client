import { useEffect } from "react";
import { useAccountStore } from "../../store/useAccountStore";
import { useNavigate, Outlet } from "react-router-dom";

export const RoutesHandler = () => {
  const { account, accessToken, setCreateSession } = useAccountStore();
  const navigate = useNavigate();

  useEffect(() => {
    if (!account) {
      const accessToken = localStorage.getItem("access-token");
      const refreshToken = localStorage.getItem("refresh-token");
      if (accessToken) {
        setCreateSession(accessToken, refreshToken);
      } else if (!account) {
        navigate("/login");
      }
    } else if (account) {
      navigate("/");
    }
  }, [account, accessToken, setCreateSession, navigate]);

  return <Outlet />;
};

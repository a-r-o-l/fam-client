import { Outlet, Route, Routes, useNavigate } from "react-router-dom";
import views from "./views";
import { LoginScreen } from "../pages/Login/LoginScreen";
import { AppTemplate } from "../layouts/AppTemplate";
import { useAccountStore } from "../store/useAccountStore";
import { useEffect } from "react";
import { SubscriptionSuccessScreen } from "../pages/Subscriptions/pages/SubscriptionSuccessScreen";

const useAuthRedirect = (condition, redirectTo) => {
  const { account, accessToken, setCreateSession } = useAccountStore();
  const navigate = useNavigate();

  useEffect(() => {
    if (!account) {
      const accessToken = localStorage.getItem("access-token");
      const refreshToken = localStorage.getItem("refresh-token");
      if (accessToken) {
        setCreateSession(accessToken, refreshToken);
      } else if (condition) {
        navigate(redirectTo);
      }
    } else if (condition) {
      navigate(redirectTo);
    }
  }, [account, accessToken, setCreateSession, navigate, condition, redirectTo]);
};

const ProtectedLayout = () => {
  const { account } = useAccountStore();

  useAuthRedirect(!account, "/login");
  return (
    <AppTemplate>
      <Outlet />
    </AppTemplate>
  );
};

const PublicLayout = () => {
  const { account } = useAccountStore();
  useAuthRedirect(account, "/renters");
  return <Outlet />;
};

export const Router = () => {
  return (
    <Routes>
      <Route path="/" element={<ProtectedLayout />} />
      <Route element={<PublicLayout />}>
        <Route path="/login" element={<LoginScreen />} />
      </Route>
      <Route element={<ProtectedLayout />}>
        <Route
          path="/subscriptions/success/*"
          element={<SubscriptionSuccessScreen />}
        />
        {views.map((view, index) => (
          <Route
            key={index}
            path={view.path}
            element={<view.component />}
            exact={view.exact}
          />
        ))}
      </Route>
    </Routes>
  );
};

import { useEffect, useState } from "react";
import { SigninSection } from "./components/SigninSection";
import { SignupSection } from "./components/SignupSection";
import { useAccountStore } from "../../store/useAccountStore";
import { useNavigate } from "react-router-dom";

export const LoginScreen = () => {
  const [loginMode, setLoginMode] = useState(true);
  const [logging, setLogging] = useState(false);
  const navigate = useNavigate();
  const { setCreateSession } = useAccountStore();

  useEffect(() => {
    const accessToken = localStorage.getItem("access-token");
    const refreshToken = localStorage.getItem("refresh-token");
    if (accessToken || refreshToken) {
      setCreateSession(accessToken, refreshToken);
      navigate("/");
    }
  }, []);

  if (loginMode) {
    return (
      <SigninSection
        logging={logging}
        setLogging={setLogging}
        setLoginMode={setLoginMode}
      />
    );
  }
  if (!loginMode) {
    return (
      <SignupSection
        logging={logging}
        setLogging={setLogging}
        setLoginMode={setLoginMode}
      />
    );
  }
};

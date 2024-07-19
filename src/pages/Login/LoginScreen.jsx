import { useState } from "react";
import { SigninSection } from "./components/SigninSection";
import { SignupSection } from "./components/SignupSection";

export const LoginScreen = () => {
  const [loginMode, setLoginMode] = useState(true);
  const [logging, setLogging] = useState(false);

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

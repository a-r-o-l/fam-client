import { Button, Typography, TextField } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useAccountStore } from "../store/useAccountStore";
import { useState } from "react";

const emptyValues = {
  username: "",
  password: "",
};

export const LoginScreen = () => {
  const navigate = useNavigate();
  const setAccount = useAccountStore((x) => x.setAccount);

  const [formValues, setFormValues] = useState(emptyValues);

  const handleChange = (name, value) => {
    setFormValues((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="h-full p-10 flex flex-col justify-center items-center">
      <div className="flex justify-center w-full">
        <Typography variant="h3" className="text-3xl">
          Home
        </Typography>
      </div>
      <div className="flex w-1/3 flex-col justify-center items-center border gap-10 mt-20 p-10">
        <div className="flex w-1/2">
          <TextField
            label="username"
            name="username"
            fullWidth
            onChange={({ target }) => handleChange(target.name, target.value)}
            value={formValues.username}
          />
        </div>
        <div className="flex w-1/2">
          <TextField
            label="password"
            type="password"
            name="password"
            fullWidth
            onChange={({ target }) => handleChange(target.name, target.value)}
            value={formValues.password}
          />
        </div>
        <div className="flex justify-end items-end w-1/2">
          <Button
            variant="contained"
            color="primary"
            title="adsdas"
            onClick={() => {
              setAccount(formValues);
              navigate("/");
            }}
          >
            login
          </Button>
        </div>
      </div>
    </div>
  );
};

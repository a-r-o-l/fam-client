import { Button, Typography, TextField } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { Navbar } from "../Layouts/Navbar";
import { renterApiService } from "../services/renterApiService";
import { useEffect } from "react";

export const HomeScreen = () => {
  const navigation = useNavigate();

  const getRenters = async () => {
    const response = await renterApiService.getRenters();
    console.log(response);
  };

  useEffect(() => {
    getRenters();
  }, []);
  return (
    <div>
      <Navbar />
      <h1>home</h1>
    </div>
  );
};

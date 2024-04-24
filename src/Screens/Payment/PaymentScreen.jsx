import { Typography } from "@mui/material";
import { useParams } from "react-router-dom";

export const PaymentScreen = () => {
  const params = useParams();
  return (
    <div>
      <Typography variant="h1">{params.id}</Typography>
    </div>
  );
};

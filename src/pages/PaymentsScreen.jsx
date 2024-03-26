import { Button, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { paymentApiService } from "../services/paymentApiService";
import { CustomForm } from "../components/CustomForm";
import dayjs from "dayjs";

const emptyValues = {
  renterId: "",
  date: "",
};
export const PaymentsScreen = () => {
  const [formValues, setFormValues] = useState(emptyValues);
  const getPayments = async () => {
    const response = await paymentApiService.getPayments();
    console.log(response);
  };

  useEffect(() => {
    getPayments();
  }, []);
  return (
    <div className="flex flex-1 justify-center flex-col p-10">
      <Typography className="text-3xl text-center" variant="h5">
        Payments
      </Typography>
      <CustomForm
        fields={[
          { field: "renterId", label: "Renter", type: "number" },
          { field: "date", label: "Date" },
        ]}
        formValues={formValues}
        setFormValues={setFormValues}
        onSubmit={async () => {
          const result = await paymentApiService.createPayment(formValues);
          if (result) {
            setFormValues(emptyValues);
            getPayments();
          }
        }}
      />

      <Button
        onClick={() => {
          const date1 = dayjs("2024-01-15");

          console.log(dayjs().date(date1.date()).format("YYYY-MM-DD"));
        }}
      >
        click
      </Button>
    </div>
  );
};

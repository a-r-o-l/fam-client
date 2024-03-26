import { TextField, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { CustomForm } from "../components/CustomForm";
import { TanstackTable } from "../components/Table/TanstackTable";
import { useNavigate } from "react-router-dom";
import { renterApiService } from "../services/renterApiService";
import dayjs from "dayjs";

const emptyValues = {
  name: "",
  lastname: "",
  dni: "",
  phone: "",
  fee: "",
  apartment: "",
  buildingId: "",
  start_date: "",
};

export const RentersScreen = () => {
  const navigate = useNavigate();
  const [formValues, setFormValues] = useState(emptyValues);
  const [searchParams, setSearchParams] = useState("");
  const [renters, setRenters] = useState("");

  const getRenters = async () => {
    const result = await renterApiService.getRenters();
    if (result) {
      setRenters(result);
    }
  };

  useEffect(() => {
    if (formValues === emptyValues) {
      getRenters();
    }
  }, [formValues]);

  return (
    <div className="flex flex-1 justify-center flex-col p-10">
      <Typography className="text-3xl text-center" variant="h5">
        Renters
      </Typography>
      <div className="flex flex-row flex-1 gap-10 mt-10">
        <CustomForm
          fields={[
            { field: "name", label: "Name" },
            { field: "lastname", label: "Lastname" },
            { field: "dni", label: "Dni" },
            { field: "phone", label: "Phone" },
            { field: "fee", label: "Fee", type: "number" },
            { field: "apartment", label: "Apartment" },
            { field: "buildingId", label: "Building" },
            { field: "start_date", label: "Start Date" },
          ]}
          formValues={formValues}
          setFormValues={setFormValues}
          onSubmit={async () => {
            const result = await renterApiService.createRenter({
              ...formValues,
              buildingId: parseInt(formValues.buildingId),
              start_date: dayjs(),
            });
            if (result) {
              setFormValues(emptyValues);
              console.log(result);
            }
          }}
        />
        <div className="flex flex-col flex-1 ">
          <div className="w-full flex p-5 justify-end">
            <TextField
              size="small"
              value={searchParams}
              onChange={({ target }) => setSearchParams(target.value)}
            />
          </div>
          <TanstackTable
            searchParams={searchParams}
            onRowClick={(id) => navigate(`/renter/${id}`)}
            data={renters}
            columns={[
              { accessorKey: "name", header: "Name" },
              { accessorKey: "lastname", header: "Lastname" },
              { accessorKey: "dni", header: "Dni" },
              { accessorKey: "phone", header: "Phone" },
              { accessorKey: "apartment", header: "Apartment" },
              { accessorKey: "buildingId", header: "Building" },
              { accessorKey: "fee", header: "Fee" },
              { accessorKey: "start_date", header: "Start Date" },
            ]}
          />
        </div>
      </div>
    </div>
  );
};

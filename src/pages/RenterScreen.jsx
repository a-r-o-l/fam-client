import { Typography } from "@mui/material";
import { useRentersStore } from "../store/useRentersStore";
import { useEffect, useState } from "react";
import { CustomForm } from "../components/CustomForm";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";

const emptyValues = {
  name: "",
  lastname: "",
  phone: "",
  dni: "",
  apartment: "",
  building: "",
  fee: "",
  start_date: "",
};

export const RenterScreen = (props) => {
  const navigate = useNavigate();
  const params = useParams();

  const renters = useRentersStore((x) => x.renters);
  const setRenters = useRentersStore((x) => x.setRenters);

  const [formValues, setFormValues] = useState(emptyValues);

  useEffect(() => {
    const renter = renters.find((renter) => renter.id === parseInt(params.id));
    if (renter) {
      setFormValues(renter);
    }
  }, [params, renters]);

  return (
    <div className="flex flex-1 justify-center flex-col p-10">
      <Typography className="text-3xl text-center" variant="h5">
        Renter
      </Typography>
      <div className="flex flex-row flex-1 gap-10 mt-20">
        <CustomForm
          fields={[
            { field: "name", label: "Name" },
            { field: "lastname", label: "Lastname" },
            { field: "dni", label: "Dni" },
            { field: "phone", label: "Phone" },
            { field: "apartment", label: "Apartment" },
            { field: "building", label: "Building" },
            { field: "fee", label: "Fee", type: "number" },
            { field: "start_date", label: "Start Date" },
          ]}
          formValues={formValues}
          setFormValues={setFormValues}
          onSubmit={() => {
            setRenters([
              ...renters,
              { ...formValues, id: renters?.length + 1 },
            ]);
            setFormValues(emptyValues);
          }}
        />
        <div className="flex flex-col flex-1">
          {/* <TanstackTable
            onRowClick={(id) => navigate(`/renter/${id}`)}
            data={renters}
            columns={[
              { accessorKey: "name", header: "Name" },
              { accessorKey: "lastname", header: "Lastname" },
              { accessorKey: "dni", header: "Dni" },
              { accessorKey: "phone", header: "Phone" },
              { accessorKey: "apartment", header: "Apartment" },
              { accessorKey: "building", header: "Building" },
              { accessorKey: "fee", header: "Fee" },
              { accessorKey: "start_date", header: "Start Date" },
            ]}
          /> */}
        </div>
      </div>
    </div>
  );
};

import { Typography } from "@mui/material";
import { CustomForm } from "../components/CustomForm";
import { useEffect, useState } from "react";
import { buildingsApiService } from "../services/buildingsApiService";

const emptyValues = {
  name: "",
  address: "",
};
export const BuildingScreen = () => {
  const [formValues, setFormValues] = useState(emptyValues);
  const [buildings, setBuildings] = useState([]);

  const createBuilding = async (data) => {
    const response = await buildingsApiService.createBuilding(data);
    if (response) {
      console.log("Building created", response);
    } else {
      console.log("Error creating building");
    }
  };

  const getBuildings = async () => {
    const response = await buildingsApiService.getBuildings();
    if (response) {
      setBuildings(response);
      console.log(response);
    }
  };

  useEffect(() => {
    getBuildings();
  }, []);

  return (
    <div className="flex flex-1 justify-center flex-col p-10">
      <Typography className="text-3xl text-center" variant="h5">
        Buildings
      </Typography>
      <div className="flex flex-row gap-20">
        <CustomForm
          fields={[
            { field: "name", label: "Name" },
            { field: "address", label: "Address" },
          ]}
          formValues={formValues}
          setFormValues={setFormValues}
          onSubmit={() => {
            createBuilding(formValues);
          }}
        />
        {buildings?.map((building) => (
          <div key={building.id} className="flex flex-col gap-2">
            <Typography variant="h6">{building.name}</Typography>
            <Typography variant="body1">{building.address}</Typography>
          </div>
        ))}
      </div>
    </div>
  );
};

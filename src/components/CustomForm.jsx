import { Button, TextField } from "@mui/material";

export const CustomForm = ({
  fields,
  formValues,
  setFormValues,
  onSubmit,
  gap = 10,
  title,
}) => {
  const handleChange = (name, value) => {
    setFormValues((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div
      className={`flex w-1/4 flex-col justify-center items-center border gap-${gap} p-5 rounded-md shadow-xl`}
      style={{ backgroundColor: "#0AAEFF" }}
    >
      <div className="rounded-md self-center px-5 py-2 w-10/12 justify-start items-start">
        <h1 className="text-3xl font-semibold text-white text-start">
          {title}
        </h1>
      </div>
      {fields.map((item, index) => (
        <div className="flex w-4/5" key={index}>
          <TextField
            variant="filled"
            size="small"
            label={item.label}
            name={item.field}
            onChange={({ target }) => handleChange(target.name, target.value)}
            value={formValues[item.field]}
            className="bg-white rounded-full px-4 overflow-hidden"
          />
        </div>
      ))}

      <div className="flex justify-end items-end w-full mt-5">
        <Button variant="contained" color="primary" onClick={onSubmit}>
          Crear
        </Button>
      </div>
    </div>
  );
};

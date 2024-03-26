import { Button, TextField } from "@mui/material";

export const CustomForm = ({
  fields,
  formValues,
  setFormValues,
  onSubmit,
  gap = 10,
}) => {
  const handleChange = (name, value) => {
    setFormValues((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div
      className={`flex w-1/3 flex-col justify-center items-center border gap-${gap} p-10`}
    >
      {fields.map((item, index) => (
        <div className="flex w-4/5" key={index}>
          <TextField
            color="primary"
            variant="standard"
            size="small"
            label={item.label}
            name={item.field}
            fullWidth
            onChange={({ target }) => handleChange(target.name, target.value)}
            value={formValues[item.field]}
          />
        </div>
      ))}

      <div className="flex justify-end items-end w-1/2">
        <Button variant="contained" color="primary" onClick={onSubmit}>
          Publish
        </Button>
      </div>
    </div>
  );
};

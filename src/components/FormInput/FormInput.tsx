import { FC } from "react";
import { Controller, useFormContext } from "react-hook-form";
import {
  FormHelperText,
  Typography,
  FormControl,
  Input,
  InputProps,
} from "@mui/material";

type IFormInputProps = {
  name: string;
  label: string;
} & InputProps;

const FormInput: FC<IFormInputProps> = ({ name, label, ...otherProps }) => {
  const {
    control,
    formState: { errors },
  } = useFormContext();

  return (
    <Controller
      control={control}
      defaultValue=""
      name={name}
      render={({ field }) => (
        <FormControl
          fullWidth
          sx={{
            mb: 2,
          }}
        >
          <Typography
            variant="subtitle1"
            sx={{
              color: "primary.contrastText",
              mb: 1,
            }}
          >
            {label}
          </Typography>
          <Input
            {...field}
            fullWidth
            disableUnderline
            sx={{
              padding: "0.4rem 0.7rem",
              borderRadius: "1rem",
              backgroundColor: "secondary.contrastText",
            }}
            error={!!errors[name]}
            {...otherProps}
          />

          <FormHelperText error={!!errors[name]}>
            {errors[name] ? `${errors[name]?.message}` : ""}
          </FormHelperText>
        </FormControl>
      )}
    />
  );
};

export default FormInput;

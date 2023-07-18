import { useState, type FC } from "react";
import * as Yup from "yup";
import { Formik } from "formik";
import {
  Box,
  Button,
  FormHelperText,
  MenuItem,
  TextField,
} from "@mui/material";
import useAuth from "../../hooks/useAuth";
import useMounted from "../../hooks/useMounted";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

// const options = [
//   { value: "admin", label: "Admin" },
//   { value: "user", label: "User" },
// ];

const Registration = () => {
  const [registerUser, { isLoading }] = useRegisterUserMutation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // const [selectedOption, setSelectedOption] = useState("");

  return (
    <Formik
      initialValues={{
        email: "",
        options: { value: "" },
        password: "",
        // policy: false,
        submit: null,
      }}
      validationSchema={Yup.object().shape({
        email: Yup.string()
          .email("Must be a valid email")
          .max(255)
          .required("Email is required"),
        password: Yup.string().min(7).max(255).required("Password is required"),
        options: Yup.object().shape({
          label: Yup.string().required("Role is required"),
          value: Yup.string().required("Role is required"),
        }),
        // policy: Yup.boolean().oneOf([true], "This field must be checked"),
      })}
      onSubmit={async (
        values,
        { setErrors, setStatus, setSubmitting }
      ): Promise<void> => {
        try {
          await register(values.email, values.options.value, values.password);

          if (mounted.current) {
            setStatus({ success: true });
            setSubmitting(false);
          }
        } catch (err: any) {
          console.error(err);
          setStatus({ success: false });
          setErrors({ submit: err?.message });
          setSubmitting(false);
        }
      }}
    >
      {({
        errors,
        handleBlur,
        handleChange,
        handleSubmit,
        isSubmitting,
        touched,
        values,
      }): JSX.Element => (
        <form noValidate onSubmit={handleSubmit} {...props}>
          {/* <TextField
            {...register("options")}
            // {...register}
            id="outlined-select-currency"
            select
            fullWidth
            error={Boolean(touched.options?.value && errors.options?.value)}
            helperText={touched.options?.value && errors.options?.value}
            label="Select user"
            margin="normal"
            variant="outlined"
            value={selectedOption}
            onChange={(e) => setSelectedOption(e.target.value)}
          >
            {options.map((option) => {
              return (
                <MenuItem key={option.value} value={option.label}>
                  {option.label}
                </MenuItem>
              );
            })}
          </TextField> */}

          <TextField
            error={Boolean(touched.email && errors.email)}
            fullWidth
            helperText={touched.email && errors.email}
            label="Email Address"
            margin="normal"
            name="email"
            onBlur={handleBlur}
            onChange={handleChange}
            type="email"
            value={values.email}
            variant="outlined"
          />
          <TextField
            error={Boolean(touched.password && errors.password)}
            fullWidth
            helperText={touched.password && errors.password}
            label="Password"
            margin="normal"
            name="password"
            onBlur={handleBlur}
            onChange={handleChange}
            type="password"
            value={values.password}
            variant="outlined"
          />
          <Box
            sx={{
              alignItems: "center",
              display: "flex",
              ml: -1,
              mt: 2,
            }}
          ></Box>
          {/* {Boolean(touched.policy && errors.policy) && (
            <FormHelperText error>{errors.policy}</FormHelperText>
          )} */}
          {errors.submit && (
            <Box sx={{ mt: 3 }}>
              <FormHelperText error>{errors.submit}</FormHelperText>
            </Box>
          )}
          <Box sx={{ mt: 2 }}>
            <Button
              color="primary"
              disabled={isSubmitting}
              fullWidth
              size="large"
              type="submit"
              variant="contained"
            >
              Register
            </Button>
          </Box>
        </form>
      )}
    </Formik>
  );
};

export default Registration;

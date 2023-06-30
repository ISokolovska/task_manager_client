import type { FC } from "react";
import * as Yup from "yup";
import { Formik } from "formik";
import { Box, Button, FormHelperText, TextField } from "@mui/material";
import useAuth from "../../hooks/useAuth";
import useMounted from "../../hooks/useMounted";

const Registration: FC = (props) => {
  const mounted = useMounted();
  const { register } = useAuth() as any;

  return (
    <Formik
      initialValues={{
        email: "",
        password: "",
        role: "",
        policy: false,
        submit: null,
      }}
      validationSchema={Yup.object().shape({
        email: Yup.string()
          .email("Must be a valid email")
          .max(255)
          .required("Email is required"),
        role: Yup.string().max(255).required("role is required"),
        password: Yup.string().min(7).max(255).required("Password is required"),
        policy: Yup.boolean().oneOf([true], "This field must be checked"),
      })}
      onSubmit={async (
        values,
        { setErrors, setStatus, setSubmitting }
      ): Promise<void> => {
        try {
          await register(values.email, values.role, values.password);

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
          <TextField
            error={Boolean(touched.role && errors.role)}
            fullWidth
            helperText={touched.role && errors.role}
            label="role"
            margin="normal"
            role="role"
            onBlur={handleBlur}
            onChange={handleChange}
            value={values.role}
            variant="outlined"
          />
          <TextField
            error={Boolean(touched.email && errors.email)}
            fullWidth
            helperText={touched.email && errors.email}
            label="Email"
            margin="normal"
            role="email"
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
            role="password"
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
          {Boolean(touched.policy && errors.policy) && (
            <FormHelperText error>{errors.policy}</FormHelperText>
          )}
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

import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { Box, Button, Container, Typography } from "@mui/material";
import { object, string, TypeOf } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRegisterUserMutation } from "../redux/api/authApi";
import FormInput from "../components/FormInput/FormInput";
import { LinkItem } from "../components/Header/Header.style";

const registerSchema = object({
  email: string()
    .min(1, "Email address is required")
    .email("Email Address is invalid"),
  password: string()
    .min(1, "Password is required")
    .min(8, "Password must be more than 8 characters")
    .max(32, "Password must be less than 32 characters"),
});

export type RegisterInput = TypeOf<typeof registerSchema>;

const RegisterPage = () => {
  const methods = useForm<RegisterInput>({
    resolver: zodResolver(registerSchema),
  });

  // ? Calling the Register Mutation
  const [registerUser, { isLoading, isSuccess, isError }] =
    useRegisterUserMutation();

  const navigate = useNavigate();

  const {
    reset,
    handleSubmit,
    formState: { isSubmitSuccessful },
  } = methods;

  useEffect(() => {
    if (isSuccess) {
      toast.success("User registered successfully");
      navigate("/login");
    }

    if (isError) {
      toast.error("This user already exists");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoading]);

  useEffect(() => {
    if (isSubmitSuccessful) {
      reset();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSubmitSuccessful]);

  const onSubmitHandler: SubmitHandler<RegisterInput> = async (values) => {
    // ? Executing the RegisterUser Mutation
    // console.log(values);
    try {
      await registerUser(values);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Container
      maxWidth={false}
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        backgroundColor: "primary.light",
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
        }}
      >
        <Typography
          textAlign="center"
          variant="h1"
          sx={{
            color: "secondary.dark",
            mb: 2,
          }}
        >
          Welcome to TaskManager!
        </Typography>
        <Typography variant="h2" sx={{ color: "primary.contrastText", mb: 2 }}>
          Sign Up To Get Started!
        </Typography>

        <FormProvider {...methods}>
          <Box
            component="form"
            onSubmit={handleSubmit(onSubmitHandler)}
            noValidate
            autoComplete="off"
            maxWidth="27rem"
            width="100%"
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "column",
              width: 450,
              height: 350,
              backgroundColor: "blueGrey.main",
              p: "2rem",
              borderRadius: 2,
            }}
          >
            <FormInput name="email" label="Email Address" type="email" />
            <FormInput name="password" label="Password" type="password" />

            <Typography variant="subtitle1" sx={{ mb: "1rem" }}>
              Already have an account? <Link to="/login">Login Here</Link>
            </Typography>

            <Button
              variant="contained"
              fullWidth
              disableElevation
              type="submit"
            >
              Sign Up
            </Button>
          </Box>
        </FormProvider>
      </Box>
    </Container>
  );
};

export default RegisterPage;

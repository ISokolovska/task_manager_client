import { useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import { Box, Button, Container, Typography } from "@mui/material";
import { object, string, TypeOf } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useLoginUserMutation } from "../redux/api/authApi";
import { setToken } from "../redux/features/auth/userSlice";
import { useAppDispatch } from "../redux/store";
// import { LinkItem } from "../components/Header/Header.style";
import FormInput from "../components/FormInput/FormInput";

const loginSchema = object({
  email: string()
    .min(1, "Email address is required")
    .email("Email Address is invalid"),
  password: string()
    .min(1, "Password is required")
    .min(8, "Password must be more than 8 characters")
    .max(32, "Password must be less than 32 characters"),
});

export type LoginInput = TypeOf<typeof loginSchema>;

const LoginPage = () => {
  const methods = useForm<LoginInput>({
    resolver: zodResolver(loginSchema),
  });
  const dispatch = useAppDispatch();
  // ? API Login Mutation
  const [loginUser, { isLoading, isError, isSuccess, data: response }] =
    useLoginUserMutation();

  const navigate = useNavigate();
  const location = useLocation();

  const from =
    ((location.state as any)?.from.pathname as string) || "/categories";

  const {
    reset,
    handleSubmit,
    formState: { isSubmitSuccessful },
  } = methods;

  const onSubmitHandler: SubmitHandler<LoginInput> = async (values) => {
    // ? Executing the loginUser Mutation
    try {
      await loginUser(values);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (isSuccess) {
      toast.success("You successfully logged in");
      navigate(from);
    }
    if (isError) {
      toast.error("Incorrect login or password");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoading, isSuccess]);

  useEffect(() => {
    if (isSubmitSuccessful) {
      reset();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSubmitSuccessful]);

  useEffect(() => {
    if (response?.data && response.data?.token) {
      dispatch(setToken(response.data?.token));
      console.log(123, response.data?.token);
    }
  }, [dispatch, response]);

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
          Welcome Back!
        </Typography>
        <Typography variant="h3" sx={{ color: "primary.contrastText", mb: 2 }}>
          Login to have access!
        </Typography>

        <FormProvider {...methods}>
          <Box
            component="form"
            onSubmit={handleSubmit(onSubmitHandler)}
            noValidate
            // autoComplete="off"
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
              Need an account? <Link to="/register">Sign Up Here</Link>
            </Typography>

            <Button
              variant="contained"
              fullWidth
              disableElevation
              type="submit"
            >
              Login
            </Button>
          </Box>
        </FormProvider>
      </Box>
    </Container>
  );
};

export default LoginPage;

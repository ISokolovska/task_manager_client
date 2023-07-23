// import type { FC } from "react";
// import { Link as RouterLink } from "react-router-dom";
// import {
//   Box,
//   Card,
//   CardContent,
//   Container,
//   Divider,
//   Link,
//   Typography,
// } from "@mui/material";
// import Registration from "../../components/Auth/Registration";

// const RegisterPage: FC = () => {
//   return (
//     <Box
//       sx={{
//         backgroundColor: "background.default",
//         display: "flex",
//         flexDirection: "column",
//         minHeight: "100vh",
//       }}
//     >
//       <Container maxWidth="sm" sx={{ py: "80px" }}>
//         <Box
//           sx={{
//             mb: 8,
//             display: "flex",
//             justifyContent: "center",
//           }}
//         ></Box>
//         <Card>
//           <CardContent
//             sx={{
//               display: "flex",
//               flexDirection: "column",
//               p: 4,
//             }}
//           >
//             <Box
//               sx={{
//                 alignItems: "center",
//                 display: "flex",
//                 justifyContent: "space-between",
//                 mb: 3,
//               }}
//             >
//               <div>
//                 <Typography color="textPrimary" gutterBottom variant="h4">
//                   Register
//                 </Typography>
//               </div>
//             </Box>
//             <Box
//               sx={{
//                 flexGrow: 1,
//                 mt: 3,
//               }}
//             >
//               <Registration />
//             </Box>
//             <Divider sx={{ my: 3 }} />
//             <Link
//               color="textSecondary"
//               component={RouterLink}
//               to="/authentication/login"
//               variant="body2"
//             >
//               Having an account
//             </Link>
//           </CardContent>
//         </Card>
//       </Container>
//     </Box>
//   );
// };

// export default RegisterPage;

import { Box, Container, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import { object, string, TypeOf } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import FormInput from "../components/FormInput/FormInput";
import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useRegisterUserMutation } from "../redux/api/authApi";
import { LoadingButton as _LoadingButton } from "@mui/lab";
import { toast } from "react-toastify";

const LoadingButton = styled(_LoadingButton)`
  padding: 0.6rem 0;
  background-color: #f9d13e;
  color: #2363eb;
  font-weight: 500;

  &:hover {
    background-color: #ebc22c;
    transform: translateY(-2px);
  }
`;

const LinkItem = styled(Link)`
  text-decoration: none;
  color: #2363eb;
  &:hover {
    text-decoration: underline;
  }
`;

const registerSchema = object({
  // name: string().min(1, "Full name is required").max(100),
  email: string()
    .min(1, "Email address is required")
    .email("Email Address is invalid"),
  password: string()
    .min(1, "Password is required")
    .min(8, "Password must be more than 8 characters")
    .max(32, "Password must be less than 32 characters"),
  //   passwordConfirm: string().min(1, "Please confirm your password"),
  // }).refine((data) => data.password === data.passwordConfirm, {
  //   path: ["passwordConfirm"],
  //   message: "Passwords do not match",
});

export type RegisterInput = TypeOf<typeof registerSchema>;

const RegisterPage = () => {
  const methods = useForm<RegisterInput>({
    resolver: zodResolver(registerSchema),
  });

  // ? Calling the Register Mutation
  const [registerUser, { isLoading, isSuccess, error, isError }] =
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
        backgroundColor: "#2363eb",
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
          component="h1"
          sx={{
            color: "#f9d13e",
            fontSize: { xs: "2rem", md: "3rem" },
            fontWeight: 600,
            mb: 2,
            letterSpacing: 1,
          }}
        >
          Welcome to TaskManager!
        </Typography>
        <Typography component="h2" sx={{ color: "#e5e7eb", mb: 2 }}>
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
              backgroundColor: "#e5e7eb",
              p: { xs: "1rem", sm: "2rem" },
              borderRadius: 2,
            }}
          >
            {/* <FormInput name="name" label="Full Name" /> */}
            <FormInput name="email" label="Email Address" type="email" />
            <FormInput name="password" label="Password" type="password" />
            {/* <FormInput
              name="passwordConfirm"
              label="Confirm Password"
              type="password"
            /> */}
            <Typography sx={{ fontSize: "0.9rem", mb: "1rem" }}>
              Already have an account?{" "}
              <LinkItem to="/login">Login Here</LinkItem>
            </Typography>

            <LoadingButton
              variant="contained"
              sx={{ mt: 1 }}
              fullWidth
              disableElevation
              type="submit"
              loading={isLoading}
            >
              Sign Up
            </LoadingButton>
          </Box>
        </FormProvider>
      </Box>
    </Container>
  );
};

export default RegisterPage;

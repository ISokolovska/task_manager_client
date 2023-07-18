import React, { useState } from "react";

// import type { FC } from "react";
import { Box, Button, TextField } from "@mui/material";
// import useAuth from "../../hooks/useAuth";
// import useMounted from "../../hooks/useMounted";
// import * as Yup from "yup";
import { Form } from "formik";
import { setCredentials } from "../../redux/features/auth/authSlice";

// import { ProtectedComponent } from "./ProtectedComponent";
import { useLoginMutation } from "../../redux/api/services/userApi";
import type { LoginRequest } from "../../redux/api/services/userApi";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "material-react-toastify";
import LoadingScreen from "../LoadingScreen";

function PasswordInput({
  name,
  onChange,
}: {
  name: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}) {
  // const [show, setShow] = React.useState(false);
  // const handleClick = () => setShow(!show);

  return (
    <>
      {/* <Input
        pr="4.5rem"
        type={show ? "text" : "password"}
        placeholder="Enter password"
        name={name}
        onChange={onChange}
      /> */}
      <TextField
        // error={Boolean(touched.password && errors.password)}
        fullWidth
        // helperText={touched.password && errors.password}
        label="Password"
        margin="normal"
        // name="password"
        name={name}
        // onBlur={handleBlur}
        onChange={onChange}
        // type="password"
        // value={values.password}
        variant="outlined"
      />

      {/* <InputRightElement width="4.5rem">
        <Button h="1.75rem" size="sm" onClick={handleClick}>
          {show ? "Hide" : "Show"}
        </Button>
      </InputRightElement> */}
    </>
  );
}

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [formState, setFormState] = useState<LoginRequest>({
    email: "",
    password: "",
  });

  const [login, { isLoading }] = useLoginMutation();

  const handleChange = ({
    target: { name, value },
  }: React.ChangeEvent<HTMLInputElement>) =>
    setFormState((prev) => ({ ...prev, [name]: value }));

  return (
    <Form>
      <form>
        <TextField
          autoFocus
          // error={Boolean(touched.email && errors.email)}
          fullWidth
          // helperText={touched.email && errors.email}
          label="Email"
          margin="normal"
          name="email"
          // onBlur={handleBlur}
          onChange={handleChange}
          type="email"
          // value={values.email}
          variant="outlined"
        />
        <PasswordInput onChange={handleChange} name="password" />
        {/* <TextField
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
          /> */}

        <Box sx={{ mt: 2 }}>
          {/* <Button
            color="primary"
            // disabled={isSubmitting}
            fullWidth
            size="large"
            type="submit"
            variant="contained"
          >
            Log In
          </Button> */}
          {isLoading ? (
            <LoadingScreen />
          ) : (
            <Button
              color="primary"
              disabled={isLoading}
              fullWidth
              size="large"
              type="submit"
              variant="contained"
              onClick={async () => {
                try {
                  const user = await login(formState).unwrap();
                  dispatch(setCredentials(user));
                  navigate("/");
                } catch (err) {
                  toast.error("Oh no, there was an error!");
                }
              }}
            ></Button>
          )}
        </Box>
      </form>
    </Form>
  );
};

export default Login;

import {
  Flex,
  Box,
  Heading,
  FormControl,
  FormLabel,
  Input,
  Button,
} from "@chakra-ui/react";
import { useFormik } from "formik";
import validationSchema from "./validations";

import { FetchLogin } from "../../../api";
import { useAuth } from "../../../context/AuthContext";
import { useNavigate } from "react-router-dom";

function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
      role: "",
    },

    validationSchema,
    onSubmit: async (values) => {
      try {
        const LoginResponse = await FetchLogin({
          email: values.email,
          password: values.password,
        });

        if (
          LoginResponse.some((Mail) => formik.values.email === Mail.email) &&
          LoginResponse.some(
            (Password) => formik.values.password === Password.password
          )
        ) {
          login(LoginResponse);
          localStorage.setItem("user", JSON.stringify(formik.values.email));
          navigate("/");
        }
      } catch (err) {}
    },
  });

  return (
    <div>
      <Flex align="center" width="full" justifyContent="center">
        <Box pt={10}>
          <Box textAlign="center">
            <Heading>Login</Heading>
          </Box>
          <Box my={5} textAlign="left">
            <form onSubmit={formik.handleSubmit}>
              <FormControl>
                <FormLabel>Email</FormLabel>
                <Input
                  name="email"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.email}
                  isInvalid={formik.touched.email && formik.errors.email}
                ></Input>
              </FormControl>
              <FormControl mt={4}>
                <FormLabel>Password</FormLabel>
                <Input
                  name="password"
                  type="password"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.password}
                  isInvalid={formik.touched.password && formik.errors.password}
                ></Input>
              </FormControl>

              <Button mt={4} width="full" type="submit">
                Login
              </Button>
            </form>
          </Box>
        </Box>
      </Flex>
    </div>
  );
}

export default Login;

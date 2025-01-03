import { useNavigate } from "react-router-dom";
import { Field, Formik } from "formik";
import * as Yup from "yup";

import { FormInput } from "components/Input";
import Button from "components/Button";
import Image from "components/Image";
import getStyles from "./styles";
import LogoDarkIcon from "assets/svg/LogoDarkIcon.svg";
import { Box, Typography } from "@mui/material";
import LogoutIcon from "@mui/icons-material/Logout";

import authStore from "stores/authStore";

const schema = Yup.object().shape({
  email: Yup.string().required("Email is required field"),
  password: Yup.string().required("Password is required field"),
  // .min(8, "Password needs to contain at least 8 characters "),
});

const LoginPage = () => {
  const classes = getStyles();
  const navigate = useNavigate();

  const { login } = authStore;

  const onSubmit = (values, { resetForm }) => {
    login({ payload: values, navigate: navigate, resetForm: resetForm });
  };

  return (
    <Box sx={classes.wrapper}>
      <Box sx={classes.firstColumn}>
        <Typography variant="h6">
          Spend less time <br /> on the roads
        </Typography>
      </Box>
      <Box sx={classes.secondColumn}>
        <Formik
          initialValues={{
            email: "",
            password: "",
          }}
          onSubmit={onSubmit}
          validationSchema={schema}
        >
          {({ errors, handleSubmit }) => {
            return (
              <form onSubmit={handleSubmit} style={classes.form}>
                <Box sx={classes.header}>
                  <Box sx={classes.logoTitle}>
                    <Image
                      width={96}
                      height={82}
                      src={LogoDarkIcon}
                      alt="Logo"
                    />
                    <Typography>VisionFlow</Typography>
                  </Box>
                  <Typography variant="h5">Login</Typography>
                </Box>
                <Box sx={classes.content}>
                  <Field
                    sx={classes.inputField}
                    component={FormInput}
                    InputLabelProps={{ shrink: true }}
                    placeholder="name@itc.com"
                    name="email"
                    helperText={errors.email}
                    topLabel="Email"
                    error={!!errors.email}
                  />
                  <Field
                    sx={classes.inputField}
                    component={FormInput}
                    InputLabelProps={{ shrink: true }}
                    placeholder="minimum 8 characters"
                    name="password"
                    helperText={errors.password}
                    topLabel="Password"
                    error={!!errors.password}
                    isPassword
                  />
                  <Button
                    startIcon={
                      <LogoutIcon sx={{ width: "16px", height: "16px" }} />
                    }
                    type="submit"
                  >
                    <Typography>Login</Typography>
                  </Button>
                </Box>
              </form>
            );
          }}
        </Formik>
      </Box>
    </Box>
  );
};

export default LoginPage;

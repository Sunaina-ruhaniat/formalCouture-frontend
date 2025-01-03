import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Field, Formik } from "formik";
import * as Yup from "yup";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import authStore from "stores/authStore";

// Validation schema for signup form
const schema = Yup.object().shape({
  username: Yup.string()
    .email("Enter a valid email")
    .required("Email is required"),
  password: Yup.string().required("Password is required"),
  confirmPassword: Yup.string()
    .required("Confirm Password is required")
    .oneOf([Yup.ref("password"), null], "Passwords must match"),
});

const SignupPage = () => {
  const navigate = useNavigate();
  const { signup } = authStore;

  const onSubmit = (values, { resetForm }) => {
    signup({ payload: values, navigate, resetForm });
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        backgroundColor: "#f4f4f4", // Light gray for background
        padding: 2,
      }}
    >
      <Box
        sx={{
          backgroundColor: "#fff", // White background for the form
          borderRadius: 4, // Smooth rounded corners
          boxShadow: 6, // Soft shadow
          padding: 5,
          width: "100%",
          maxWidth: 450,
          border: "1px solid #e0e0e0", // Soft border for elegance
        }}
      >
        <Typography
          variant="h3"
          fontWeight="700"
          color="black" // Black color for a bold header
          textAlign="center"
          gutterBottom
          sx={{ fontFamily: "Georgia, serif", letterSpacing: 1 }}
        >
          Create Your Account
        </Typography>
        <Typography
          variant="h6"
          color="textSecondary"
          textAlign="center"
          marginBottom={4}
          sx={{ fontFamily: "Arial, sans-serif" }}
        >
          Get started with shopping your favorite products.
        </Typography>

        <Formik
          initialValues={{ username: "", password: "", confirmPassword: "" }}
          onSubmit={onSubmit}
          validationSchema={schema}
        >
          {({ errors, touched, handleSubmit, handleChange, values }) => (
            <form onSubmit={handleSubmit}>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  gap: 3, // Increase the gap for more spacious form
                }}
              >
                <TextField
                  fullWidth
                  label="Email"
                  variant="outlined"
                  name="username"
                  type="email"
                  value={values.username}
                  onChange={handleChange}
                  error={touched.username && !!errors.username}
                  helperText={touched.username && errors.username}
                  sx={{
                    backgroundColor: "#fff", // White background
                    borderRadius: "8px", // Slightly rounded edges
                    border: "1px solid #ccc", // Light border
                    "& .MuiInputLabel-root": {
                      color: "#333", // Darker text for labels
                    },
                    "& .MuiOutlinedInput-root": {
                      color: "#333", // Dark text
                      "& fieldset": {
                        borderColor: "#ccc", // Light border for inputs
                      },
                      "&:hover fieldset": {
                        borderColor: "#bbb", // Slight dark hover effect
                      },
                    },
                  }}
                />
                <TextField
                  fullWidth
                  label="Password"
                  variant="outlined"
                  name="password"
                  type="password"
                  value={values.password}
                  onChange={handleChange}
                  error={touched.password && !!errors.password}
                  helperText={touched.password && errors.password}
                  sx={{
                    backgroundColor: "#fff", // White background
                    borderRadius: "8px",
                    border: "1px solid #ccc",
                    "& .MuiInputLabel-root": {
                      color: "#333",
                    },
                    "& .MuiOutlinedInput-root": {
                      color: "#333",
                      "& fieldset": {
                        borderColor: "#ccc",
                      },
                      "&:hover fieldset": {
                        borderColor: "#bbb",
                      },
                    },
                  }}
                />
                <TextField
                  fullWidth
                  label="Confirm Password"
                  variant="outlined"
                  name="confirmPassword"
                  type="password"
                  value={values.confirmPassword}
                  onChange={handleChange}
                  error={touched.confirmPassword && !!errors.confirmPassword}
                  helperText={touched.confirmPassword && errors.confirmPassword}
                  sx={{
                    backgroundColor: "#fff", // White background
                    borderRadius: "8px",
                    border: "1px solid #ccc",
                    "& .MuiInputLabel-root": {
                      color: "#333",
                    },
                    "& .MuiOutlinedInput-root": {
                      color: "#333",
                      "& fieldset": {
                        borderColor: "#ccc",
                      },
                      "&:hover fieldset": {
                        borderColor: "#bbb",
                      },
                    },
                  }}
                />
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  startIcon={<PersonAddIcon />}
                  sx={{
                    padding: "12px 24px",
                    borderRadius: "25px", // Rounded button for soft feel
                    textTransform: "none",
                    fontSize: "16px",
                    backgroundColor: "#000", // Black button
                    color: "#fff", // White text
                    "&:hover": {
                      backgroundColor: "#333", // Darker black on hover
                    },
                  }}
                >
                  Sign Up
                </Button>
              </Box>
            </form>
          )}
        </Formik>
      </Box>
    </Box>
  );
};

export default SignupPage;

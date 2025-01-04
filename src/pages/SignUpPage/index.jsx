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
  fullName: Yup.string().required("Full name is required"),
  password: Yup.string().required("Password is required"),
  confirmPassword: Yup.string()
    .required("Confirm Password is required")
    .oneOf([Yup.ref("password"), null], "Passwords must match"),
  phoneNumber: Yup.string().optional(),
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
        backgroundImage: "linear-gradient(to right, #f1f1f1, #e4e4e4)", // Soft gradient background
        padding: 2,
      }}
    >
      <Box
        sx={{
          backgroundColor: "#ffffff", // White background for the form
          borderRadius: 12, // Rounded corners for the form
          boxShadow: "0 12px 24px rgba(0, 0, 0, 0.1)", // Shadow for a floating effect
          padding: "40px 50px",
          width: "100%",
          maxWidth: 400,
          textAlign: "center",
        }}
      >
        <Typography
          variant="h3"
          color="primary"
          sx={{
            fontFamily: "Helvetica, Arial, sans-serif",
            fontWeight: "bold",
            marginBottom: 3,
            letterSpacing: "2px",
          }}
        >
          Join Us Today!
        </Typography>

        <Typography
          variant="h6"
          color="textSecondary"
          sx={{
            fontFamily: "Arial, sans-serif",
            marginBottom: 4,
            fontWeight: "lighter",
            fontSize: "16px",
          }}
        >
          Create an account to enjoy personalized shopping and exclusive offers.
        </Typography>

        <Formik
          initialValues={{
            username: "",
            fullName: "",
            password: "",
            confirmPassword: "",
            phoneNumber: "",
          }}
          onSubmit={onSubmit}
          validationSchema={schema}
        >
          {({ errors, touched, handleSubmit, handleChange, values }) => (
            <form onSubmit={handleSubmit}>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  gap: 2.5, // Increased gap between fields for better spacing
                }}
              >
                {/* Full Name Input */}
                <TextField
                  fullWidth
                  label="Full Name"
                  variant="outlined"
                  name="fullName"
                  type="text"
                  value={values.fullName}
                  onChange={handleChange}
                  error={touched.fullName && !!errors.fullName}
                  helperText={touched.fullName && errors.fullName}
                  sx={{
                    backgroundColor: "#fafafa", // Light background
                    borderRadius: "10px", // Rounded corners
                    "& .MuiInputLabel-root": {
                      color: "#333",
                    },
                    "& .MuiOutlinedInput-root": {
                      color: "#333",
                      "& fieldset": {
                        borderColor: "#ddd", // Subtle border color
                      },
                      "&:hover fieldset": {
                        borderColor: "#bbb", // Darker border on hover
                      },
                    },
                  }}
                />

                {/* Email Input */}
                <TextField
                  fullWidth
                  label="Email Address"
                  variant="outlined"
                  name="username"
                  type="email"
                  value={values.username}
                  onChange={handleChange}
                  error={touched.username && !!errors.username}
                  helperText={touched.username && errors.username}
                  sx={{
                    backgroundColor: "#fafafa",
                    borderRadius: "10px",
                    "& .MuiInputLabel-root": {
                      color: "#333",
                    },
                    "& .MuiOutlinedInput-root": {
                      color: "#333",
                      "& fieldset": {
                        borderColor: "#ddd",
                      },
                      "&:hover fieldset": {
                        borderColor: "#bbb",
                      },
                    },
                  }}
                />

                {/* Password Input */}
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
                    backgroundColor: "#fafafa",
                    borderRadius: "10px",
                    "& .MuiInputLabel-root": {
                      color: "#333",
                    },
                    "& .MuiOutlinedInput-root": {
                      color: "#333",
                      "& fieldset": {
                        borderColor: "#ddd",
                      },
                      "&:hover fieldset": {
                        borderColor: "#bbb",
                      },
                    },
                  }}
                />

                {/* Confirm Password Input */}
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
                    backgroundColor: "#fafafa",
                    borderRadius: "10px",
                    "& .MuiInputLabel-root": {
                      color: "#333",
                    },
                    "& .MuiOutlinedInput-root": {
                      color: "#333",
                      "& fieldset": {
                        borderColor: "#ddd",
                      },
                      "&:hover fieldset": {
                        borderColor: "#bbb",
                      },
                    },
                  }}
                />

                {/* Optional Phone Number */}
                <TextField
                  fullWidth
                  label="Phone Number (Optional)"
                  variant="outlined"
                  name="phoneNumber"
                  type="text"
                  value={values.phoneNumber}
                  onChange={handleChange}
                  error={touched.phoneNumber && !!errors.phoneNumber}
                  helperText={touched.phoneNumber && errors.phoneNumber}
                  sx={{
                    backgroundColor: "#fafafa",
                    borderRadius: "10px",
                    "& .MuiInputLabel-root": {
                      color: "#333",
                    },
                    "& .MuiOutlinedInput-root": {
                      color: "#333",
                      "& fieldset": {
                        borderColor: "#ddd",
                      },
                      "&:hover fieldset": {
                        borderColor: "#bbb",
                      },
                    },
                  }}
                />

                {/* Submit Button */}
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  startIcon={<PersonAddIcon />}
                  sx={{
                    padding: "12px 24px",
                    borderRadius: "25px",
                    textTransform: "none",
                    fontSize: "16px",
                    backgroundColor: "#000", // Black button
                    color: "#fff", // White text color
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

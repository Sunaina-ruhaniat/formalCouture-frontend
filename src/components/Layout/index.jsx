import React from "react";
import { Box, Typography, Link } from "@mui/material";
import Header from "components/Header";
import Footer from "components/Footer";
import { Outlet } from "react-router-dom";
import { Link as RouterLink } from "react-router-dom"; // Ensure this is imported for correct routing

const Layout = () => {
  return (
    <Box sx={{ minHeight: "100vh" }}>
      <Box
        sx={{
          backgroundColor: "#afa4a5",
          height: "30px",
        }}
      />

      <header>
        <Header />
      </header>
      <Box
        sx={{
          backgroundColor: "#f0c14b",
          padding: "10px",
          textAlign: "center",
        }}
      >
        <Link
          component={RouterLink} // Use RouterLink to properly route
          to="/sign-up"
          style={{
            textDecoration: "none",
            color: "#000",
            fontWeight: "bold",
            fontSize: "14px",
          }}
        >
          <Typography variant="body2">
            SIGN UP FOR 10% OFF YOUR FIRST ORDER*
          </Typography>
        </Link>
      </Box>
      <main
        style={{
          minHeight: "80vh",
        }}
      >
        <Outlet />
      </main>
      <footer
        style={{
          padding: "10px",
          background: "#fafafa",
        }}
      >
        <Footer />
      </footer>
    </Box>
  );
};

export default Layout;

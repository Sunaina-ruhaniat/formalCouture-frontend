import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  IconButton,
  InputBase,
  Box,
  Typography,
  Badge,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { Link } from "react-router-dom";

const Header = () => {
  const [cartItemCount, setCartItemCount] = useState(2);

  return (
    <AppBar
      position="static"
      sx={{
        backgroundColor: "white",
        boxShadow: "0px 2px 5px rgba(0, 0, 0, 0.1)",
        padding: "10px 40px",
      }}
    >
      <Toolbar
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            flex: 1,
            maxWidth: "350px",
            border: "1px solid #ccc",
            borderRadius: "25px",
            padding: "5px 15px",
            marginTop: "2rem",
            mb: { xs: 2, sm: 0 },
          }}
        >
          <SearchIcon sx={{ color: "black", fontSize: "20px" }} />
          <InputBase
            placeholder="SEARCH FOR PRODUCTS"
            sx={{
              ml: 1,
              flex: 1,
              fontSize: "14px",
              letterSpacing: "1px",
              color: "black",
              fontFamily:
                '"Proxima Nova", "Helvetica Neue", Helvetica, Roboto, Arial, sans-serif',
            }}
          />
        </Box>

        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            textAlign: "center",
            flex: 1,
            mb: { xs: 2, sm: 0 },
          }}
        >
          <Box
            component="img"
            src={"/assets/images/FC_logo.jpeg"}
            // src={"/assets/images/logo.png"}
            alt="Logo"
            sx={{
              height: "50px",
              width: "80px",
              mb: 0.4,
              mr: 16,
            }}
          />
          <Link
            to="/home"
            style={{
              textDecoration: "none",
              color: "black",
            }}
          >
            <Typography
              sx={{
                fontSize: "30px",
                mr: 16,
                letterSpacing: "4px",
                color: "#2f2f2f",
                fontFamily:
                  '"Proxima Nova", "Helvetica Neue", Helvetica, Roboto, Arial, sans-serif',
              }}
            >
              FORMAL COUTURE
            </Typography>
          </Link>
        </Box>

        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            marginTop: "1rem",
            gap: "20px",
            mb: { xs: 2, sm: 0 },
          }}
        >
          <Box sx={{ textAlign: "center" }}>
            <Link to="/sign-up">
              <IconButton>
                <img src="/assets/icons/user.png" alt="User" width={28} />
              </IconButton>
            </Link>
            <Typography
              sx={{
                fontSize: "12px",
                fontWeight: 400,
                color: "black",
                letterSpacing: "0.10rem",
                fontFamily:
                  '"Proxima Nova", "Helvetica Neue", Helvetica, Roboto, Arial, sans-serif',
              }}
            >
              Sign in
            </Typography>
          </Box>

          <Box sx={{ textAlign: "center" }}>
            <IconButton>
              <img src="/assets/icons/love.png" alt="Wishlist" width={28} />
            </IconButton>
            <Typography
              sx={{
                fontSize: "12px",
                fontWeight: 400,
                color: "black",
                letterSpacing: "0.10rem",
                fontFamily:
                  '"Proxima Nova", "Helvetica Neue", Helvetica, Roboto, Arial, sans-serif',
              }}
            >
              Wishlist
            </Typography>
          </Box>

          <Box sx={{ textAlign: "center" }}>
            <IconButton>
              <Badge badgeContent={cartItemCount} color="primary">
                <img
                  src="/assets/icons/shopping-bag.png"
                  alt="Shopping Bag"
                  width={28}
                />
              </Badge>
            </IconButton>
            <Typography
              sx={{
                fontSize: "12px",
                fontWeight: 400,
                color: "black",
                letterSpacing: "0.10rem",
                fontFamily:
                  '"Proxima Nova", "Helvetica Neue", Helvetica, Roboto, Arial, sans-serif',
              }}
            >
              Shopping bag
            </Typography>
          </Box>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;

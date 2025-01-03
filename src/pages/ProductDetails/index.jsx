import React, { useState, useRef } from "react";
import {
  Box,
  Typography,
  Button,
  Select,
  MenuItem,
  FormControl,
  Grid,
  IconButton,
  InputLabel,
  TextField,
  Divider,
  Breadcrumbs,
  Link,
} from "@mui/material";
import { ArrowForward, ArrowBack } from "@mui/icons-material";
import ProductDetails from "./components/Details";

const ProductPage = () => {
  const [currentImage, setCurrentImage] = useState(0); // Spotlighted image
  const thumbnailContainerRef = useRef(null);

  const images = [
    "/assets/images/IMG_4986.JPG",
    "/assets/images/IMG_5002.JPG",
    "/assets/images/IMG_4990.JPG",
    "/assets/images/IMG_5008.JPG",
    "/assets/images/IMG_4994.JPG",
    "/assets/images/IMG_5000.JPG",
    "/assets/images/IMG_5009.JPG",
  ];

  const handleThumbnailClick = (index) => {
    setCurrentImage(index); // Update the spotlighted image
  };

  const handleNextImage = () => {
    setCurrentImage((prev) => (prev + 1) % images.length);
  };

  const handlePrevImage = () => {
    setCurrentImage((prev) => (prev - 1 + images.length) % images.length);
  };

  const handleThumbnailScroll = (event) => {
    if (thumbnailContainerRef.current) {
      const scrollAmount = event.deltaY;
      thumbnailContainerRef.current.scrollTop += scrollAmount; // Scroll thumbnails vertically
    }
  };

  return (
    <div
      style={{
        marginTop: 20,
        marginLeft: -2,
      }}
    >
      <Breadcrumbs
        separator="/"
        aria-label="breadcrumb"
        sx={{ fontSize: "12px", mb: 2, ml: 8 }}
      >
        <Link
          underline="hover"
          color="inherit"
          href="/home"
          sx={{ color: "#000", fontWeight: "500" }}
        >
          HOME
        </Link>
        <Link
          underline="hover"
          color="inherit"
          href="/product-list"
          sx={{ color: "#000", fontWeight: "500" }}
        >
          PRODUCTS
        </Link>
        <Typography sx={{ color: "#000", fontWeight: "500" }}>
          Products Details
        </Typography>
      </Breadcrumbs>

      <Box sx={{ maxWidth: "1200px", margin: "0 auto", padding: 2 }}>
        {/* Main Content */}
        <Grid container spacing={4}>
          {/* Image Section */}
          <Grid
            item
            xs={12}
            md={6}
            sx={{
              display: "flex",
              flexDirection: { xs: "column", md: "row" },
              alignItems: "stretch", // Ensures the height of the text and image sections match
            }}
          >
            {/* Thumbnails */}
            <Box
              ref={thumbnailContainerRef}
              onWheel={handleThumbnailScroll}
              sx={{
                display: "flex",
                flexDirection: "column",
                gap: 2,
                maxHeight: "670px",
                maxWidth: "117px",
                overflow: "hidden",
                mr: { md: 2, xs: 0 },
                scrollBehavior: "smooth",
              }}
            >
              {images.map((img, index) => (
                <img
                  key={index}
                  src={img}
                  alt={`Thumbnail ${index + 1}`}
                  style={{
                    width: "150px",
                    height: "200px",
                    opacity: currentImage === index ? 0.5 : 1,
                    transition: "opacity 0.3s ease",
                    cursor: "pointer",
                  }}
                  onClick={() => handleThumbnailClick(index)}
                />
              ))}
            </Box>

            {/* Spotlight Image with Navigation Arrows */}
            <Box
              sx={{
                position: "relative",
                width: "100%",
                overflow: "hidden",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                mb: { xs: 2, md: 0 },
              }}
            >
              {/* Big Image */}
              <img
                src={images[currentImage]}
                alt="Product"
                style={{
                  width: "100%",
                  // maxWidth: "380px",
                  height: "100%",
                  objectFit: "cover",
                }}
              />
            </Box>

            {/* Right Arrow */}
            <IconButton
              onClick={handleNextImage}
              sx={{
                position: "absolute",
                top: "50%",
                left: "calc(100% - 40px)", // Adjusted to position the arrow at the right edge
                transform: "translateY(-50%)",
                backgroundColor: "white", // White background for arrow button
                color: "black",
                borderRadius: "50%", // Circle shape for the icon button
                "&:hover": { backgroundColor: "#f0f0f0" }, // Light hover effect
              }}
            >
              <ArrowForward />
            </IconButton>
          </Grid>

          {/* Product Details Section */}
          <Grid
            item
            xs={12}
            md={6}
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
            }}
          >
            <Box>
              <Typography variant="h4" gutterBottom>
                I'm a product
              </Typography>
              <Typography
                variant="subtitle2"
                color="text.secondary"
                gutterBottom
              >
                SKU: 0013
              </Typography>
              <Typography variant="h5" sx={{ my: 2 }}>
                $80.00
              </Typography>

              {/* Color Options */}
              <Typography variant="subtitle1" sx={{ mb: 1 }}>
                Color
              </Typography>
              <Box sx={{ display: "flex", gap: 2, mb: 2 }}>
                <Box
                  sx={{
                    width: "24px",
                    height: "24px",
                    borderRadius: "50%",
                    backgroundColor: "#555",
                    border: "2px solid black",
                  }}
                ></Box>
                <Box
                  sx={{
                    width: "24px",
                    height: "24px",
                    borderRadius: "50%",
                    backgroundColor: "#fff",
                    border: "1px solid black",
                  }}
                ></Box>
              </Box>

              {/* Size Dropdown */}
              <FormControl fullWidth sx={{ mb: 3, borderColor: "#b8aaad" }}>
                <InputLabel>Size</InputLabel>
                <Select>
                  <MenuItem value="small">Small</MenuItem>
                  <MenuItem value="medium">Medium</MenuItem>
                  <MenuItem value="large">Large</MenuItem>
                </Select>
              </FormControl>

              {/* Quantity Selector */}
              <TextField
                type="number"
                label="Quantity"
                defaultValue={1}
                InputProps={{ inputProps: { min: 1 } }}
                sx={{ width: "100px", mb: 3, borderColor: "#b8aaad" }}
              />

              {/* Add to Cart Button */}
              {/* <Button
                variant="contained"
                fullWidth
                sx={{ py: 1.5, backgroundColor: "black", color: "white" }}
              >
                Add to Cart
              </Button> */}
              <Button
                variant="contained"
                fullWidth
                color="primary"
                sx={{
                  py: 1.5,
                  fontSize: "18px",
                  padding: "25px 60px",
                  backgroundColor: "#b8aaad",
                  borderRadius: 0, // Remove border radius
                  "&:hover": {
                    backgroundColor: "#ffffff",
                    color: "#333333", // Change color on hover
                  },
                  fontFamily:
                    "'Proxima Nova', 'Helvetica Neue', Helvetica, Roboto, Arial, sans-serif",
                  textTransform: "uppercase",
                  letterSpacing: "0.40rem",
                  lineHeight: "1rem",
                  color: "#ffffff", // Default text color
                  fontWeight: "600",
                }}
                // onClick={() => navigate("/product-list")}
              >
                ADD TO CART
              </Button>
            </Box>

            {/* Product Info */}
            <Box sx={{ mt: 4 }}>
              <Typography variant="h6" gutterBottom>
                Product Info
              </Typography>
              <Typography variant="body2" color="text.secondary">
                I'm a product detail. I'm a great place to add more information
                about your product such as sizing, material, care and cleaning
                instructions. This is also a great space to write what makes
                this product special and how your customers can benefit from
                this item.
              </Typography>
            </Box>

            {/* Return & Refund Policy */}
            <Box sx={{ mt: 4 }}>
              <Divider />
              <Typography variant="h6" sx={{ mt: 2 }}>
                Return & Refund Policy
              </Typography>
            </Box>

            {/* Shipping Info */}
            <Box sx={{ mt: 4 }}>
              <Divider />
              <Typography variant="h6" sx={{ mt: 2 }}>
                Shipping Info
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </Box>
      <ProductDetails />
    </div>
  );
};

export default ProductPage;

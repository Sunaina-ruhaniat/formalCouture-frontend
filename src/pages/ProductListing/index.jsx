import React from "react";
import "./styles.css";
import { Grid, Typography, Card, CardMedia, CardContent } from "@mui/material";
import { useNavigate } from "react-router-dom";
import PartywearPage from "pages/HomePage/components/PartyWear";

const ProductListing = () => {
  const navigate = useNavigate();

  const products = Array.from({ length: 18 }, (_, index) => ({
    id: index + 1,
    primaryImage: `/assets/images/item${(index % 3) + 1}.png`,
    hoverImage: `/assets/images/item${(index % 3) + 1}-hover.png`,
    title: `Product ${index + 1}`,
    price: `$${(80 + index * 5).toFixed(2)}`,
  }));

  return (
    <>
      <PartywearPage />
      <div style={{ padding: "20px", marginLeft: "120px" }}>
        <Grid container spacing={3}>
          {products.map((product) => (
            <Grid item xs={12} sm={6} md={4} key={product.id}>
              <Card
                elevation={0}
                style={{
                  position: "relative",
                  boxShadow: "none",
                  overflow: "hidden",
                  cursor: "pointer",
                  height: "600x",
                }}
                className="product-card"
                onClick={() => navigate("/product-details")}
              >
                {/* Product Image */}
                <div
                  style={{
                    position: "relative",
                    width: "100%",
                    paddingBottom: "150%", // Maintain aspect ratio
                  }}
                >
                  <CardMedia
                    component="img"
                    image={product.primaryImage}
                    alt={product.title}
                    className="primary-image"
                  />
                  {/* Hover Text */}
                  <div className="hover-text">
                    <Typography variant="body1">Quick View</Typography>
                  </div>
                </div>
              </Card>
              <CardContent>
                <Typography
                  variant="body1"
                  align="center"
                  style={{ fontWeight: 500, marginBottom: "5px" }}
                >
                  {product.title}
                </Typography>
                <Typography
                  variant="body2"
                  align="center"
                  style={{ fontWeight: 400 }}
                >
                  {product.price}
                </Typography>
              </CardContent>
            </Grid>
          ))}
        </Grid>
      </div>
    </>
  );
};

export default ProductListing;

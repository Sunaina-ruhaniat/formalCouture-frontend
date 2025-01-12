import React, { useEffect } from "react";
import "./styles.css";
import { Grid, Typography, Card, CardMedia, CardContent } from "@mui/material";
import { useNavigate } from "react-router-dom";
import PartywearPage from "pages/HomePage/components/PartyWear";
import { observer } from "mobx-react"; // Import observer after installing mobx-react
import productStore from "stores/productStore"; // Import the productStore

const BASE_URL = "http://localhost:8000"; // Adjust to your server's base URL

const ProductListing = observer(() => {
  const navigate = useNavigate();
  const { getProductList, productList } = productStore;

  useEffect(() => {
    getProductList(); // Fetch product list when the component mounts
  }, []);

  return (
    <>
      <PartywearPage />
      <div style={{ padding: "20px", marginLeft: "120px" }}>
        <Grid container spacing={3}>
          {productList && productList.length > 0 ? (
            productList.map((product) => (
              <Grid item xs={12} sm={6} md={4} key={product._id}>
                <Card
                  elevation={0}
                  style={{
                    position: "relative",
                    boxShadow: "none",
                    overflow: "hidden",
                    cursor: "pointer",
                    height: "600px",
                  }}
                  className="product-card"
                  onClick={() => navigate(`/product-details/${product._id}`)} // Navigate to product details page
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
                      image={`${BASE_URL}${product.images[0]}`} // Prepend base URL to the image path
                      alt={product.name}
                      className="primary-image"
                    />
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
                    {product.name}
                  </Typography>
                  <Typography
                    variant="body2"
                    align="center"
                    style={{ fontWeight: 400 }}
                  >
                    ${product.price} {/* Display product price */}
                  </Typography>
                </CardContent>
              </Grid>
            ))
          ) : (
            <Typography variant="h6" align="center">
              No products available.
            </Typography>
          )}
        </Grid>
      </div>
    </>
  );
});

export default ProductListing;

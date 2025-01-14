import React, { useState } from 'react';
import {
  Box,
  Typography,
  Button,
  Grid,
  Card,
  CardContent,
  CardMedia,
  TextField,
  Divider,
  InputAdornment,
  Select,
  MenuItem
} from '@mui/material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import PaymentIcon from '@mui/icons-material/Payment';

const ShoppingCart = () => {
  const [quantity, setQuantity] = useState(2);
  const [promoCode, setPromoCode] = useState('');

  const handleQuantityChange = (event) => {
    setQuantity(event.target.value);
  };

  const handlePromoChange = (event) => {
    setPromoCode(event.target.value);
  };

  const subtotal = 298 * quantity;

  return (
    <Box sx={{ padding: 4 }}>
      <Grid container spacing={4}>
        {/* Basket Section */}
        <Grid item xs={12} md={7}>
          <Typography variant="h5" gutterBottom>
            YOUR BASKET ({quantity})
          </Typography>
          <Card sx={{ display: 'flex', mb: 2 }}>
            <CardMedia
              component="img"
              sx={{ width: 150 }}
              image="https://via.placeholder.com/150"
              alt="Florian Dress"
            />
            <CardContent sx={{ flex: '1 0 auto' }}>
              <Typography variant="h6">FLORIAN DRESS</Typography>
              <Typography variant="body2">Colour: <strong>Navy Green</strong></Typography>
              <Typography variant="body2">In Stock</Typography>
              <Typography variant="body1" sx={{ mt: 1 }}>£298</Typography>
              <Box sx={{ display: 'flex', gap: 2, mt: 2 }}>
                <Select value={quantity} onChange={handleQuantityChange} size="small">
                  {[1, 2, 3, 4, 5].map((num) => (
                    <MenuItem key={num} value={num}>{num}</MenuItem>
                  ))}
                </Select>
                <Button variant="outlined">Move to Wishlist</Button>
                <Button variant="outlined" color="error">Remove</Button>
              </Box>
            </CardContent>
          </Card>
          <Button variant="text">&lt; Continue Shopping</Button>
        </Grid>

        {/* Summary Section */}
        <Grid item xs={12} md={5}>
          <Card sx={{ padding: 3 }}>
            <Typography variant="h6">SUMMARY</Typography>
            <Divider sx={{ my: 2 }} />
            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
              <Typography>Subtotal</Typography>
              <Typography>£{subtotal}</Typography>
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 1 }}>
              <Typography>Delivery</Typography>
              <Typography>£0</Typography>
            </Box>
            <Typography sx={{ mt: 1 }}>
              Shipping: Standard Delivery - Free over £150 (3-5 W)
            </Typography>
            <Divider sx={{ my: 2 }} />
            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
              <Typography variant="h6">TOTAL</Typography>
              <Typography variant="h6">£{subtotal}</Typography>
            </Box>
            <Typography variant="body2" sx={{ mt: 1 }}>
              Pay in 3 interest-free payments of £{(subtotal / 3).toFixed(2)} with PayPal.
            </Typography>
            <Button variant="contained" fullWidth sx={{ mt: 2 }} startIcon={<ShoppingCartIcon />}>
              CHECKOUT SECURELY
            </Button>
            <Box sx={{ display: 'flex', gap: 1, mt: 2 }}>
              <PaymentIcon />
              <LocalShippingIcon />
            </Box>
            <Divider sx={{ my: 2 }} />
            <Typography variant="subtitle1">APPLY PROMO CODE</Typography>
            <TextField
              fullWidth
              placeholder="Enter code here"
              value={promoCode}
              onChange={handlePromoChange}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <Button variant="contained">APPLY</Button>
                  </InputAdornment>
                ),
              }}
            />
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default ShoppingCart;

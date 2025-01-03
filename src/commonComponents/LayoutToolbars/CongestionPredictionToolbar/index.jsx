import { Box, Typography } from "@mui/material";
import Slider from "@mui/material/Slider";
import { useState } from "react";
import { getCongestionPredictionToolbarStyles } from "../styles";

export const CongestionPredictionToolbar = () => {
  const classes = getCongestionPredictionToolbarStyles();

  const [value, setValue] = useState(60);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const formatValue = (val) => `${val}m`;
  return (
    <Box sx={classes.wraper}>
      <Typography>Prediction window</Typography>
      <Slider
        defaultValue={value}
        valueLabelDisplay="on"
        onChange={handleChange}
        valueLabelFormat={formatValue}
        sx={classes.slider}
      />
    </Box>
  );
};

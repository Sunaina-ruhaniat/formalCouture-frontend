import { observer } from "mobx-react-lite";

import getTrafficOptions from "./TrafficFunctionalitty";

import { Box, Typography } from "@mui/material";
import { getTrafficItemStyles } from "./../styles";
const TrafficItems = ({ item, type }) => {
  const option = getTrafficOptions(item?.title.toLowerCase(), type);
  const classes = getTrafficItemStyles();

  return (
    <Box sx={classes.wrapper}>
      <Box className="objectIcon">{option?.icon}</Box>
      <Box>
        <Typography>{item?.value}</Typography>
        <Typography>{item?.title}</Typography>
      </Box>
    </Box>
  );
};

export default observer(TrafficItems);

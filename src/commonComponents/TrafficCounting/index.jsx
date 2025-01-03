import { observer } from "mobx-react-lite";

import { Box, Typography } from "@mui/material";
import TrafficItems from "./components/TrafficItems";
import TrafficIcon from "assets/svg/TrafficIcon.svg";
import { getStyles } from "./styles";
import Image from "components/Image";
import QueryStatsIcon from "@mui/icons-material/QueryStats";
import CustomTooltip from "components/Tooltip";
import TooltipIcon from "commonComponents/TooltipIcon";

const TrafficCounting = ({ data, type, tooltip }) => {
  const classes = getStyles();

  const titleOptions = {
    statistics: {
      title: "Statistics",
      icon: <QueryStatsIcon />,
    },
    traffic_counting: {
      title: "Traffic counting",
      icon: <Image src={TrafficIcon} alt="traffic_icon" />,
    },
  };

  return (
    <Box sx={classes.wrapper} className="trafficSection">
      <CustomTooltip
        placement="bottom"
        title={tooltip}
        arrow
        className="tooltipIcon"
      >
        <TooltipIcon />
      </CustomTooltip>
      <Box sx={classes.trafficHeader}>
        {titleOptions[type].icon}
        <Typography variant="h6">{titleOptions[type].title}</Typography>
      </Box>
      <Typography>Statistics for the last 1 hour</Typography>
      <Box sx={classes.trafficList}>
        {data?.map((item, i) => {
          return <TrafficItems key={i} item={item} type={type} />;
        })}
      </Box>
    </Box>
  );
};

export default observer(TrafficCounting);

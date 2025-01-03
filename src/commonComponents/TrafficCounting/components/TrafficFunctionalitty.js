import DirectionsCarFilledTwoToneIcon from "@mui/icons-material/DirectionsCarFilledTwoTone";
import LocalShippingTwoToneIcon from "@mui/icons-material/LocalShippingTwoTone";
import AirportShuttleTwoToneIcon from "@mui/icons-material/AirportShuttleTwoTone";
import TwoWheelerTwoToneIcon from "@mui/icons-material/TwoWheelerTwoTone";
import PedalBikeTwoToneIcon from "@mui/icons-material/PedalBikeTwoTone";
import DirectionsWalkTwoToneIcon from "@mui/icons-material/DirectionsWalkTwoTone";
import DirectionsCarFilledOutlinedIcon from "@mui/icons-material/DirectionsCarFilledOutlined";
import CompareArrowsOutlinedIcon from "@mui/icons-material/CompareArrowsOutlined";
import CommuteOutlinedIcon from "@mui/icons-material/CommuteOutlined";
import SpeedOutlinedIcon from "@mui/icons-material/SpeedOutlined";
import StackedLineChartOutlinedIcon from "@mui/icons-material/StackedLineChartOutlined";
import MovingOutlinedIcon from "@mui/icons-material/MovingOutlined";

const trafficTypes = {
  car: {
    icon: <DirectionsCarFilledTwoToneIcon />,
  },
  truck: {
    icon: <LocalShippingTwoToneIcon />,
  },
  bus: {
    icon: <AirportShuttleTwoToneIcon />,
  },
  monorbike: {
    icon: <TwoWheelerTwoToneIcon />,
  },
  bicycle: {
    icon: <PedalBikeTwoToneIcon />,
  },
  pedestrian: {
    icon: <DirectionsWalkTwoToneIcon />,
  },
};

const statisticTypes = {
  vechiclesInSystem: {
    icon: <DirectionsCarFilledOutlinedIcon />,
  },
  intersections: {
    icon: <CompareArrowsOutlinedIcon />,
  },
  saturated: {
    icon: <StackedLineChartOutlinedIcon />,
  },
  congestion: {
    icon: <CommuteOutlinedIcon />,
  },
  trafficTimingReplacements: {
    icon: <SpeedOutlinedIcon />,
  },
  mostCongested: {
    icon: <MovingOutlinedIcon />,
  },
};

function toCamelCase(str) {
  const text = str.split(" ");

  const result = text
    .map((word, index) =>
      index === 0 ? word : word.charAt(0).toUpperCase() + word.slice(1)
    )
    .join("");

  return result;
}

function getTrafficOptions(title, type) {
  if (type === "traffic_counting") {
    return trafficTypes?.[title];
  } else if (type === "statistics") {
    title = toCamelCase(title);
    return statisticTypes?.[title];
  }
}

export default getTrafficOptions;

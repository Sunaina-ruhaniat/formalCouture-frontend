import CustomTooltip from "components/Tooltip";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import { getStyles } from "./styles";

const BannerTooltip = ({ isLoading, text }) => {
  const classes = getStyles();
  return (
    !isLoading && (
      <CustomTooltip
        placement="bottom"
        title={text}
        arrow
        className="tooltipIcon"
      >
        <InfoOutlinedIcon sx={classes.tooltipIcon} />
      </CustomTooltip>
    )
  );
};

export default BannerTooltip;

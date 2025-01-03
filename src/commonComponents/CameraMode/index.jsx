import { Box, Stack, Divider } from "@mui/material";
import CameraOffIcon from "assets/svg/CameraOff.svg";
import CameraOnIcon from "assets/svg/CameraOn.svg";
import { getStyles } from "./styles";
import { observer } from "mobx-react-lite";

const CameraMode = ({ data }) => {
  const classes = getStyles();
  return (
    <Box sx={classes.wrapper}>
      <Box sx={classes.cameraModeHeader}>{data?.header}</Box>

      {data?.cameraMode?.map((item, i) => {
        return (
          <Stack
            direction={"column"}
            spacing={2}
            display={"flex"}
            alignItems={"center"}
            key={i}
          >
            <Box sx={classes.cameraModeTitle}>{item.title}</Box>
            <img
              src={item.isCameraOn ? CameraOnIcon : CameraOffIcon}
              alt="camera off"
              width={"40px"}
              height={"40px"}
            />
            <Box sx={classes.cameraModeAction}>
              {item.isCameraOn ? "ON" : "OFF"}
            </Box>
            {data?.cameraMode?.length - 1 > i && (
              <Divider orientation="horizontal" flexItem />
            )}
          </Stack>
        );
      })}
    </Box>
  );
};

export default observer(CameraMode);

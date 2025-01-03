import theme from "config/theme";

export const getTrafficItemStyles = () => {
  return {
    wrapper: {
      maxWidth: "218px",
      width: "100%",
      display: "flex",
      alignItems: "center",
      gridGap: "16px",
      padding: "12px",
      borderRadius: "8px",
      border: `1px solid ${theme.palette.secondary.componentBorder}`,
      backgroundColor: theme.palette.secondary.white,
      "& > .objectIcon": {
        padding: "7px",
        borderRadius: "8px",
        border: "1px solid #554FEB1A",
        background: theme.palette.main.lightPurple,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        "& > svg": {
          fontSize: "20px",
          color: theme.palette.main.purple,
        },
      },
      "& > div > p:nth-of-type(1)": {
        fontSize: "32px",
        fontWeight: 600,
        color: "#102147",
        fontFamily: "Lato",
      },
      "& > div > p:nth-of-type(2)": {
        fontWeight: 600,
        color: "#44546F",
        fontFamily: "Lato",
      },
    },
  };
};

export const getStyles = () => {
  return {
    wrapper: {
      position: "relative",
      "& > .tooltipIcon": {
        position: "absolute",
        top: "10px",
        right: "10px",
      },
      "& > p": {
        fontFamily: "Roboto",
        fontWeight: 400,
        fontSize: "13px",
        color: "#939393",
      },
    },
    trafficList: {
      display: "flex",
      flexDirection: "column",
      marginTop: "15px",
      gridGap: "12px",
    },
    trafficHeader: {
      display: "flex",
      alignItems: "center",
      gridGap: "10px",
      marginBottom: "10px",
      "& img": {
        maxWidth: "18px",
        height: "18px",
        width: "100%",
      },
      "& svg": {
        fontSize: "18px",
      },
      "& h6": {
        color: theme.palette.primary.dark,
        fontFamily: "Lato",
        fontWeight: 700,
        fontSize: "20px",
      },
    },
  };
};

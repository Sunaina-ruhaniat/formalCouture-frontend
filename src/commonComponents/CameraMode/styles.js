import theme from "config/theme";

export const getStyles = () => {
  return {
    wrapper: {
      height: "690px",
      maxHeight: "100%",
      borderRadius: "8px",
      border: `1px solid #E6E6E6`,
      backgroundColor: "#FFFFFF",
      display: "flex",
      gridGap: "1.5rem",
      padding: "1rem 1rem",
      flexDirection: "column",

      "& > p": {
        fontFamily: "Roboto",
        fontWeight: 400,
        fontSize: "13px",
        color: "#939393",
      },
    },
    cameraModeList: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      gridGap: "15px",
      flexWrap: "wrap",
    },
    cameraModeTitle: {
      color: theme.palette.primary.dark,
      fontFamily: "Lato",
      fontWeight: 400,
      fontSize: "18px",
    },

    cameraModeAction: {
      color: theme.palette.secondary.black,
      fontFamily: "Lato",
      fontWeight: 700,
      fontSize: "20px",
      textTransform: "uppercase",
    },
    cameraModeHeader: {
      display: "flex",
      justifyContent: "center",
      gridGap: "10px",
      color: theme.palette.secondary.mediumGrey,
      fontFamily: "Lato",
      fontWeight: 500,
      fontSize: "14px",
      textTransform: "uppercase",
    },
  };
};

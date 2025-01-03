import theme from "config/theme";

export const getTrafficProgramToolbarStyles = () => {
  return {
    modal: {
      borderRadius: 0,
      borderTop: `1px solid ${theme.palette.main.purple}`,
      maxWidth: "455px",
      minHeight: "auto",
    },
    icon: {
      cursor: "pointer",
      fontSize: "20px",
      transition: "0.5s",
      color: theme.palette.main.blueGrey,
      "&:hover": {
        transform: "scale(1.2)",
      },
    },
    header: {
      padding: "15px 25px",
      background: `${theme.palette.main.purple}1A`,
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      "& > p": {
        fontFamily: "Roboto",
        fontSize: "16px",
        color: theme.palette.primary.dark,
        fontWeight: 500,
      },
    },
    body: {
      padding: "15px 25px",
      display: "flex",
      flexDirection: "column",
      rowGap: "20px",
      "& > p": {
        fontFamily: "Lato",
        fontWeight: 400,
        fontSize: "16px",
        color: theme.palette.primary.dark,
      },
      "& .inputField": {
        width: "100%",
        "& .MuiOutlinedInput-root": {
          height: "28px",
          fontSize: "15px",
          fontWeight: 400,
          color: theme.palette.button.grey,
        },
        "& .MuiOutlinedInput-notchedOutline": {
          borderColor: `${theme.palette.button.mediumGrey} !important`,
          borderWidth: "1px !important",
        },
        "& .Mui-focused": {
          "& .MuiOutlinedInput-notchedOutline": {
            borderColor: `${theme.palette.button.mediumGrey} !important`,
            borderWidth: "1px !important",
          },
        },
      },
    },
    footer: {
      display: "flex",
      alignItems: "center",
      justifyContent: "flex-end",
      marginTop: "30px",
      "& > button": {
        width: "min-content",
        fontFamily: "Roboto",
        fontSize: "14px",
        fontWeight: 500,
        borderRadius: "3px",
      },
      "& > .cancelBtn": {
        background: "transparent",
        border: "none",
        color: theme.palette.primary.dark,
        "&:hover": {
          boxShadow: "none",
          transform: "scale(1.1)",
        },
      },
    },
    updateBtn: {
      padding: "1px 12px",
      width: "100px",
      height: "55px",
      background: "transparent",
      color: theme.palette.main.purple,
      fontSize: "15px",
      fontFamily: "Lato",
      "&:hover": {
        backgroundColor: theme.palette.main.purple,
        color: theme.palette.secondary.white,
      },
    },
  };
};

export const getCongestionPredictionToolbarStyles = () => {
  return {
    wraper: {
      padding: "10px 16px",
      height: "55px",
      borderRadius: "6px",
      border: `1px solid ${theme.palette.button.mediumGrey}`,
      background: theme.palette.secondary.white,
      display: "flex",
      columnGap: "5px",
      alignItems: "end",
      "& > p": {
        fontFamily: "Lato",
        fontSize: "15px",
        fontWeight: 700,
        color: theme.palette.primary.dark,
      },
    },
    slider: {
      width: "305px",
      color: theme.palette.secondary.green,
      borderRadius: "0 8px 8px 0",
      padding: "0",
      bottom: "5px",
      "& .MuiSlider-thumb": {
        height: "24px",
        width: "24px",
        border: `3px solid ${theme.palette.secondary.white}`,
      },
      "& .MuiSlider-valueLabel": {
        fontSize: "16px",
        fontWeight: 700,
        fontFamily: "Lato",
        top: 0,
        position: "unset",
        padding: 0,
        backgroundColor: "unset",
        color: theme.palette.main.blueGrey,
      },
      "& .MuiSlider-track": {
        border: "none",
        height: 10,
      },
      "& .MuiSlider-rail": {
        opacity: 1,
        height: 10,
        backgroundColor: `${theme.palette.secondary.green}66`,
      },
    },
  };
};

import theme from "config/theme";

export const PageStyle = () => {
  return {
    wrapper: {
      box: "border-box",
      height: "100%",
    },
  };
};

const getStyles = () => {
  return {
    wrapper: {
      display: "grid",
      flexDirection: "column",
      background: theme.palette.secondary.white,
      border: `1px solid ${theme.palette.secondary.componentBorder}`,
      height: "100%",
      width: "100%",
      padding: "15px",
      "& innerbox": {
        height: "344px",
        width: "619px",
        padding: "5px",
      },
    },
  };
};


export default getStyles;

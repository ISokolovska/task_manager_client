import { createTheme } from "@mui/material/styles";
import { palette } from "./themePalette";
import { typography } from "./themeTypography";

// import { muiButton } from "./components/button.extend";

const globalTheme = createTheme({
  palette,
  typography,
});

export const theme = createTheme(
  {
    components: {
      MuiCssBaseline: {
        styleOverrides: {
          "@global": {
            html: {
              fontFamily: "'Raleway', sans-serif",
            },
            body: {
              margin: "0",
              padding: "0",
              boxSizing: "border-box",
              fontFamily: "'Raleway', sans-serif",
            },
          },
        },
      },

      // MuiModal: {
      //   styleOverrides: {},
      // },
      MuiButton: {
        variants: [
          {
            props: { variant: "outlined" },
            style: {
              width: "90px",
              // height: "45px",
              padding: "0.4rem",
              border: "1px solid ",
              borderColor: globalTheme.palette.primary.main,
              color: globalTheme.palette.secondary.contrastText,
              textTransform: "uppercase",
              ":hover": {
                color: globalTheme.palette.primary.main,
              },
            },
          },
          {
            props: { variant: "contained" },
            style: {
              width: "90px",
              height: "45px",
              padding: "0.4rem",
              color: globalTheme.palette.secondary.contrastText,

              backgroundColor: globalTheme.palette.secondary.dark,
              "&:hover": {
                backgroundColor: globalTheme.palette.secondary.main,
                transform: "translateY(-2px)",
              },
            },
          },
        ],
      },
    },
  },

  globalTheme
);

import { createTheme } from "@mui/material/styles";
import { palette } from "./themePalette";
import { typography } from "./themeTypography";

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
              fontSize: "1rem",
              fontFamily: "'Roboto', sans-serif",
            },
            body: {
              margin: "0",
              boxSizing: "border-box",
              fontFamily: "'Roboto', sans-serif",
              backgroundColor: globalTheme.palette.secondary.main,
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
              padding: "0.4rem",
              border: "1px solid ",
              borderColor: globalTheme.palette.primary.main,
              color: globalTheme.palette.secondary.main,
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
              padding: "0.4rem",
              color: globalTheme.palette.primary.main,
              // color: "#2363eb",
              backgroundColor: globalTheme.palette.primary.light,
              "&:hover": {
                backgroundColor: globalTheme.palette.primary.dark,
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

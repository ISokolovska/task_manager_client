import { createTheme } from "@mui/material/styles";
// import * as createPalette from "@material-ui/core/styles/createPalette";

declare module "@mui/material/styles/createPalette" {
  interface YellowPaletteColorOptions {
    main?: string;
    dark?: string;
  }
  interface YellowColorPalette {
    main: string;
    dark: string;
  }
  interface BluePaletteColorOptions {
    main?: string;
    dark?: string;
  }
  interface BlueColorPalette {
    main: string;
    dark: string;
  }
  interface PaletteOptions {
    yellow?: YellowPaletteColorOptions;
    blue?: BluePaletteColorOptions;
    // success?: PaletteColorOptions;
    // warning?: PaletteColorOptions;
  }
  interface Palette {
    yellow: YellowColorPalette;
    blue: BlueColorPalette;

    // success: PaletteColor;
    // warning: PaletteColor;
  }
}

declare module "@mui/material/Button" {
  interface ButtonPropsVariantOverrides {
    outlined: true;
    contained: true;
  }
}

const colors = {
  yellowMain: "#f9d13e",
  yellowBase: "#ebc22c",
  blueMain: "#2363eb",
};

export const theme = createTheme({
  palette: {
    yellow: {
      main: colors.yellowMain,
      // light: alpha(violetBase, 0.5),
      dark: colors.yellowBase,
      // contrastText:
    },
    blue: { main: colors.blueMain },
  },
  typography: {
    fontFamily: "'Roboto', sans-serif",
  },
  components: {
    // Name of the component
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
            backgroundColor: "#000",
          },
        },
      },
    },
    MuiButton: {
      variants: [
        {
          props: { variant: "outlined" },
          style: {
            width: "90px",
            padding: "0.4rem",
            border: "1px solid #2363eb",
            fontWeight: 700,
            fontSize: "1.02rem",
            letterSpacing: "0.00938em",
            lineHeight: "1.75",
            textTransform: "uppercase",
            ":hover": {
              color: "#1976d2",
            },
          },
        },
        {
          props: { variant: "contained" },
          style: {
            width: "90px",
            padding: "0.4rem",
            color: "#2363eb",
            backgroundColor: "#f9d13e",
            fontWeight: 700,
            fontSize: "1.02rem",
            letterSpacing: "0.00938em",
            lineHeight: "1.75",
            "&:hover": {
              backgroundColor: "#ebc22c",
              transform: "translateY(-2px)",
            },
          },
        },
      ],
    },
  },
});

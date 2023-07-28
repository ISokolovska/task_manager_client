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
      // contrastText:
      //   getContrastRatio(violetMain, "#fff") > 4.5 ? "#fff" : "#111",
    },
    blue: { main: colors.blueMain },
  },
  // typography: {
  //   fontWeightRegular: "500",
  // },
  components: {
    // Name of the component
    MuiButton: {
      variants: [
        {
          props: { variant: "outlined" },
          style: {
            color: "#fff",
            backgroundColor: "#1976d2",
            fontWeight: "500",
            fontSize: "0.875rem",
            lineHeight: "1.75",
            letterSpacing: "0.02857em",
            textTransform: "uppercase",
            ":hover": {
              color: "#1976d2",
            },
          },
        },
        // {
        //   props: { variant: "dashed", color: "secondary" },
        //   style: {
        //     // border: `4px dashed ${red[500]}`,
        //   },
        // },
      ],
    },
  },
});

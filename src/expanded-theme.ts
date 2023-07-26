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

  // interface TypographyVariants {
  //   poster: React.CSSProperties;
  // }

  // // allow configuration using `createTheme`
  // interface TypographyVariantsOptions {
  //   poster?: React.CSSProperties;
  // }
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
});

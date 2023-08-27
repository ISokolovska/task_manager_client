import { PaletteOptions } from "@mui/material/styles";
// import { blue, grey, yellow } from "@mui/material/colors";

declare module "@mui/material/styles" {
  interface Palette {
    // blue: Palette["primary"];
    blueGrey: Palette["secondary"];
  }

  interface PaletteOptions {
    // blue?: PaletteOptions["primary"];
    blueGrey?: PaletteOptions["secondary"];
  }
}

export const palette: PaletteOptions = {
  primary: { main: "#1565c0", light: "#bbdefb", contrastText: "#000" },
  secondary: {
    main: "#fdd835",
    dark: "#f9a825",
    contrastText: "#fff",
  },
  blueGrey: { main: "#cfd8dc" },

  // yellow: {
  //   main: "#2363eb",
  //   light: "#f9d13e",
  //   dark: "#ebc22c",
  //   contrastText: "#000",
  // },
};

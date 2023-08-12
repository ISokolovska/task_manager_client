// import "@mui/material/styles/createPalette";
// declare module "@mui/material/styles/createPalette" {
//   interface Palette {
//     yellow: PaletteColor;
//   }
//   interface PaletteOptions {
//     yellow: PaletteColorOptions;
//   }
// }

// const yellowMain = "#f9d13e";
// const yellowBase = "#ebc22c";
// // const blueMain = "#2363eb";

// export const colors = {
//   yellow: { main: yellowMain, light: yellowBase },
//   //   blue: { main: blueMain },
// };

import { PaletteOptions } from "@mui/material/styles/createPalette"; // Import the PaletteOptions type
// export interface ThemeColors {
//   // primary: string;
//   // secondary: string;
//   // success: string;
//   // error: string;
//   // ... add more colors here
//   yellowMain: string;
//   yellowBase: string;
//   blueMain: string;
// }

export const customPalette: PaletteOptions = {
  primary: {
    main: "#f9d13e", // your primary color
  },
  // secondary: {
  //   main: "#6c757d", // your secondary color
  // },
  // ... other palette colors
  // yellowMain: "#f9d13e",
  // yellowBase: "#ebc22c",
  // blueMain: "#2363eb",
};

// export const themePalette = {
//   // primary: "#f9d13e",
//   // secondary: "#ebc22c",
//   // success: "#28a745",
//   // error: "#dc3545",
//   // ... add more colors here
//   yellowMain: "#f9d13e",
//   yellowBase: "#ebc22c",
//   blueMain: "#2363eb",
// };

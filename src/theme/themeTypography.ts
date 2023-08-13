import { TypographyVariantsOptions } from "@mui/material";
import { palette } from "@mui/system";
import { theme } from "antd";

export const fontSize = {
  //   lg: "3rem",
  md: "1.5rem",
  sm: "1.02rem",
};

export const fontWeight = { sm: 400, md: 700, lg: 900 };

export const letterSpacing = {
  sm: "0em",
  md: "0.00938em",
  // lg: "0.125em",
};

export const lineHeight = {
  //   sm: "-0.01em",
  md: "1.334em",
  lg: "1.75em",
};

export const typography: TypographyVariantsOptions = {
  h1: {
    fontWeight: fontWeight.sm,
    fontSize: fontSize.md,
    lineHeight: lineHeight.md,
    letterSpacing: letterSpacing.sm,
  },
  h2: {
    // fontSize: "2rem", // Custom font size for h2
    // fontWeight: 600,
  },
  body1: {
    // fontSize: "1rem", // Custom font size for body1
  },
  button: {
    fontWeight: fontWeight.md,
    fontSize: fontSize.sm,
    letterSpacing: letterSpacing.md,
    lineHeight: lineHeight.lg,
  },
  // ... other typography variants
};

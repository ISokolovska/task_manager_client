import { TypographyVariantsOptions } from "@mui/material";

export const fontSize = {
  sm: "1.02rem",
  md: "2rem",
  lg: "3rem",
};

const fontWeight = { sm: 600, md: 700, lg: 900 };

const letterSpacing = {
  sm: "0.00938em",
  md: "0.02857em",
  // lg: "0.125em",
};

const lineHeight = {
  //   sm: "-0.01em",
  md: "1.334em",
  lg: "1.75em",
};

export const typography: TypographyVariantsOptions = {
  fontFamily: "'Raleway', sans-serif",

  h1: {
    fontWeight: fontWeight.lg,
    fontSize: fontSize.lg,
    lineHeight: lineHeight.md,
    letterSpacing: letterSpacing.md,
  },
  h2: {
    fontWeight: fontWeight.md,
    fontSize: fontSize.md,
    lineHeight: lineHeight.md,
    letterSpacing: letterSpacing.sm,
  },
  h3: {
    fontWeight: fontWeight.sm,
    fontSize: fontSize.sm,
    lineHeight: lineHeight.md,
    letterSpacing: letterSpacing.sm,
  },
  subtitle1: {
    fontWeight: fontWeight.sm,
    fontSize: fontSize.sm,
    lineHeight: lineHeight.md,
    letterSpacing: letterSpacing.sm,
  },
  body1: {
    // fontSize: "1rem", // Custom font size for body1
  },
  button: {
    fontWeight: fontWeight.sm,
    fontSize: fontSize.sm,
    // letterSpacing: letterSpacing.md,
    // lineHeight: lineHeight.lg,
  },
  // ... other typography variants
};

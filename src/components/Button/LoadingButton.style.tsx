// import styled from "styled-components";
// import { Button } from "@mui/material";

// export const LoadingButton = styled.Button`
//   padding: 0.4rem;
//   background-color: #f9d13e;
//   color: #2363eb;
//   font-weight: 500;

//   &:hover {
//     background-color: #ebc22c;
//     transform: translateY(-2px);
//   }
// `;

// import { theme } from "../../styles/theme";

// import { styled } from "@mui/material/styles";

// export const LoadingButton = styled(_LoadingButton)({
//     backgroundColor: theme.colors.background_color_button,

//     &:hover {
//     backgroundColor: theme.colors.background_color_button_hover,
//     // transform: translateY(-2px),
// //   }
// });

// import * as React from "react";
import { styled } from "@mui/system";
import { LoadingButton as _LoadingButton } from "@mui/lab";

export const LoadingButton = styled(_LoadingButton)(({ theme }) => ({
  //   color: theme.palette.primary.backgroundColorButton,
  backgroundColor: theme.palette.yellow.main,
  //   padding: theme.spacing(1),
  //   borderRadius: theme.shape.borderRadius,
}));

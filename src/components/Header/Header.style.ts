import { LoadingButton as _LoadingButton } from "@mui/lab";
import { styled } from "@mui/material/styles";

// export const LoadingButton = styled(_LoadingButton)`
//   padding: 0.4rem;
//   background-color: #f9d13e;
//   color: #2363eb;
//   font-weight: 500;

//   &:hover {
//     background-color: #ebc22c;
//     transform: translateY(-2px);
//   }
// `;

export const LoadingButton = styled(_LoadingButton)(({ theme }) => ({
  //   color: theme.palette.primary.contrastText,
  //   backgroundColor: theme.,
  //   padding: theme.spacing(1),
  //   borderRadius: theme.shape.borderRadius,
}));

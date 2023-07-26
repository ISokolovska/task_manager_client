import { LoadingButton as _LoadingButton } from "@mui/lab";
import { styled } from "@mui/material/styles";
import { Link } from "react-router-dom";

export const LoadingButton = styled(_LoadingButton)(({ theme }) => ({
  padding: "0.4rem",
  color: theme.palette.blue.main,
  backgroundColor: theme.palette.yellow.main,
  fontWeight: 500,

  "&:hover": {
    backgroundColor: theme.palette.yellow.dark,
    transform: "translateY(-2px)",
  },
}));

export const LinkItem = styled(Link)(({ theme }) => ({
  textDecoration: "none",
  color: theme.palette.blue.main,
  "&:hover": {
    textDecoration: "underline",
  },
}));

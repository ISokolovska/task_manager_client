import { styled } from "@mui/material/styles";
import { Link as _LinkItem } from "@mui/icons-material";

// export const LinkItem = styled(Link)`textDecoration: "none",
//   color: themePalette.primary,
//   "&:hover": {
//     textDecoration: "underline",
//   }`;

export const LinkItem = styled(_LinkItem)`
  && {
    /* color: ${({ theme }) => theme.palette.primary.main}; */
    /* background-color: ${({ theme }) => theme.palette.primary.main}; */
    /* color: white;
    padding: 10px 20px;
    border: none;
    cursor: pointer; */
  }
`;

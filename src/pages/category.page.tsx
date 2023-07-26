import React from "react";
import { Box, Button, Container, Typography } from "@mui/material";
import CategoryList from "../components/Categories/CategoryList/CategoryList";
import { LoadingButton } from "../components/Header/Header.style";
// import { LoadingButton } from "../components/Header/Header.style";

const CategoryPage = () => {
  return (
    <Container maxWidth="lg">
      <Box
        sx={{
          backgroundColor: "#ece9e9",
          mt: "2rem",
          height: "15rem",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Typography
          variant="h2"
          component="h1"
          sx={{ color: "#1f1e1e", fontWeight: 500 }}
        >
          CategoryPage
        </Typography>
        <Button
          variant="contained"
          sx={{
            backgroundColor: "#eee",
            "&:hover": { backgroundColor: "#ebc22c" },
          }}
        >
          Add category
        </Button>
        <LoadingButton
          sx={{
            backgroundColor: "#eee",
          }}

          // onClick={showModal}
        >
          Add category
        </LoadingButton>
      </Box>

      <CategoryList />
    </Container>
  );
};

export default CategoryPage;

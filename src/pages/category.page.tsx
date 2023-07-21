import React from "react";
import { Box, Container, Typography } from "@mui/material";
import CategoryList from "../components/Categories/CategoryList/CategoryList";
import ButtonAdd from "../components/Button/ButtonAdd";

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
      </Box>
      <ButtonAdd />
      <CategoryList />
    </Container>
  );
};

export default CategoryPage;

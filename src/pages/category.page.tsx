import React from "react";
import { Box, Container, Typography } from "@mui/material";
// import { persistedStore } from "../redux/store";
import CategoryList from "../components/Categories/CategoryList/CategoryList";
import CategoryAdd from "../components/Categories/CategoryAdd/CategoryAdd";

// interface ICategoryProps {
//   // setIsModalOpen: void;
//   open: boolean;
//   // handleClose?: any;
//   // children: any;
// }
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
        <CategoryAdd />
      </Box>

      <CategoryList />
    </Container>
  );
};

export default CategoryPage;

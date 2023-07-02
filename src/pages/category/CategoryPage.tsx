import React from "react";
import CategoryList from "../../components/Categories/CategoryList/CategoryList";
import ButtonAdd from "../../components/Button/ButtonAdd";
// import { Box } from "@mui/material";

const CategoryPage = () => {
  return (
    <main>
      <h1>CategoryPage</h1>
      <ButtonAdd />
      <CategoryList />
    </main>
  );
};

export default CategoryPage;

import React, { useEffect } from "react";
import { toast } from "react-toastify";
import { Box, Container, Grid, Typography } from "@mui/material";
import { useGetAllCategoriesQuery } from "../redux/api/categoryApi";

import FullScreenLoader from "../components/Loader/FullScreenLoader";
import CategoryItem from "../components/Categories/CategoryItem/CategoryItem";
import CategoryCreatePopup from "../components/Categories/CategoryCreatePopup/CategoryCreatePopup";

const CategoryPage = () => {
  const { isLoading, isError, data: categories } = useGetAllCategoriesQuery();

  useEffect(() => {
    if (isError) {
      toast.error("Sorry, we have some problem(category)");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoading]);

  useEffect(() => {
    console.log(categories);
  }, [categories]);
  if (isLoading) {
    return <FullScreenLoader />;
  }

  return (
    <Container
      sx={{
        height: "100vh",
        padding: "60px 0px",
        backgroundColor: "primary.light",
      }}
    >
      <CategoryCreatePopup />
      {!categories?.data?.length ? (
        <Box maxWidth="sm" sx={{ mx: "auto", py: "5rem" }}>
          <Typography>No categories at the moment</Typography>
        </Box>
      ) : (
        <Grid
          container
          rowGap={5}
          maxWidth="lg"
          sx={{
            margin: "0 auto",
            mt: "30px",
            gridAutoRows: "max-content",
          }}
        >
          {categories?.data?.map((category) => (
            <CategoryItem key={category.id} category={category} />
          ))}
        </Grid>
      )}
    </Container>
  );
};

export default CategoryPage;

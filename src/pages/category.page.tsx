import React, { useEffect } from "react";
import { Box, Container, Grid, Typography } from "@mui/material";
// import { persistedStore } from "../redux/store";
// import CategoryList from "../components/Categories/CategoryList/CategoryList";
import CreateCategory from "../components/Categories/CreateCategory/CreateCategory";
import { useGetAllCategoriesQuery } from "../redux/api/categoryApi";
import { toast } from "react-toastify";
import FullScreenLoader from "../components/Loader/FullScreenLoader";
import CategoryItem from "../components/Categories/CategoryItem/CategoryItem";

// interface ICategoryProps {
//   // setIsModalOpen: void;
//   open: boolean;
//   // handleClose?: any;
//   // children: any;
// }
const CategoryPage = () => {
  const {
    isLoading,
    isError,
    // error,
    data: categories,
  } = useGetAllCategoriesQuery();

  useEffect(() => {
    if (isError) {
      toast.error("Sorry, we have some problem(category)");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoading]);

  if (isLoading) {
    return <FullScreenLoader />;
  }
  return (
    // <Container maxWidth="lg">
    //   <Box
    //     sx={{
    //       backgroundColor: "#ece9e9",
    //       mt: "2rem",
    //       height: "15rem",
    //       display: "flex",
    //       alignItems: "center",
    //       justifyContent: "center",
    //     }}
    //   >
    //     <Typography
    //       variant="h2"
    //       component="h1"
    //       sx={{ color: "#1f1e1e", fontWeight: 500 }}
    //     >
    //       CategoryPage
    //     </Typography>
    //     <CreateCategory setOpenCategoryModal={() => console.log("open")} />
    //   </Box>

    //   <CategoryList />
    // </Container>
    <Container
      maxWidth={false}
      sx={{ backgroundColor: "#2363eb", height: "100vh" }}
    >
      <CreateCategory setOpenCategoryModal={() => console.log("open")} />
      {categories?.length === 0 ? (
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
            pt: "5rem",
            gridAutoRows: "max-content",
          }}
        >
          {categories?.map((category) => (
            <CategoryItem key={category.id} category={category} />
          ))}
        </Grid>
      )}
      {/* <CategoryList /> */}
    </Container>
  );
};

export default CategoryPage;

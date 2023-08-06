import React, { FC, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import { object, string, TypeOf } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Box,
  Button,
  ButtonGroup,
  CircularProgress,
  MenuItem,
  Modal,
  TextField,
  Typography,
} from "@mui/material";
import { useUpdateCategoryMutation } from "../../../redux/api/categoryApi";
import { ICategoryResponse } from "../../../types/category";

interface IUpdateCategoryProp {
  category: ICategoryResponse;
}

const updateCategorySchema = object({
  name: string().min(1).max(50).nonempty("Name is required"),
}).partial();

type IUpdateCategory = TypeOf<typeof updateCategorySchema>;

const CategoryEditPopup: FC<IUpdateCategoryProp> = ({ category }) => {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [updateCategory, { isLoading, isError, isSuccess }] =
    useUpdateCategoryMutation();

  const methods = useForm<IUpdateCategory>({
    resolver: zodResolver(updateCategorySchema),
  });

  useEffect(() => {
    if (isSuccess) {
      toast.success("Category updated successfully");
      setOpen(false);
    }

    if (isError) {
      toast.error("Sorry, category not updated");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoading]);

  useEffect(() => {
    if (methods.formState.isSubmitting) {
      methods.reset();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [methods.formState.isSubmitting]);

  useEffect(() => {
    if (category) {
      methods.reset({
        name: category.name,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [category]);

  const onSubmitHandler: SubmitHandler<IUpdateCategory> = (values) => {
    const newCategory = { id: category.id, name: values.name };

    updateCategory(newCategory);
  };

  return (
    <Box>
      <MenuItem sx={{ fontWeight: 500 }} onClick={handleOpen}>
        Edit
      </MenuItem>
      <Modal open={open}>
        <Box
          sx={{
            position: "fixed",
            top: "30%",
            left: "50%",
            transform: "translateX(-50%)",
            transition: "all 300ms ease",
            width: "400px",
            height: "280px",
            padding: "20px",
            backgroundColor: "white",
            zIndex: 1000,
          }}
        >
          <Box display="flex" justifyContent="space-between" sx={{ mb: 3 }}>
            <Typography variant="h5" component="h1">
              {/* `Edit ${category.name} category` */}
            </Typography>
            {isLoading && <CircularProgress size="1rem" color="primary" />}
          </Box>
          <FormProvider {...methods}>
            <Box
              component="form"
              noValidate
              autoComplete="off"
              onSubmit={methods.handleSubmit(onSubmitHandler)}
            >
              <TextField
                label="Name"
                fullWidth
                sx={{ mb: "1rem" }}
                {...methods.register("name")}
              />
              <ButtonGroup
                disableElevation
                variant="contained"
                aria-label="Disabled elevation buttons"
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  mt: "50px",
                }}
              >
                <Button type="button" variant="outlined" onClick={handleClose}>
                  cancel
                </Button>
                <Button
                  type="submit"
                  variant="outlined"
                  sx={{ backgroundColor: "#2363eb", color: "#fff" }}
                >
                  save
                </Button>
              </ButtonGroup>
            </Box>
          </FormProvider>
        </Box>
      </Modal>
    </Box>
  );
};

export default CategoryEditPopup;
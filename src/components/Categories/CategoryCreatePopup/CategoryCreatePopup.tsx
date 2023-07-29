import React, { useEffect } from "react";
import { toast } from "react-toastify";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import { object, string, TypeOf } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Box,
  Button,
  ButtonGroup,
  CircularProgress,
  Modal,
  TextField,
  Typography,
} from "@mui/material";
import { useCreateCategoryMutation } from "../../../redux/api/categoryApi";

const createCategorySchema = object({
  name: string().nonempty("Name is required"),
});

export type ICreateCategory = TypeOf<typeof createCategorySchema>;

const CategoryCreatePopup = () => {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [createCategory, { isLoading, isError, isSuccess }] =
    useCreateCategoryMutation();

  const methods = useForm<ICreateCategory>({
    resolver: zodResolver(createCategorySchema),
  });

  const onSubmitHandler: SubmitHandler<ICreateCategory> = (values) => {
    createCategory(values);
  };

  useEffect(() => {
    if (isSuccess) {
      toast.success("Category created successfully");
      handleClose();
    }
    // console.log("isError", isError, "gdfgdsg", isSuccess);
    if (isError) {
      toast.error("Sorry, category not created");
    }
  }, [isError, isSuccess]);

  useEffect(() => {
    if (methods.formState.isSubmitting) {
      methods.reset();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [methods.formState.isSubmitting]);

  return (
    <>
      <Button
        sx={{
          width: "auto",
        }}
        variant="contained"
        onClick={handleOpen}
      >
        Add category
      </Button>
      <Modal open={open} onClose={handleClose}>
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
              Create Category
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
    </>
  );
};

export default CategoryCreatePopup;

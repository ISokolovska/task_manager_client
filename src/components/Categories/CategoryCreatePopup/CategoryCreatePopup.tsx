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
  name: string().min(1).max(50).nonempty("Name is required"),
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
        variant="contained"
        sx={{
          width: "auto",
        }}
        onClick={handleOpen}
      >
        <Typography variant="button">Add category</Typography>
      </Button>
      <Modal open={open} onClose={handleClose}>
        <Box
          sx={{
            position: "fixed",
            top: "30%",
            left: "50%",
            transform: "translateX(-50%)",
            transition: "all 300ms ease",
            width: "450px",
            height: "310px",
            padding: "2rem",
            backgroundColor: "primary.light",
            zIndex: 1000,
          }}
        >
          <Box display="flex" justifyContent="space-between" sx={{ mb: 3 }}>
            <Typography variant="h2">Create Category</Typography>
            {isLoading && <CircularProgress size="1rem" />}
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
                variant="outlined"
                aria-label="Disabled elevation buttons"
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  mt: "50px",
                  "& .MuiButtonGroup-grouped:not(:last-of-type)": {
                    borderRightColor: "primary.main",
                  },
                }}
              >
                <Button type="button" onClick={handleClose}>
                  <Typography variant="button" sx={{ color: "primary.main" }}>
                    cancel
                  </Typography>
                </Button>
                <Button
                  type="submit"
                  sx={{
                    backgroundColor: "primary.main",
                  }}
                >
                  <Typography variant="button">save</Typography>
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

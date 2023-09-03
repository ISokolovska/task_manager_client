import React, { useEffect } from "react";
import {
  Box,
  Button,
  ButtonGroup,
  MenuItem,
  Modal,
  Typography,
} from "@mui/material";
import { useDeleteCategoryMutation } from "../../../redux/api/categoryApi";
import { toast } from "react-toastify";

export interface CategoryItemProps {
  id: number;
}

const CategoryDeletePopup = (props: CategoryItemProps) => {
  const [open, setOpen] = React.useState(false);

  const [deleteCategory, { isSuccess, isError, isLoading }] =
    useDeleteCategoryMutation();

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const onDeleteHandler = (id: number) => {
    deleteCategory(id);
  };

  useEffect(() => {
    if (isSuccess) {
      toast.success("Category deleted successfully");
    }

    if (isError) {
      toast.error("Sorry, we have some problem (Category)");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoading]);

  return (
    <Box>
      <MenuItem sx={{ fontWeight: 500 }} onClick={handleOpen}>
        Delete
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
            height: "180px",
            padding: "20px",
            backgroundColor: "primary.light",
            zIndex: 1000,
          }}
        >
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Do you want delete this category ?
          </Typography>
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
                no
              </Typography>
            </Button>
            <Button
              type="button"
              sx={{
                backgroundColor: "primary.main",
              }}
              onClick={() => {
                onDeleteHandler(props.id);
              }}
            >
              <Typography variant="button">yes</Typography>
            </Button>
          </ButtonGroup>
        </Box>
      </Modal>
    </Box>
  );
};

export default CategoryDeletePopup;

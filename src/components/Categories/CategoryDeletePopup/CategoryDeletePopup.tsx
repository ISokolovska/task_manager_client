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
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [deleteCategory, { isSuccess, isError, isLoading }] =
    useDeleteCategoryMutation();

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
            backgroundColor: "white",
            zIndex: 1000,
          }}
        >
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Do you want delete this category ?
          </Typography>
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
            <Button variant="outlined" onClick={handleClose}>
              no
            </Button>
            <Button
              variant="outlined"
              sx={{ backgroundColor: "#2363eb", color: "#fff" }}
              onClick={() => {
                onDeleteHandler(props.id);
              }}
            >
              yes
            </Button>
          </ButtonGroup>
        </Box>
      </Modal>
    </Box>
  );
};

export default CategoryDeletePopup;

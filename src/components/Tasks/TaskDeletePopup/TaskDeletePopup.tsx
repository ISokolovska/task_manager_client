import React, { useEffect } from "react";
import {
  Box,
  Button,
  ButtonGroup,
  MenuItem,
  Modal,
  Typography,
} from "@mui/material";
import { useDeleteTaskMutation } from "../../../redux/api/taskApi";
import { toast } from "react-toastify";

export interface TaskItemProps {
  id: number;
}

const TaskDeletePopup = (props: TaskItemProps) => {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [deleteTask, { isSuccess, isError, isLoading }] =
    useDeleteTaskMutation();

  const onDeleteHandler = (id: number) => {
    deleteTask(id);
  };

  useEffect(() => {
    if (isSuccess) {
      toast.success("Task deleted successfully");
    }

    if (isError) {
      toast.error("Sorry, we have some problem (Task)");
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
            Do you want delete this task ?
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

export default TaskDeletePopup;

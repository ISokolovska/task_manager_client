import React, { useState } from "react";
import { Box, Container, Typography } from "@mui/material";

import TaskList from "../components/Tasks/TaskList/TaskList";
import { LoadingButton } from "../components/Header/Header.style";
import { Modal } from "antd";
import { persistedStore } from "../redux/store";

const TaskPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  //  const dispatch = useAppDispatch();

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
    persistedStore.purge();
    //  dispatch(logout());
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };
  return (
    // <div>
    //   <h1>TaskPage</h1>
    // </div>
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
          TaskPage
        </Typography>
      </Box>
      <>
        <LoadingButton
          sx={{
            backgroundColor: "#eee",
          }}
          onClick={showModal}
        >
          Add category
        </LoadingButton>
        <Modal
          centered
          bodyStyle={{ height: 30 }}
          open={isModalOpen}
          onOk={handleOk}
          onCancel={handleCancel}
        ></Modal>
      </>
      <TaskList />
    </Container>
  );
};

export default TaskPage;

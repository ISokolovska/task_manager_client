import React, { useEffect } from "react";
import { toast } from "react-toastify";
import { Box, Container, Grid, Typography } from "@mui/material";

import FullScreenLoader from "../components/Loader/FullScreenLoader";
import TaskItem from "../components/Tasks/TaskItem/TaskItem";
import { useGetAllTasksQuery } from "../redux/api/taskApi";
import TaskCreatePopup from "../components/Tasks/TaskCreatePopup/TaskCreatePopup";
import { useParams } from "react-router-dom";

// import CategoryItem from "../components/Categories/CategoryItem/CategoryItem";
// import CategoryCreatePopup from "../components/Categories/CategoryCreatePopup/CategoryCreatePopup";

const TaskPage = () => {
  const { categoryId } = useParams<"categoryId">();

  const {
    isLoading,
    isError,
    data: tasks,
  } = useGetAllTasksQuery(categoryId || "", { skip: !categoryId });

  useEffect(() => {
    if (isError) {
      toast.error("Sorry, we have some problem(task)");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoading]);

  useEffect(() => {
    console.log(tasks);
  }, [tasks]);

  if (isLoading) {
    return <FullScreenLoader />;
  }

  return (
    <Container
      sx={{
        backgroundColor: "primary.light",
        height: "100vh",
        paddingTop: "60px",
      }}
    >
      <TaskCreatePopup />

      {!tasks?.data?.length ? (
        <Box maxWidth="sm" sx={{ mx: "auto", py: "5rem" }}>
          <Typography>No tasks at the moment</Typography>
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
          {tasks?.data?.map((task) => (
            <TaskItem key={task.id} task={task} />
          ))}
        </Grid>
      )}
    </Container>
  );
};

export default TaskPage;

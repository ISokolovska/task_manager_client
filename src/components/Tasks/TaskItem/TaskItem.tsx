import React, { FC } from "react";
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Grid,
  Link,
  Menu,
  Typography,
} from "@mui/material";
import TaskEditPopup from "../TaskEditPopup/TaskEditPopup";
import TaskDeletePopup from "../TaskDeletePopup/TaskDeletePopup";
import { ITaskResponse } from "../../../types/task";
import dayjs from "dayjs";

interface ITaskItemProps {
  task: ITaskResponse;
}
const TaskItem: FC<ITaskItemProps> = ({ task }) => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <Grid item xs={12} md={6} lg={4}>
        <Card
          sx={{
            maxWidth: 380,
            margin: "0 auto",
            overflow: "visible",
            border: "1px solid #2363eb",
          }}
        >
          <CardContent>
            <Box
              display="flex"
              alignItems="center"
              // sx={{ mt: "1rem" }}
            >
              <Typography
                variant="body1"
                sx={{
                  fontWeight: 500,
                  fontSize: "1.05rem",
                  backgroundColor: "#dad8d8",
                  p: "0.1rem 0.4rem",
                  borderRadius: 1,
                  mr: "1rem",
                }}
              >
                {task.name}
              </Typography>
              <Typography
                variant="body1"
                sx={{
                  fontWeight: 500,
                  fontSize: "1.05rem",
                  backgroundColor: "#dad8d8",
                  p: "0.1rem 0.4rem",
                  borderRadius: 1,
                  mr: "1rem",
                }}
              >
                {task.description}
              </Typography>

              <Typography
                variant="body1"
                sx={{
                  fontWeight: 500,
                  fontSize: "1.05rem",
                  backgroundColor: "#dad8d8",
                  p: "0.1rem 0.4rem",
                  borderRadius: 1,
                  mr: "1rem",
                }}
              >
                {dayjs(task.dateStart).format("DD.MM.YYYY")}
              </Typography>
              <Typography
                variant="body1"
                sx={{
                  fontWeight: 500,
                  fontSize: "1.05rem",
                  backgroundColor: "#dad8d8",
                  p: "0.1rem 0.4rem",
                  borderRadius: 1,
                  // mr: "1rem",
                }}
              >
                {dayjs(task.dateEnd).format("DD.MM.YYYY")}
              </Typography>
            </Box>
          </CardContent>
          <CardActions>
            <Button
              id="basic-button"
              aria-controls={open ? "basic-menu" : undefined}
              aria-haspopup="true"
              aria-expanded={open ? "true" : undefined}
              sx={{
                fontWeight: 700,
                fontSize: "1.002rem",
                lineHeight: "1.75",
              }}
              onClick={handleClick}
            >
              actions
            </Button>

            <Box
              display="flex"
              justifyContent="space-between"
              width="100%"
              sx={{ px: "0.5rem" }}
            >
              <Menu
                id="basic-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                MenuListProps={{
                  "aria-labelledby": "basic-button",
                }}
              >
                <TaskEditPopup task={task} />
                <TaskDeletePopup id={task.id} />
              </Menu>
            </Box>

            <Link href="tasks" underline="none">
              <Typography
                sx={{
                  fontWeight: 700,
                  fontSize: "1.002rem",
                  lineHeight: "1.75",
                  textTransform: "uppercase",
                }}
              >
                more
              </Typography>
            </Link>
          </CardActions>
        </Card>
      </Grid>
    </>
  );
};

export default TaskItem;

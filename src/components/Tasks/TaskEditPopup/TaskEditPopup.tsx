import React, { FC, useEffect } from "react";
import { toast } from "react-toastify";
import {
  Controller,
  FormProvider,
  SubmitHandler,
  useForm,
} from "react-hook-form";
import { coerce, date, object, string, TypeOf } from "zod";
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
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { useUpdateTaskMutation } from "../../../redux/api/taskApi";
import { ITaskResponse, IUpdateTask } from "../../../types/task";
import { TextareaAutosize } from "@mui/base";
import dayjs from "dayjs";
import { useParams } from "react-router-dom";

interface IUpdateTaskProp {
  task: ITaskResponse;
}

const updateTaskSchema = object({
  name: string().min(1).max(50).nonempty("Name is required"),
  description: string().max(150),
  dateStart: coerce.date(),
  dateEnd: coerce.date(),
}).partial();

// type IUpdateTaskForm = TypeOf<typeof updateTaskSchema>;

const TaskEditPopup: FC<IUpdateTaskProp> = ({ task }) => {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const { categoryId } = useParams<"categoryId">();

  const [updateTask, { isLoading, isError, isSuccess }] =
    useUpdateTaskMutation();

  const methods = useForm<IUpdateTask>({
    resolver: zodResolver(updateTaskSchema),
  });

  useEffect(() => {
    if (isSuccess) {
      toast.success("Task updated successfully");
      setOpen(false);
    }

    if (isError) {
      toast.error("Sorry, task not updated");
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
    if (task) {
      console.log(task);
      console.log(new Date(task.dateStart));
      methods.reset({
        name: task.name,
        description: task.description,
        dateStart: task.dateStart,
        dateEnd: task.dateEnd,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [task]);

  const onSubmitHandler: SubmitHandler<IUpdateTask> = (values) => {
    const newTask: IUpdateTask = {
      ...values,
      categoryId: +categoryId!,
      id: task.id,
    };
    // const newTask = {
    //   id: task.id,
    //   name: values.name,
    //   description: values.description,
    //   dateStart: values.dateStart,
    //   dateEnd: values.dateEnd,
    //   categoryId: number;
    // };
    updateTask(newTask);
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
            // height: "280px",
            padding: "20px",
            backgroundColor: "white",
            zIndex: 1000,
          }}
        >
          <Box display="flex" justifyContent="space-between" sx={{ mb: 3 }}>
            <Typography variant="h5" component="h1">
              {/* `Edit ${category.name} category` */}
            </Typography>
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
              <Controller
                name="description"
                control={methods.control}
                defaultValue=""
                render={({ field }) => (
                  <TextareaAutosize
                    {...field}
                    placeholder="Description"
                    minRows={8}
                    style={{
                      width: "100%",
                      border: "1px solid #c8d0d4",
                      fontFamily: "Roboto, sans-serif",
                      marginBottom: "1rem",
                      outline: "none",
                      fontSize: "1rem",
                      padding: "1rem",
                    }}
                  />
                )}
              />

              <Controller
                name="dateStart"
                control={methods.control}
                defaultValue={undefined}
                render={({ field }) => (
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker
                      label="Select Date"
                      value={dayjs(field.value)}
                      // value={field.value || null}
                      // value={field.value instanceof Date ? field.value : null}
                      onChange={(date: any) => field.onChange(date)}
                    />
                  </LocalizationProvider>
                )}
              />

              <Controller
                name="dateEnd"
                control={methods.control}
                defaultValue={undefined}
                render={({ field }) => (
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker
                      label="Select Date"
                      value={dayjs(field.value)}
                      // value={field.value || null}
                      // value={field.value instanceof Date ? field.value : null}
                      onChange={(date: any) => field.onChange(date)}
                    />
                  </LocalizationProvider>
                )}
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

export default TaskEditPopup;

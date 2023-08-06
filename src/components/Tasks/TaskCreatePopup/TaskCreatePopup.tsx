import React, { useEffect } from "react";
import { toast } from "react-toastify";
import {
  Controller,
  FormProvider,
  SubmitHandler,
  useForm,
} from "react-hook-form";
import { coerce, object, string } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Box,
  Button,
  ButtonGroup,
  CircularProgress,
  Modal,
  TextareaAutosize,
  TextField,
  Typography,
} from "@mui/material";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers";

import { useCreateTaskMutation } from "../../../redux/api/taskApi";
// import dayjs from "dayjs";
import { ICreateTask } from "../../../types/task";
import { useParams } from "react-router-dom";

const createTaskSchema = object({
  name: string().min(1).max(50).nonempty("Name is required"),
  description: string().max(150),
  dateStart: coerce.date(),
  dateEnd: coerce.date(),
});

// interface ParamTypes {
//   categoryId: number;
// }

// export type ICreateTask = TypeOf<typeof createTaskSchema>;

const TaskCreatePopup = () => {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  // const { categoryId } = useParams() as { categoryId: number };
  // const { categoryId } = useParams<{ categoryId: string }>();

  // const { categoryId } = useParams();
  const { categoryId } = useParams<"categoryId">();
  console.log(categoryId);

  // const categoryIdNumber = parseInt(categoryId, 10);
  // console.log(categoryIdNumber);
  // const { categoryId } = useParams<{ categoryId?: string }>();
  // const { categoryId } = useParams<ParamTypes>();

  const [createTask, { isLoading, isError, isSuccess }] =
    useCreateTaskMutation();

  const methods = useForm<ICreateTask>({
    resolver: zodResolver(createTaskSchema),
  });

  const onSubmitHandler: SubmitHandler<ICreateTask> = (values) => {
    console.log(values);
    if (categoryId !== undefined) {
      const newTask: ICreateTask = { ...values, categoryId: categoryId };
      createTask(newTask);
    }
  };

  useEffect(() => {
    if (isSuccess) {
      toast.success("Task created successfully");
      handleClose();
    }
    // console.log("isError", isError, "gdfgdsg", isSuccess);
    if (isError) {
      toast.error("Sorry, task not created");
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
        Add task
      </Button>
      <Modal open={open} onClose={handleClose}>
        <Box
          sx={{
            position: "fixed",
            top: "20%",
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
              Create Task
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
                defaultValue={null}
                render={({ field }) => (
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker
                      label="Select Date"
                      value={field.value}
                      onChange={(date: any) => field.onChange(date)}
                    />
                  </LocalizationProvider>
                )}
              />

              <Controller
                name="dateEnd"
                control={methods.control}
                defaultValue={null}
                render={({ field }) => (
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker
                      label="Select Date"
                      value={field.value}
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
    </>
  );
};

export default TaskCreatePopup;
// import React, { useState } from "react";
// import { useForm, FormProvider, SubmitHandler } from "react-hook-form";
// import { Box, Modal } from "@mui/material";
// import { LoadingButton } from "../../Header/Header.style";
// import FormInput from "../../FormInput/FormInput";
// import { useAddCategoryMutation } from "../../../redux/api/categoryApi";

// type CategoryFormValues = {
//   name: string;
//   dateCreated: Date;
// };

// function CategoryAdd() {
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   // const methods = useForm<CategoryFormValues>();
//   // const [data, isLoading, isError] = useAddCategoryMutation();
//   // const methods = useForm<LoginInput>({
//   //   resolver: zodResolver(loginSchema),
//   // });

//   // const { register, handleSubmit } = useForm<CategoryFormValues>();
//   // const onSubmit: SubmitHandler<CategoryFormValues> = (data) =>
//   //   console.log(data);

//   //  const dispatch = useAppDispatch();

//   const showModal = () => {
//     setIsModalOpen(true);
//   };

//   // const handleOk = () => {
//   //   setIsModalOpen(false);
//   //   persistedStore.purge();
//   //   //  dispatch(logout());
//   // };

//   const handleCancel = () => {
//     setIsModalOpen(false);
//   };

//   const onSubmitHandler: SubmitHandler<CategoryFormValues> = async (values) => {
//     // ? Executing the loginUser Mutation
//     try {
//       // await loginUser(values);
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   return (
//     <>
//       <LoadingButton
//         sx={{
//           backgroundColor: "#eee",
//         }}
//         onClick={showModal}
//       >
//         Add category
//       </LoadingButton>
//       <Modal open={isModalOpen}>
//         <FormProvider {...methods}>
//           <Box
//             component="form"
//             // onSubmit={handleSubmit(onSubmitHandler)}
//             noValidate
//             // autoComplete="off"
//             maxWidth="27rem"
//             width="100%"
//             sx={{
//               backgroundColor: "#e5e7eb",
//               p: { xs: "1rem", sm: "2rem" },
//               borderRadius: 2,
//             }}
//           >
//             <FormInput name="name" label="name" type="text" />
//             <FormInput name="dateCreated" label="dateCreated" type="date" />
//             {/* <input {...register("name")} /> */}
//             {/* <input {...register("dateCreated")} /> */}

//             <LoadingButton
//               type="button"
//               sx={{
//                 backgroundColor: "#eee",
//               }}
//               onClick={handleCancel}
//             >
//               cancel
//             </LoadingButton>
//             <LoadingButton
//               type="submit"
//               sx={{
//                 backgroundColor: "#eee",
//               }}
//               onClick={() => {
//                 setIsModalOpen(isModalOpen);
//               }}
//             >
//               save
//             </LoadingButton>
//           </Box>
//         </FormProvider>
//       </Modal>
//     </>
//   );
// }

// export default CategoryAdd;

import {
  Box,
  Button,
  ButtonGroup,
  CircularProgress,
  Modal,
  // TextareaAutosize,
  TextField,
  Typography,
} from "@mui/material";
import {
  // Controller,
  FormProvider,
  SubmitHandler,
  useForm,
} from "react-hook-form";
import { object, string, TypeOf } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
// import FileUpload from "../FileUpload/FileUpload";
// import { LoadingButton } from "@mui/lab";
import { FC, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useCreateCategoryMutation } from "../../../redux/api/categoryApi";
import { LoadingButton } from "../../Header/Header.style";

// export interface ICreateCategoryProp {
//   setOpenCategoryModal: (openCategoryModal: boolean) => void;
// }

const createCategorySchema = object({
  name: string().nonempty("Name is required"),
  // content: string().max(50).nonempty("Content is required"),
  // category: string().max(50).nonempty("Category is required"),
  // image: z.instanceof(File),
});

export type ICreateCategory = TypeOf<typeof createCategorySchema>;

const CreateCategory = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [createCategory, { isLoading, isError, isSuccess }] =
    useCreateCategoryMutation();

  const methods = useForm<ICreateCategory>({
    resolver: zodResolver(createCategorySchema),
  });

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const onSubmitHandler: SubmitHandler<ICreateCategory> = (values) => {
    // const formData = new FormData();

    // // formData.append("image", values.image);
    // formData.append("data", JSON.stringify(values));
    createCategory(values);
    // .unwrap();
  };

  useEffect(() => {
    if (isSuccess) {
      toast.success("Category created successfully");
      setIsModalOpen(false);
    }
    console.log("isError", isError, "gdfgdsg", isSuccess);
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
      <LoadingButton
        sx={{
          backgroundColor: "#eee",
        }}
        onClick={showModal}
      >
        Add category
      </LoadingButton>
      <Modal open={isModalOpen}>
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
                <Button type="button" variant="outlined" onClick={handleCancel}>
                  cancel
                </Button>
                <Button type="submit" variant="outlined">
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

export default CreateCategory;

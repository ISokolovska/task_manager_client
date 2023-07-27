import React, { useState } from "react";
import { useForm, FormProvider, SubmitHandler } from "react-hook-form";
import { Box, Modal } from "@mui/material";
import { LoadingButton } from "../../Header/Header.style";
import FormInput from "../../FormInput/FormInput";
import { useAddCategoryMutation } from "../../../redux/api/categoryApi";

type CategoryFormValues = {
  name: string;
  dateCreated: Date;
};

function CategoryAdd() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const methods = useForm<CategoryFormValues>();
  // const [data, isLoading, isError] = useAddCategoryMutation();
  // const methods = useForm<LoginInput>({
  //   resolver: zodResolver(loginSchema),
  // });

  // const { register, handleSubmit } = useForm<CategoryFormValues>();
  // const onSubmit: SubmitHandler<CategoryFormValues> = (data) =>
  //   console.log(data);

  //  const dispatch = useAppDispatch();

  const showModal = () => {
    setIsModalOpen(true);
  };

  // const handleOk = () => {
  //   setIsModalOpen(false);
  //   persistedStore.purge();
  //   //  dispatch(logout());
  // };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const onSubmitHandler: SubmitHandler<CategoryFormValues> = async (values) => {
    // ? Executing the loginUser Mutation
    try {
      // await loginUser(values);
    } catch (error) {
      console.log(error);
    }
  };

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
        <FormProvider {...methods}>
          <Box
            component="form"
            // onSubmit={handleSubmit(onSubmitHandler)}
            noValidate
            // autoComplete="off"
            maxWidth="27rem"
            width="100%"
            sx={{
              backgroundColor: "#e5e7eb",
              p: { xs: "1rem", sm: "2rem" },
              borderRadius: 2,
            }}
          >
            <FormInput name="name" label="name" type="text" />
            {/* <input {...register("name")} /> */}
            {/* <input {...register("dateCreated")} /> */}

            <LoadingButton
              type="button"
              sx={{
                backgroundColor: "#eee",
              }}
              onClick={handleCancel}
            >
              cancel
            </LoadingButton>
            <LoadingButton
              type="submit"
              sx={{
                backgroundColor: "#eee",
              }}
              onClick={() => {
                setIsModalOpen(isModalOpen);
              }}
            >
              save
            </LoadingButton>
          </Box>
          {/* <form onSubmit={handleSubmit(onSubmit)}> */}

          {/* </form> */}
        </FormProvider>
      </Modal>
    </>
  );
}

export default CategoryAdd;

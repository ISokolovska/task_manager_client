// import React, { useState } from "react";
// import { Box, Container, Typography } from "@mui/material";
// import CategoryList from "../components/Categories/CategoryList/CategoryList";
// import { LoadingButton } from "../components/Header/Header.style";
// import { Modal } from "antd";
// import { persistedStore, useAppDispatch } from "../redux/store";

// const ProfilePage = () => {
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   // const dispatch = useAppDispatch();

//   const showModal = () => {
//     setIsModalOpen(true);
//   };

//   const handleOk = () => {
//     setIsModalOpen(false);
//     persistedStore.purge();
//     // dispatch(addCategory());
//   };

//   const handleCancel = () => {
//     setIsModalOpen(false);
//   };
//   return (
//     <Container maxWidth="lg">
//       <>
//         <LoadingButton
//           sx={{
//             backgroundColor: "#eee",
//           }}
//           onClick={showModal}
//         >
//           Add category
//         </LoadingButton>
//         <Modal
//           centered
//           bodyStyle={{ height: 30 }}
//           open={isModalOpen}
//           onOk={handleOk}
//           onCancel={handleCancel}
//         ></Modal>
//       </>
//       <Typography
//         variant="h2"
//         component="h1"
//         sx={{ color: "#1f1e1e", fontWeight: 500 }}
//       >
//         Categories
//       </Typography>
//       <Box
//         sx={{
//           // backgroundColor: "#ece9e9",
//           mt: "2rem",
//           // height: "15rem",
//           display: "flex",
//           alignItems: "center",
//           justifyContent: "center",
//         }}
//       ></Box>

//       <CategoryList />
//     </Container>
//   );
// };

// export default ProfilePage;

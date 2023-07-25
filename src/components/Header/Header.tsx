import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Modal } from "antd";
import { AppBar, Box, Container, Toolbar } from "@mui/material";

import {
  persistedStore,
  useAppDispatch,
  useAppSelector,
} from "../../redux/store";
import { logout } from "../../redux/features/auth/userSlice";
import { LoadingButton } from "./Header.style";

const Header = () => {
  const navigate = useNavigate();
  const user = useAppSelector((state) => state.userState.user);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const dispatch = useAppDispatch();

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
    persistedStore.purge();
    dispatch(logout());
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <AppBar position="static">
      <Container maxWidth="lg">
        <Toolbar>
          <Box display="flex" sx={{ ml: "auto" }}>
            {!user && (
              <>
                <LoadingButton
                  sx={{ mr: 2 }}
                  onClick={() => navigate("/register")}
                >
                  SignUp
                </LoadingButton>
                <LoadingButton onClick={() => navigate("/login")}>
                  Login
                </LoadingButton>
              </>
            )}
            {user && (
              <>
                <LoadingButton
                  sx={{ backgroundColor: "#eee" }}
                  onClick={showModal}
                >
                  Logout
                </LoadingButton>
                <Modal
                  centered
                  bodyStyle={{ height: 30 }}
                  open={isModalOpen}
                  onOk={handleOk}
                  onCancel={handleCancel}
                ></Modal>
              </>
            )}
            {user && user?.role === "admin" && (
              <LoadingButton
                sx={{ backgroundColor: "#eee", ml: 2 }}
                onClick={() => navigate("/admin")}
              >
                Admin
              </LoadingButton>
            )}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Header;

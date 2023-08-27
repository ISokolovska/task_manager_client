import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Modal } from "antd";
import { AppBar, Box, Button, Container, Toolbar } from "@mui/material";

import {
  persistedStore,
  useAppDispatch,
  useAppSelector,
} from "../../redux/store";
import { logout } from "../../redux/features/auth/userSlice";

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
                <Button
                  variant="contained"
                  sx={{
                    mr: 2,
                  }}
                  onClick={() => navigate("/register")}
                >
                  SignUp
                </Button>
                <Button variant="contained" onClick={() => navigate("/login")}>
                  Login
                </Button>
              </>
            )}
            {user && (
              <>
                <Button variant="contained" onClick={showModal}>
                  Logout
                </Button>
                <Modal
                  centered
                  bodyStyle={{ height: 30 }}
                  open={isModalOpen}
                  onOk={handleOk}
                  onCancel={handleCancel}
                ></Modal>
              </>
            )}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Header;

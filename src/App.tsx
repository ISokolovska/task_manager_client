import React, { Suspense, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { CssBaseline } from "@mui/material";

import Layout from "./components/Layout/layout";
import RequireUser from "./components/requireUser";
import FullScreenLoader from "./components/Loader/FullScreenLoader";

import { logout, setUser } from "./redux/features/auth/userSlice";
import { persistedStore, useAppDispatch, useAppSelector } from "./redux/store";
import { getTokenSelector } from "./redux/features/auth/userSelectors";
import { useGetMeQuery } from "./redux/api/userApi";

const LoginPage = React.lazy(() => import("./pages/login.page"));
const RegisterPage = React.lazy(() => import("./pages/register.page"));
const HomePage = React.lazy(() => import("./pages/home.page"));
const CategoryPage = React.lazy(() => import("./pages/category.page"));
const TaskPage = React.lazy(() => import("./pages/task.page"));
const AdminPage = React.lazy(() => import("./pages/admin.page"));
const UnauthorizePage = React.lazy(() => import("./pages/unauthorize.page"));
const ProfilePage = React.lazy(() => import("./pages/profile.page"));

const App = () => {
  const isLoggedIn = useAppSelector(getTokenSelector);
  const { data, error, isLoading } = useGetMeQuery(
    { token: isLoggedIn },
    {
      skip: !isLoggedIn,
    }
  );
  const dispatch = useAppDispatch();

  useEffect(() => {
    // if (isLoggedIn && data) {
    //   console.log(data);
    //   dispatch(setUser(data));
    // }
    if (error) {
      persistedStore.purge();
      dispatch(logout());
    }
  }, [data, error, dispatch, isLoggedIn]);

  if (isLoading) return <FullScreenLoader />;

  return (
    <>
      <CssBaseline />
      <ToastContainer />
      <Suspense>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<HomePage />} />
            {/* Private Route */}
            <Route element={<RequireUser allowedRoles={["user", "admin"]} />}>
              <Route path="categories" element={<CategoryPage />} />
              <Route path="tasks" element={<TaskPage />} />
              <Route path="profile" element={<ProfilePage />} />
            </Route>
            <Route element={<RequireUser allowedRoles={["admin"]} />}>
              <Route path="admin" element={<AdminPage />} />
            </Route>
            <Route path="unauthorized" element={<UnauthorizePage />} />
          </Route>

          <Route path="login" element={<LoginPage />} />
          <Route path="register" element={<RegisterPage />} />
        </Routes>
      </Suspense>
    </>
  );
};

export default App;

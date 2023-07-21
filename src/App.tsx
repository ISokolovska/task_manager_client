import React, { Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { CssBaseline } from "@mui/material";
import Layout from "./components/Layout/layout";
import RequireUser from "./components/requireUser";

const LoginPage = React.lazy(() => import("./pages/login.page"));
const RegisterPage = React.lazy(() => import("./pages/register.page"));
const HomePage = React.lazy(() => import("./pages/home.page"));
const CategoryPage = React.lazy(() => import("./pages/category.page"));
const TaskPage = React.lazy(() => import("./pages/task.page"));
const AdminPage = React.lazy(() => import("./pages/admin.page"));
const UnauthorizePage = React.lazy(() => import("./pages/unauthorize.page"));

const App = () => {
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

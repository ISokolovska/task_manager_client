// import routes from "./routes/routes";
// import { useRoutes } from "react-router-dom";

// const App = () => {
//   const content = useRoutes(routes);
//   return content;
// };
// export default App;

import React, { Suspense } from "react";
import { Routes, Route } from "react-router-dom";

import MainLayout from "./layout/MainLayout";
import LoadingScreen from "./components/LoadingScreen";
import NotFound from "./pages/NotFound";

const Login = React.lazy(() => import("./pages/auth/LoginPage"));
const Register = React.lazy(() => import("./pages/auth/RegisterPage"));
const Home = React.lazy(() => import("./pages/home/HomePage"));
const Categories = React.lazy(() => import("./pages/category/CategoryPage"));
const Tasks = React.lazy(() => import("./pages/task/TaskPage"));

const App = () => {
  return (
    <Suspense fallback={<LoadingScreen />}>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Home />} />
          <Route path="category" element={<Categories />} />
          <Route path="task" element={<Tasks />} />

          {/* <Route element={<PublicRoute />}> */}
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
          {/* </Route> */}
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </Suspense>
  );
};

export default App;

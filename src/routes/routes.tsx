// import { Suspense, lazy } from "react";
// import type { RouteObject } from "react-router";
// import LoadingScreen from "../components/LoadingScreen";
// import MainLayout from "../layout/MainLayout";
// // import AuthGuard from "../components/AuthGuard";
// import GuestGuard from "../components/GuestGuard";

// const Loadable = (Component: any) => (props: JSX.IntrinsicAttributes) =>
//   (
//     <Suspense fallback={<LoadingScreen />}>
//       <Component {...props} />
//     </Suspense>
//   );

// // *  AUTHENTICATION PAGES
// const Login = Loadable(lazy(() => import("../pages/auth/LoginPage")));
// const Register = Loadable(lazy(() => import("../pages/auth/RegisterPage")));

// //  * HOME PAGE
// const Home = Loadable(lazy(() => import("../pages/home/HomePage")));

// //  * CATEGORIES PAGE
// const Categories = Loadable(
//   lazy(() => import("../pages/category/CategoryPage"))
// );

// //  * TASKS PAGE
// const Tasks = Loadable(lazy(() => import("../pages/task/TaskPage")));

// const routes: RouteObject[] = [
//   {
//     path: "authentication",
//     children: [
//       {
//         path: "login",
//         element: (
//           <GuestGuard>
//             <Login />
//           </GuestGuard>
//         ),
//       },
//       {
//         path: "register",
//         element: (
//           <GuestGuard>
//             <Register />
//           </GuestGuard>
//         ),
//       },
//     ],
//   },

//   {
//     path: "*",
//     element: <MainLayout />,
//     children: [
//       {
//         index: true,
//         element: (
//           // <AuthGuard>
//           <Home />
//           // </AuthGuard>
//         ),
//       },
//     ],
//   },

//   {
//     path: "categories",
//     element: <MainLayout />,
//     children: [
//       {
//         path: ":id",
//         element: (
//           // <AuthGuard>
//           <Categories />
//           // </AuthGuard>
//         ),
//       },
//     ],
//   },
//   {
//     path: "tasks",
//     element: <MainLayout />,
//     children: [
//       {
//         path: ":id",
//         element: (
//           // <AuthGuard>
//           <Tasks />
//           // </AuthGuard>
//         ),
//       },
//     ],
//   },
// ];

// export default routes;

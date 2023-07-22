import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
// import { RootState } from "../store";

import {
  IGenericResponse,
  // LoginRequest,
  // MessageResponse,
  // RegisterData,
  // UserResponse,
} from "../../types/user";

// export const authApi = createApi({
//   reducerPath: "authApi",
//   baseQuery: fetchBaseQuery({
//     baseUrl: `${REACT_APP_BASE_URL}`,
//     prepareHeaders: (headers, { getState }) => {
//       // By default, if we have a token in the store, let's use that for authenticated requests
//       const { token } = (getState() as RootState).userState;
//       if (token) {
//         headers.set("authorization", `Bearer ${token}`);
//       }
//       return headers;
//     },
//   }),
//   tagTypes: ["user"],
//   endpoints: (builder) => ({
//     login: builder.mutation<UserResponse, LoginRequest>({
//       query: (credentials) => ({
//         url: "login",
//         method: "POST",
//         body: credentials,
//       }),
//     }),
//     protected: builder.mutation<{ message: string }, void>({
//       query: () => "protected",
//     }),
//     // registerUser: builder.mutation<MessageResponse, RegisterData>({
//     //   query: (data) => ({
//     //     url: "auth/register",
//     //     method: "POST",
//     //     body: data,
//     //   }),
//     // }),
//     // logInUser: builder.mutation<UserResponse, LoginRequest>({
//     //   query: (credentials) => ({
//     //     url: "login",
//     //     method: "POST",
//     //     body: credentials,
//     //   }),
//     // }),
//     // logOutUser: builder.mutation({
//     //   query: () => ({
//     //     url: "logout",
//     //   }),
//     // }),
//   }),
// });

// export const {
//   // useRegisterUserMutation,
//   useLoginMutation,
//   // useLogOutUserMutation,
// } = authApi;

import { userApi } from "../api/userApi";

import { LoginInput } from "../../pages/login.page";
import { RegisterInput } from "../../pages/register.page";
import { IServerResponse } from "./interfaces/server-responce";

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.REACT_APP_BASE_URL}/auth`,
  }),
  endpoints: (builder) => ({
    registerUser: builder.mutation<IGenericResponse, RegisterInput>({
      query(data) {
        return {
          url: "/signup",
          method: "POST",
          body: data,
        };
      },
    }),
    loginUser: builder.mutation<IServerResponse<{ token: string }>, LoginInput>(
      {
        query(data) {
          return {
            url: "/signin",
            method: "POST",
            body: data,
          };
        },
        // async onQueryStarted(args, { dispatch, queryFulfilled }) {
        //   console.log(args);
        //   try {
        //     await queryFulfilled;
        //     await dispatch(userApi.endpoints.getMe.initiate(null));
        //   } catch (error) {}
        // },
      }
    ),
    // verifyEmail: builder.mutation<
    //   IGenericResponse,
    //   { verificationCode: string }
    // >({
    //   query({ verificationCode }) {
    //     return {
    //       url: `verifyemail/${verificationCode}`,
    //       method: "GET",
    //     };
    //   },
    // }),
    logoutUser: builder.mutation<void, void>({
      query() {
        return {
          url: "/logout",
          credentials: "include",
        };
      },
    }),
  }),
});

export const {
  useLoginUserMutation,
  useRegisterUserMutation,
  useLogoutUserMutation,
  // useVerifyEmailMutation,
} = authApi;

import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { RootState } from "../store";
import { BASE_URL } from "../utils/apiUrl";
import {
  LoginRequest,
  MessageResponse,
  RegisterData,
  UserResponse,
} from "../../types/user";

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${BASE_URL}`,
    prepareHeaders: (headers, { getState }) => {
      // By default, if we have a token in the store, let's use that for authenticated requests
      const token = (getState() as RootState).auth.token;
      if (token) {
        headers.set("authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  tagTypes: ["user"],
  endpoints: (builder) => ({
    registerUser: builder.mutation<MessageResponse, RegisterData>({
      query: (data) => ({
        url: "register",
        method: "POST",
        body: data,
      }),
    }),

    logInUser: builder.mutation<UserResponse, LoginRequest>({
      query: (credentials) => ({
        url: "login",
        method: "POST",
        body: credentials,
      }),
    }),
    logOutUser: builder.mutation({
      query: () => ({
        url: "logout",
      }),
    }),
  }),
});

export const {
  useRegisterUserMutation,
  useLogInUserMutation,
  useLogOutUserMutation,
} = authApi;

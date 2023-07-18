import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { RootState } from "../../store";
import { User } from "../../../types/user";
import { BASE_URL } from "../../utils/apiUrl";

// export interface User {
//   id: number;
//   email: string;
//   role: string;
// }

export interface UserResponse {
  user: User;
  token: string;
}

export interface RegisterRequest {
  email: string;
  password: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export const userApi = createApi({
  reducerPath: "userApi",
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
  tagTypes: ["user", "category", "task"],
  endpoints: (builder) => ({
    registerUser: builder.mutation<UserResponse, RegisterRequest>({
      query: (user) => ({
        url: "register",
        method: "POST",
        body: user,
        // providesTags: ["user"],
      }),
    }),

    logInUser: builder.mutation<UserResponse, LoginRequest>({
      query: (user) => ({
        url: "login",
        method: "POST",
        body: user,
        // providesTags: ["user"],
      }),
    }),

    logOutUser: builder.mutation({
      query: () => ({
        url: "logout",
      }),
    }),
    protected: builder.mutation<{ message: string }, void>({
      query: () => "protected",
    }),
  }),
});

export const { useLoginMutation, useProtectedMutation } = userApi;

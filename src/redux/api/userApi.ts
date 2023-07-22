// import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
// import { RootState } from "../store";
// import { UserDataResponse } from "../../types/user";

// export const userApi = createApi({
//   reducerPath: "userApi",
//   baseQuery: fetchBaseQuery({
//     baseUrl: process.env.NX_API_URL,
//     prepareHeaders: (headers, { getState }) => {
//       //   const { token } = (getState() as RootState).userState;
//       const token = (getState() as RootState).auth.token;

//       if (token) {
//         headers.set("authorization", `Bearer ${token}`);
//       }

//       return headers;
//     },
//   }),
//   tagTypes: ["user"],
//   endpoints: (builder) => ({
//     getUser: builder.query<UserDataResponse, null>({
//       query() {
//         return {
//           url: "user/profile",
//         };
//       },
//       providesTags: ["user"],
//     }),
//   }),
// });

// export const { useGetUserQuery } = userApi;

import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { setUser } from "../features/auth/userSlice";
import { IUser } from "../../types/user";

export const userApi = createApi({
  reducerPath: "userApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.REACT_APP_BASE_URL}/api/users/`,
  }),
  tagTypes: ["User"],
  endpoints: (builder) => ({
    getMe: builder.query<IUser, null>({
      query() {
        return {
          url: "me",
          credentials: "include",
        };
      },
      transformResponse: (result: { data: { user: IUser } }) =>
        result.data.user,
      async onQueryStarted(args, { dispatch, queryFulfilled }) {
        console.log(args);
        try {
          const { data } = await queryFulfilled;
          dispatch(setUser(data));
        } catch (error) {}
      },
    }),
  }),
});

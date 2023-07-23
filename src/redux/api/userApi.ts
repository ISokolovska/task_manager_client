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

import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { setUser } from "../features/auth/userSlice";
import { IUser } from "../../types/user";
import { RootState } from "../store";

export const userApi = createApi({
  reducerPath: "userApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.REACT_APP_BASE_URL}/auth`,
    prepareHeaders: (headers, { getState }) => {
      // By default, if we have a token in the store, let's use that for authenticated requests
      const { token } = (getState() as RootState).userState;
      if (token) {
        headers.set("authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),

  tagTypes: ["user"],
  endpoints: (builder) => ({
    getMe: builder.query<IUser, { token: string | null }>({
      query() {
        return {
          url: "/profile",

          // credentials: "include",
        };
      },
      transformResponse: (result: { data: IUser }) => result.data,
      async onQueryStarted(args, { dispatch, queryFulfilled }) {
        console.log(args);
        try {
          const { data } = await queryFulfilled;
          console.log("data", data);
          dispatch(setUser(data));
        } catch (error) {}
      },
    }),
  }),
});

export const { useGetMeQuery } = userApi;

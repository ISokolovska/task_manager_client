import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { ICategory } from "../../../types/category";
import { BASE_URL } from "../../utils/apiUrl";

// Define a service using a base URL and expected endpoints
export const categoryApi = createApi({
  reducerPath: "categoryApi",
  baseQuery: fetchBaseQuery({ baseUrl: `${BASE_URL}` }),
  endpoints: (builder) => ({
    getCategory: builder.query<ICategory[], void>({
      query: () => "category",
    }),
    getCategoryById: builder.query<ICategory, number>({
      query: (id) => `category/${id}`,
    }),

    updateCategory: builder.mutation<
      ICategory,
      { id: number; data: Partial<ICategory> }
    >({
      query: ({ id, data }) => ({
        url: `category/${id}`,
        method: "PATCH",
        body: data,
      }),
    }),
  }),
});

// Export hooks for usage in function components, which are
// auto-generated based on the defined endpoints
export const {
  useGetCategoryQuery,
  useGetCategoryByIdQuery,
  useUpdateCategoryMutation,
} = categoryApi;

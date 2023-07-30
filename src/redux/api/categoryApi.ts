import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import {
  ICategory,
  ICategoryRequest,
  ICategoryResponse,
  IUpdateCategory,
} from "../../types/category";
import { RootState } from "../store";
import { IServerResponse } from "./interfaces/server-responce";

// type CategoriesResponse = ICategory[];

// Define a service using a base URL and expected endpoints
export const categoryApi = createApi({
  reducerPath: "categoryApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.REACT_APP_BASE_URL}`,
    prepareHeaders: (headers, { getState }) => {
      // By default, if we have a token in the store, let's use that for authenticated requests
      const { token } = (getState() as RootState).userState;
      if (token) {
        headers.set("authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  tagTypes: ["categories"],
  endpoints: (builder) => ({
    getCategoryById: builder.query<ICategoryResponse, number | string>({
      query(id) {
        return {
          url: `/categories/${id}`,
        };
      },
      providesTags: ["categories"],
    }),

    getAllCategories: builder.query<IServerResponse<ICategoryResponse[]>, void>(
      {
        query() {
          return {
            url: `/categories`,
          };
        },
        providesTags: ["categories"],
      }
    ),

    createCategory: builder.mutation<ICategoryResponse, ICategoryRequest>({
      query: (category) => ({
        url: "/categories",
        method: "POST",
        body: category,
      }),
      invalidatesTags: ["categories"],
    }),

    // updateCategory: builder.mutation<
    //   ICategory,
    //   {
    //     id: number | string;

    //     updatedName: string;
    //   }
    // >({
    //   query({ id, updatedName }) {
    //     return {
    //       url: `/categories/${id}`,
    //       method: "PATCH",
    //       body: { id, name: updatedName },
    //       // body: category,
    //     };
    //   },
    //   invalidatesTags: ["categories"],
    // }),

    deleteCategory: builder.mutation<ICategoryResponse, number | string>({
      query(id) {
        return {
          url: `/categories/${id}`,
          method: "DELETE",
        };
      },
      invalidatesTags: ["categories"],
    }),

    updateCategory: builder.mutation<
      void,
      Pick<IUpdateCategory, "id"> & Partial<IUpdateCategory>
    >({
      query: ({ id, ...patch }) => ({
        url: `/categories/${id}`,
        method: "PATCH",
        body: patch,
      }),
      async onQueryStarted({ id, ...patch }, { dispatch, queryFulfilled }) {
        const patchResult = dispatch(
          categoryApi.util.updateQueryData("getCategoryById", id, (draft) => {
            Object.assign(draft, patch);
          })
        );
        try {
          await queryFulfilled;
        } catch {
          patchResult.undo();
        }
      },
      invalidatesTags: ["categories"],
    }),
  }),
});

// Export hooks for usage in function components, which are
// auto-generated based on the defined endpoints
export const {
  useGetAllCategoriesQuery,
  useGetCategoryByIdQuery,
  useCreateCategoryMutation,
  useUpdateCategoryMutation,
  useDeleteCategoryMutation,
} = categoryApi;

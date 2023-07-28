import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { ICategoryResponse } from "../../types/category";
import { RootState } from "../store";

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
    // getCategories: builder.query<
    //   CategoriesResponse,
    //   // void,
    //   { token: string | null }
    // >({
    //   query: () => "/categories",
    //   providesTags: ["categories"],
    // }),

    // getCategoryById: builder.query<ICategory, number>({
    //   query: (id) => `/categories/${id}`,
    //   providesTags: ["categories"],
    // }),

    getCategoryById: builder.query<ICategoryResponse, string>({
      query(id) {
        return {
          url: `/categories/${id}`,
          // credentials: "include",
        };
      },
      // providesTags: (result, error, id) => [{ type: "categories", id }],
    }),
    getAllCategories: builder.query<ICategoryResponse[], void>({
      query() {
        return {
          url: `/categories`,
          // credentials: "include",
        };
      },
      // providesTags: (result) =>
      //   result
      //     ? [
      //         ...result.map(({ id }) => ({
      //           type: "categories" as const,
      //           id,
      //         })),
      //         { type: "categories", id: "LIST" },
      //       ]
      //     : [{ type: "categories", id: "LIST" }],
      transformResponse: (results: {
        data: { categories: ICategoryResponse[] };
      }) => results.data.categories,
    }),

    createCategory: builder.mutation<ICategoryResponse, FormData>({
      query: (category) => ({
        url: "/categories",
        method: "POST",
        body: category,
      }),
      invalidatesTags: ["categories"],
      transformResponse: (result: { data: { category: ICategoryResponse } }) =>
        result.data.category,
    }),

    updateCategory: builder.mutation<
      ICategoryResponse,
      { id: string; category: FormData }
    >({
      query({ id, category }) {
        return {
          url: `/categories/${id}`,
          method: "PATCH",
          // credentials: 'include',
          body: category,
        };
      },
      // invalidatesTags: (result, error, { id }) =>
      //   result ? ["categories"] : [{ type: "categories", id }],
      transformResponse: (response: {
        data: { category: ICategoryResponse };
      }) => response.data.category,
    }),

    deleteCategory: builder.mutation<ICategoryResponse, string>({
      query(id) {
        return {
          url: `/categories/${id}`,
          method: "DELETE",
          // credentials: "include",
        };
      },
      invalidatesTags: ["categories"],
      // invalidatesTags: [{ type: "categories", id }],
    }),

    // updateCategory: builder.mutation<
    //   void,
    //   Pick<ICategory, "id"> & Partial<ICategory>
    // >({
    //   query: ({ id, ...patch }) => ({
    //     url: `/categories/${id}`,
    //     method: "PUT",
    //     body: patch,
    //   }),
    //   async onQueryStarted({ id, ...patch }, { dispatch, queryFulfilled }) {
    //     const patchResult = dispatch(
    //       categoryApi.util.updateQueryData("getCategoryById", id, (draft) => {
    //         Object.assign(draft, patch);
    //       })
    //     );
    //     try {
    //       await queryFulfilled;
    //     } catch {
    //       patchResult.undo();
    //     }
    //   },
    //   invalidatesTags: ["categories"],
    // }),

    // deleteCategory: builder.mutation<{ success: boolean; id: number }, number>({
    //   query(id) {
    //     return {
    //       url: `categories/${id}`,
    //       method: "DELETE",
    //     };
    //   },
    //   invalidatesTags: ["categories"],
    // }),
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

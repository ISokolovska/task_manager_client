import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { ICategory } from "../../types/category";

type CategoriesResponse = ICategory[];

// Define a service using a base URL and expected endpoints
export const categoryApi = createApi({
  reducerPath: "categoryApi",
  baseQuery: fetchBaseQuery({ baseUrl: `${process.env.REACT_APP_BASE_URL}` }),
  tagTypes: ["categories"],
  endpoints: (builder) => ({
    getCategories: builder.query<CategoriesResponse, void>({
      query: () => "categories",
      providesTags: ["categories"],
    }),

    getCategoryById: builder.query<ICategory, number>({
      query: (id) => `categories/${id}`,
      providesTags: ["categories"],
    }),

    addCategory: builder.mutation<ICategory, Partial<ICategory>>({
      query: (body) => ({ url: "categories", method: "POST", body }),
      invalidatesTags: ["categories"],
    }),

    updateCategory: builder.mutation<
      void,
      Pick<ICategory, "id"> & Partial<ICategory>
    >({
      query: ({ id, ...patch }) => ({
        url: `categories/${id}`,
        method: "PUT",
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

    deleteCategory: builder.mutation<{ success: boolean; id: number }, number>({
      query(id) {
        return {
          url: `categories/${id}`,
          method: "DELETE",
        };
      },
      invalidatesTags: ["categories"],
    }),
  }),
});

// Export hooks for usage in function components, which are
// auto-generated based on the defined endpoints
export const {
  useGetCategoriesQuery,
  useGetCategoryByIdQuery,
  useAddCategoryMutation,
  useUpdateCategoryMutation,
  useDeleteCategoryMutation,
} = categoryApi;

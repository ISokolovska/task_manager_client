import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { ITask } from "../../types/task";

type TasksResponse = ITask[];

// Define a service using a base URL and expected endpoints
export const taskApi = createApi({
  reducerPath: "taskApi",
  baseQuery: fetchBaseQuery({ baseUrl: `${process.env.REACT_APP_BASE_URL}` }),
  tagTypes: ["tasks"],
  endpoints: (builder) => ({
    getTasks: builder.query<TasksResponse, void>({
      query: () => "tasks",
      providesTags: ["tasks"],
    }),

    getTaskById: builder.query<ITask, number>({
      query: (id) => `tasks/${id}`,
      providesTags: ["tasks"],
    }),

    addTask: builder.mutation<ITask, Partial<ITask>>({
      query: (body) => ({ url: "tasks", method: "POST", body }),
      invalidatesTags: ["tasks"],
    }),

    updateTask: builder.mutation<void, Pick<ITask, "id"> & Partial<ITask>>({
      query: ({ id, ...patch }) => ({
        url: `tasks/${id}`,
        method: "PUT",
        body: patch,
      }),
      async onQueryStarted({ id, ...patch }, { dispatch, queryFulfilled }) {
        const patchResult = dispatch(
          taskApi.util.updateQueryData("getTaskById", id, (draft) => {
            Object.assign(draft, patch);
          })
        );
        try {
          await queryFulfilled;
        } catch {
          patchResult.undo();
        }
      },
      invalidatesTags: ["tasks"],
    }),

    deleteTask: builder.mutation<{ success: boolean; id: number }, number>({
      query(id) {
        return {
          url: `tasks/${id}`,
          method: "DELETE",
        };
      },
      invalidatesTags: ["tasks"],
    }),
  }),
});

// Export hooks for usage in function components, which are
// auto-generated based on the defined endpoints
export const {
  useGetTasksQuery,
  useGetTaskByIdQuery,
  useAddTaskMutation,
  useUpdateTaskMutation,
  useDeleteTaskMutation,
} = taskApi;

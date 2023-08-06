import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import {
  // ITask,
  ICreateTask,
  ITaskResponse,
  IUpdateTask,
} from "../../types/task";
import { RootState } from "../store";
import { IServerResponse } from "./interfaces/server-responce";

// type TasksResponse = ITask[];

// Define a service using a base URL and expected endpoints
export const taskApi = createApi({
  reducerPath: "taskApi",
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

  tagTypes: ["tasks"],
  endpoints: (builder) => ({
    getAllTasks: builder.query<IServerResponse<ITaskResponse[]>, string>({
      query(categoryId) {
        return {
          url: `/tasks/${categoryId}`,
        };
      },
      providesTags: ["tasks"],
    }),

    getTaskById: builder.query<ITaskResponse, number | string>({
      query(id) {
        return {
          url: `/tasks/${id}`,
        };
      },
      providesTags: ["tasks"],
    }),

    createTask: builder.mutation<ITaskResponse, Partial<ICreateTask>>({
      query: (task) => ({
        url: "/tasks",
        method: "POST",
        body: task,
      }),
      invalidatesTags: ["tasks"],
    }),

    updateTask: builder.mutation<
      void,
      Pick<IUpdateTask, "id"> & Partial<IUpdateTask>
    >({
      query: ({ id, ...patch }) => ({
        url: `tasks/${id}`,
        method: "PATCH",
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

    deleteTask: builder.mutation<ITaskResponse, number | string>({
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
  useGetAllTasksQuery,
  useGetTaskByIdQuery,
  useCreateTaskMutation,
  useUpdateTaskMutation,
  useDeleteTaskMutation,
} = taskApi;

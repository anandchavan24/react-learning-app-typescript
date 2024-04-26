// src/features/todos/todoSlice.js

import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { API_URL, JSON_DUMMY_URL } from '../../../Shared/constants';

// Define a service using a base URL and expected endpoints
export const todoApi = createApi({
  reducerPath: 'todoApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://jsonplaceholder.typicode.com/' }),
  endpoints: (builder) => ({
    getTodos: builder.query({
      query: () => 'todos',
    }),
    addTodo: builder.mutation({
      query: (todo) => ({
        url: 'todos',
        method: 'POST',
        body: todo,
      }),
    }),
    deleteTodo: builder.mutation({
      query: (id) => ({
        url: `todos/${id}`,
        method: 'DELETE',
      }),
    }),
  }),
});

// Export hooks for usage in functional components, which are auto-generated based on the defined endpoints
export const { useGetTodosQuery, useAddTodoMutation, useDeleteTodoMutation } = todoApi;

// Export the reducer, either as a default or named export
export default todoApi.reducer;

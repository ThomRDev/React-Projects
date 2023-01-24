// https://redux-toolkit.js.org/rtk-query/overview#create-an-api-slice


// este archivo es un middlewares
import { createApi,fetchBaseQuery } from "@reduxjs/toolkit/query/react"

export const todosApi = createApi({
  reducerPath : "todos",
  baseQuery : fetchBaseQuery({
    baseUrl : "https://jsonplaceholder.typicode.com"
  }),
  endpoints: (builder) => ({
    getTodos : builder.query({
      query: () => "/todos"
    }),
    getTodo : builder.query({
      query: (todoId) => "/todos/"+todoId
    }),

  })
})

// me retorna customHooks
export const { useGetTodosQuery,useGetTodoQuery } = todosApi
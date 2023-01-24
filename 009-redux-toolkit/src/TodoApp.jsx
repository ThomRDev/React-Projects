import React, { useState } from 'react'
import { useGetTodoQuery, useGetTodosQuery } from './store/apis/todosApi'

const TodoApp = () => {

  const [todoId,setTodoId] = useState(1)
  // const { isLoading,data:todos  = []} = useGetTodosQuery()
  const { isLoading,data:todo } = useGetTodoQuery(todoId)
  return (
    <>
      <h1>Todo - RTK Query</h1>
      <hr />
      <h4>isLoading ... { JSON.stringify(isLoading) }</h4>
      <button onClick={()=>{
        if(todoId > 1) setTodoId(todoId - 1)
      }} >Previous Todo</button>
      <button onClick={()=>setTodoId(todoId + 1)} >Next Todo</button>
      <pre>{ JSON.stringify(todo,null,2) }</pre>
      {/* <pre>{ JSON.stringify(todos,null,2) }</pre> */}
    </>
  )
}

export default TodoApp
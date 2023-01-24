import { useEffect, useReducer } from "react"

export type TodoType = {
  id: number
  description : string
  done : boolean
}

const initialState : TodoType[] = [
  {
    id: 1,
    description : "A",
    done : false
  }
]

const todoReducer = (state:TodoType[],action:any):TodoType[] => {
  switch(action.type){
    case "[TODO] ADD TODO":
      return [...state,action.payload]
    case "[TODO] DELETE TODO":
      return state.filter(todo=>todo.id !== action.payload)
    case "[TODO] TOGGLE TODO":
      return state.map(todo=>todo.id === action.payload ? {...todo,done:!todo.done}:todo)
    default:
      return state
  }
}
const init = () => {
  return JSON.parse(localStorage.getItem("todos") as string) || initialState
}

export const useTodos = () => {
  const [state, dispatch] = useReducer(todoReducer, initialState,init)

  const handleNewTodo = (todo:TodoType) => {
    dispatch({
      type :"[TODO] ADD TODO",
      payload : todo
    })
  }
  
  const handleDeleteTodo = (id:number) => {
    dispatch({
      type :"[TODO] DELETE TODO",
      payload : id
    })
  }
  const handleToggleTodo = (id:number) => {
    dispatch({
      type :"[TODO] TOGGLE TODO",
      payload : id
    })
  }
  useEffect(()=>{
    localStorage.setItem("todos",JSON.stringify(state))
  },[state])
  return {
    state,
    todosCount : state.length,
    pendingTodos : state.filter(todo=>!todo.done).length,
    handleDeleteTodo,
    handleNewTodo,
    handleToggleTodo
  }
}
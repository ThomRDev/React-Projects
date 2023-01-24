import { nanoid } from 'nanoid'
import React, { useCallback, useEffect, useReducer } from 'react'
import useForm from '../../hooks/useForm'

import "./UseReducer.css"

interface IState {
  id?:string,
  done ?: boolean,
  title?:string,
  createAt?: string,
  updateAt?:string
}

type ActionType = 
| { type  : "add",payload : IState  }
| { type  : "delete",payload : IState }
// | { type  : "reset",payload : IState }
| { type  : "toggle",payload : IState }

export const reducer = (state:IState[],action:ActionType):IState[] => {
  switch(action.type){
    case "add":
      return [...state,action.payload ]
    case "toggle":
      return state.map(s=>s.id === action.payload.id ? {...s,done:!s.done}:s )
    case "delete":
      return state.filter(s=>s.id !== action.payload.id)
    default:
      return state
  }
}

const initialState:IState[] = [
  {
    id : nanoid(),
    done : false,
    title : "Learn JS",
    createAt : new Date().toString()
  }
]

export const TodoCreate = React.memo(({ addTodo }:any) => {
  console.log("render TodoCreate")
  const { title,handleChangeInput,reset } = useForm({
    title :""
  }) as any
  return <div>
    <form onSubmit={(e)=>{
      e.preventDefault()
      if(title.trim().length){
        addTodo({
          id:nanoid(),
          title,
          done: false,
          createAt : new Date().toString()
        })
        reset()
      }

    }}>
      <input className="form-control" type="text" placeholder='to do' name='title' onChange={handleChangeInput} value={title}  />
    </form>
  </div>
})

export const TodoItem = React.memo(({ todo,toggleTodo,deleteTodo }:{todo:IState,toggleTodo:any,deleteTodo:any}) => {
  console.log("render TodoItem")
  return <li className="list-group-item">
    <p className={todo.done ? "complete" : ""}
    onClick={ ()=>toggleTodo(todo.id) }
    >{ todo.title }</p>
    <button className='btn btn-danger' onClick={()=>deleteTodo(todo.id)} >Delete</button>
  </li>
})

export const TodoList = ({ todos,toggleTodo,deleteTodo }:{ todos:IState[],toggleTodo:any,deleteTodo:any }) => {
  console.log("render TodoList")
  return <div>
    <ul className="mt-4 list-group list-group-flush">
      {
        todos.map(todo=><TodoItem todo={todo}  deleteTodo={deleteTodo} toggleTodo={toggleTodo} key={todo.id} />)
      }
    </ul>
  </div>
}

// esto servira para cargar la data al comienzo
const init = () => {
  return JSON.parse(localStorage.getItem("todos") as string) || initialState
}
const UseReducer = () => {
  console.log("render UseReducer")
  const [todos,dispatch] = useReducer(reducer,initialState,init)

  const toggleTodo = useCallback((id:string)=>{
    const action:ActionType = {
      type :"toggle",
      payload :{
        id
      }
    }
    dispatch(action)
  },[dispatch])

  const deleteTodo = useCallback((id:string)=>{
    const action:ActionType = {
      type :"delete",
      payload :{
        id
      }
    }
    dispatch(action)
  },[dispatch])

  const addTodo = useCallback((todo:any)=>{
    const action:ActionType = {
      type :"add",
      payload :{
        ...todo
      }
    }
    dispatch(action)
  },[dispatch])

  useEffect(()=>{
    localStorage.setItem("todos",JSON.stringify(todos))
  },[todos])
  return (
    <div>
      <TodoCreate addTodo={addTodo} />
      <TodoList  deleteTodo={deleteTodo} toggleTodo={toggleTodo} todos={todos}/>
    </div>
  )
}

export default UseReducer
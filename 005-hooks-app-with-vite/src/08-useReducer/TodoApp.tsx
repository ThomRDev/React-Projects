import { FormEvent, useEffect, useReducer } from "react"
import { useForm } from "../hooks/useForm"

type TodoType = {
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

export const todoReducer = (state = initialState,action:any) => {
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

interface ITodoItemProps  {
  todo : TodoType,
  onDeleteTodo : Function
}

const TodoItem = ({todo,onDeleteTodo}:ITodoItemProps) => {
  return (
    <li className="list-group-item d-flex justify-content-between">
      <span className="align-self-center">{todo.description}</span>
      <button className="btn btn-danger" onClick={event=>onDeleteTodo(todo.id)}  >Delete</button>
    </li>
  )
}

interface ITodoListProps  {
  todos : TodoType[],
  onDeleteTodo : Function
}
const TodoList = ({todos,onDeleteTodo}:ITodoListProps) => {
  return (
    <div className="list-group">
      {
        todos.map(todo=>(
          <TodoItem key={todo.id} todo={todo} onDeleteTodo={onDeleteTodo}/>
        ))
      }
    </div>
  )
}

interface ITodoFormProps{
  onAddNewTodo : Function
}

const TodoForm = ({onAddNewTodo}:ITodoFormProps) => {

  const {form,onChange,onResetForm} = useForm({
    description : ""
  })

  const onSubmit = (event:FormEvent) => {
    event.preventDefault()

    onAddNewTodo({
      id: new Date().getTime(),
      description : form.description,
      done : false
    })

    onResetForm()
  }

  return (
    <>
      <h4>Add Todo</h4>
      <hr />
      <form onSubmit={onSubmit} className="d-flex flex-column">
        <input type="text" placeholder="Todo" className="form-control" name="description" onChange={onChange}
          value={form.description}
        />
        <button type="submit" className="btn btn-outline-primary m-0 mt-2">Add</button>
      </form>
    </>
  )
}

const init = () => {
  return JSON.parse(localStorage.getItem("todos") as string) || initialState
}


export const TodoApp = () => {
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

  useEffect(()=>{
    localStorage.setItem("todos",JSON.stringify(state))
  },[state])

  return (
    <>
      <h1>TodoApp {state.length}, <small>pendientes : {2}</small></h1>
      <hr />
      <div className="row">
        <div className="col-7">
          <TodoList todos={state} onDeleteTodo={handleDeleteTodo} />
        </div>
        <div className="col-5">
          <TodoForm onAddNewTodo={ handleNewTodo }  />
        </div>
      </div>
    </>
  )
}

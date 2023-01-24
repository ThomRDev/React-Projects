import { FormEvent } from "react"
import { useForm } from "../hooks/useForm"
import { TodoType, useTodos } from "../hooks/useTodos"


export interface ITodoItemProps  {
  todo : TodoType,
  onDeleteTodo : Function
  onToggleTodo : Function
}

export const TodoItem = ({todo,onDeleteTodo,onToggleTodo}:ITodoItemProps) => {
  return (
    <li className="list-group-item d-flex justify-content-between">
      <span className={`align-self-center${todo.done ? ' text-decoration-line-through':''}`}
        onClick={()=>onToggleTodo(todo.id)}
        aria-label="span"
      >{todo.description}</span>
      <button className="btn btn-danger" onClick={event=>onDeleteTodo(todo.id)}  >Delete</button>
    </li>
  )
}

interface ITodoListProps  {
  todos : TodoType[],
  onDeleteTodo : Function
  onToggleTodo : Function
}
const TodoList = ({todos,onDeleteTodo,onToggleTodo}:ITodoListProps) => {
  return (
    <div className="list-group">
      {
        todos.map(todo=>(
          <TodoItem key={todo.id} todo={todo} onDeleteTodo={onDeleteTodo} onToggleTodo={onToggleTodo}/>
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


export const TodoApp = () => {
  const {handleDeleteTodo,handleNewTodo,handleToggleTodo,state,todosCount,pendingTodos} = useTodos()
  return (
    <>
      <h1>TodoApp {todosCount}, <small>pendientes : { pendingTodos }</small></h1>
      <hr />
      <div className="row">
        <div className="col-7">
          <TodoList todos={state} onDeleteTodo={handleDeleteTodo} onToggleTodo={handleToggleTodo} />
        </div>
        <div className="col-5">
          <TodoForm onAddNewTodo={ handleNewTodo }  />
        </div>
      </div>
    </>
  )
}

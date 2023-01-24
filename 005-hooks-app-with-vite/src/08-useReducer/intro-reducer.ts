const initalState = [
  {
    id: 1,
    todo : "A",
    done : false
  }
]

const todoReducer = (state = initalState,action :any = {}) => {
  switch(action.type){
    case  "[TODO] add todo":
      return [...state,action.payload]
    default:
      return state
  }
}

let todos = todoReducer()

const newTodo = {
  id:2,
  todo:"B",
  done: false
}


const addTodoAction = {
  type :"[TODO] add todo",
  payload:newTodo
}

// todoReducer debe saber el estado anterior
todos = todoReducer(todos,addTodoAction)

console.log({ state:todos })
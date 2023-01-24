import { todoReducer } from "../../08-useReducer/TodoApp"
import { TodoType } from "../../hooks/useTodos"

describe('Tests in TodoReducer', () => {
  const initialState : TodoType[] = [
    {
      id: 1,
      description : "A",
      done : false
    }
  ]
  test('should return the initial State', () => {
    const newState = todoReducer(initialState,{})

    // se va a comparar la referencia
    expect(newState).toBe(initialState)
  })
  test('should add a new todo', () => {
    const action = {
      type : "[TODO] ADD TODO",
      payload : {
        id : 2,
        description : "2",
        done : false
      }
    }

    const newState = todoReducer(initialState,action)

    expect(newState.length).toBe(2)
    expect(newState).toContain(action.payload)
  })
  test('should delete a todo', () => {
    const action = {
      type : "[TODO] DELETE TODO",
      payload : 1
    }

    const newState = todoReducer(initialState,action)

    expect(newState.length).toBe(0)
    expect(newState).not.toContain({
      id: 1,
      description : "A",
      done : false
    })
  })
  test('should toggle a todo', () => {
    const action = {
      type : "[TODO] TOGGLE TODO",
      payload : 1
    }

    const newState = todoReducer(initialState,action)

    expect(newState[0].done).toBe(true)
  })
})
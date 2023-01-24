import { reducer } from "../../components/08-useReducer/UseReducer"
import { demoTodos } from "../fixtures/demoTodos"

describe('Test in TodoReducer', () => {
  test('Must return default state', () => {
    const state = reducer(demoTodos,{} as any)
    expect(state).toEqual(demoTodos)
  })
  test('Must add one todo', () => {
    const newTodo = {
      id : "dasdas",
      done:false,
      title:"Comidas"
    } 
    const state = reducer(demoTodos,{
      type  :"add",
      payload : newTodo 
    })
    expect(state).toEqual([...demoTodos,newTodo])
    expect(state.length).toBe(3)
  })

  test('must delete one todo by id', () => {
    const state = reducer(demoTodos,{
      type  :"delete",
      payload :  {
        id : "123456"
      }
    })
    expect(state.length).toBe(1)
  })
  test('must make toggle', () => {
    const state = reducer(demoTodos,{
      type  :"toggle",
      payload :  {
        id : "123456"
      }
    })
    expect(state.filter(todo=>todo.id === "123456" )[0].done).toBe(true)
  })
})
import { renderHook,act } from "@testing-library/react"
import { useCounter } from "../../hooks/useCounter"

describe('Test useCounter', () => {
  test('default values', () => {
    const { result :{ current } } = renderHook(()=>useCounter())
    
    
    expect(current.counter).toBe(0)
    expect(typeof current.actions.decrement).toBe("function")
    expect(typeof current.actions.increment).toBe("function")
    expect(typeof current.actions.reset).toBe("function")
  })
  test('the counter must have the value of 100', () => {
    const { result :{ current } } = renderHook(()=>useCounter(100))
    expect(current.counter).toBe(100)
    
  })
  test('Must increment the counter by 1', () => {
    const { result } = renderHook(()=>useCounter(100))
    const { increment } = result.current.actions

    // para hacer accion
    act(()=>{
      increment()
    })
    expect(result.current.counter).toBe(101)
  })
  test('Must decrement the counter by 1', () => {
    const { result } = renderHook(()=>useCounter(100))
    const { decrement } = result.current.actions

    // para hacer accion
    act(()=>{
      decrement()
    })
    expect(result.current.counter).toBe(99)
  })
  test('Must reset counter', () => {
    const { result } = renderHook(()=>useCounter(100))
    const { decrement,reset } = result.current.actions

    // para hacer accion
    act(()=>{
      // la misma funcion solo lo ejecuta una sola ves
      // investigar en el act porque sucede eso
      decrement()
      
      reset()
    })
    expect(result.current.counter).toBe(100)
  })
})
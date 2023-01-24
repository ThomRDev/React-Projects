import {act, renderHook} from "@testing-library/react"
import { useCounter } from "../../hooks/useCounter"

describe('Test in the useCounter', () => {
  test('should return the default values', () => {
    const { result } = renderHook(()=>useCounter())
    const { increment,reset,state,subtract } = result.current
    expect(state).toBe(0)
    expect(subtract).toEqual(expect.any(Function))
    expect(reset).toEqual(expect.any(Function))
    expect(increment).toEqual(expect.any(Function))
  })
  test('should return the 10 value', () => {
    const { result } = renderHook(()=>useCounter(10))
    const { increment,reset,state,subtract } = result.current
    expect(state).toBe(10)
  })
  test('should increment the counter', () => {
    const { result } = renderHook(()=>useCounter(10))
    const { increment } = result.current
    act(()=>{
      increment()
    })
    // tenemos que hacer esto ya que actualizará el nuevo state
    expect(result.current.state).toBe(11)
    
    act(()=>{
      result.current.increment(5)
    })
    expect(result.current.state).toBe(16)
    
    // se hace un poco feo el codigo podria modificar mi scustom hook
    // y hacerlo de esta forma
    // setCounter(current=>current + factor)
    // y ya podria ponerlo todo en el mismo act
    // conslusion : mejor usar eso setCounter(current=>current + factor)
  })


})
import { renderHook } from "@testing-library/react"
import { ChangeEvent } from "react"
import { act } from "react-dom/test-utils"
import { useForm } from "../../hooks/useForm"

describe('Test in use Form custom hook', () => {

  const initialForm = {
    name : "thom",
    email:"thom@gmail.com"
  }
  test('should return the default values', () => { 
    const { result } = renderHook(()=>useForm(initialForm))
    expect(result.current).toEqual({
      form : initialForm,
      // onInputChange
      onChange : expect.any(Function),
      onResetForm : expect.any(Function)
    })
  })
  test('should change the email of form', () => { 
    const { result } = renderHook(()=>useForm(initialForm))
    act(()=>{
      result.current.onChange({
        target : {
          name : "email",
          value : "carlos@gmail.com"
        },
        preventDefault() {},
      } as ChangeEvent<HTMLInputElement>)
    })

    expect(result.current.form.email).toBe("carlos@gmail.com")
  })
  test('should change the name of form', () => { 
    const { result } = renderHook(()=>useForm(initialForm))
    act(()=>{
      result.current.onChange({
        target : {
          name : "name",
          value : "Carlos Oyola"
        },
        preventDefault() {},
      } as ChangeEvent<HTMLInputElement>)
    })

    expect(result.current.form.name).toBe("Carlos Oyola")
  })
  test('should reset the values of form', () => { 
    const { result } = renderHook(()=>useForm(initialForm))
    act(()=>{
      result.current.onChange({
        target : {
          name : "name",
          value : "Carlos Oyola"
        },
        preventDefault() {},
      } as ChangeEvent<HTMLInputElement>)
    })
    act(()=>{
      result.current.onChange({
        target : {
          name : "email",
          value : "asdasdasdasdasd"
        },
        preventDefault() {},
      } as ChangeEvent<HTMLInputElement>)
    })

    act(()=>{
      result.current.onResetForm()
    })

    expect(result.current.form.name).toBe(initialForm.name)
    expect(result.current.form.email).toBe(initialForm.email)
  })
})
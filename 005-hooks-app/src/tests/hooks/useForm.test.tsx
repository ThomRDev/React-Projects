import { act, renderHook } from "@testing-library/react"
import useForm from "../../hooks/useForm"

describe('Tests in useForm.tsx', () => {
  const initalForm = {
    name : "Thom",
    email : "thomtwd@gmail.com"
  }
  test('must return a default form', () => {
    const { result } = renderHook(()=>useForm(initalForm))
    
    expect({
      "name" : (result.current as any)["name"],
      "email" : (result.current as any)["email"]
    }).toEqual(initalForm)
  })
  test('must change values from form', () => {
    const { result } = renderHook(()=>useForm(initalForm))

    const { handleChangeInput } = result.current

    act(()=>{
      handleChangeInput({
        preventDefault : jest.fn(),
        target : {
          name : "email",
          value : "thom@untels.com"
        }
      })
    })
    expect((result.current as any)["email"]).toBe("thom@untels.com")
    expect({
      "name" : (result.current as any)["name"],
      "email" : (result.current as any)["email"]
    }).toEqual({...initalForm,"email":"thom@untels.com"})
  })
  test('must reset defualt values from form', () => {
    const { result } = renderHook(()=>useForm(initalForm))

    const { handleChangeInput,reset } = result.current

    act(()=>{
      handleChangeInput({
        preventDefault : jest.fn(),
        target : {
          name : "email",
          value : "thom@untels.com"
        }
      })
      reset()
    })

    expect((result.current as any)["email"]).toBe("thomtwd@gmail.com")
  })
})
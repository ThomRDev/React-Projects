import { render,screen,fireEvent} from "@testing-library/react"
import AddCategory from "./../../components/AddCategory"

describe('Test in <AddCategory /> component', () => {

  let addNewCategory = jest.fn()
  beforeEach(()=>{
    addNewCategory = jest.fn()
  })

  test('should change the input value', () => {
    render(<AddCategory addNewCategory={addNewCategory} />)
    const input = screen.getByRole("textbox") as HTMLInputElement
    fireEvent.input(input,{
      preventDefault(){},
      target:{ value : "The Beatles" } 
    })
    expect(input.value).toBe("The Beatles")
    // screen.debug()
  })
  test('the function (addNewCategory) should be called', () => {
    render(<AddCategory addNewCategory={addNewCategory} />)
    // aqui necesita si o si que el formulario tenga un aria-label="form" en la etiqueta del formulario
    const form = screen.getByRole("form") as HTMLFormElement
    const input = screen.getByRole("textbox") as HTMLInputElement
    fireEvent.input(input,{ 
      preventDefault(){},
      target:{ value : "The Beatles" } 
    })
    fireEvent.submit(form,{
      preventDefault(){}
    })
    expect(addNewCategory).toHaveBeenCalled()
    expect(addNewCategory).toHaveBeenCalledTimes(1)
    expect(addNewCategory).toHaveBeenCalledWith("The Beatles")
    expect(input.value).toBe("")
  })
  test("the function (addNewCategory) shouldn't be call", () => {
    render(<AddCategory addNewCategory={addNewCategory} />)
    // aqui necesita si o si que el formulario tenga un aria-label="form" en la etiqueta del formulario
    const form = screen.getByRole("form") as HTMLFormElement
    const input = screen.getByRole("textbox") as HTMLInputElement
    fireEvent.input(input,{ 
      preventDefault(){},
      target:{ value : "" } 
    })
    fireEvent.submit(form,{
      preventDefault(){}
    })
    expect(addNewCategory).not.toHaveBeenCalled()
    expect(addNewCategory).toHaveBeenCalledTimes(0)
  })
})
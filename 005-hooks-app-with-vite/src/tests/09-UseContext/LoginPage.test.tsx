import { fireEvent, render, screen } from "@testing-library/react"
import { BrowserRouter, MemoryRouter } from "react-router-dom"
import { UserContext } from "../../09-UseContext/contexts"
import { LoginPage } from "../../09-UseContext/pages"
import { useForm } from "../../hooks/useForm"

jest.mock("../../hooks/useForm")

const mockUseForm = useForm as jest.MockedFunction<typeof useForm>;

// estos tests no van a correr porque el componente original cambio
// describe('Tests in <LoginPage />', () => {

//   const user = {
//     id: 1,
//     name : "Thom"
//   }

//   beforeEach(()=>{
//     jest.clearAllMocks()
//   })
  
//   test('should display the component without the user', () => {
//     render(
//       <UserContext.Provider value={{ user:null  }}>
//         <LoginPage />
//       </UserContext.Provider>
//     )
//     const preTag = screen.getByLabelText("user")
//     expect(preTag.innerHTML).toBe("null")
//   })
//   test('should call the function setUser', () => {
//     const setUser = jest.fn()
//     render(
//       <UserContext.Provider value={{ user:null,setUser  }}>
//         <LoginPage />
//       </UserContext.Provider>
//     )
//     const btn = screen.getByRole("button")
//     fireEvent.click(btn)

//     expect(setUser).toHaveBeenCalled()
//     expect(setUser).toHaveBeenCalledWith({
//       email :"asdasd",
//       id :23,
//       name : "asdas"
//     })
//   })
// })

describe('Tests in <LoginPage />', () => {

  const user = {
    id: 1,
    name : "Thom"
  }

  const mockChangeUser = jest.fn()
  

  beforeEach(()=>{
    jest.clearAllMocks()
  })
  
  test('should display the component without the user', () => {

    const mockOnResetForm = jest.fn()
    const mockOnChange = jest.fn()

    mockUseForm.mockReturnValue({
      form:{
        email  :"",
        password : ""
      },
      onResetForm:mockOnResetForm,
      onChange:mockOnChange
    })
    render(
      <UserContext.Provider value={{ user:null,changeUser:mockChangeUser  }}>
        {/* es una alternativa a BrowserRouter ya que esta es para el navegador */}
        <MemoryRouter>
          <LoginPage />
        </MemoryRouter>
      </UserContext.Provider>
    )

    const form = screen.getByLabelText("form")

    fireEvent.submit(form,{
      preventDefault(){}
    })
    expect(mockOnResetForm).not.toHaveBeenCalled()
    expect(mockChangeUser).not.toHaveBeenCalled()
  })
  test('should display the component without the user', () => {

    const mockOnResetForm = jest.fn()
    const mockOnChange = jest.fn()
    mockUseForm.mockReturnValue({
      form:{
        email  :"Thom@gmail.com",
        password : "Thom"
      },
      onResetForm:mockOnResetForm,
      onChange:mockOnChange
    })
    render(
      <UserContext.Provider value={{ user:null,changeUser:mockChangeUser  }}>
        <MemoryRouter>
          <LoginPage />
        </MemoryRouter>
      </UserContext.Provider>
    )

    const form = screen.getByLabelText("form")

    fireEvent.submit(form,{
      preventDefault(){}
    })
    expect(mockOnResetForm).toHaveBeenCalled()
    expect(mockChangeUser).toHaveBeenCalled()
  })
})
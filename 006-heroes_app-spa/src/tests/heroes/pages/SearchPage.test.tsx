import { fireEvent, getByLabelText, render, screen } from "@testing-library/react"
import { MemoryRouter, useNavigate } from "react-router-dom"
import { SearchPage } from "../../../components/pages"


const mockUseNavigate = jest.fn()

// parcial mock
jest.mock("react-router-dom",()=>({
  ...jest.requireActual("react-router-dom"),
  useNavigate : ()=>mockUseNavigate
}))

describe('Tests in SearchPage component', () => {

  beforeEach(()=>jest.clearAllMocks())

  test('should show the component correctly', () => {
    const { container } = render(
      <MemoryRouter>
        <SearchPage />
      </MemoryRouter>
    )
    expect(container).toMatchSnapshot()

    const divAlert = getByLabelText(container,"alert") as HTMLDivElement
    expect(divAlert.innerHTML).toBe("Search a Hero")
  })
  
  test('should show to batman', () => {
    const {} = render(
      <MemoryRouter initialEntries={["/search?q=batman"]}>
        <SearchPage />
      </MemoryRouter>
    )
    expect(screen.getByText(/Batman/i)).toBeTruthy()
    const img = screen.getByRole("img")  as HTMLImageElement
    expect(img.src).toContain("/heroes/dc-batman.jpg")
    // expect(screen.getByLabelText(/alert/i)).
  })
  test("it should show the error alert if it doesn't find the hero (batman234asda)", () => {
    render(
      <MemoryRouter initialEntries={["/search?q=batman234asda"]}>
        <SearchPage />
      </MemoryRouter>
    )
    const alert = screen.getByLabelText("alert") 
    expect(alert.classList).toContain("alert-danger")
  })

  // en este test tambien podria evaluar el useForm pero ya lo hice en otro test
  test('it should call the navigate hook', () => {
    render(
      <MemoryRouter>
        <SearchPage />
      </MemoryRouter>
    )

    const input = screen.getByRole("textbox") as HTMLInputElement
    fireEvent.change(input,{
      target :{
        name : "hero",
        value  :"Batman"
      },
      preventDefault(){}
    })
    expect(input.value).toBe("Batman")
    const form = screen.getByRole('form');
    fireEvent.submit( form ,{
      preventDefault(){}
    });
    // screen.debug()
    expect(input.value).toBe("")
    expect(mockUseNavigate).toHaveBeenCalled()
    expect(mockUseNavigate).toHaveBeenCalledWith(`?q=Batman`)
  })
})

// el reto es probar heropage pero todos los tests seran repetidos
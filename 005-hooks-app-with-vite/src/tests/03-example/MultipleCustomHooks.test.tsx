import { fireEvent, render, screen } from "@testing-library/react"
import { MultipleCustomHooks } from "../../03-example/MultipleCustomHooks"
import { useCounter } from "../../hooks/useCounter";
import { useFetch } from "../../hooks/useFetch";
jest.mock("../../hooks/useFetch")
jest.mock("../../hooks/useCounter")
const mockUseFetch = useFetch as jest.MockedFunction<typeof useFetch>;
const mockUseCounter = useCounter as jest.MockedFunction<typeof useCounter>;

// normalmente usamos un mock cuando usamos nuestros custom hooks

describe('Test in <MultipleCustomHooks />', () => {

  const mockIncrement = jest.fn()
  mockUseCounter.mockReturnValue({
    state : 1,
    increment : mockIncrement,
    subtract: jest.fn(),
    reset: jest.fn()
  })

  beforeEach(()=>{
    jest.clearAllMocks()
  })

  test('should show the default component', () => {
    mockUseFetch.mockReturnValue({
      data  :[],
      isLoading : true,
      hasError : false
    })

    render(<MultipleCustomHooks/>)

    expect(screen.getByText("MultipleCustomHooks")).toBeTruthy()
    expect(screen.getByText("Loading ...")).toBeTruthy()

    const nextButton = screen.getByRole("button",{
      name : "Cambiar"
    }) as HTMLButtonElement
    expect(nextButton).toBeTruthy()
    expect(nextButton.disabled).toBeTruthy()
  })
  test('should show a Quote', () => {
    mockUseFetch.mockReturnValue({
      data  :[
        {
          "quote_id": 1,
          "quote": "I am not in danger, Skyler. I am the danger!",
          "author": "Walter White",
          "series": "Breaking Bad"
        }
      ],
      isLoading : false,
      hasError : false
    })
    render(<MultipleCustomHooks />)
    const nextButton = screen.getByRole("button",{
      name : "Cambiar"
    }) as HTMLButtonElement
    expect(nextButton).toBeTruthy()
    expect(nextButton.disabled).toBeFalsy()
    expect(screen.getByText("I am not in danger, Skyler. I am the danger!")).toBeTruthy()
  })
  test('should call the increment function', () => {
    mockUseFetch.mockReturnValue({
      data  :[
        {
          "quote_id": 1,
          "quote": "I am not in danger, Skyler. I am the danger!",
          "author": "Walter White",
          "series": "Breaking Bad"
        }
      ],
      isLoading : false,
      hasError : false
    })
    render(<MultipleCustomHooks />)
    const nextButton = screen.getByRole("button",{
      name : "Cambiar"
    }) as HTMLButtonElement
    
    fireEvent.click(nextButton)
    expect(mockIncrement).toHaveBeenCalled()
  })
})

// describe('Test in <MultipleCustomHooks />', () => {
//   test('should show the default component', () => {
//     mockUseFetch.mockReturnValue({
//       data  :[],
//       isLoading : true,
//       hasError : false
//     })
//     const mockIncrement = jest.fn()
//     mockUseCounter.mockReturnValue({
//       state : 1,
//       increment : mockIncrement,
//       subtract: jest.fn(),
//       reset: jest.fn()
//     })

//     render(<MultipleCustomHooks/>)

//     expect(screen.getByText("MultipleCustomHooks")).toBeTruthy()
//     expect(screen.getByText("Loading ...")).toBeTruthy()

//     const nextButton = screen.getByRole("button",{
//       name : "Cambiar"
//     }) as HTMLButtonElement
//     expect(nextButton).toBeTruthy()
//     expect(nextButton.disabled).toBeTruthy()
//   })
//   test('should show a Quote', () => {
//     mockUseFetch.mockReturnValue({
//       data  :[
//         {
//           "quote_id": 1,
//           "quote": "I am not in danger, Skyler. I am the danger!",
//           "author": "Walter White",
//           "series": "Breaking Bad"
//         }
//       ],
//       isLoading : false,
//       hasError : false
//     })
//     const mockIncrement = jest.fn()
//     mockUseCounter.mockReturnValue({
//       state : 1,
//       increment : mockIncrement,
//       subtract: jest.fn(),
//       reset: jest.fn()
//     })
//     render(<MultipleCustomHooks />)
//     const nextButton = screen.getByRole("button",{
//       name : "Cambiar"
//     }) as HTMLButtonElement
//     expect(nextButton).toBeTruthy()
//     expect(nextButton.disabled).toBeFalsy()
//     expect(screen.getByText("I am not in danger, Skyler. I am the danger!")).toBeTruthy()
//   })
//   test('should call the increment function', () => {
//     mockUseFetch.mockReturnValue({
//       data  :[
//         {
//           "quote_id": 1,
//           "quote": "I am not in danger, Skyler. I am the danger!",
//           "author": "Walter White",
//           "series": "Breaking Bad"
//         }
//       ],
//       isLoading : false,
//       hasError : false
//     })

//     const mockIncrement = jest.fn()
//     mockUseCounter.mockReturnValue({
//       state : 1,
//       increment : mockIncrement,
//       subtract: jest.fn(),
//       reset: jest.fn()
//     })
//     render(<MultipleCustomHooks />)
//     const nextButton = screen.getByRole("button",{
//       name : "Cambiar"
//     }) as HTMLButtonElement
    
//     fireEvent.click(nextButton)
//     expect(mockIncrement).toHaveBeenCalled()
//   })
// })
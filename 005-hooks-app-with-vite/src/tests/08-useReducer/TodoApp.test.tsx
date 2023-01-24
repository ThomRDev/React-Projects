import { render, screen } from "@testing-library/react"
import { TodoApp } from "../../08-useReducer/TodoAppWithCustomHook"
import { useTodos } from "../../hooks/useTodos"

jest.mock("../../hooks/useTodos")
const mockUseTodos = useTodos as jest.MockedFunction<typeof useTodos>;

describe('Test in <TodoApp />', () => {

  mockUseTodos.mockReturnValue({
    handleDeleteTodo:jest.fn(),
    handleNewTodo :jest.fn(),
    handleToggleTodo:jest.fn(),
    state : [
      {
        id:1,
        description : "Todo #1",
        done:false
      },
      {
        id:2,
        description : "Todo #2",
        done:false
      },
    ],
    todosCount : 2,
    pendingTodos : 2
  })

  beforeEach(()=>{
    jest.clearAllMocks()
  })

  test('should display the component correctly', () => {
    render(<TodoApp />)

    expect(screen.getByText("Todo #1")).toBeTruthy()
    expect(screen.getByText("Todo #2")).toBeTruthy()
  })
})
import { fireEvent, render, screen } from "@testing-library/react"
import { TodoItem } from "../../08-useReducer/TodoAppWithCustomHook"

describe('Test in <TodoItem />', () => {

  const todo = {
    id : 1,
    description : "Todo #1",
    done : false
  }

  const onDeleteTodoMock = jest.fn()
  const onToggleTodoMock = jest.fn()

  beforeEach(()=>jest.clearAllMocks())

  test('should show the pending todo', () => {
    render(<TodoItem todo={todo} onDeleteTodo={onDeleteTodoMock} onToggleTodo={onToggleTodoMock} />)
    const liElement = screen.getByRole("listitem")
    
    expect(liElement.className).toBe("list-group-item d-flex justify-content-between")

    const spanElement = screen.getByLabelText("span")
    
    expect(spanElement.className).toBe("align-self-center")
    expect(spanElement.className).not.toContain("text-decoration-line-through")

  })
  test('should show the complete todo', () => {

    todo.done = true
    render(<TodoItem todo={todo} onDeleteTodo={onDeleteTodoMock} onToggleTodo={onToggleTodoMock} />)
    
    const spanElement = screen.getByLabelText("span")
    
    expect(spanElement.className).toContain("text-decoration-line-through")
    expect(spanElement.className).toBe("align-self-center text-decoration-line-through")
  })
  test('should call the toggle function', () => {
    render(<TodoItem todo={todo} onDeleteTodo={onDeleteTodoMock} onToggleTodo={onToggleTodoMock} />)
    const spanElement = screen.getByLabelText("span")
    fireEvent.click(spanElement)
    expect(onToggleTodoMock).toHaveBeenCalled()
    expect(onToggleTodoMock).toHaveBeenCalledWith(todo.id)
  })
  test('should call the delete function', () => {
    render(<TodoItem todo={todo} onDeleteTodo={onDeleteTodoMock} onToggleTodo={onToggleTodoMock} />)
    const btnDelete = screen.getByRole("button",{ name  :"Delete" })
    fireEvent.click(btnDelete)
    expect(onDeleteTodoMock).toHaveBeenCalled()
    expect(onDeleteTodoMock).toHaveBeenCalledWith(todo.id)
  })
})
import { render,screen,fireEvent } from "@testing-library/react"
import { CounterApp } from "../CounterApp"
describe('Test in CounterApp component', () => {
  test('should do to match with the snapshot', () => {
    const { container } = render( <CounterApp /> )
    expect(container).toMatchSnapshot()
  })
  test('should show the initial value = 100', () => {
    const {container,getByText} = render( <CounterApp initValue={100} /> )
    expect(getByText(100)).toBeTruthy()
    expect(container.querySelector(".value").innerHTML).toBe(100+"")
  })
  test('should increment with the button +1', () => {
    render( <CounterApp initValue={100} /> )
    fireEvent.click(screen.getByText("+1"))
    
    expect(screen.getByText("101")).toBeTruthy()
  })
  test('should subtract with the button -1', () => {
    render( <CounterApp initValue={100} /> )
    fireEvent.click(screen.getByText("-1"))
    
    expect(screen.getByText("99")).toBeTruthy()
  })

  test('should work the reset button', () => {
    render( <CounterApp initValue={100} /> )
    fireEvent.click(screen.getByText("-1"))
    fireEvent.click(screen.getByText("+1"))
    fireEvent.click(screen.getByText("+1"))
    fireEvent.click(screen.getByText("+1"))
    fireEvent.click(screen.getByText("-1"))

    fireEvent.click(screen.getByText("Reset"))
    
    expect(screen.getByText("100")).toBeTruthy()
  })
  
})

// mucha ayuda
// https://testing-playground.com/
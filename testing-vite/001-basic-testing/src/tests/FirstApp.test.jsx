import { render } from "@testing-library/react"
import { FirstApp } from "../FirstApp"
describe('Test in FirstApp component', () => {
  test('should do to match with the snapshot', () => {
    const { container } = render( <FirstApp title="Titulo" /> )
    expect(container).toMatchSnapshot()
  })
  
  test('should show the title in h1 tag', () => {
    const { container,getByText,getByTestId,getAllByText } = render( <FirstApp title="Titulo" /> )
    expect(getByText("Titulo")).toBeTruthy()

    expect(getByTestId('test-title')).toBeTruthy()
    expect(getByTestId('test-title').innerHTML).toBe("Titulo")
    // no es recomendado
    // const h1 = container.querySelector("h1")

    // expect(h1.innerHTML).toBe("Titulo")
    // expect(h1.innerHTML).toContain("Titulo")

    expect(getAllByText("Mensaje").length).toBe(3)

  })
})
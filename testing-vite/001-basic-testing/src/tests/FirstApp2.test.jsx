import { render,screen } from "@testing-library/react"
import { FirstApp } from "../FirstApp"
describe('Test in FirstApp component', () => {
  const title = "Titulo"
  const subtitle = "Subtitulo"
  test('should do to match with the snapshot', () => {
    const { container } = render( <FirstApp title={title} subtitle={subtitle} /> )
    expect(container).toMatchSnapshot()
  })
  
  test('should show the title', () => {
    render( <FirstApp title={title} subtitle={subtitle} /> )
    // screen.debug()
    expect(screen.getByText(title)).toBeTruthy()
    // expect(screen.getByText(title)).not.toBeTrusty()
  })
  test('should show the title in h1 tag', () => {
    render( <FirstApp title={title} subtitle={subtitle} /> )
    // screen.debug()
    expect(screen.getByRole("heading",{ level : 1 })).toBeTruthy()
    expect(screen.getByRole("heading",{ level : 1 }).innerHTML).toBe(title)
  })
  test('should show the subtitle in h2 tag', () => {
    render( <FirstApp title={title} subtitle={subtitle} /> )
    // screen.debug()
    expect(screen.getByRole("heading",{ level : 2 })).toBeTruthy()
    expect(screen.getByRole("heading",{ level : 2 }).innerHTML).toBe(subtitle)
  })
  test('should show the message in p element', () => {
    render( <FirstApp title={title} subtitle={subtitle} /> )
    // screen.debug()
    expect(screen.getAllByText('Mensaje').length).toBe(3)
  })
})
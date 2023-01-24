import { render,screen } from "@testing-library/react"
import GiftItem from "../../components/GifItem"
describe('Test in <GifItem /> component', () => {

  const props = {
    title : "The Beatles",
    src : "https://media4.giphy.com/media/3oz8xVPdsiFn9F6s4o/giphy-downsized-medium.gif?cid=ce089fd5s5378q9iobbz6jjrj8bl5y5f4fqdxpcx8152o8oq&rid=giphy-downsized-medium.gif&ct=g"
  }

  test('Should evalute the snapshot', () => {
    const { container } = render(<GiftItem { ...props } />)
    expect(container).toMatchSnapshot()
  })
  test('the title of the item should be '+props.title, () => { 
    
    render(<GiftItem { ...props } />)
    expect(screen.getByText(props.title)).toBeTruthy()
    expect(screen.getByText(props.title).innerHTML).toBe(props.title)
  })
  
  test('should show the imagen and the alt attribute', () => {
    render(<GiftItem { ...props } />)
    const imgElement = (screen.getByRole("img") as HTMLImageElement)
    expect(imgElement.src).toBe(props.src)
    expect(imgElement.alt).toBe(props.title)
  })
})
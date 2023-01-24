import {render,screen,waitFor} from "@testing-library/react"
import GifApp from "../../components/GifApp"
describe('Test in <GifApp /> component', () => {
  test('Should render component <GifApp /> correctly', async () => {
    render(<GifApp defaultValues={["The Beatles","Pokemon"]} />)
  })
})
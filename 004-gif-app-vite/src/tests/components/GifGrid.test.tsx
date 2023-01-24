import {render,screen} from "@testing-library/react"
import GifGrid from "../../components/GifGrid"
import { useFetchGifs } from  "../../hooks/useFetchGifs"
jest.mock("../../hooks/useFetchGifs")
const mockUseFetchGifs = useFetchGifs as jest.MockedFunction<typeof useFetchGifs>;
describe('Test in <GifGrid /> component', () => {
  // useFetchGifs.mockReturnValue({
  //   data  :[],
  //   loading : true
  // })
  const category = "The Beatles"
  test('should show the loading', () => {
    mockUseFetchGifs.mockReturnValue({
      data  :[],
      loading : true
    })
    render(<GifGrid value={category} />)
    expect(screen.getByText("Loading")).toBeTruthy()
    // screen.debug()
  })
  test("should show the GifItem's", () => {
    mockUseFetchGifs.mockReturnValue({
      data :[
        {
            id: 'A',
            title: 'A - By DJ Amuro',
            src: 'http://localhost/gif/a.gif'
        },
        {
            id: 'AA',
            title: 'AA - By DJ Amuro',
            src: 'http://localhost/gif/aa.gif'
        },
        {
            id: 'AAA',
            title: 'AAA - By DJ Amuro',
            src: 'http://localhost/gif/aaa.gif'
        },
      ],
      loading : false
    })
    render(<GifGrid value={category} />)
    expect(screen.getAllByRole("img").length).toBe(3)
  })
})
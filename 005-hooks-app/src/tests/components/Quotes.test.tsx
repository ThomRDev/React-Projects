import { render, screen } from "@testing-library/react";
import renderer from "react-test-renderer"
import QuotesApp from "../../components/02-useEffect/Quotes"
import { useFetch } from "../../hooks/useFetch";
import { useCounter } from "../../hooks/useCounter";

jest.mock("../../hooks/useFetch")
jest.mock("../../hooks/useCounter")

// esto es solo valido en typescript
// en js solo se usa el hook con su nombre
const mockUseFetch = useFetch as jest.MockedFunction<typeof useFetch>;
const mockUseCounter = useCounter as jest.MockedFunction<typeof useCounter>;

describe('Test in Quotes.tsx', () => {

  beforeEach(()=>{
    mockUseCounter.mockReturnValue({
      counter : 10,
      actions:{
        increment : () => {},
        decrement : () => {},
        reset : () => {},
      }
    })
  })

  test('spapshot', () => {
    mockUseFetch.mockReturnValue({
        data  :null,
        loading : true,
        error : null
    })
    const tree = renderer.create(<QuotesApp />).toJSON()
    expect(tree).toMatchSnapshot()
  })
  test('must show the information', () => {
    mockUseFetch.mockReturnValue({
      data  : [{
        author :"Author",
        quote : "Quote - Text"
      }],
      loading : false,
      error : null
    })
    render(<QuotesApp />)
    
    expect(screen.getByText("Author")).toBeInTheDocument()
    // screen.debug()
    // expect(screen.getByRole('heading')).toHaveTextContent('Welcome, John Doe')
    
    // sin enzime nose
    // const wrapper = shallow(<QuotesApp />)
    // expect(wrapper.find(".alert").exists()).toBe(false)
    // expect(wrapper.find(".mb-0").text().trim()).toBe("Author")
    // expect(wrapper.find("footer").text().trim()).toBe("Quote - Text")
    
  })
})
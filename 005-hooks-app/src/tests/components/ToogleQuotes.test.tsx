import renderer from "react-test-renderer"
import ToggleQuotes from "../../components/03-useRef/ToggleQuotes"

describe('Test ToogleQuotes', () => {
  
  // enzime u.u
  // const wrapper = shallow(<ToggleQuotes />)

  test('snapshot', () => {
    const tree = renderer.create(<ToggleQuotes />).toJSON()
    expect(tree).toMatchSnapshot()

    // expect(wrapper).toMatchSnapshot()
    // expect(wrapper.find("QuotesApp").exists()).toBe(true) //por defecto es true
  })

  test('ToggleQuotes hidden', () => {

    // eventWrapper.find("button").simulate("click")
    // expect(wrapper.find("QuotesApp").exists()).toBe(false)
  })
})
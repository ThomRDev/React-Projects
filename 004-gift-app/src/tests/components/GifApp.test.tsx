import { shallow } from "enzyme";
import path from "path";
import GiftApp from "../../components/GiftApp";
// https://stackoverflow.com/questions/45778192/what-is-the-difference-between-it-and-test-in-jest#:~:text=there%20is%20no%20difference.,is%20under%20the%20alias%20it%20.
describe(`Tests in ${path.basename(__filename)} file`, () => {
    test('Must render component <GifApp /> correctly', () => {
        const wrapper = shallow(<GiftApp defaultValues={ [""] } />)
        expect(wrapper).toMatchSnapshot()
    })
    test('Must render component <GifApp /> correctly with params', () => {
        const wrapper = shallow(<GiftApp defaultValues={ ["the beatles","frank sinatra"] } />)
        expect(wrapper).toMatchSnapshot()
        expect(wrapper.find("GiftGrid").length).toBe(2)
    })
})
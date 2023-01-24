import { shallow } from "enzyme"
import GiftItem from "../../components/GiftItem"

describe(`Tests in ${__filename} file`, () => {
    const props = {
        src : "https://media4.giphy.com/media/l3UceJ4tB12SgFfwc/giphy.gif?c…089fd5n6lchf6g1qiw7irbc9802uiy74nsqucnx4kol0z3&rid=giphy.gif",
        title :"Peru"
    }

    const wrapper = shallow(<GiftItem {...props}  />)
    
    test('Must return component <GifItem /> correctly', () => {
        expect(wrapper).toMatchSnapshot()
    })
    test('the title of the item must be retun '+props.title, () => { 
        
        const title = wrapper.find("h2").text()
        expect(title).toBe(props.title)
    })
    test('the alt of the img must return '+props.title, () => {
        const img = wrapper.find("img")
        expect(img.prop("alt")).toBe(props.title)
    })
    
    test('must equals src to '+props.src, () => { 
        const img = wrapper.find("img")
        // console.log(img.html());
        // img.props() //me da todos las propiedades en forma de json
        expect(img.prop("src")).toBe(props.src)
        
    })
    test('Props of <GifItem />', () => {
        expect(wrapper.prop("className")?.includes("item")).toBe(true)
    })
})
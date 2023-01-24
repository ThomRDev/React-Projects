import { shallow } from "enzyme"
import CounterApp from "../CounterApp";

describe(`Tests in ${__filename} file`, () => {
    test('Must return component <CounterApp /> with default value', () => {
        const wrapper = shallow(<CounterApp />)
        expect(wrapper).toMatchSnapshot()
        const initValue = wrapper.find(".value").text().trim()
        expect(+initValue).toBe(1)
    })
    test('Must return component <CounterApp /> with value = 5', () => {
        const wrapper = shallow(<CounterApp initValue={5} />)
        expect(wrapper).toMatchSnapshot()

        const initValue = wrapper.find(".value").text().trim()
        expect(+initValue).toBe(5)
    })
    
    test('click btn +1 => result 2', () => { 
        const wrapper = shallow(<CounterApp />)

        // el primer boton - que es el de +1
        const btn = wrapper.find("button").at(0)
        btn.simulate("click")

        expect(+wrapper.find(".value").text().trim()).toBe(2)
    })
    test('click btn -1 => result 5 with initValue 6', () => { 
        const wrapper = shallow(<CounterApp initValue={6} />)

        const btn = wrapper.find("button").at(2)
          // console.log(wrapper.find('button').at(2).html())
        btn.simulate("click")

        expect(+wrapper.find(".value").text().trim()).toBe(5)
    })
    test('click reset => result 100 with initValue 100', () => { 
        const wrapper = shallow(<CounterApp initValue={100} />)

        const btn = wrapper.find("button").at(1)
        btn.simulate("click")

        expect(+wrapper.find(".value").text().trim()).toBe(100)
    })
});

describe(`Tests in ${__filename} file - reuse`, () => {
    
    // se inicializa para poder tener el autoayuda, pero deberia ir = null
    let wrapper = shallow(<CounterApp />)
    let value = null

    // se ejecutara antes de cada rest
    beforeEach(()=>{
        value = 5
        wrapper = shallow(<CounterApp initValue={value} />);
    })
    test('Must return component <CounterApp /> with value', () => {
        expect(wrapper).toMatchSnapshot()
        const initValue = wrapper.find(".value").text().trim()
        expect(+initValue).toBe(value)
        
    })
    test("clicks verify",()=>{
        // +5 => 5 +5 = 10
        wrapper.find("button").at(0).simulate("click")
        wrapper.find("button").at(0).simulate("click")
        wrapper.find("button").at(0).simulate("click")
        wrapper.find("button").at(0).simulate("click")
        wrapper.find("button").at(0).simulate("click")
        
        expect(+wrapper.find(".value").text().trim()).toBe(10)
        
        // -2
        // =>10 -2 =>8
        wrapper.find("button").at(2).simulate("click")
        wrapper.find("button").at(2).simulate("click")
        expect(+wrapper.find(".value").text().trim()).toBe(8)
        
        // reset
        wrapper.find("button").at(1).simulate("click")
        expect(+wrapper.find(".value").text().trim()).toBe(5)
    })
});

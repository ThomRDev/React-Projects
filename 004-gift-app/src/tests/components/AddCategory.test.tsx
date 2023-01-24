import { shallow } from "enzyme"
import path from "path"

import AddCategory from "../../components/AddCategory"

describe(`Tests in ${__filename} file`, () => { 
    // es una simple funcion 
    // nos dira como fue llamada, si fue llamada o cuantas veces fue llamada
    const setValues = jest.fn()

    // tambien puedo crear esto
    // esto no nos dira nada
    // const setValues = ()=>{}

    const wrapper = shallow(<AddCategory setValues={setValues} />)
    
    test('Must render the component <AddCategory /> correctly', () => {

        // console.log(wrapper.html())
        expect(wrapper).toMatchSnapshot()
    })

    test('must change the input value', () => {
        const input = wrapper.find("input")
        // console.log(input.html());

        // simulando el evento onChange
        // pero como no esta en un entorno web hay propeidades que no entendera
        // el {} seria el evento
        input.simulate("change",{
            preventDefault : jest.fn(),
            // preventDefault(){
                // tambien puedo usar esto
            // },
            target:{
                value : "Data"
            }
        })

        // No funciona 
        // ya que lo captura en ese momento
        // console.log(input.html());
        // expect(input.prop("value")).toBe("Data")

        // si funciona
        // console.log(wrapper.find("input").html());
        expect(wrapper.find("input").prop("value")).toBe("Data")
    })

    test('the hook (setValues) must not be called', () => {
        // input vacio
        wrapper.find("input").simulate("change",{
            preventDefault : jest.fn(),
            target:{
                value : ""
            }
        })
        // tenemos que hacer lo anterior ya que las simulaciones si se guardan
        // tendremos que el wrapper y la funcion esten en un beforeEach

        wrapper.find("form").simulate("submit",{ preventDefault(){} })
        expect(setValues).not.toHaveBeenCalled()
    })
})


describe(`Tests in ${path.basename(__filename)} file`, () => {
    let setValues = jest.fn()
    let wrapper = shallow( <AddCategory setValues={setValues}  /> )
    beforeEach(()=>{
        // setValues = jest.fn()
        // tambien puedo limpíar
        jest.clearAllMocks() // limpiar todo
        // o solo limiar la funcion
        // setValues.mockClear()
        wrapper = shallow( <AddCategory setValues={setValues}  /> )
    })
    test('Must render the component <AddCategory /> correctly', () => {
        expect(wrapper).toMatchSnapshot()
    })
    test('must change the input value', () => {
        const input = wrapper.find("input")
        input.simulate("change",{
            preventDefault : jest.fn(),
            target:{
                value : "Data"
            }
        })
        expect(wrapper.find("input").prop("value")).toBe("Data")
    })
    test('the hook (setValues) must not be called', () => {
        wrapper.find("form").simulate("submit",{ preventDefault(){} })
        expect(setValues).not.toHaveBeenCalled()
    })
    test('the hook (setValues) must be called', () => {
        wrapper.find("input").simulate("change",{
            preventDefault(){},
            target:{ value : "Data" }
        })
        wrapper.find("form").simulate("submit",{ preventDefault(){} })
        expect(setValues).toHaveBeenCalled()
    })
    test('submit event', () => {
        wrapper.find("input").simulate("change",{
            preventDefault(){},
            target:{ value : "asdasd" }
        })
        expect(setValues).toHaveBeenCalled()
        expect(setValues).toHaveBeenCalledWith(expect.any(Function))

        
        // expect(setValues).toHaveBeenCalledTimes(1) // que se llame 1 ves

        // Verificara que setValues ejecute una funcion
        // es decir que setValues reciba una funcion
        // expect(setValues).toHaveBeenCalledWith(function(){})
        // mejor
        // expect(setValues).toHaveBeenCalledWith(expect.any(Function))

        expect(wrapper.find("input").prop("value")).toBe("asdasd")
        wrapper.find("input").simulate("change",{
            preventDefault(){},
            target:{ value : "" }
        })
        expect(wrapper.find("input").prop("value")).toBe("")
        wrapper.find("form").simulate("submit",{ preventDefault(){} })
        expect(setValues).not.toHaveBeenCalled()
    })
})
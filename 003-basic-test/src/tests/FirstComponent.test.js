import { render,screen } from "@testing-library/react"
import React from "react"
import { shallow } from "enzyme"

// la solucion para los errores es actualizar el package, gracias a la extension me dice si estan desactualizadas

import FirstComponent from "../FirstComponent";
describe(`Tests in ${__filename} file`, () => {
    test("Must return component title => I'm a title - only jest", () => { 
        const title = "I'm a title"
        render(<FirstComponent title={title} />)
        expect(screen.getByText(title)).toBeInTheDocument()
    })
    // with enzyme
    test("Must return component title => I'm a title - with enzyme", () => { 
        const title = "I'm a title"
        // shallow es parecido al render pero nos dara otras opciones
        // simular click, y como si fuera el objeto document y hacer document.getElement,document.querySelector ...
        const wrapper = shallow( <FirstComponent title={ title } /> )

        // creamos el snapshot
        expect(wrapper).toMatchSnapshot();
        // crea como una fotografia, y si hacemos un cambio en el componente original comparará con esa fotografia
        // si sale un error quiere decir que el componente original no coincide con el spanshot
        // esto puede ayudarnos y restablecer el componente original
        // o si el componente original cambio, podemos actualizar el snapshot con `u` en la terminal

        // conclusion : servirá para revisar el component original, error si muta la estructura
    })

    test('Must return default subtitle in component <FirstComponent />', () => {
        const wrapper = shallow(<FirstComponent title="I'm a title"  />)


        const subtitle = wrapper.find("h2").text().trim()
        expect(subtitle).toBe("I'm a subtitle")
    })
    test('Must return subtitle in component <FirstComponent subtitle="subtitle" />', () => {
        const wrapper = shallow(<FirstComponent title="I'm a title" subtitle={"subtitle"}  />)


        const subtitle = wrapper.find("h2").text().trim()
        expect(subtitle).toBe("subtitle")
    })
});

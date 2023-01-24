import { shallow } from "enzyme";
import path from "path";
import GiftGrid from "../../components/GiftGrid";
import { useFetchGifts } from "../../hooks/useFetchGifts";


// lo que hace esto es falsear cualquier llamada a este archivo al path, fingir
// controlar la informacion que va a responder
// tendremos que hacer esto si tenemos directamente el
// el custom hook en el component
// si tenemos otro component que contiene a este componente (GiftGrid) ya no es necesario el uso de mocks
jest.mock("../../hooks/useFetchGifts")

// Crear una referencia del custom Hook, pero asignándole otro
// tipo para tener disponible el método "mockReturnValue"
const mockUseFetchGifs = useFetchGifts as jest.MockedFunction<typeof useFetchGifts>;

describe(`Tests in ${path.basename(__filename)} file`, () => {
    
    // without gifs
    test('Must render the component <GifGrid /> correctly - without gifs', () => {

        mockUseFetchGifs.mockReturnValue({
            data  :[],
            loading : true
        })
        // este componete necesitara el custom hooks por eso la linea anterior es falsear la data
        let wrapper = shallow(<GiftGrid value="" />)
        // ya que no existe o no hay data
        expect(wrapper.find("h1").exists()).toBe(false)
        expect(wrapper).toMatchSnapshot()
    })
    // with gif
    test('Must render the component <GifGrid /> correctly with gifs - useFetcgGif', () => {
        mockUseFetchGifs.mockReturnValue({
            data :[
                {
                    id: 'A',
                    title: 'A - By DJ Amuro',
                    url: 'http://localhost/gif/a.gif'
                },
                {
                    id: 'AA',
                    title: 'AA - By DJ Amuro',
                    url: 'http://localhost/gif/aa.gif'
                },
                {
                    id: 'AAA',
                    title: 'AAA - By DJ Amuro',
                    url: 'http://localhost/gif/aaa.gif'
                },
            ],
            loading : false
        })
        let wrapper = shallow(<GiftGrid value="the beatles" />)
        expect(wrapper).toMatchSnapshot()
        expect(wrapper.find("h1").exists()).toBe(true)
        expect( wrapper.find('GiftItem').length).toBe(3);
    })

})
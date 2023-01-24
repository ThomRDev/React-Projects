import path from "path"


import { renderHook } from "@testing-library/react-hooks"


import { useFetchGifts } from "../../hooks/useFetchGifts"

// como sabemos nuestros custom hooks tienen hooks por dentro
// pero estos hooks solo se ejecutan en un contexto de React.Component y no en cualquier funcion
// solo pueden ser llamados dentro del cuerpo de un componente
// https://github.com/testing-library/react-hooks-testing-library
// https://react-hooks-testing-library.com/usage/basic-hooks
// npm install --save-dev @testing-library/react-hooks

describe('Tests in '+path.basename(__filename)+" file", () => {
    test('the custom hooks must return the initial state', async () => {
        // error
        // const {data,loading} = useFetchGifts("the beatles")


        // 18-04-2022 - renderHook no es compatible con react 18, los programadores DICEN TENER PACIENCIA
        const { result,waitForNextUpdate } = renderHook(()=>useFetchGifts("the beatles"))
        const {data,loading} = result.current
        
        // esto es necesario sino da error en los demas test si estamos usando el mismo custom hook
        // recordar que mi custom hooks utiliza un useEffect
        // por lo que el promise que esta dentro se ejecuta luego,
        // y si no estuviera en el siguiente test daria el error ya que el ambito del useEffect anterior ya no existe
        // y recien se ejecuto el promise
        // es necesario esperar
        // el orden de esta linea tambien es importante 
        await waitForNextUpdate()
        // https://github.com/ThomRoman/GifExpertApp/blob/main/src/hooks/useFetchGifs.jsx
        expect(loading).toBe(true)
        expect(data.length).toBe(0)
        expect(data).toEqual([])
    })
    test('the custom hooks must return the complete data', async () => {
        const { result,waitForNextUpdate } = renderHook(()=>useFetchGifts("the beatles"))
        // esperamos  a que la data sea cargada
        // el order de donde sea ubicada esta linea afectara a los datos
        await waitForNextUpdate()
        const {data,loading} = result.current
        
        expect(loading).toBe(false)
        expect(data.length).toBe(10)
    })
})
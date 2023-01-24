/* eslint-disable jest/no-conditional-expect */
import { getHeroByIdAsync } from "../../base/09-promises";

describe(`Tests in ${__filename} file`, () => {
    test(
        `Must return hero by id 1 async => ${JSON.stringify({ id: 1, name: 'Batman',owner: 'DC'})}`, 
        (done) => {
        
            getHeroByIdAsync(1)
            .then(data=>{
                expect(data).toEqual({ id: 1, name: 'Batman',owner: 'DC'})
                done()
            })
        // done : si se crea este callback y no se ejecuta siempre esta ejecutandose el test como
        // un bucle infinito
        // estos tipos de tests nos sirven para testear el flujo asincrono
    })
    test(
        `Must return an error`, 
        (done) => {
            getHeroByIdAsync(15215)
            .catch(msg=>{
                expect(msg).toBe("No se pudo encontrar el heroe")
                done()
            })
        // done : si se crea este callback y no se ejecuta siempre esta ejecutandose el test como
        // un bucle infinito
        // estos tipos de tests nos sirven para testear el flujo asincrono
    })

    test(
        `async await- Must return hero by id 1 async => ${JSON.stringify({ id: 1, name: 'Batman',owner: 'DC'})}`,
        async () => { 
            const hero = await getHeroByIdAsync(1)
            expect(hero).toEqual({ id: 1, name: 'Batman',owner: 'DC'})
        }
    )
    test(
        `async await- Must return an error`,
        async () => { 
            try{
                await getHeroByIdAsync(15215)
            }catch(err){
                // eslint-disable-next-line jest/no-conditional-expect
                expect(err).toBe("No se pudo encontrar el heroe")
            }
        }
    )
});

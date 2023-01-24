import { getHeroById, getHeroByOwner } from "../../base/08-imp-exp";
import "@testing-library/jest-dom"

describe(`Tests in ${__filename} file`, () => {
    test(`Must return hero by id 1 => ${JSON.stringify({ id: 1, name: 'Batman',owner: 'DC'})}`, () => {
        const _expect = {
            id: 1,
            name: 'Batman',
            owner: 'DC'
        }

        const receive = getHeroById(1)
        expect(receive).toEqual(_expect)
    })
    test(`Must return heroes array by owner Marvel whose length is 2`, () => {

        const receive = getHeroByOwner("Marvel")
        expect(receive).toBeInstanceOf(Array)
        expect(receive.length).toBe(2)
    })

    test('Must return undefiend if hero not exist', () => { 
        const receive = getHeroById(1648487)

        // es lo mismo
        expect(receive).toBe(undefined)
        expect(receive).toBeFalsy()

    })
});

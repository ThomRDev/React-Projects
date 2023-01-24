import { getGreeting } from "../../base/02-template-string";

// en teoria me ayuda para el autocompletado, pero no lo hace xd
import "@testing-library/jest-dom"

describe(`Tests in ${__filename} file`, () => {
    test('Must return Hello rafael - params', () => { 
        const name = "rafael"
        const greet = getGreeting(name)

        expect(greet).toBe("Hello rafael")
    })
    test('Must return Hello Rafael - Default', () => { 
        const greet = getGreeting()

        // el toBe me sirve para comparar datos primitivos
        expect(greet).toBe("Hello Rafael")
    })
    
});

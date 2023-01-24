// import path from "path"

// Esto es JEST

// describe(`Pruebas en el archivo ${ path.basename(__filename) }`, () => {
// describe(`Pruebas en el archivo ${__filename}`, () => {
//     test('Debe de ser iguales los string', () => { 
//         const msg1 = "hola"
//         const msg2 = "hola"
//         expect(msg1).toBe(msg2)
//     })
//     test('Debe estar activo', () => { 
//         const isActive = true
//         expect(isActive).toBe(true)
//     })
// });


// podemos tener todo por separado,
// pero para poder agrupar los test usamos un describe:lo cual seria un test suit
test('Debe de ser iguales los string', () => { 
    const msg1 = "hola"
    const msg2 = "hola"
    expect(msg1).toBe(msg2)
})
test('Debe estar activo', () => { 
    const isActive = true
    expect(isActive).toBe(true)
})

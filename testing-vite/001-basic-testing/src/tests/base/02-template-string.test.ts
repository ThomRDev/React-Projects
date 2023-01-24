import { getGreeting } from "../../base/02-template-string"

describe('Test in 02-template-string file', () => {
  test('the function getSaludo should return "Hello Thom"', () => {
    const name = 'Thom'
    const message = getGreeting(name)
    
    expect(message).toBe(`Hello ${name}`)
  })
  test('The function getSaludo should return the default value "Hello Rafael"', () => { 
    
    const message = getGreeting()
    expect(message).toBe(`Hello Rafael`)
  })
})
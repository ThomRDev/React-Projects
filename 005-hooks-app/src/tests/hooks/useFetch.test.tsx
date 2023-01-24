import { renderHook, waitFor } from "@testing-library/react"
import path from "path"

import { useFetch } from "../../hooks/useFetch"
describe('Tests in '+path.basename(__filename)+" file", () => {
    test('the custom hooks must return the initial state', async () => {
        const { result } = renderHook(()=>useFetch("https://reqres.in/api/user?page=1"))
        const {loading,data,error} = result.current
        expect( data ).toBe(null)
        expect( error ).toBe(false)
        expect( loading ).toBe(true)
    })
    test('await values useFetch', async () => {
        
        const { result } = renderHook(()=>useFetch("https://reqres.in/api/user?page=1"))
        console.log(result.current)
    })
    
})
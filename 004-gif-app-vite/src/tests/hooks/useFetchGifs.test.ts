import { renderHook,waitFor } from '@testing-library/react';
// esto ya se encuentra incorporada en react testing libray pero
// me servira como documentacion
// https://react-hooks-testing-library.com/

import { useFetchGifs } from "../../hooks/useFetchGifs"

describe('Test in the useFetchGifs hook', () => {
  test('should return the initial state', () => {
    const {result} = renderHook(()=>useFetchGifs("The Beatles"))
    const {data,loading} = result.current
    expect(data.length).toBe(0)
    expect(loading).toBeTruthy()
  })
  test('should return the gifs', async () => {
    const {result} = renderHook(()=>useFetchGifs("The Beatles"))
    await waitFor(
      () => expect(result.current.data.length).toBeGreaterThan(0),{
        timeout : 2000
      }
    )
    const {data,loading} = result.current
    expect(data.length).toBe(10)
    expect(loading).toBeFalsy()
  })
})
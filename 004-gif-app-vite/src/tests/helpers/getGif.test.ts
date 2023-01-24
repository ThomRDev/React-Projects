import { getGifs } from "../../helpers/getGif"

describe('Test in getGif helper', () => {
  test('should return an gifs array', async () => {
    const gifs = await getGifs('The Beatles')
    expect(gifs.length).toBeGreaterThan(0)
    expect(gifs.length).toBe(10)
    expect(gifs[0]).toEqual({
      id :expect.any(String),
      title:expect.any(String),
      src:expect.any(String)
    })
  })
})
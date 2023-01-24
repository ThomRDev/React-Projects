import { getGif } from "../../helpers/getGif"

describe(`Tests in ${__filename} file`, () => {
    // eslint-disable-next-line
    test('Must return 10 values with the parameter \"the beatles\"', async () => { 
        const gifs = await getGif("the beatles")
        expect(gifs?.length).toBe(10)
    })
    // eslint-disable-next-line
    test('Must return 0 values with the parameter \"\"', async () => { 
        const gifs = await getGif("")
        expect(gifs?.length).toBe(0)
    })
})
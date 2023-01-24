import { getGift } from "../../base/10-async-await";

describe('Tests in '+__filename+" file", () => {
    test('Must be return url', async () => {
        const url = await getGift()
        expect(url.includes("https://")).toBe(true)
    })
});

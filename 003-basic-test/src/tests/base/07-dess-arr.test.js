import { getArr } from "../../base/07-dess-arr";

describe(`Tests in ${__filename} file`, () => {
    test('Must be array with letter and number', () => {
        const arr = getArr()
        const [letter,number] = arr
        expect(arr).toBeInstanceOf(Array)
        expect(typeof letter).toBe("string")
        expect(typeof number).toBe("number")
    });
    
});

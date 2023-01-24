import { getArr } from "../../base/07-dess-arr";

describe('Test in 07-dess-arr file', () => {
  it('Should return an array with value [string,number]', () => {
    const arr = getArr()
    expect(arr.length).toBe(2)
    expect(arr).toBeInstanceOf(Array)
    expect(typeof arr[0]).toBe("string")
    expect(arr[0]).toEqual(expect.any(String))

    expect(typeof arr[1]).toBe("number")

  });
  
})
import { getActiveUser, getUser } from "../../base/05-functions";

describe('Test in 05-functions', () => {
  it('the function getUser should return default value '+JSON.stringify({ uid : "123ABC123", username : "thom_maurick"}), () => {
    const value = {
      uid      : "123ABC123",
      username : "thom_maurick"
    }
    const defaultUser = getUser()

    expect(defaultUser).toEqual(value)

  });
  it('the function getActiveUser should return thee value roman_aguilar', () => {
    const expected = 'roman_aguilar'
    const user = getActiveUser(expected)
    expect(user).toEqual({"uid": "123ABC123", "username": expected})
    // expect(user).toStrictEqual({"uid": "123ABC123", "username": expected})
  
  })
  
})
import { AuthReducer } from "../../../reducers/AuthReducer"
import { ActionTypes } from "../../../types/actions"

describe('Tests in authReducer', () => {
  const initialState = {
    logged : false
  }

  const payload = {
    name : "Thom"
  }

  test('should return the default state', () => {
    const newState = AuthReducer(initialState,{} as any)
    expect(newState).toBe(initialState)
  })
  test('should call the login and set user', () => {

    const newState = AuthReducer(initialState,{
      type : ActionTypes.LOGIN,
      payload
    })
    expect(newState).toEqual({
      ...payload,
      logged : true
    })
  })
  test('should call the logout and delete user', () => {
    const newState = AuthReducer(initialState,{
      type : ActionTypes.LOGOUT,
    })
    expect(newState).toEqual({
      logged : false
    })
  })
})
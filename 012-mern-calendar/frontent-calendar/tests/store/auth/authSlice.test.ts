import { authSlice, clearErrorMessage, onLogin, onLogoutWithError, onLogoutWithoutError } from "../../../src/store/auth/authSlice"
import { authenticatedState, initialStateAuth, notAuthenticatedState } from "../../fixtures/authStates"
import { TestUserCredentials } from "../../fixtures/TestUser"

describe('Tests in authSlice', () => {
  test('should return the initial state', () => {
    expect(authSlice.getInitialState()).toEqual(initialStateAuth)
  })

  test('should do the login', () => {

    const user = {
      name:TestUserCredentials.name,
      uid:TestUserCredentials.uid,
    }

    const state = authSlice.reducer(initialStateAuth,onLogin(user))
    expect(state).toEqual({
      ...authenticatedState,
      user
    })
  })
  test('should do the logout without error message', () => {
    const state = authSlice.reducer(authenticatedState,onLogoutWithoutError())
    expect(state).toEqual(notAuthenticatedState)
  })
  test('should do the logout with error message', () => {
    const errMsg = 'Credenciales no validas'
    const state = authSlice.reducer(authenticatedState,onLogoutWithError(errMsg))
    expect(state).toEqual({
      ...notAuthenticatedState,
      errorMessage: errMsg
    })
  })
  test('should clear the error message', () => {
    const errMsg = 'Credenciales no validas'
    const state = authSlice.reducer(authenticatedState,onLogoutWithError(errMsg))
    const newState = authSlice.reducer(state,clearErrorMessage())
    expect(newState.errorMessage).toBe(null)
  })
})
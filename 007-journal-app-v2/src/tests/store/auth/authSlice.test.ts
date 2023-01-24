import { AnyAction } from 'redux';
import { AuthInitialState, authSlice, AUTH_STATUS, login, logout } from "../../../store/auth"
import { authenticatedState, demoUser, initialState, notAuthenticatedState } from "../../fixtures/authFixtures"

describe('Tests in the authSlice', () => {
  test('should return the initial state and should be called \"auth\"', () => {

    // authSlice = sujeto de pruebas
    const state = authSlice.reducer(initialState,{} as AnyAction)
    
    expect(state).toEqual(initialState)
    expect(authSlice.name).toBe("auth")
  })
  
  test('should do the authentication', () => {
    const state = authSlice.reducer(initialState,login(demoUser as AuthInitialState))
    expect(state).toEqual({
      status: AUTH_STATUS.AUTHENTICATED, // 'checking', 'not-authenticated', 'authenticated'
      uid: demoUser.uid,
      email: demoUser.email,
      displayName: demoUser.displayName,
      photoURL: demoUser.photoURL,
      errorMessage: null,
    })
  })
  test('should do the logout', () => {
    const state = authSlice.reducer(authenticatedState,logout({ errorMessage:null } as AuthInitialState))
    expect(state).toEqual(notAuthenticatedState)
  })
  test('should do the logout and show the error message', () => {
    const state = authSlice.reducer(authenticatedState,logout({ errorMessage:'Error en el servidor' } as AuthInitialState))
    expect(state).toEqual({
      ...notAuthenticatedState,
      errorMessage:'Error en el servidor'
    })
  })
})
// https://redux.js.org/usage/writing-tests
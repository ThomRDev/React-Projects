import { Dispatch } from 'react';
import { AnyAction } from 'redux';
import { loginWithEmailAndPassword, logoutFirebase, registerWithEmailPassword, signInWithGoogle } from '../../firebase/providers';
import { clearNotesLayout } from '../journal';
import { AuthInitialState, checkingCredentials, login, logout } from "./authSlice"



export const startLoginWithEmailPassword = (email:string,password:string)  => {
  return async (dispatch:Dispatch<AnyAction>) => {
    dispatch(checkingCredentials())
    const result = await loginWithEmailAndPassword({ email,password })
    if(!result.ok) return dispatch(logout({ errorMessage : result.errorMessage } as AuthInitialState))
    dispatch(login(result.user as AuthInitialState))
  }
}

export const startGoogleSignIn = () => {
  return async (dispatch:Dispatch<AnyAction>) => {
    dispatch(checkingCredentials())

    const result = await signInWithGoogle()

    if(!result.ok) return dispatch(logout({ errorMessage : result.errorMessage} as AuthInitialState))
    dispatch(login(result.user as AuthInitialState))
  }
}

export const startCreatingUserWithEmailAndPassword = ({ email = "",password = "",displayName = "" }) => {
  return async (dispatch:Dispatch<AnyAction>) => {
    dispatch(checkingCredentials())
    const result = await registerWithEmailPassword({ email,password,displayName })
    if(!result?.ok) return dispatch(logout({ errorMessage : result.errorMessage} as AuthInitialState))
    dispatch(login(result.user as AuthInitialState))
  }
}

export const startLogout = () => {
  return async (dispatch:Dispatch<AnyAction>) => {
    dispatch(checkingCredentials())
    await logoutFirebase()
    dispatch(clearNotesLayout())
    dispatch(logout({ } as AuthInitialState))
  }
}

export const checkingAuthentication = () => {
  return async (dispatch:Dispatch<AnyAction>) => {
    dispatch(checkingCredentials())
  }
}
import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit'

export enum AUTH_STATUS {
  CHECKING = 'checking', // revisando
  NOT_AUTHENTICATED = 'not-authenticated', // no esta authenticado
  AUTHENTICATED ='authenticated' // esta authenticado
}

export interface AuthInitialState {
  status       : AUTH_STATUS
  uid          : string | null
  email        : string | null
  displayName  : string | null
  photoURL     : string | null 
  errorMessage : string | null
}

const initialState:AuthInitialState = {
  // status : AUTH_STATUS.NOT_AUTHENTICATED,
  status : AUTH_STATUS.CHECKING,
  uid: null,
  email: null,
  displayName: null,
  photoURL: null,
  errorMessage: null,
}

export const authSlice = createSlice({
  name  : 'auth',
  initialState,
  reducers : {
    login : (state:AuthInitialState, action: PayloadAction<AuthInitialState>) => {
      state.status = AUTH_STATUS.AUTHENTICATED
      state.uid = action.payload.uid
      state.email = action.payload.email
      state.displayName = action.payload.displayName
      state.photoURL = action.payload.photoURL
      state.errorMessage = null;
    },
    logout: (state:AuthInitialState, action: PayloadAction<AuthInitialState>) => {
      state.uid = null;
      state.email = null;
      state.displayName = null;
      state.photoURL = null;
      state.status = AUTH_STATUS.NOT_AUTHENTICATED
      state.errorMessage = action.payload?.errorMessage
    },
    checkingCredentials : (state:AuthInitialState) => {
      state.status = AUTH_STATUS.CHECKING
    }
  }
})

// estas funciones son llamadas Action Creator Function
export const { login,logout,checkingCredentials } = authSlice.actions
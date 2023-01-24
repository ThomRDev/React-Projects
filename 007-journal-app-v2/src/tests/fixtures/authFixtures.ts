// me servira para todos los estados de la parte de la
// autenticacion de redux

import { AuthInitialState, AUTH_STATUS } from "../../store/auth";

export const initialState:AuthInitialState = {
  status : AUTH_STATUS.CHECKING,
  uid: null,
  email: null,
  displayName: null,
  photoURL: null,
  errorMessage: null,
}

export const authenticatedState:AuthInitialState = {
  status : AUTH_STATUS.AUTHENTICATED,
  uid: '454asd',
  email: 'demo@google.com',
  displayName: 'Demo User',
  photoURL: 'https://demo.jpg',
  errorMessage: null,
}

export const notAuthenticatedState:AuthInitialState = {
  status : AUTH_STATUS.NOT_AUTHENTICATED,
  uid: null,
  email: null,
  displayName: null,
  photoURL: null,
  errorMessage: null,
}

export const demoUser = {
  uid: 'ABC123',
  email: 'demo@google.com',
  displayName: 'Demo User',
  photoURL: 'https://foto.jpg'
}
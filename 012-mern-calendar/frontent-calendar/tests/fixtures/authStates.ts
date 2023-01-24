import { AUTH_STATUS } from "../../src/store";

export const initialStateAuth = {
  status : AUTH_STATUS.CHECKING,
  errorMessage : null,
  user:null
}

export const authenticatedState = {
  status : AUTH_STATUS.AUTHENTICATED,
  errorMessage : null,
  user:{
    uid:'abc',
    name:'thom'
  }
}
export const notAuthenticatedState = {
  status : AUTH_STATUS.NOT_AUTHENTICATED,
  errorMessage : null,
  user:null
}
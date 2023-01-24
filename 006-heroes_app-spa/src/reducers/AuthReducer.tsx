import { IAuthState } from "../interfaces";
import { ActionTypes, AuthActions } from "../types/actions";


export const AuthReducer = (state:IAuthState,action:AuthActions):IAuthState => {
  switch(action.type){
    case ActionTypes.LOGIN:
      return {
        ...action.payload,
        logged:true
      }
    case ActionTypes.LOGOUT :
      return {
        logged:false
      }
    default:
      return state
  }
}

export const AUTH_INITIAL_STATE:IAuthState = {
  logged : false
}
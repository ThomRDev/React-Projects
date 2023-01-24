export enum ActionTypes {
  LOGIN = "[auth] Login",
  LOGOUT = "[auth] Logout"
}

// export interface AuthActions {
//   type : ActionTypes,
//   payload : any
// }

export type AuthActions = 
| { type : ActionTypes.LOGIN, payload:{ name : string } }
| { type : ActionTypes.LOGOUT }
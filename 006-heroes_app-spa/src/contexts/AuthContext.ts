import { IAuthState } from './../interfaces/index';
import { createContext } from "react";
import { AuthActions } from '../types/actions';

export type AuthContextProps = {
  user : IAuthState,
  dispatch ?: (param:AuthActions) => void
}
// podria ser
/**
logged
user
login
logout
 */

export const AuthContext = createContext<AuthContextProps>({} as AuthContextProps)
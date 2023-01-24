import { useEffect, useReducer } from "react"
import { AuthContext } from "../contexts/AuthContext"
import { IProps } from "../interfaces"
import { AuthReducer, AUTH_INITIAL_STATE } from "../reducers/AuthReducer"

const init = () => {
  return JSON.parse(localStorage.getItem('user') || 'null') || { logged: false };
}


const AuthContextProvider = ({ children }:IProps) => {

  // dispatch se utiliza para disparar acciones al reducer
  const [user, dispatch] = useReducer(AuthReducer, AUTH_INITIAL_STATE,init)
  const value = {
    user,
    dispatch
  }

  useEffect(()=>{
    localStorage.setItem('user', JSON.stringify(user));
  },[user])

  return (
    <AuthContext.Provider value={value}>
      { children }
    </AuthContext.Provider>
  )
}

export default AuthContextProvider
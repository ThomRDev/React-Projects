import { useCallback, useState } from "react";
import { UserContext } from "../contexts";
import { IUserProviderProps } from "../interfaces";

export const UserProvider = ({ children }: IUserProviderProps) => {
  const [user,setUser] = useState({
    email :"",
    password : ""
  })

  const changeUser = useCallback((user :any)=>{
    setUser(user)
  },[])

  const value = {
    changeUser,
    user
  }

  return <UserContext.Provider value={value}>
    { children }
  </UserContext.Provider>
}

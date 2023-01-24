import PropTypes from 'prop-types'; 
import { useMemo } from 'react';
import { useCallback } from 'react';
import { createContext, useState } from 'react';
const MY_AUTH_APP = 'MY_AUTH_APP_1'

export const AuthContext = createContext({})

export const AuthContextProvider = ({ children }) => {

  const [isAuthenticated,setIsAuthenticated] = useState(!!localStorage.getItem(MY_AUTH_APP) ?? false)

  const login = useCallback(()=>{
    localStorage.setItem(MY_AUTH_APP,true)
    setIsAuthenticated(true)
  },[])
  
  
  const logout = useCallback(()=>{
    localStorage.removeItem(MY_AUTH_APP)
    setIsAuthenticated(false)
  },[])

  const value = useMemo(() => ({
    login,
    logout,
    isAuthenticated
  }),[login,logout,isAuthenticated])

  return <AuthContext.Provider value={value}>
    { children }
  </AuthContext.Provider>
}


AuthContextProvider.propTypes = {
  children : PropTypes.object
}


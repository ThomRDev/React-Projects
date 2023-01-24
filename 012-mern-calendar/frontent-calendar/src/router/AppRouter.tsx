import { useEffect } from "react"
import { Navigate, Route, Routes } from "react-router-dom"
import { LoginPage } from "../auth"
import { CalendarPage } from "../calendar"
import { useAuthStore } from "../hooks"
import { AUTH_STATE, AUTH_STATUS } from "../store"
import { Loader } from "../ui/components/Loader"



export const AppRouter = () => {
  // const authStatus:AUTH_STATE = AUTH_STATUS.NOT_AUTHENTICATED

  const { status:authStatus,checkAuthToken } = useAuthStore()

  useEffect(()=>{
    checkAuthToken()
  },[])

  if(authStatus === AUTH_STATUS.CHECKING) {
    // return <p>Loading ...</p>
    return <Loader />
  }

  return (
    <Routes>
      {
        authStatus === AUTH_STATUS.NOT_AUTHENTICATED ? 
        <>
          {/* <Route path="/auth/*" element={<LoginPage />} />  */}
          <Route path="/auth/login" element={<LoginPage />} /> 
          <Route path="/*" element={<Navigate to="/auth/login" />} /> 
        </>:   
        <>
          <Route path="/" element={<CalendarPage />} />
          <Route path="/*" element={ <Navigate to="/" /> } />
        </>
      }
      
      
    </Routes>
  )
}

import { ReactNode, useContext } from "react"
import { Navigate, useLocation } from "react-router-dom"
import { AuthContext } from "../contexts/AuthContext"
import { IProps } from "../interfaces"


const PrivateRouter = ({ children }: any) => {
  const { user } = useContext(AuthContext) 
  // console.log("PrivateRouter",user.logged);

  // la magia es este use location sin esto este componente solo se renderiza una ves
  const { pathname, search } = useLocation();
  // console.log("re-render")
  const lastPath = `${pathname}${search}`
  localStorage.setItem('lastPath',lastPath );
  return user.logged ? children : <Navigate to="/login" />
}

export default PrivateRouter
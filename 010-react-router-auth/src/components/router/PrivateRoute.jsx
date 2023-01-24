import { Navigate,Outlet } from "react-router-dom"
import { LOGIN } from "./../../config/routes/paths"
import { useAuthContext } from "./../../hooks/useAuthContext"

export const PrivateRoute = () => {
  const { isAuthenticated } = useAuthContext()
  return !isAuthenticated ? <Navigate to={LOGIN} /> : <Outlet />
}

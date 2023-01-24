import { useAuthContext } from "./../../hooks/useAuthContext"
import { Navigate,Outlet } from "react-router-dom"
import { PRIVATE } from "./../../config/routes/paths"

export const PublicRoute = () => {
  const { isAuthenticated } = useAuthContext()
  return isAuthenticated ? <Navigate to={PRIVATE} /> : <Outlet />
}

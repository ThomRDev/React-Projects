import { Navigate, Route, Routes } from "react-router-dom"
import LoginScreen from "../components/auth/LoginScreen"
import RegisterScreen from "../components/auth/RegisterScreen"

const AuthRouter = () => {
  return (
    <div className="auth-main">
      <Routes>
        <Route path="login" element={<LoginScreen />} />
        <Route path="register" element={<RegisterScreen />} />
        <Route path='*' element={<Navigate to="login" />} />
      </Routes>
    </div>
  )
}

export default AuthRouter
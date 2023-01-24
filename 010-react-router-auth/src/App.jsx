import './App.css'
import { BrowserRouter,Routes,Route } from "react-router-dom"
import { HOME, LOGIN, LOGOUT, PRIVATE } from './config/routes/paths'
import { Login,Home,Logout,Private } from "./views"
import { PublicRoute } from './components/router/PublicRoute'
import { PrivateRoute } from './components/router/PrivateRoute'
import { AuthContextProvider } from './contexts/authContext'

function App() {
  return (
    <AuthContextProvider>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<PublicRoute />}>
            <Route path={HOME} element={<Home />} />
            <Route path={LOGIN} element={<Login />} />
          </Route>
          <Route path={PRIVATE} element={<PrivateRoute />} >
            <Route path={PRIVATE} element={<Private />} />
            <Route path={LOGOUT} element={<Logout />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthContextProvider>

  )
}

export default App

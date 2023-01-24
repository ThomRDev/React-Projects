import { BrowserRouter, Route, Routes } from "react-router-dom"
import { LoginPage } from "../components/pages"
import DashBoardRoutes from "./DashBoardRoutes"
import PrivateRouter from "./PrivateRouter"
import PublicRouter from "./PublicRouter"


const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route  path="/login"
          element={
            <PublicRouter>
              <LoginPage />
            </PublicRouter>
          }
        />

        {/* Otra opcion */}
        {/* <Route  path="login/*"
          element={
            <PublicRouter>
              <Routes>
                <Route  path="/*" element={<LoginPage />} />
              </Routes>
            </PublicRouter>
          }
        /> */}

        <Route  path="/*"
          element={
            <PrivateRouter>
              <DashBoardRoutes />
            </PrivateRouter>
          }
        />
      </Routes>
    </BrowserRouter>
  )
}

export default AppRouter
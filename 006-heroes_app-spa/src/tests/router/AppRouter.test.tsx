import { render, screen } from "@testing-library/react"
import { MemoryRouter, Route, Routes } from "react-router-dom"
import { LoginPage } from "../../components/pages"
import { AuthContext } from "../../contexts/AuthContext"
import AppRouter from "../../routers/AppRouter"
import DashBoardRoutes from "../../routers/DashBoardRoutes"
import PublicRouter from "../../routers/PublicRouter"
import PrivateRouter from "../../routers/PrivateRouter"
import { debug } from "console"

describe('Tests in AppRouter component', () => {
  test("should show the login if it's not authenticated v1", () => {
    const contextValue = {
      user : {
        logged : false,
      }
    }
    render(
      <AuthContext.Provider value={contextValue}>
        {/* <MemoryRouter initialEntries={["/marvel"]}> */}
        {/* me sale un error con lo anterior xq ya existe un BrowserRouter dentro de AppRouter */}
        {/* esto se debe a que un Router no puede estar dentro de otro Router */}
            <AppRouter />
        {/* </MemoryRouter> */}
      </AuthContext.Provider>
    );
    expect(screen.getByText("Login")).toBeTruthy()
    expect(screen.getByText("LoginPage")).toBeTruthy()
  })
  test("should show the login if it's not authenticated v2", () => {
    const contextValue = {
      user : {
        logged : false,
      }
    }
    render(
      <AuthContext.Provider value={contextValue}>
        <MemoryRouter initialEntries={["/marvel"]}>
          <Routes>
            <Route  path="/login"
              element={
                <PublicRouter>
                  <LoginPage />
                </PublicRouter>
              }
            />

            <Route  path="/*"
              element={
                <PrivateRouter>
                  <DashBoardRoutes />
                </PrivateRouter>
              }
            />
          </Routes>
        </MemoryRouter>
      </AuthContext.Provider>
    );
    expect(screen.getByText("Login")).toBeTruthy()
    expect(screen.getByText("LoginPage")).toBeTruthy()
  })
  test("should show the mavel component if it's authenticated", () => {
    const contextValue = {
      user : {
        logged : true,
        name : "Thom"
      }
    }
    render(
      <AuthContext.Provider value={contextValue}>
        <MemoryRouter initialEntries={["/marvel"]}>
          <Routes>
            <Route  path="/login"
              element={
                <PublicRouter>
                  <LoginPage />
                </PublicRouter>
              }
            />

            <Route  path="/*"
              element={
                <PrivateRouter>
                  <DashBoardRoutes />
                </PrivateRouter>
              }
            />
          </Routes>
        </MemoryRouter>
      </AuthContext.Provider>
    );
    expect(screen.getByText("MarvelScreen")).toBeTruthy()
    expect(screen.getByText("HeroesApp")).toBeTruthy()
  })
})
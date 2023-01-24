import {render, screen} from "@testing-library/react"
import { MemoryRouter, Route, Routes } from "react-router-dom"
import PublicRouter from "../../routers/PublicRouter"
import { AuthContext } from "./../../contexts/AuthContext"


describe('Tests in PublicRoute component', () => {
  test("should show the children if it's not authenticated", () => {

    const contextValue = {
      user : {
        logged : false
      }
    }

    render(
      <AuthContext.Provider value={contextValue}>
        <PublicRouter>
          <h1>Public Route</h1>
        </PublicRouter>
      </AuthContext.Provider>
    )

    expect(screen.getByText("Public Route")).toBeTruthy()
  })
  test("should show the Marvel Component if it's authenticated", () => {

    const contextValue = {
      user : {
        logged : true,
        name : "Thom"
      }
    }

    render(
      <AuthContext.Provider value={contextValue}>
        <MemoryRouter initialEntries={["/login"]}>
          <Routes>
              <Route path="login" element={
                <PublicRouter>
                  <h1>Public Route</h1>
                </PublicRouter>
              } />
              <Route path="marvel" element={
                <h1>Marvel</h1>
              } />
          </Routes>
        </MemoryRouter>
      </AuthContext.Provider>
    )
    // screen.debug()
    expect(screen.getByText("Marvel")).toBeTruthy()
  })
})
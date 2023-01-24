import { render, screen } from "@testing-library/react"
import { MemoryRouter, Navigate, Route, Routes } from "react-router-dom"
import { AboutPage, HomePage, LoginPage } from "../../09-UseContext/pages"

describe('Tests in <AppRouter />', () => {
  test('should display the HomePage component', () => {
    render(
      <MemoryRouter initialEntries={["/"]}>
        <Routes>
          <Route path="/login" element={ <LoginPage /> } />
          <Route path="/about" element={ <AboutPage /> } />
          <Route path="/" element={ <HomePage /> } />
          
          {/* wildcard o comodin */}
          <Route path="*" element={<Navigate to="/"/>} />
        </Routes>
      </MemoryRouter>
    )
    expect(screen.getByText("Home Page")).toBeTruthy()
  })
  test('should display the LoginPage component', () => {
    render(
      <MemoryRouter initialEntries={["/login"]}>
        <Routes>
          <Route path="/login" element={ <LoginPage /> } />
          <Route path="/about" element={ <AboutPage /> } />
          <Route path="/" element={ <HomePage /> } />
          
          {/* wildcard o comodin */}
          <Route path="*" element={<Navigate to="/"/>} />
        </Routes>
      </MemoryRouter>
    )
    expect(screen.getByText("LoginPage")).toBeTruthy()
  })
})
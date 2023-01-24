import { fireEvent, render, screen } from "@testing-library/react";
import { MemoryRouter, useNavigate } from "react-router-dom";
import { NavBar } from "../../../components/sections";
import { AuthContext } from "../../../contexts/AuthContext";


const mockUseNavigate = jest.fn()

// simulando un hook de react
// lo que hacemos es cambiar el comportamiento por completo de este paquete
jest.mock("react-router-dom",()=>({
  ...jest.requireActual('react-router-dom'),
  useNavigate : ()=> mockUseNavigate
}))

describe('Tests in Navbar', () => {
  const contextValue = {
    user: {
        logged: true,
        name: 'Thom Roman'
    },
    dispatch: jest.fn()
  }

  beforeEach(() => jest.clearAllMocks() );
  test('should show de user name', () => {
    render(
      <AuthContext.Provider value={ contextValue}>
          <MemoryRouter>
              <NavBar />
          </MemoryRouter> 
      </AuthContext.Provider>
    );
    expect(screen.getByText("Thom Roman").innerHTML).toBe(contextValue.user.name)
  })
  // este test tambien se puede poner en el login
  test('should call the dispatch function when the logout button is clicked', () => {
    render(
      <AuthContext.Provider value={ contextValue}>
          <MemoryRouter>
              <NavBar />
          </MemoryRouter> 
      </AuthContext.Provider>
    );

    const logoutBtn = screen.getByRole("button",{name : "Logout"}) as HTMLButtonElement
    fireEvent.click(logoutBtn)
    expect(contextValue.dispatch).toHaveBeenCalled()
    expect(mockUseNavigate).toHaveBeenCalledWith("/login",{
      replace:true
    })
  })
})
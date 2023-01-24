import { render, screen } from "@testing-library/react"
import { MemoryRouter, Route, Routes } from "react-router-dom"
import { AuthContext } from "../../contexts/AuthContext"
import PrivateRouter from "../../routers/PrivateRouter"

describe('Tests in PrivateRoute component', () => {
  test("should show the children if it's authenticated", () => {
    
    // ==================================================================
    // si tambien quiero probar que se guarde en el localStorage
    // lo puedo simular, pero sino lo simulo igual me correra el test
    // esta parte es solo para saber si se llama al localstorage, pero si no 
    // me interesa porque estoy muy seguro que si se llama lo puedo ignorar

    // accedo a la clase Storage el cual localStorage es una instancia de esta
    Storage.prototype.setItem = jest.fn()

    // ==================================================================

    const contextValue = {
      user : {
        logged : true,
        name : "Thom"
      }
    }

    render(
      <AuthContext.Provider value={contextValue}>
        <MemoryRouter initialEntries={['/search?q=batman']}>
          {/* otra opcion */}
          {/* <Routes>
            <Route path="/search" element={
              <PrivateRouter>
                <h1>Ruta Privada</h1>
              </PrivateRouter>
            } />
            <Route path="/login" element={
              <h1>Login</h1>
            }  />
          </Routes> */}

          {/* otra opcion pero si no esta autenticado saldra un ciclo infinito */}
          <PrivateRouter>
            <h1>Ruta Privada</h1>
          </PrivateRouter>
        </MemoryRouter>
      </AuthContext.Provider>
    );
    expect( screen.getByText('Ruta Privada') ).toBeTruthy();
    expect( localStorage.setItem ).toHaveBeenCalledWith('lastPath', '/search?q=batman');
    
  })
})
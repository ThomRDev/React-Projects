import { render, screen } from "@testing-library/react"
import { MemoryRouter } from "react-router-dom";
import { useAuthStore } from "../../src/hooks/useAuthStore";
import { AppRouter } from "../../src/router";
import { AUTH_STATUS } from "../../src/store/auth/authSlice";

// tengo que colocar esto si me cuasa varios problemas
jest.mock('../../src/calendar', () => ({
  CalendarPage: () => <h1>CalendarPage</h1>
}))

jest.mock('../../src/hooks/useAuthStore');
const mockUseAuthStore = useAuthStore as jest.MockedFunction<typeof useAuthStore>;


describe('Test in <AppRouter />', () => {
  const mockCheckAuthToken = jest.fn();
  beforeEach(() => jest.clearAllMocks() );
  test('should show the loading screen and call checkAuthToken', () => {

    mockUseAuthStore.mockReturnValue({
      status: AUTH_STATUS.CHECKING,
      checkAuthToken:mockCheckAuthToken,
    } as any)

    render(
      <AppRouter />
    )
    expect( screen.getByText('Cargando') ).toBeTruthy() 
    expect( mockCheckAuthToken ).toHaveBeenCalled();
  })
  test('should show the login page if not authenticated', () => {

    mockUseAuthStore.mockReturnValue({
      status: AUTH_STATUS.NOT_AUTHENTICATED,
      checkAuthToken:mockCheckAuthToken,
    } as any)

    const { container } = render(
      <MemoryRouter initialEntries={['/calendar']}>
        <AppRouter />
      </MemoryRouter>
    )
    expect( screen.getByText('Ingreso') ).toBeTruthy();
    expect( container ).toMatchSnapshot(); 
  })
  test('should show the calendar page if authenticated', () => {

    mockUseAuthStore.mockReturnValue({
      status: AUTH_STATUS.AUTHENTICATED,
      checkAuthToken:mockCheckAuthToken,
    } as any)

    const { container } = render(
      <MemoryRouter initialEntries={['/calendar']}>
        <AppRouter />
      </MemoryRouter>
    )
    expect( screen.getByText('CalendarPage') ).toBeTruthy();
  })
})

/**
el problema con testing library es que no puedo probar librerias de terceros
un componente de terceros, testing library si lo renderiza a div div o lo que sea
enzime si me lo construia, colocaba el componente como tal <MyComponent />

El paquete de terceros no se hacen pruebas
 */
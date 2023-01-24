import { configureStore } from "@reduxjs/toolkit";
import { fireEvent, render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { MemoryRouter } from "react-router-dom";
import { LoginPage } from "../../../auth/pages/LoginPage";
import { useAppDispatch } from "../../../store";
// import { startGoogleSignIn } from "../../../store/auth/thunks";
import { authSlice } from "../../../store/auth/authSlice";
import { notAuthenticatedState } from "../../fixtures/authFixtures";

const mockStartGoogleSignIn = jest.fn();
const mockStartLoginWithEmailPassword = jest.fn();

jest.mock('../../../store/auth/thunks',()=>({
  startGoogleSignIn : () => mockStartGoogleSignIn,
  startLoginWithEmailPassword: (email:string, password:string) => {
    return () => mockStartLoginWithEmailPassword(email, password);
  },
}))

// con js
// jest.mock('react-redux', () => ({
//   ...jest.requireActual('react-redux'),
//   useDispatch: () => (fn) => fn(),
// }));

// con typescript
jest.mock('./../../../store/store.ts',() =>({
    ...jest.requireActual('./../../../store/store.ts'),
    useDispatch: () => (fn:any) => fn(),
}))
// const mockUseAppDispatch = useAppDispatch as jest.MockedFunction<typeof useAppDispatch>;

const store = configureStore({
  reducer: {
      auth: authSlice.reducer
  },
  // para poder dar click al btn de google, ya que si esta en checking esta desactivado
  preloadedState: {
      auth: notAuthenticatedState
  }
})


describe('Tests in LoginPage file', () => {
  beforeEach(() => jest.clearAllMocks() );
  test('should display the component correctly', () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <LoginPage />
        </MemoryRouter>
      </Provider>
    )
    // screen.debug()
    expect( screen.getAllByText('Login').length ).toBeGreaterThanOrEqual(1);
  })
  test('the google boton should call the startGoogleSignIn thunk', () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <LoginPage />
        </MemoryRouter>
      </Provider>
    )
    // screen.debug()
    const googleBtn = screen.getByLabelText("google-btn")
    // console.log(googleBtn)
    fireEvent.click(googleBtn)
    // console.log(store.getState())
    expect( mockStartGoogleSignIn ).toHaveBeenCalled();
  })

  test('the submit should call startLoginWithEmailPassword', () => {

    const email = 'thom@gmail.com'
    const password = 'thom@gmail.com'

    render(
      <Provider store={store}>
        <MemoryRouter>
          <LoginPage />
        </MemoryRouter>
      </Provider>
    )

    const emailField = screen.getByLabelText('email')
    // screen.debug(emailField)
    fireEvent.change( emailField, { target: { name: 'email', value: email },preventDefault(){} });

    const passwordField = screen.getByLabelText('password');
    fireEvent.change( passwordField, { target: { name: 'password', value: password } });

    const submitFormLogin = screen.getByLabelText('submit-form-login')
    fireEvent.submit( submitFormLogin,{ preventDefault(){} } );

    // error
    // expect( mockStartLoginWithEmailPassword ).toHaveBeenCalledWith()
    
    expect( mockStartLoginWithEmailPassword ).toHaveBeenCalledWith(email,password)
  })
});
// https://github.com/Klerith/react-journal-material/blob/fin-seccion-21/tests/auth/pages/LoginPage.test.jsx
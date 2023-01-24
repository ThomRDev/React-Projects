import { checkingAuthentication,startGoogleSignIn, startLoginWithEmailPassword, startLogout } from './../../../store/auth/thunks';
import { loginWithEmailAndPassword,logoutFirebase,registerWithEmailPassword,signInWithGoogle } from './../../../firebase/providers'
import { AuthInitialState, checkingCredentials, login, logout } from '../../../store/auth/authSlice';
import { demoUser } from '../../fixtures/authFixtures';
import { start } from 'repl';
import { clearNotesLayout } from '../../../store/journal';
// https://github.com/Klerith/react-journal-material/blob/fin-seccion-21/tests/store/auth/thunks.test.js
// esto lo hacemos ya que babel no va a sobreescribir los modulos de node sobre firebase asi que tendremos que crear mocks  
// cualquier cosa que se encuentre aqui se convierte en un mock
jest.mock('./../../../firebase/providers.ts')

// tipando las funciones que se encuentran en el codigo de arriba jest.mock(blabla)
const mockLoginWithEmailAndPassword = loginWithEmailAndPassword as jest.MockedFunction<typeof loginWithEmailAndPassword>;
const mockLogoutFirebase = logoutFirebase as jest.MockedFunction<typeof logoutFirebase>;
// const mockRegisterWithEmailPassword = registerWithEmailPassword as jest.MockedFunction<typeof registerWithEmailPassword>;
const mockSignInWithGoogle = signInWithGoogle as jest.MockedFunction<typeof signInWithGoogle>;

describe('Tests in AuthThunks file', () => {

  const dispatch = jest.fn()

  beforeEach(()=>jest.clearAllMocks())

  test('should invoke the checking credentials', async () => {
    
    // sujeto de pruebas
    await checkingAuthentication()(dispatch)
    expect(dispatch).toHaveBeenCalledWith(checkingCredentials())
  })


  test('should call startGoogleSignIn and login (success)', async () => {
    const loginData = {ok:true,user:demoUser}

    // lo que hace aqui es hacer un mock de la funcion para que retorne esa data y cada ves que se invoque retorne esa data
    // es resolve ya que es async sino seria return
    await mockSignInWithGoogle.mockResolvedValue(loginData)
    await startGoogleSignIn()(dispatch)

    expect(dispatch).toHaveBeenCalledWith(checkingCredentials())
    expect(dispatch).toHaveBeenCalledWith(login(demoUser as AuthInitialState))
    
  })

  test('should call startGoogleSignIn and logout (error)', async () => {
    const loginData = {
      ok:false,
      errorMessage : 'El usuario no existe',
      errorCode : 500
    }

    // lo que hace aqui es hacer un mock de la funcion para que retorne esa data y cada ves que se invoque retorne esa data
    await mockSignInWithGoogle.mockResolvedValue(loginData)
    await startGoogleSignIn()(dispatch)

    expect(dispatch).toHaveBeenCalledWith(checkingCredentials())
    expect(dispatch).toHaveBeenCalledWith(logout({ errorMessage : loginData.errorMessage } as AuthInitialState))
  })

  test('should call startLoginWithEmailPassword and login (success)', async () => {
    const loginData = {ok:true,user:demoUser}
    const formData = {email:loginData.user.email,password : '123456'}

    await mockLoginWithEmailAndPassword.mockResolvedValue(loginData)
    await startLoginWithEmailPassword(formData.email,formData.password)(dispatch)

    expect(dispatch).toHaveBeenCalledWith(checkingCredentials())
    expect(dispatch).toHaveBeenCalledWith(login(demoUser as AuthInitialState))
  })

  test('should call startLogout, logoutFirebase, clearNotesLayout, logout', async () => {
    await startLogout()(dispatch)
    expect(mockLogoutFirebase).toHaveBeenCalled()
    expect(dispatch).toHaveBeenCalledWith(clearNotesLayout())
    expect(dispatch).toHaveBeenCalledWith(logout({} as AuthInitialState))
  })
})

// https://github.com/Klerith/react-journal-material/blob/fin-seccion-21/tests/store/auth/thunks.test.js
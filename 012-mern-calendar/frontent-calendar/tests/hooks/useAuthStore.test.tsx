import { configureStore } from "@reduxjs/toolkit"
import { renderHook, waitFor } from "@testing-library/react"
import { act } from "react-dom/test-utils"
import { Provider } from "react-redux"
import { calendarApi } from "../../src/api"
import { useAuthStore } from "../../src/hooks"
import { authSlice,AuthInitialState,AUTH_STATUS } from "../../src/store/auth/authSlice"
import { initialStateAuth, notAuthenticatedState } from "../fixtures/authStates"
import { TestUserCredentials } from "../fixtures/TestUser"

const getMockStore = (initialState:AuthInitialState) => {
  return configureStore({
    reducer:{
      auth : authSlice.reducer
    },
    preloadedState:{
      auth:{
        ...initialState
      }
    }
  })
}

describe('Test in useAuthStore', () => {

  beforeEach(() => localStorage.clear() );

  test('should return the default values', () => {

    const mockStore = getMockStore({...initialStateAuth})
    const { result } = renderHook(()=>useAuthStore(),{
      wrapper: ({ children }) => <Provider store={mockStore} >{ children }</Provider>
    })

    expect(result.current).toEqual({
      status: AUTH_STATUS.CHECKING,
      user:null,
      errorMessage: null,
      startLogin: expect.any(Function),
      startRegister: expect.any(Function),
      startLogout: expect.any(Function),
      checkAuthToken: expect.any(Function),
    })

  })
  test('startLogin should do the login correctly', async () => {

    // localStorage.clear()
    const mockStore = getMockStore({...notAuthenticatedState})
    const { result } = renderHook(()=>useAuthStore(),{
      wrapper: ({ children }) => <Provider store={mockStore} >{ children }</Provider>
    })
    // para hacer acciones que modifican el estado de react usar act, si es asincrona usar async y await
    // console.log(result.current)

    // valida el usuario real, en mi backend debo un ccrear un usuario test para mis pruebas
    await act(async()=>{
      await result.current.startLogin({
        email: TestUserCredentials.email,
        password : TestUserCredentials.password
      })
    })
    
    expect(result.current).toEqual({
      status: AUTH_STATUS.AUTHENTICATED,
      user:{
        uid : TestUserCredentials.uid,
        name : TestUserCredentials.name
      },
      errorMessage: null,
      startLogin: expect.any(Function),
      startRegister: expect.any(Function),
      startLogout: expect.any(Function),
      checkAuthToken: expect.any(Function),
    })

    expect( localStorage.getItem('token') ).toEqual( expect.any(String) );
  })
  test('startLogin should fail', async () => {

    // localStorage.clear()
    const mockStore = getMockStore({...notAuthenticatedState})
    const { result } = renderHook(()=>useAuthStore(),{
      wrapper: ({ children }) => <Provider store={mockStore} >{ children }</Provider>
    })

    await act(async()=>{
      await result.current.startLogin({
        email: 'noexisto@notexito.com',
        password : 'asdasd'
      })
    })
    
    expect(result.current.errorMessage).toBe('El usuario no existe con ese email')
    expect( localStorage.getItem('token') ).toBe( null );

    // para esperar que el expect dentro de esto se resuelva
    // normalmente se utiliza si el codigo a probar esta dentro de algo asincrono o algun timer(setTimeout)
    await waitFor(()=>expect(result.current.errorMessage).toBe(null))
  })


  // para la parte del registro, podemos testear que realmente me registre
  // pero estarias creando un usuario cada ves que pasemos por este test
  // una opcion seria eliminar y luego crearlo, pero se veria un poco sucio el codigo
  // lo que podemos hacer es que dentro de este test solo DENTRO creemos un mock
  // y controlar todo el flujo del registro siempre y cuando todo este correcto (SI QUIERES HACER ESTO FIJATE 
  // OTROS EJEMPLOS)
  // un mock implicaria controlar el flujo del objeto por completo
  // EN ESTE CASO LO HARE CON UN SPY : solo controlaremos el flujo del metodo post que nos da axios
  // aunque con un spy tambien podemos espiar el flujo del objeto entero
  // SPY estar pendiendo de algun cambio de lo queremos tambien podemos controlar lo que retorne

  test('startRegister should create an user', async () => {
    // localStorage.clear()
    const newUser = {
      email : 'test@test.com',
      password : 'test123456',
      name : 'Test #12'
    }
    const mockStore = getMockStore({ ...notAuthenticatedState });
    const { result } = renderHook( () => useAuthStore(), {
      wrapper: ({ children }) => <Provider store={ mockStore } >{ children }</Provider>
    });

    const spy = jest.spyOn(calendarApi,'post').mockReturnValue({
      data:{
          "user": {
              "name" : 'Test #12',
              "email": 'test@test.com',
              "id": "6307c79e42c5aa5c014b84c9"
          },
          "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOiI2MzA3Yzc5ZTQyYzVhYTVjMDE0Yjg0YzkiLCJuYW1lIjoiVGVzdCBVc2VyIiwiaWF0IjoxNjYxNDU0MjM5LCJleHAiOjE2NjE0NTc4Mzl9.8ECDufXiguN6cLoTKe4seBeFmhpO5wwWDXqG4JbaX2w",
          "ok": true
        }
    } as any)
    
    await act(async() => {
      await result.current.startRegister(newUser)
    });
    expect({
      errorMessage:result.current.errorMessage, 
      status : result.current.status, 
      user : {
        uid : result.current.user?.uid,
        name: result.current.user?.name
      }
    }).toEqual({
      errorMessage:null, 
      status : "[authenticated]", 
      user : {
        uid:'6307c79e42c5aa5c014b84c9',
        "name" : 'Test #12',
      }
    })

    // destruya el espia obligatorio
    spy.mockRestore();
  })


  test('startRegister should fail the creation', async () => {
    const mockStore = getMockStore({ ...notAuthenticatedState });
    const { result } = renderHook( () => useAuthStore(), {
      wrapper: ({ children }) => <Provider store={ mockStore } >{ children }</Provider>
    });

    await act(async()=>{
      await result.current.startRegister(TestUserCredentials)
    })

    const { errorMessage,status,user } = result.current

    expect({ errorMessage, status, user }).toEqual({
      errorMessage: 'El usuario ya existe',
      status: '[not-authenticated]',
      user: null
    });

    await waitFor(()=>expect(result.current.errorMessage).toBe(null))
  })

  test('checkAuthToken should fail if dont exists the token', async () => {
    const mockStore = getMockStore({ ...notAuthenticatedState });
    const { result } = renderHook( () => useAuthStore(), {
      wrapper: ({ children }) => <Provider store={ mockStore } >{ children }</Provider>
    });
    await act(async()=>{
      await result.current.checkAuthToken()
    })
    const { errorMessage, status, user } = result.current;
    expect({ errorMessage, status, user }).toEqual({
        errorMessage: null,
        status: '[not-authenticated]',
        user: null
    });
  })
  test('checkAuthToken should authenticate if exists the token', async () => {

    const { data } = await calendarApi.post('/auth/login',{
      email : TestUserCredentials.email,
      password : TestUserCredentials.password
    })
    localStorage.setItem('token',data.token)
    const mockStore = getMockStore({ ...notAuthenticatedState });
    const { result } = renderHook( () => useAuthStore(), {
      wrapper: ({ children }) => <Provider store={ mockStore } >{ children }</Provider>
    });
    await act(async()=>{
      await result.current.checkAuthToken()
    })
    const { errorMessage, status, user } = result.current;
    expect({ errorMessage, status, user }).toEqual({
      status: '[authenticated]',
      user: { name: 'Test User', uid: '630707b79c713c1bd83e6103' },
      errorMessage: null
    });
  })
})
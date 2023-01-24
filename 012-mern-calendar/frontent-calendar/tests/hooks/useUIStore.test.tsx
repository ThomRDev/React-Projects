// aqui vemos la configuracion del store con redux para el test
// C:\Users\ThomMR\Desktop\Learning-React-2022\007-journal-app-v2\src\tests\auth\pages\LoginPage.test.tsx

import { configureStore } from "@reduxjs/toolkit"
import { act, renderHook } from "@testing-library/react"
import { Provider } from "react-redux"
import { useUIStore } from "../../src/hooks/useUIStore"
import { uiSlice, UIState } from "../../src/store/ui/uiSlice"

const getMockStore = (initialState:UIState) => {
  return configureStore({
    reducer:{
      ui: uiSlice.reducer
    },
    preloadedState :{
      ui:{
        ...initialState
      }
    }
  })
}

describe('Tests in useUISotre', () => {
  test('should return the default values', () => {

    const mockStore = getMockStore({
      isDateModalOpen : false
    })

    // renderHook para poder utilizar el custom hook
    // ahora necesitamos el Provider ya que dentro de mi custom hook utiliza
    // el hook de dispathc y el selector
    // wrapper, seria el envoltorio donde se ejecutara el los hooks para redux
    const { result } = renderHook( () => useUIStore(), {
      wrapper: ({ children }) => <Provider store={ mockStore }>{ children }</Provider>
    });

    // console.log(result.current);
    expect(result.current).toEqual({
      isDateModalOpen: false,
      closeDateModal: expect.any(Function),
      openDateModal: expect.any(Function),
    });
  })

  // el useAppDispatch podemos hacerlo un mock o un jest,fn o un spy
  // pero podemos hacer la integracion con el store que tenemos y ver si cambia la data
  test('openDateModal should set isDateModalOpen to true', () => {
    const mockStore = getMockStore({
      isDateModalOpen : false
    })
    const { result } = renderHook( () => useUIStore(), {
      wrapper: ({ children }) => <Provider store={ mockStore }>{ children }</Provider>
    });

    // cuando hay un cambio en el state de react se debe de utilizar un act
    // recomendable para las acciones no hacer el destructuring para los valores primitivos ya que no seran reactivos
    act(()=>{
      result.current.openDateModal()
    })
    expect(result.current.isDateModalOpen).toBeTruthy()
  })
  test('closeDateModal should set isDateModalOpen to false', () => {
    const mockStore = getMockStore({
      isDateModalOpen : true
    })
    const { result } = renderHook( () => useUIStore(), {
      wrapper: ({ children }) => <Provider store={ mockStore }>{ children }</Provider>
    });

    act(()=>{
      result.current.closeDateModal()
    })
    expect(result.current.isDateModalOpen).toBeFalsy()
  })
  test('should set isDateModalOpen to false and true', () => {
    const mockStore = getMockStore({
      isDateModalOpen : true
    })
    const { result } = renderHook( () => useUIStore(), {
      wrapper: ({ children }) => <Provider store={ mockStore }>{ children }</Provider>
    });

    act(()=>{
      result.current.closeDateModal()
    })
    expect(result.current.isDateModalOpen).toBeFalsy()
    act(()=>{
      result.current.openDateModal()
    })
    expect(result.current.isDateModalOpen).toBeTruthy()
  })
})
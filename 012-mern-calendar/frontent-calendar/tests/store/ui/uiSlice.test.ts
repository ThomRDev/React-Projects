import { onCloseDateModal, onOpenDateModal, uiSlice } from "../../../src/store/ui/uiSlice"
import { uiInitialState,openDateModalState } from "../../fixtures/uiStates"

describe('Tests in uiSlice', () => {
  test('should return the default state', () => {
    expect(uiSlice.getInitialState().isDateModalOpen).toBeFalsy()
    expect(uiSlice.getInitialState()).toEqual(uiInitialState)
  })

  test('should change the isDateOpenModal correctly', () => {
    let state = uiSlice.getInitialState()

    // el reducer se le tiene que poner el state inicial y luego la accion a ejecutar
    // para ver el cambio del estate 
    state = uiSlice.reducer(state,onOpenDateModal())
    expect(state.isDateModalOpen).toBeTruthy()
    expect(state).toEqual(openDateModalState)
    state = uiSlice.reducer(state,onCloseDateModal())
    expect(state.isDateModalOpen).not.toBeTruthy()
    expect(state.isDateModalOpen).toBeFalsy()
  })
})
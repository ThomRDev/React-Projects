import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit'
export interface UIState {
  isDateModalOpen : boolean
}
const initialState:UIState = {
  isDateModalOpen : false
}
export const uiSlice = createSlice({
  name  : 'ui',
  initialState,
  reducers : {
    onOpenDateModal : (state:UIState,/*action*/) => {
      state.isDateModalOpen = true
    },
    onCloseDateModal : (state:UIState,/*action*/) => {
      state.isDateModalOpen = false
    },
  }
})
export const { onOpenDateModal,onCloseDateModal } = uiSlice.actions
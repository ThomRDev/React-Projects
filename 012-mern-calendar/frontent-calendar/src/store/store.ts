import { configureStore } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';
import { authSlice } from './auth/authSlice';
import { calendarSlice } from './calendar/calendarSlice';
import { uiSlice } from './ui/uiSlice';
export const store = configureStore({
  reducer:{
    auth : authSlice.reducer,
    ui: uiSlice.reducer,
    calendar : calendarSlice.reducer,
  },
  // me da error por la fecha del calendario (start y end)
  // una de las soluciones es tener la fecha como un numero y no como un string
  // esto es un error de redux que intenta serializar
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({
    serializableCheck: false
  })
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export const useAppDispatch: () => AppDispatch = useDispatch 
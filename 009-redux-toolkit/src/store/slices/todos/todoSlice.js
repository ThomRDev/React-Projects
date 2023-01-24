import { createSlice } from '@reduxjs/toolkit';
const initialState = {
  todos : []
}
export const todoSlice = createSlice({
  name  : 'todo',
  initialState,
  reducers : {
    add : (state,action) => {
      state.todos.push(action.payload)
    }
  }
})
export const { add } = counterSlice.actions
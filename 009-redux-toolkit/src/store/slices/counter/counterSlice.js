import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value : 0
}

export const counterSlice = createSlice({
  // este es el nombre del slice, por el cual yo lo voy a seleccionar del state del hook de useSelector
  // const { value } = useSelector(state=>state.counter)
  name  : 'counter',
  initialState,
  reducers : {
    increment : (state) => {
      // redux toolkit nos permite hacer codigo de tipo mutante
      // pero este internamente se encarga de generar un nuevo
      // state gracias a la libreria Immer
      state.value++
    },
    decrement: (state) => {
      state.value--
    },
    incrementByCustom : (state,action) => {
      
      console.log(action)
      /**
        action = {
          type : "counter/incrementByCustom",
          payload : 2
        }
       */
      state.value += action.payload
    }
  }
})


// esto es un accion creator
// antes era action = { type:"ADD",payload:data }
// funciones que crean acciones

// todo eso anterior es equivalente a esto
export const { increment,decrement,incrementByCustom } = counterSlice.actions
// export default counterSlice.reducer
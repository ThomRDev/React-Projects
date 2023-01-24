import { configureStore} from "@reduxjs/toolkit"
import { todosApi } from "./apis/todosApi"

// import counterSlice  from "./slices/counter/counterSlice"
import { counterSlice }  from "./slices/counter/counterSlice"

import { pokemonSlice } from "./slices/pokemon"

export const store = configureStore({
  // combinando los reducers
  reducer: {
    counter : counterSlice.reducer,
    pokemons : pokemonSlice.reducer,

    // RTK query : evita traer informacion duplicada si ya se encuentra en la cache
    [todosApi.reducerPath] : todosApi.reducer
  },

  // una funcion que se ejecuta antes que otra
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(todosApi.middleware) 
})
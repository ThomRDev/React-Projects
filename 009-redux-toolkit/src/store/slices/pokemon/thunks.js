// thunk es una funcion con logica asincrona(ejecuta una tarea asincrona) y cuando termina dispara una accion a nuestro reducer
// es decir cuando el thunk se ejecute llamará aun reducer
// se hará un dispatch dentro del thunk de cualquier accion

// think acciones asincronas que disparan otra accion
import { pokemonApi } from "../../../api/pokemonApi"
import { setPokemons, startLoadingPokemons } from "./pokemonslice"

export const getPokemons = (page = 0) => {

  // getState para obtener todo el root state, verificar si el usuario esta authenticado, cual es el
  // nombre del usuario anything ...
  // cualquier pieza del state
  return async ( dispatch, getState ) => {
    dispatch(startLoadingPokemons())
    
    // TODO: realizar peticion http
    // const response = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=10&offset=${ page * 10 }`)
    // const data = await response.json()

    const { data } = await pokemonApi.get(`/pokemon?limit=10&offset=${ page * 10 }`)

    dispatch(setPokemons({
      page: page + 1,
      pokemons : data.results
    }))
  }
}
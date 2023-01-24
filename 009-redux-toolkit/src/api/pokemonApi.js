import axios from "axios"

// me permite crear una configuracion
// estandar para no repetir codigo
export const pokemonApi = axios.create({
  baseURL : "https://pokeapi.co/api/v2"
})

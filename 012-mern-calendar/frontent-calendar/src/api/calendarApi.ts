import { getEnvVariables } from "../helpers";
import axios from 'axios'

const { VITE_API_URL } = getEnvVariables()

const calendarApi = axios.create({
  baseURL : VITE_API_URL
})


// interseptores, lo que hara es configurarse antes o despues de hacer el request al servidor
// y con ellos añadir o modificar la peticion que se envie al servidor

// en este caso cada ves que se hace un request se agregará el x-token
calendarApi.interceptors.request.use(config=>{
  config.headers = {
    ...config.headers,
    'x-token' : localStorage.getItem('token') as string
  }
  return config
})

export default calendarApi
// https://stackoverflow.com/questions/11704267/in-javascript-how-to-conditionally-add-a-member-to-an-object
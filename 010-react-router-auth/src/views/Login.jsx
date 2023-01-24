import { useState } from "react"
import { useAuthContext } from "../hooks/useAuthContext"

export const Login = () => {
  const { login } = useAuthContext()
  const [magicWord,setMagicWord] = useState("")
  
  const onLoginSubmit = (event) => {
    event.preventDefault()
    if(magicWord === "admin"){
      
      login()
    }
  }

  const onInputChange = (event) => {
    setMagicWord(event.target.value)
  }

  return (
    <div>
      <h1>Login</h1>
      <form onSubmit={onLoginSubmit} >
        <input type="text" value={magicWord}  onChange={onInputChange} />
        <button type="submit" >Iniciar sesión</button>
      </form>
    </div>
  )
}

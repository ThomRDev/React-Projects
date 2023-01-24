import { ChangeEvent, useState,FormEvent } from "react"
import "./Login.scss"

const LoginConComponentesControlados = () => {

  // const [email,setEmail] = useState("")
  // const [password,setPassword] = useState("")

  const [form,setForm] = useState({
    email : "",
    password :""
  })

  const handleChangeInput = (event:ChangeEvent<HTMLInputElement>) => {
    event.preventDefault()
    const {value,name} = event.target
    setForm({
      ...form,
      [name] : value
    })
  }

  const submitLogin = (event:FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    console.log(form);
  }

  return (
    <form className="login" onSubmit={submitLogin}>
      <div className="login-content">
        <div className="login__control">
          <label>Correo Electronico</label>
          <input placeholder="Email" 
          onChange={handleChangeInput}
          className="login__input" type="email" required value={form.email} autoComplete="off" name="email" />
        </div>
        <div className="login__control">
          <label>Password</label>
          <input 
          onChange={handleChangeInput}
          placeholder="Password" required className="login__input" value={form.password} type="password" autoComplete="off" name="password" />
        </div>
        <button type="submit" className="login__action">Ingresar</button>
      </div>
    </form>
  )
}

export default LoginConComponentesControlados
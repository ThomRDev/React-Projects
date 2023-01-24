import React, { FormEvent, useState } from "react"
import LoginConComponentesControlados from "./components/LoginConComponentesControlados";
import LoginConComponentesNoControlados from "./components/LoginConComponentesNoControlados";
import { ReactHookForm } from "./components/ReactHookForm";
import RealForm from "./components/RealForm";


const FormFieldBasic = () => {

  const handleSubmit = (event:FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    console.log(event.currentTarget.remember.checked);
    console.log(event.currentTarget.email.value);
  }

  //componentes no controlados 
  return <form onSubmit={handleSubmit}>
    {/* ya que es un componente no controlado, el checked y como el value no se podra cambiar */}
    <input type="text" placeholder='Username' name="username" autoComplete="off" required defaultValue={"Something"}/>
    <input type="email" placeholder='Email' name="email" required autoComplete="off" defaultValue={"something@gmail.com"} />
    <input type="password" placeholder='Password' name="password" autoComplete="off" required />
    <div>
      <label htmlFor="remember">Recordar</label>
      {/* <input type="checkbox" id="remember" checked /> */}
      <input type="checkbox" id="remember" name="remember" defaultChecked />
    </div>

    {/* este value solo existe en jsx */}
    <textarea name="description" placeholder="Description" autoComplete="off" defaultValue={"Somethind text"} />

    {/* este value solo existe en jsx pero no en html(en html se debe de usar el selected) */}
    <select defaultValue={"PE"} name="country">
      <option value="">--Seleccionar--</option>
      {/* <option value="PE" selected>Peru</option> */}
      <option value="PE">Peru</option>
      <option value="CO">Colombia</option>
      <option value="EC">Ecuador</option>
    </select>
    <div>
      {/* <input type="radio" id="contactChoice1" name="contact" value="email" checked /> */}
      <input type="radio" id="contactChoice1" name="contact" value="email" defaultChecked />
      <label htmlFor="contactChoice1">Email</label>

      <input type="radio" id="contactChoice2" name="contact" value="phone" />
      <label htmlFor="contactChoice2">Phone</label>

      <input type="radio" id="contactChoice3" name="contact" value="mail" />
      <label htmlFor="contactChoice3">Mail</label>
    </div>
    <button type="submit">Registrar</button>
  </form>
}


const AnotherBasicForm = () => {
  const [password,setPassword] = useState("")
  const [password2,setPassword2] = useState("")

  return <>
    <form onSubmit={(event)=>{
      event.preventDefault()
      setPassword(event.currentTarget.password.value)
      setPassword2(event.currentTarget.password2.value)
    }} >
      <input type="password" name="password" placeholder="Password" autoComplete="off" />
      <input type="password" name="password2" placeholder="Password2" autoComplete="off" />
      <button type="submit">Enviar</button>
    </form>
    {
      password.trim().length >= 1 && (password === password2 ? "son iguales" : "son diferentes" )
    }
  </>
}


function App() {
  return (
    <div className="App">
      {/* <FormFieldBasic /> */}
      {/* <AnotherBasicForm /> */}
      {/* <h1  style={{ textAlign:"center" }}>login con componentes controlados</h1>
      <LoginConComponentesControlados />
      <hr />
      <h1  style={{ textAlign:"center" }}>login con componentes no controlados</h1>
      <LoginConComponentesNoControlados /> */}
      {/* <ReactHookForm /> */}
      <RealForm />
    </div>
  )
}

export default App

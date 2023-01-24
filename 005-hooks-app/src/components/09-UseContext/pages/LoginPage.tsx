import { useContext, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import useForm from "../../../hooks/useForm"
import { UserContext } from "../contexts"

const LoginPage = () => {
  const history = useNavigate();
  const { reset,handleChangeInput,password,email }:any = useForm({
    email:"",
    password : ""
  })

  const { changeUser } = useContext(UserContext)

  useEffect(()=>{
    document.title = "Login"
    return () => {
      document.title = "App"
    }
  },[])
  return (
    <div>
      <h1>LoginPage</h1>
      <hr />
      <form onSubmit={(event)=>{
        event.preventDefault()
        const emailField = email.trim()
        const passwordField = password.trim()

        if(!emailField.length || !passwordField.length){
          return
        }
        changeUser({
          email: emailField,
          password : passwordField
        })
        history('/');
        reset()
      }}
      >
        <div className="form-group">
          <label htmlFor="email">Email address</label>
          <input
          name="email"
          onChange={handleChangeInput}
          value={email} 
          type="email" className="form-control" id="email" aria-describedby="emailHelp" placeholder="Enter email" />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input 
          onChange={handleChangeInput}
          value={password}
          name="password"
          type="password" className="form-control" id="password" placeholder="Password" />
        </div>
        <button type="submit" className="btn btn-primary form-control mt-3" >Login</button>
      </form>
    </div>
  )
}

export default  LoginPage 
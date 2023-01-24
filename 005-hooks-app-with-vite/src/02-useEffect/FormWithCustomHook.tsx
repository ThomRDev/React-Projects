import { FormEvent} from "react"
import { useForm } from "../hooks/useForm"

interface FormData{
  password : string,
  email : string,
  username : string
}

const FormWithCustomHook = () => {

  const { onChange,form:{ email,password,username },onResetForm } = useForm<FormData>({
    password: "",
    email : "",
    username : ""
  })
  const handlerSubmit = (event : FormEvent<HTMLFormElement>) =>{
      event.preventDefault()
  }



  return <div>
    <h2>Form With custom hook</h2>
      <div>
          <ul>
              <li>
                  <span>username :</span>&nbsp;<span>{JSON.stringify(username)}</span>
              </li>
              <li>
                  <span>email :</span>&nbsp;<span>{JSON.stringify(email)}</span>
              </li>
              <li>
                  <span>password :</span>&nbsp;<span>{JSON.stringify(password)}</span>
              </li>
          </ul>
      </div>
      <form onSubmit={handlerSubmit}>
          <div className="input-group m-1">
              <div className="input-group-append">
                  <span className="input-group-text">Password</span>
              </div>
              <input type="password" name="password" autoComplete="off" className="form-control" onChange={onChange} value={password} />
          </div>
          <div className="input-group m-1">
              <div className="input-group-append">
                  <span className="input-group-text">Email</span>
              </div>
              <input type="email" name="email" autoComplete="off" className="form-control" onChange={onChange} value={email} />
          </div>
          <div className="input-group m-1">
              <div className="input-group-append">
                  <span className="input-group-text">Username</span>
              </div>
              <input type="text" name="username" autoComplete="off" className="form-control" onChange={onChange} value={username} />
          </div>
      </form>
      <button onClick={onResetForm}>Reset</button>
  </div>
}

export default FormWithCustomHook
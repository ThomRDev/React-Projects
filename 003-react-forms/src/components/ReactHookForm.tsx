
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import "./Login.scss"
export const ReactHookForm = () => {
  const { register,handleSubmit,formState:{ errors },watch } = useForm()

  const submit = handleSubmit(data=>console.log(data))

  useEffect(()=>{
    console.log(watch("email"));
  })
  // https://stackblitz.com/edit/react-form-with-hooks-plelz1?file=src%2Fcomponents%2FloginForm%2Fhooks%2FuseLoginFormValidator.js
  return (
    <>
      <form className="login" onSubmit={submit}>
        <div className="login-content">
          <div className="login__control">
            <label>Correo Electronico</label>
            <input placeholder="Email" 
            className="login__input" type="email" required 
            // autoComplete="off"
            {...register("email",{
              required:{
                value : true,
                message  :"El email es requerido"
              },
              pattern:{
                value:/\S+@\S+\.\S+/,
                message : "No es un email"
              }
            })}
            name="email"
            />
            <div className="error">
              { errors.email?.type === "required" &&  <span>{ errors.email.message }</span>}
              { errors.email?.type === "pattern" &&  <span>{ errors.email.message }</span>}
            </div>
          </div>
          <div className="login__control">
            <label>Password</label>
            <input placeholder="Password"
            {...register("password",{
              required:{
                value : true,
                message  :"El password es requerido"
              },
              minLength:{
                value:5,
                message : "La contraseña debe de tener minimo 5 caracteres"
              }
            })}
            name="password" 
            className="login__input" type="password" required  autoComplete="off" />
            <div className="error">
              { errors.password?.type === "required" &&  <span>{ errors.password.message }</span>}
              { errors.password?.type === "minLength" &&  <span>{ errors.password.message }</span>}
            </div>
          </div>
          <button type="submit" className="login__action">Login</button>
        </div>
      </form>
    </>
  )
}

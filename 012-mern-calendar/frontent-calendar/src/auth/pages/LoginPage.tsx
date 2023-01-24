import { FormEvent, useEffect } from "react";
import Swal from "sweetalert2";
import { useAuthStore, useForm } from "../../hooks";
import "./login.css";

const loginFormFields = {
  email: "",
  password: "",
};
const registerFormFields = {
  name: "",
  email: "",
  password: "",
  confirmPassword: "",
};

export const LoginPage = () => {
  const { formState: loginFields, onInputChange: onLoginInputChange } =
    useForm(loginFormFields);
  const { formState: registerFields, onInputChange: onRegisterInputChange } =
    useForm(registerFormFields);

    const { startLogin,errorMessage,startRegister } = useAuthStore()

  const loginSubmit = (event:FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    // console.log(loginFields)
    startLogin(loginFields)
  }

  const registerSubmit = (event:FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if(registerFields.password !== registerFields.confirmPassword){
      Swal.fire('Error en registro','Las contraseñas no coinciden','error')
      return
    }
    startRegister(registerFields)
  } 

  useEffect(()=>{
    if(!!errorMessage) {
      Swal.fire('Error en la autenticacion',errorMessage,'error')
    }
  },[errorMessage])

  return (
    <div className="container login-container animate__animated animate__fadeIn" style={{ margin:'auto' }}>
      <div className="row">
        <div className="col-md-6 login-form-1">
          <h3>Ingreso</h3>
          <form onSubmit={loginSubmit}>
            <div className="form-group mb-2">
              <input
                type="text"
                className="form-control"
                name="email"
                value={loginFields.email}
                onChange={onLoginInputChange}
                placeholder="Correo"
              />
            </div>
            <div className="form-group mb-2">
              <input
                type="password"
                className="form-control"
                placeholder="Contraseña"
                name="password"
                onChange={onLoginInputChange}
                value={loginFields.password}
              />
            </div>
            <div className="form-group mb-2">
              <input type="submit" className="btnSubmit" value="Login" />
            </div>
          </form>
        </div>

        <div className="col-md-6 login-form-2">
          <h3>Registro</h3>
          <form onSubmit={registerSubmit} >
            <div className="form-group mb-2">
              <input
                type="text"
                className="form-control"
                placeholder="Nombre"
                name="name"
                value={registerFields.name}
                onChange={onRegisterInputChange}
              />
            </div>
            <div className="form-group mb-2">
              <input
                type="email"
                className="form-control"
                placeholder="Correo"
                name="email"
                value={registerFields.email}
                onChange={onRegisterInputChange}
              />
            </div>
            <div className="form-group mb-2">
              <input
                type="password"
                className="form-control"
                placeholder="Contraseña"
                name="password"
                value={registerFields.password}
                onChange={onRegisterInputChange}
              />
            </div>

            <div className="form-group mb-2">
              <input
                type="password"
                className="form-control"
                placeholder="Repita la contraseña"
                name="confirmPassword"
                value={registerFields.confirmPassword}
                onChange={onRegisterInputChange}
              />
            </div>

            <div className="form-group mb-2">
              <input type="submit" className="btnSubmit" value="Crear cuenta" />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

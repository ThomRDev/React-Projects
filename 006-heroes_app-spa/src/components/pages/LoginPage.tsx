import { useContext } from "react"
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthContext"
import { ActionTypes } from "../../types/actions"

const LoginPage = () => {
  const history = useNavigate();
  const { dispatch } = useContext(AuthContext)

  return (
    <div>
      <h1>LoginPage</h1>
      <button className="btn btn-outline-primary" onClick={()=>{

        // podria abstraer esto en una funcion login q recibe como parametro al usuario
        // tambien podria invocar al localStorage y almacenar al usuario pero ya lo hago en el provider dentro de un useEffect
        // localStorage.setItem('user', JSON.stringify(user));
        dispatch?.({
          type:ActionTypes.LOGIN,
          payload:{
            name : "ThomR"
          }
        })


        const lastPath = localStorage.getItem("lastPath") ?? "/"
        console.log(lastPath)
        // replace, para evitar regresar a la ruta anterior con el boton de back del navegador
        // que reemplace la historia en lugar de almacenr
        history(lastPath,{
          replace:true
        })
      }} >Login</button>
    </div>
  )
}

export default LoginPage
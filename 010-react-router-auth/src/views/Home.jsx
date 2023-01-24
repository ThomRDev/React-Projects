import { Link } from "react-router-dom"
import { LOGIN } from "./../config/routes/paths"
export const Home = () => {
  return (
    <div>
      <h1>Mucho contenido para el publico</h1>
      <Link to={LOGIN}>Iniciar Sesión</Link>
    </div>
  )
}

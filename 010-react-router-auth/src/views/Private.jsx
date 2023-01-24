import { Link } from "react-router-dom"
import { LOGOUT } from "./../config/routes/paths"

export const Private = () => {
  return (
    <div>
      <h1>Private</h1>
      <Link to={LOGOUT}>Logout</Link>
    </div>
  )
}

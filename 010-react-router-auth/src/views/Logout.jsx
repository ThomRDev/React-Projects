
import { useAuthContext } from "./../hooks/useAuthContext"

export const Logout = () => {
  const { logout } = useAuthContext()
  return (
    <div>
      <button onClick={logout} >Logout</button>
    </div>
  )
}

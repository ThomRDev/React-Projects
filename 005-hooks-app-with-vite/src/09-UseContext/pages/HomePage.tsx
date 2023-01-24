import { useContext, useEffect } from "react"
import { UserContext } from "../contexts"

const HomePage = () => {
  useEffect(()=>{
    document.title = "Home"
    return () => {
      document.title = "App"
    }
  },[])
  const { user } = useContext(UserContext)
  return (
    <div>
      <h1>Home Page</h1>
      <hr />
      <pre aria-label="user">

        { JSON.stringify(user,null,3) }
        </pre>

    </div>
  )
}

export default  HomePage
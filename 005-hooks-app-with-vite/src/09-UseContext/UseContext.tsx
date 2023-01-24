import { UserProvider } from "./Providers"
import { AppRouter } from "./routes"

import "./UseContext.css"

const UseContext = () => {
  return (
    <UserProvider>
      <AppRouter />
    </UserProvider>
  )
}

export default UseContext
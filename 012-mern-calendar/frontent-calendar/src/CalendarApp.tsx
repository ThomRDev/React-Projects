import { Provider } from "react-redux"
import { BrowserRouter, HashRouter } from "react-router-dom"
import { AppRouter } from "./router"
import { store } from "./store"

export const CalendarApp = () => {
  return (
    <Provider store={store}>
      {/* una solucion para el path en un servidor */}
      {/* es usar el * en node con express y redirijir a index.html */}
      {/* otra es usar el # */}
      {/* 
        BrowserRouter /auth/login
        HashRouter  /#/auth/login
      */}
      {/* <HashRouter> */}
        <BrowserRouter>
          <AppRouter />
        </BrowserRouter>
      {/* </HashRouter> */}
    </Provider>
  )
}
// https://www.reddit.com/r/reactjs/comments/q6lit4/thoughts_about_redux_reactquery_together/
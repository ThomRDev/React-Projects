import {BrowserRouter, Route, Routes} from "react-router-dom"
import { JournalScreen } from "../components/journal/JournalScreen"
import AuthRouter from "./AuthRouter"


const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/auth/*" element={<AuthRouter />}  />
        <Route path="/" element={<JournalScreen />}  />
      </Routes>
    </BrowserRouter>
  )
}

export default AppRouter
import { BrowserRouter as Router,Navigate,Route,Routes } from "react-router-dom"
import { AboutPage, HomePage, LoginPage } from "../pages"
import { Header } from "../sections"

const AppRouter = () => {
  return <Router >
    <Header />
    <Routes>
      <Route path="/login" element={ <LoginPage /> } />
      <Route path="/about" element={ <AboutPage /> } />
      <Route path="/" element={ <HomePage /> } />
      
      {/* wildcard o comodin */}
      <Route path="*" element={<Navigate to="/"/>} />
    </Routes>
  </Router>
}

export default AppRouter
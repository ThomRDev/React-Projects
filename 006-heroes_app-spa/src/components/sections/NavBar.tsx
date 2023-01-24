import { useContext } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom"
import { AuthContext } from "../../contexts/AuthContext";
import { ActionTypes } from "../../types/actions";

const NavBar = () => {

  const { dispatch,user } = useContext(AuthContext)

  const history = useNavigate();

  const handleLogout = () => {

    // podrai colocar esto en el provider
    localStorage.removeItem("user")
    dispatch?.({
      type : ActionTypes.LOGOUT
    })
    
    history("/login",{
      replace:true
    })
  }

  // console.log("render NavBar")

  return (
    <nav  className="navbar navbar-expand-sm navbar-dark bg-dark" style={{ padding:"0.5em 1em" }}>
      <div className="container">
        
          <Link 
              className="navbar-brand" 
              to="/"
          >
            HeroesApp
          </Link>
          <div className="navbar-collapse">
            <div className="navbar-nav w-100">
              <NavLink className={({isActive}) => 'nav-item nav-link' + (isActive ? ' active': '')} to="/marvel">
                Marvel
              </NavLink>
        
              <NavLink className={({isActive}) => 'nav-item nav-link' + (isActive ? ' active': '')} to="/dc">
                DC
              </NavLink>
        
              <NavLink className={({isActive}) => 'nav-item nav-link' + (isActive ? ' active': '')} to="/search">
                search
              </NavLink>
              <div className="navbar-collapse collapse order-3 dual-collapse2 d-flex justify-content-end">
                <ul className="navbar-nav ml-auto">
                  <span className="nav-item nav-link text-info">{ user.name }</span>
                  <button 
                    className="btn nav-item nav-link btn"
                    onClick={handleLogout}
                  >
                    Logout
                  </button>
                </ul>
              </div>
            </div>
          </div>
      </div>
    </nav>
  )
}

export default NavBar
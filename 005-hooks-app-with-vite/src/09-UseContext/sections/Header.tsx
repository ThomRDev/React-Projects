import { NavLink } from 'react-router-dom'

const Header = () => {
  return (
    <header>
      <nav>
        <ul>
          <NavLink to="/" className={({ isActive })=>(isActive ?"active" :"")}>
            <li>Home</li>
          </NavLink>
          <NavLink to="/login" className={({ isActive })=>(isActive ?"active" :"")}>
            <li>Login</li>
          </NavLink>
          <NavLink to="/about" className={({ isActive })=>(isActive ?"active" :"")}>
            <li>About</li>
          </NavLink>
        </ul>
      </nav>
    </header>
  )
}

export default Header


/* 
<NavLink to="/about" className={({ isActive })=>`nav-link ${isActive ? 'active':''}`}>
  <li>About</li>
</NavLink> 
*/
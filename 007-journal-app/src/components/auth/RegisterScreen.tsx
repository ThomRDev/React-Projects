import { Link } from "react-router-dom"

const RegisterScreen = () => {
  return (
    <div className="auth-container bounceIn">
      <h3 className="auth__title">Register</h3>
      <form>
        <div className="auth__control">
          <input type="text" placeholder="Name" name="name" className="auth__input" autoComplete="off" />
        </div>
        <div className="auth__control">
          <input type="text" placeholder="Email" name="email" className="auth__input" autoComplete="off" />
        </div>
        <div className="auth__control">
          <input type="text" placeholder="Password" name="password" className="auth__input" autoComplete="off" />
        </div>
        <div className="auth__control">
          <input type="text" placeholder="Confirm password" name="password2" className="auth__input" autoComplete="off" />
        </div>
        <button type="submit" className="btn btn-primary btn-block mb-5">Register</button>
      </form>
      <Link to="/auth/login" className="link">Already registered?</Link>
    </div>
  )
}

export default RegisterScreen
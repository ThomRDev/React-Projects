import { Google } from "@mui/icons-material"
import { Alert, Button, Grid, Link as StyleLink, TextField, Typography } from "@mui/material"
import { FormEvent, MouseEvent, useMemo } from "react"
import { useSelector, useDispatch  } from "react-redux"
import { Link as RouterLink } from "react-router-dom"
import { useForm } from "../../hooks"
import { RootState, useAppDispatch } from "../../store"
import { startLoginWithEmailPassword, startGoogleSignIn, AUTH_STATUS } from "../../store/auth"
import { AuthLayout } from "../layout/AuthLayout"

// error en el custom hooks si no existe este objeto afuera
const formLoginData = {
  email : "thom@gmail.com",
  password : "123456"
}

export const LoginPage = () => {


  const { status,errorMessage } = useSelector((state:RootState)=>state.auth)
  const dispatch = useAppDispatch()

  const { email,password,onInputChange } = useForm(formLoginData)

  const isAuthenticating = useMemo(()=>status === AUTH_STATUS.CHECKING,[status])

  // const onSubmit = (event:MouseEvent<HTMLButtonElement>) => {
  //   event.preventDefault()
  // }
  const onSubmit = (event:FormEvent) => {
    event.preventDefault()
    dispatch(startLoginWithEmailPassword(email,password))
  }

  const onGoogleSignIn = (event:MouseEvent<HTMLButtonElement>) => {
    event.preventDefault()
    console.log("onGoogleSignIn")
    dispatch(startGoogleSignIn())
  }

  return (
    <AuthLayout title="Login">
      <form onSubmit={onSubmit}
      className="animate__animated animate__fadeIn animate__faster"
      aria-label="submit-form-login"
      >
        <Grid container sx={{ gap:2.5 }}>
          {/* xs={12} en pantallas pequeñas 12 columnas es como un max-width */}
          <Grid item xs={12}>
            <TextField
              label="Email"
              type="email"
              placeholder="email@gmail.com"
              name="email"
              inputProps={{
                'aria-label':'email'
              }}
              autoComplete="off"
              fullWidth
              value={email}
              onChange={onInputChange}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Password"
              type="password"
              placeholder="***********"
              name="password"
              autoComplete="off"
              fullWidth
              inputProps={{
                'aria-label':'password'
              }}
              value={password}
              onChange={onInputChange}
            />
          </Grid>
          <Grid item xs={ 12 }display={ !!errorMessage ? '': 'none' }>
            <Alert severity='error'>{ errorMessage }</Alert>
          </Grid>

          {/* xs sm md xl */}
          {/* el spacing es como el gap */}
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              {/* fullwidth se expande a todo el tamaño que tiene el padre */}
              <Button variant="contained" fullWidth 
              // onClick={onSubmit}
              type="submit"
              disabled={isAuthenticating}
              >Login</Button>
            </Grid>
            <Grid item xs={12} sm={6}>
              {/* fullwidth se expande a todo el tamaño que tiene el padre */}
              <Button variant="contained" fullWidth
              onClick={onGoogleSignIn}
              disabled={isAuthenticating}
              aria-label="google-btn"
              >
                <Google />
                <Typography sx={{ml:1}}>Google</Typography>
              </Button>
            </Grid>
          </Grid>
      
          <Grid container direction={"row"} justifyContent="end">
            <StyleLink component={RouterLink} color={"inherit"} to="/auth/register">
              Create an account
            </StyleLink>
          </Grid>
      
        </Grid>
      </form>
    </AuthLayout>
  )
}

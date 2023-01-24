import { Button, Grid, TextField, Link as StyleLink, Typography, Alert } from "@mui/material"
import { AuthLayout } from "../layout/AuthLayout"
import { Link as RouterLink } from "react-router-dom"
import { useForm } from "../../hooks"
import { FormEvent, useMemo, useState } from "react"
import { RootState, useAppDispatch } from "../../store"
import { AUTH_STATUS, startCreatingUserWithEmailAndPassword } from "../../store/auth"
import { useSelector } from "react-redux"

// const formData = {
//   password : "123456",
//   email : "thom@gmail.com",
//   displayName :"Thom MR",
//   password2 : "123456"
// }
const formData = {
  password : "",
  email : "",
  displayName :"",
  password2 : ""
}

const formValidations = {
  email : [(currValue:string)=>currValue.includes("@"),'El email debe de contener un @'],
  password : [(currValue:string)=>currValue.length >=6 ,'El password debe de tener mas de 6 letras'],
  displayName : [(currValue:string)=>currValue.length >=1 ,'El nombre es obligatorio'],
}

export const RegisterPage = () => {

  const dispatch = useAppDispatch()
  const { status,errorMessage } = useSelector((state:RootState)=>state.auth)

  const [formSubmited, setFormSubmited] = useState(false)

  const {displayName,email,onInputChange,password,password2,formState,formValidation,isFormValid} = useForm(formData,formValidations)

  // const isDisplayNameValid = useMemo(()=>{
  //   return displayName.length > 1
  // },[displayName])

  const onSubmit = (event:FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setFormSubmited(true)
    if(isFormValid){
      dispatch(startCreatingUserWithEmailAndPassword(formState))
    }
  }

  const isRegistening = useMemo(()=>status === AUTH_STATUS.CHECKING,[status])

  return (
    <AuthLayout title="Register">
      <form onSubmit={onSubmit}
      className="animate__animated animate__fadeIn animate__faster"
      
      >
        <Grid container sx={{ gap:2.5 }}>
          <Grid item xs={12}>
            <TextField
              label="Full name"
              type="text"
              placeholder="John Doe"
              name="displayName"
              autoComplete="off"
              fullWidth
              onChange={onInputChange}
              value={displayName}
              // error={true}
              // helperText="The name is required!"
              error={!!formValidation.isDisplayNameValid && formSubmited}
              helperText={formValidation.isDisplayNameValid}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Email"
              type="Email"
              placeholder="example@gmail.com"
              name="email"
              onChange={onInputChange}
              autoComplete="off"
              fullWidth
              value={email}
              error={!!formValidation.isEmailValid && formSubmited}
              helperText={formValidation.isEmailValid}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Password"
              type="password"
              placeholder="***********"
              name="password"
              autoComplete="off"
              onChange={onInputChange}
              fullWidth
              value={password}
              error={!!formValidation.isPasswordValid && formSubmited}
              helperText={formValidation.isPasswordValid}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Repeat Password"
              type="password"
              placeholder="***********"
              name="password2"
              autoComplete="off"
              onChange={onInputChange}
              fullWidth
              value={password2}
            />
          </Grid>

          <Grid item xs={ 12 }display={ !!errorMessage ? '': 'none' }>
            <Alert severity='error'>{ errorMessage }</Alert>
          </Grid>

          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Button variant="contained" fullWidth type="submit" disabled={isRegistening} >Register</Button>
            </Grid>
          </Grid>
      
          <Grid container direction={"row"} justifyContent="end">
            <Typography sx={{ mr:1 }}>Do you have an account?</Typography>
            <StyleLink component={RouterLink} color={"inherit"} to="/auth/login">
              Login
            </StyleLink>
          </Grid>
      
        </Grid>
      </form>
    </AuthLayout>
  )
}

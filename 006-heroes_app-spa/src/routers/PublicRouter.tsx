import React, { ReactNode, useContext } from "react"
import { Navigate } from "react-router-dom"
import { AuthContext } from "../contexts/AuthContext"
import { IProps } from "../interfaces"

const PublicRouter = ({ children }:any) => {
  const { user } = useContext(AuthContext)
  // console.log("PublicRouter",user.logged);
  return user.logged ?  <Navigate to='/marvel' /> : children
}

export default PublicRouter
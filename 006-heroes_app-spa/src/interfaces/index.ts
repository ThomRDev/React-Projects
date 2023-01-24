import { ReactNode } from "react";

export interface IProps {
  children ?: ReactNode
}

export interface IAuthState {
  logged : boolean,
  name ?: string
}
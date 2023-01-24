import { onAuthStateChanged } from "firebase/auth"
import { useEffect } from "react"
import { useSelector } from "react-redux"
import { FirebaseAuth } from "../firebase/config"
import { RootState, useAppDispatch } from "../store"
import { AuthInitialState, login, logout } from "../store/auth"
import { startLoadingNotes } from "../store/journal"

export const useCheckAuth = () => {

  const { status } = useSelector((state:RootState) => state.auth)

  const dispatch = useAppDispatch()

  useEffect(()=>{

    // esto es un observable
    onAuthStateChanged( FirebaseAuth,async (user) => {
      if(!user) return dispatch(logout({} as AuthInitialState))
      const { uid,email,displayName,photoURL } = user
      dispatch(login({ uid,email,displayName,photoURL} as AuthInitialState))
      dispatch( startLoadingNotes() )
    })
    
  },[])
  return status
}

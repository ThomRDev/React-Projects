import { createUserWithEmailAndPassword, GoogleAuthProvider, signInWithEmailAndPassword, signInWithPopup, updateProfile, User } from "firebase/auth";
import { FirebaseAuth } from "./config";

const googleProvider = new GoogleAuthProvider()

export const signInWithGoogle = async () => {
  try {

    // para twitter, facebook solo instanciamos el proveedor y lo pasamos
    const result = await signInWithPopup(FirebaseAuth,googleProvider)
    // const credentials = GoogleAuthProvider.credentialFromResult( result );
    const { displayName,email,photoURL,uid } = result.user
    return {
      ok : true,
      user :{
        displayName,email,photoURL,uid
      }
    }
  } catch (error:any) {
    const errorCode = error.code
    const errorMessage = error.message
    return {
      ok :false,
      errorMessage,
      errorCode
    }
  }
}

export const registerWithEmailPassword = async ({ email = "",password  = "",displayName = "" }) => {
  try {
    const response = await createUserWithEmailAndPassword(FirebaseAuth,email,password)
    const { uid,photoURL } = response.user

    await updateProfile( FirebaseAuth.currentUser as User, { displayName });
    
    return {
      ok : true,
      user :{
        displayName,email,photoURL,uid
      }
    }
  } catch (error:any) {
    return {
      ok:false,
      errorMessage : error.message
    }
  }
}

export const loginWithEmailAndPassword = async ({ email = "",password = "" }) => {
  try {
    const response = await signInWithEmailAndPassword(FirebaseAuth,email,password)
    const { displayName,photoURL,uid } = response.user

    return {
      ok : true,
      user :{
        displayName,email,photoURL,uid
      }
    }
  } catch (error : any) {
    return {
      ok:false,
      errorMessage : error.message
    }
  }
}

export const logoutFirebase = async () => {
  return await FirebaseAuth.signOut()
}
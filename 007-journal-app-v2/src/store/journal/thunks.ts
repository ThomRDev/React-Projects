import { FirebaseDB } from './../../firebase/config';
import { ThunkAction } from '@reduxjs/toolkit';
import { collection, deleteDoc, doc, setDoc } from 'firebase/firestore/lite';
// import { doc, deleteDoc,setDoc,collection } from "@firebase/firestore";
import { AnyAction } from 'redux';
import { fileUpload, loadNotes } from '../../helpers';
import { RootState } from '../store';
import { addNewEmptyNote, deleteNoteById, Note, savingNewNote, setActiveNote, setNotes, setPhotosToActiveNote, setSaving, updateNote } from './journalSlice';

// https://itnext.io/build-a-react-redux-with-typescript-using-redux-toolkit-package-d17337aa6e39
export const startNewNote = ():ThunkAction<void,RootState,unknown,AnyAction> => {
  // return async (dispatch:Dispatch<AnyAction>,getState:any ) => {
  return async (dispatch,getState) => {
    
    dispatch(savingNewNote())

    // uid user
    const { uid } = getState().auth
    
    const newNote:Partial<Note> = {
      title : "",
      body : "",
      date : new Date().getTime(),
    }

    // referencia a la collection
    // cambiar las reglas en el cloudstore(firestore), que tiene que estar authenticado(modo produccion)
    // rules_version = '2';
    // service cloud.firestore {
    //   match /databases/{database}/documents {
    //     match /{document=**} {
    //       // allow read, write: if false;
    //       allow read, write: if request.auth != null;
    //     }
    //   }
    // }
    const newDoc = doc(collection(FirebaseDB,`${uid}/journal/notes`))
    await setDoc(newDoc,newNote)
    newNote.id = newDoc.id
    
    //TODO dispatch
    dispatch(addNewEmptyNote(newNote))
    dispatch(setActiveNote(newNote))
  }
}


export const startLoadingNotes = ():ThunkAction<void,RootState,unknown,AnyAction> => {
  return async (dispatch,getState) => {
    const { uid } = getState().auth
    if(!uid) throw new Error("el uid del usuario no existe")
    const notes = await loadNotes(uid)
    dispatch(setNotes(notes))
  }
}

export const startSaveNote = ():ThunkAction<void,RootState,unknown,AnyAction> => {
  return async (dispatch,getState) => {
    dispatch(setSaving())
    const { auth : { uid },journal : { active } } = getState()
    const noteToFireStore = {  ...active }
    delete noteToFireStore.id

    const docRef = doc(FirebaseDB,`${uid}/journal/notes/${active?.id}`)

    // merge significa que se mantienen los cambios que se encuentra en la db
    await setDoc(docRef,noteToFireStore,{ merge : true })

    dispatch(updateNote(active as Note))
  }
}


export const startDeletingNote = ():ThunkAction<void,RootState,unknown,AnyAction> =>{
  return async (dispatch,getState) => {
    const { auth : { uid },journal : { active:note } } = getState()
    
    const docRef = doc(FirebaseDB,`${uid}/journal/notes/${note?.id}`)
    await deleteDoc(docRef)
    dispatch(deleteNoteById(note?.id as string))
  }
}

export const startUploadingFiles = (files:FileList):ThunkAction<void,RootState,unknown,AnyAction> =>{
  return async (dispatch) => {
    dispatch(setSaving())
    const fileUploadPromises = []
    for (const file of files) {
      fileUploadPromises.push(fileUpload(file))
    }

    const response = await Promise.allSettled(fileUploadPromises)
    const photosUrls = response.map((res:any)=>res.value) as string[]
    dispatch(setPhotosToActiveNote(photosUrls))
  }
}
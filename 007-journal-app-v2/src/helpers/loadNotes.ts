import { FirebaseDB } from './../firebase/config';
import { collection, getDocs } from 'firebase/firestore/lite';
import { NoteDTO } from '../store/journal';
export const loadNotes = async (uid:string = ""):Promise<NoteDTO[]> => {
  if(!uid) throw new Error("El UID del usuario no existe")
  const notesCollectionRef = collection(FirebaseDB,`${uid}/journal/notes`)

  // obtenemos los documentos de cada collecion
  const docs = await getDocs(notesCollectionRef)
  const notes:NoteDTO[] = []

  docs.forEach((doc)=>{
    notes.push({ id:doc.id,...doc.data() })
  })

  return notes
}
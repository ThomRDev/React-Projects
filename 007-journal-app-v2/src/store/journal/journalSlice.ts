import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface Note {
  id : string
  title:string
  body:string
  date:number
  imageUrls : string[]
}

export interface JournalState {
  isSaving : boolean
  messageSaved :string
  notes : Note[]
  active : null | Note
}

// export interface CreateNoteDTO extends Omit<Note, 'id' | 'date'> {}
export interface CreateNoteDTO extends Partial<Note> {}
// interface FindNoteDTO extends Readonly<Partial<Note>> {}
export interface FindNoteDTO extends Readonly<Pick<Note,'id'>> {}
export interface UpdateNoteDTO extends Omit<Partial<Note>, 'id'> {}

export interface NoteDTO extends Partial<Note>{}

const initialState:JournalState = {
  isSaving : false,
  messageSaved : "",
  notes : [],
  active : null
}
export const journalSlice = createSlice({
  name  : 'journal',
  initialState,
  reducers : {

    // igual que el setSaving pero ese se usara solo cuando se ha creado una nueva nota y aun se esta guardando
    savingNewNote:(state:JournalState)=>{
      state.isSaving = true
    },
    // agrega una nota en blanco
    addNewEmptyNote : (state:JournalState,action:PayloadAction<CreateNoteDTO>) => {
      state.notes.push({
        body : action.payload.body as string,
        date : action.payload.date as number,
        id : action.payload.id as string,
        imageUrls : [],
        title : action.payload.title as string
      })
      state.isSaving = false
    },
    // mantiene activo la nota para que aparesca en la pantalla
    setActiveNote : (state:JournalState,action:PayloadAction<NoteDTO>) => {
      state.active = action.payload as Note
      state.messageSaved  = ""
    },
    // cuando recarga la pagina, y se aplica las notas que estan en la bd
    setNotes : (state:JournalState,action:PayloadAction<NoteDTO[]>)=>{
      state.notes = action.payload as Note[]
    },
    // esto me servira para que el boton se desabilite, si esta guardando quiere decir que no puede crear
    // otro
    setSaving:(state:JournalState)=>{
      state.isSaving = true
      state.messageSaved  = ""
    },
    updateNote: (state:JournalState,action:PayloadAction<NoteDTO>)=>{
      state.isSaving = false
      // actualizo solo la nota que cambio en la base de datos
      state.notes = state.notes.map(note=>note.id === action.payload.id ? action.payload:note) as Note[]
      state.messageSaved = `${action.payload.title}, actualizada correctamente`
      
    },
    deleteNoteById :(state:JournalState,action:PayloadAction<string>)=>{
      state.active = null
      state.notes = state.notes.filter(note => note.id !== action.payload)
    },
    clearNotesLayout : (state:JournalState) => {
      state.active = null
      state.isSaving = false
      state.messageSaved  = ""
      state.notes = []
    },

    // luego de hacer esto tengo que darle al boton guardar y se guarda en firebase, aunque si no le doy y cambio de nota
    // o creo nota no se guarda en firebase pero si se guarda las imagenes en cloudinary
    setPhotosToActiveNote : (state:JournalState,action:PayloadAction<string[]>) => {
      (state.active as Note).imageUrls = [ ...(state.active as Note).imageUrls,...action.payload ]
      state.isSaving = false
    }
  }
})
export const { addNewEmptyNote,deleteNoteById,setActiveNote,setNotes,setSaving,updateNote,savingNewNote,clearNotesLayout,setPhotosToActiveNote } = journalSlice.actions

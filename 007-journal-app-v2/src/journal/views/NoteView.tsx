import { DeleteOutline, SaveOutlined, UploadOutlined } from "@mui/icons-material"
import { Button, Grid, IconButton, TextField, Typography } from "@mui/material"
import { ChangeEvent, useCallback, useEffect, useMemo, useRef } from "react"
import { useSelector } from "react-redux"
import { useForm } from "../../hooks"
import { RootState, useAppDispatch } from "../../store"
import { Note, NoteDTO, setActiveNote, startDeletingNote, startSaveNote, startUploadingFiles } from "../../store/journal"
import { ImageGallery } from "../components"

import Swal from "sweetalert2"
import "sweetalert2/dist/sweetalert2.css"

export const NoteView = () => {

  // mostramos la nota que esta activa
  const { active:note,isSaving,messageSaved } = useSelector((state:RootState)=>state.journal)
  const dispatch = useAppDispatch()
  const { formState,onInputChange } = useForm(note as NoteDTO)
  const inputFile = useRef<HTMLInputElement>(null)

  // cada ves que cambio algun cambio del formulario
  // actualizare la nota activa
  // aqui si le doy guardar a la nota, jalare de la nota que esta activa y no la buscare en el array
  useEffect(()=>{
    dispatch(setActiveNote(formState))
  },[formState])

  useEffect(()=>{
    if(messageSaved.length){
      Swal.fire("Nota actualizada",messageSaved,"success")
    }
  },[messageSaved])


  const dateString = useMemo(()=>{
    return new Date(formState?.date as number).toUTCString()
  },[formState.date])
  
  const onSaveNote = useCallback(()=>{
    dispatch(startSaveNote())
  },[note])

  const onDeleteNote = ()=> {
    dispatch(startDeletingNote())
  }

  const onFileInputChange = (event:ChangeEvent<HTMLInputElement>) => {
    if(!event.target.files!.length) return
    dispatch(startUploadingFiles(event.target.files as FileList))
  }


  return (
    <>
      <Grid container direction={"row"} justifyContent="space-between" alignItems={"center"}
        sx={{ mb:1 }}
      className="animate__animated animate__fadeIn animate__faster"

      >
        <Grid item>
          <Typography fontSize={39} fontWeight="light">{ dateString }</Typography>
        </Grid>
        <Grid item>

          <input type="file" multiple id="btnFile" style={{ display :"none" }}  ref={inputFile} 
            onChange={onFileInputChange}
          />
          <IconButton
            sx={{ backgroundColor:"primary.main",color:"white","&:hover":{
              backgroundColor:"primary.main",
              opacity:"0.9",
              transition : "all 0.5s ease"
            } }}
            title="Upload images"
            disabled={isSaving}
            onClick={() => inputFile.current?.click()}

            >
              {/* <label htmlFor="btnFile"> */}
                <UploadOutlined />
              {/* </label> */}
          </IconButton>

          <Button color="primary" sx={{padding : 2}}  disabled={isSaving} onClick={onSaveNote}  >
            <SaveOutlined sx={{ fontSize : 30,mr : 1 }} />
            Save
          </Button>
        </Grid>
        <Grid container>
          <TextField 
            type={"text"}
            variant="filled"
            fullWidth
            placeholder="Title"
            label="Title"
            sx={{ border:"none",mb:1 }}
            name="title"
            onChange={onInputChange}
            value={formState?.title}
          />
          <TextField 
            type={"text"}
            variant="filled"
            fullWidth
            multiline
            placeholder="What happened today?"
            minRows={5}
            name="body"
            onChange={onInputChange}
            value={formState?.body}
            sx={{ border:"none",mb:1 }}
          />
        </Grid>

        <Grid container justifyContent='end'>
                <Button
                    sx={{ mt: 2 }}
                    color="error"
                    disabled={isSaving}
                    onClick={onDeleteNote}
                >
                    <DeleteOutline />
                    Borrar
                </Button>
            </Grid>
          {/* image gallery */}
          <ImageGallery  images={(note as Note).imageUrls as string[]} />
      </Grid>
    </>
  )
}

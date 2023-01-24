import { AddOutlined } from "@mui/icons-material"
import { IconButton} from "@mui/material"
import { useSelector } from "react-redux"
import { RootState, useAppDispatch } from "../../store"
import { startNewNote } from "../../store/journal"
import { JournalLayout } from "../layout/JournalLayout"
import { NoteView, NothingSelectedView } from "../views"

export const JournalPage = () => {

  // si la nota esta activa
  const { active,isSaving } = useSelector((state:RootState)=>state.journal)
  
  const dispatch = useAppDispatch()

  const onClickAddNewNote = () => {
    dispatch(startNewNote())
  }  

  return (
    // con component solo cambia la etiqueta pero evita las guias de estilo material
    // con variant tambien cambia la etiqueta pero respeta las guias de estilo material
      // <Typography variant={"h1"}>JournalPage</Typography>
      
  <JournalLayout>
        {/* <Typography >Lorem ipsum dolor sit amet consectetur adipisicing elit. Unde dolore quisquam veniam possimus aut asperiores. Magni natus corporis eius porro atque, praesentium commodi officia molestiae laudantium aliquam, aspernatur, labore voluptate at id perferendis molestias aliquid nulla veritatis fugiat vitae maiores quas ipsa autem hic. Enim asperiores laboriosam, praesentium illum labore odit voluptatem nulla cumque! Vel velit aliquam illum at, voluptate doloremque quo ipsum aliquid necessitatibus obcaecati assumenda. Obcaecati, voluptatum ullam modi illo ea, ipsum nesciunt atque numquam consequuntur iure enim fugit doloremque voluptatem assumenda eligendi sapiente dolorum, facere velit pariatur est! Dolore enim et odit ab eum laboriosam iusto exercitationem.</Typography> */}
    {
      !!active ? <NoteView /> : <NothingSelectedView />
    }
    {/* <NoteView /> */}
    <IconButton
      onClick={onClickAddNewNote}
      // se desabilita si aun se esta guardando
      disabled={isSaving}
      size="large"
      sx={{
        color :"white",
        backgroundColor:'error.main',
        ':hover':{
          backgroundColor:'error.main',
          opacity: 0.8,
        },
        position: 'fixed',
        right: 50,
        bottom:50
      }}
    >
      <AddOutlined sx={{ fontSize:30 }} />
    </IconButton>
  </JournalLayout>
  )
}

import { TurnedInNot } from "@mui/icons-material"
import { Grid, ListItem, ListItemButton, ListItemIcon, ListItemText } from "@mui/material"
import { memo, useCallback, useMemo } from "react"
import { useAppDispatch } from "../../store"
import { NoteDTO, setActiveNote } from "../../store/journal"

interface SideBarItemProps extends NoteDTO {}

export const SideBarItem = memo(({  body,date,id,imageUrls = [],title  = "" }:SideBarItemProps) => {

  const dispatch = useAppDispatch()

  const newTitle = useMemo(()=>(
    title.length > 17 ? title?.substring(0,17) + "..." : title
  ),[title])

  console.log("render")

  const onSelectItem = ()=>{
    
    dispatch(setActiveNote({ body,date,id,imageUrls,title }))
  }

  return (
    <ListItem disablePadding>
      <ListItemButton onClick={onSelectItem}>
        <ListItemIcon>
          <TurnedInNot />
        </ListItemIcon>
        <Grid container>
          <ListItemText primary={newTitle}/>
          <ListItemText secondary={body}/>
        </Grid>
      </ListItemButton>
    </ListItem>
  )
})

import { TurnedInNot } from "@mui/icons-material"
import { Box, Divider, Drawer, List, ListItem, ListItemButton, ListItemIcon, Toolbar, Typography,Grid, ListItemText } from "@mui/material"
import { useSelector } from "react-redux"
import { RootState } from "../../store"
import { SideBarItem } from "./SideBarItem"

export const SideBar = ({ drawerWidth = 0 }) => {

  const { displayName } = useSelector((state:RootState)=>state.auth)
  const { notes } = useSelector((state:RootState)=>state.journal)
  return (
    <Box
      component={"nav"}
      sx={{ 
        width: {
          md : drawerWidth
        },
        flexShrink : {
          md :0
        }
      }}
    >
      <Drawer
        variant="permanent"
        open
        sx={{
          display: {
            xs : "block"
          },
          '& .MuiDrawer-paper':{ width:drawerWidth }
        }}
      >
        <Toolbar>
          <Typography variant="h6" noWrap component="div">{ displayName }</Typography>
        </Toolbar>
        <Divider />
        <List>
          {
            // ["Enero","Febrero","Marzo","Abril"].map(text=>(
            //   <ListItem key={text} disablePadding>
            //     <ListItemButton>
            //       <ListItemIcon>
            //         <TurnedInNot />
            //       </ListItemIcon>
            //       <Grid container>
            //         <ListItemText primary={text}/>
            //         <ListItemText secondary={"Lorem ipsum dolor sit amet, consectetur adipiscing elit"}/>
            //       </Grid>
            //     </ListItemButton>
            //   </ListItem>
            // ))
            notes.map(note=>{
              return <SideBarItem key={note.id} {...note} />
            })
          }
        </List>
      </Drawer>
    </Box>
  )
}

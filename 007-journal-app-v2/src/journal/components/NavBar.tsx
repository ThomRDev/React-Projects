import { LogoutOutlined, MenuOutlined } from "@mui/icons-material"
import { AppBar, Grid, IconButton, Toolbar, Typography } from "@mui/material"
import { useAppDispatch } from "../../store"
import { startLogout } from "../../store/auth"

export const NavBar = ({  drawerWidth  = 0 }) => {
  const dispatch = useAppDispatch()
  return (
    <AppBar position="fixed"
      sx={{ 
        width:{ md : `calc(100% - ${drawerWidth}px)`},
        // ml : { md : `${drawerWidth}px` }
      }}
    >
      <Toolbar>
        <IconButton color="inherit" edge="start" sx={{
          display :{
            md : "none"
          }
        }}>
          <MenuOutlined sx={{ fontSize  :"2rem" }}  />
        </IconButton>
        <Grid container direction="row" justifyContent="space-between" alignItems={"center"} >
          <Typography variant="h6" noWrap component={"div"} alignSelf="center">JournalApp</Typography>
          <IconButton color="error" onClick={()=>{
            dispatch(startLogout())
          }} >
            <LogoutOutlined />
          </IconButton>
        </Grid>
      </Toolbar>
    </AppBar>
  )
}

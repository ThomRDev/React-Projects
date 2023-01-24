import { Box, Toolbar } from "@mui/material"
import { NavBar, SideBar } from "../components"

interface JournalLayoutProps {
  children ?: React.ReactNode
}

const drawerWidth = 280


export const JournalLayout = ({ children }:JournalLayoutProps) => {
  return (
    // la diferencia con Grid es que Grid utiliza flexbox
    // mientras que Box no, es como un div comun y corriente
    <Box sx={{display : "flex",minHeight:"100vh"}}
    className="animate__animated animate__fadeIn animate__faster"
    
    >

      <NavBar drawerWidth={drawerWidth}/>

      {/* SIDEBAR en material ui se conoce como el drawer */}
      <SideBar drawerWidth={drawerWidth} />

      {/* etiqueta main */}
      <Box component="main"
        display={"flex"}
        flexDirection="column"
        sx={{ flex : "1",p :3 }}
      >
        {/* toolbar no servira como un margin que mide igual que el navbar - height */}
        <Toolbar />

        { children }
      </Box>
    </Box>
  )
}

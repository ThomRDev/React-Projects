import { Grid, Typography } from "@mui/material"
interface AuthLayoutProps {
  children ?: React.ReactNode
  title : string
}
export const AuthLayout = ({ children, title }:AuthLayoutProps) => {
  return (
    <Grid container

      // no exista espacio entre los hijos
      spacing={0}

      // flexbox
      direction="column"
      alignItems="center"
      justifyContent="center"
      
      // hace referencia a tamaños
      // xs

      // hace referencia a el estilo, es igual que la etiqueta style, pero sx nos provee del tema que hemos creado
      sx={{ minHeight:"100vh",backgroundColor :'primary.main',padding:"2em" }}
    >
      <Grid item
        className="box-shadow"

        // en pantalla pequeña tendra 3 posiciones
        xs={3}
        sx={{ backgroundColor:"white",padding:"2em",borderRadius : 2,
        width : {
          sm: 500
        } 
      }}
      >
        <Typography variant="h5"
          sx={{ mb:1 }}
        >{title}</Typography>
        { children }
      </Grid>
    </Grid>
  )
}

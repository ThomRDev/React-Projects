import { StarOutline} from "@mui/icons-material"
import { Grid, Typography } from "@mui/material"

export const NothingSelectedView = () => {
  return (
    <Grid container

      // no exista espacio entre los hijos
      spacing={0}

      // flexbox
      direction="column"
      textAlign={"center"}
      alignItems="center"
      justifyContent="center"
      className="animate__animated animate__fadeIn animate__faster"

      borderRadius={2}
      flex = {1}
      sx={{backgroundColor :'primary.main',padding:"2em",gap : "1em" }}
    >
      <Grid item>
        <StarOutline sx={{ fontSize:100,color:"white" }} />
      </Grid>
      <Grid item>
        <Typography color="white" variant="h4">Select or create an entry</Typography>
      </Grid>
    </Grid>
  )
}

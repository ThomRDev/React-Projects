import { CssBaseline, ThemeProvider } from "@mui/material";
import { purpleTheme } from "./purpleTheme";

// https://www.carlrippon.com/react-children-with-typescript/
interface AppThemeProps {
  children ?: React.ReactNode; 
}
export const AppTheme = ({ children }:AppThemeProps) => {
  return (
    <ThemeProvider theme={purpleTheme} >

      {/* este componente es como normalize */}
      <CssBaseline />
      
      { children }
    </ThemeProvider>
  )
}

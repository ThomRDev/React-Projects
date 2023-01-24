import React, { MouseEventHandler, useContext, useState } from "react"

interface IPropsValue {
    currentTheme?: string,
    nexTheme ?: string,
    toggleTheme ?: Function
}

const ThemeContext = React.createContext<IPropsValue>({})

const DeeperChild = () => {
    console.log("render DeeperChild")
    const { currentTheme,toggleTheme } = useContext(ThemeContext)
    return <button onClick={toggleTheme as MouseEventHandler} >{currentTheme}</button>
}

// cuidado si paso el hijo como {children} tambien se renderiza aunque use memo
const DirectChild = () => {
    console.log("render DirectChild")
    return <div>
        <DeeperChild />
    </div>
}

const ThemeProvider = ({ children }:any) => {
    const [theme,setTheme] = useState("dark")
    const nexTheme = theme==="dark"?"light":"dark"
    console.log("render ThemeProvider");
    const value:IPropsValue = {
        currentTheme : theme,
        nexTheme,
        toggleTheme : () => setTheme(nexTheme)
    }

    return <ThemeContext.Provider  value={value}>
        { children }
    </ThemeContext.Provider>
}

const AppTheme = () => {
    console.log("AppTheme render")
    return <ThemeProvider>
        <DirectChild />
    </ThemeProvider>
}

export default AppTheme
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

// si paso el hijo como {children} tambien se renderiza aunque use memo
const DirectChild = React.memo(() => {
    console.log("render DirectChild")
    return <div>
        <DeeperChild />
    </div>
});

const AppTheme = () => {
    const [theme,setTheme] = useState("dark")
    const nexTheme = theme==="dark"?"light":"dark"
    console.log("render Apptheme");
    const value:IPropsValue = {
        currentTheme : theme,
        nexTheme,
        toggleTheme : () => setTheme(nexTheme)
    }

    return <ThemeContext.Provider  value={value}>
        <DirectChild />
    </ThemeContext.Provider>
}

export default AppTheme
import { useEffect, useState } from "react"

export const Resize = () => {
    const [width,setWidth] = useState(window.innerWidth)
    useEffect(()=>{
        function onResize(){
            setWidth(window.innerWidth)
        }
        window.addEventListener("resize",onResize)
        return ()=> {
            window.removeEventListener("resize",onResize)
        }
    },[])
    return <div>
        <h1>{width}</h1>
    </div>
}
import { useEffect, useState } from "react";

const usePos = () => {
    const [pos,setPos] = useState({
        clientX : 0,
        clientY :0
    })

    useEffect(()=>{
        function getPosition(event:MouseEvent){
            setPos({
                clientX : event.clientX,
                clientY : event.clientY,
            })
        }
        window.addEventListener("mousemove",getPosition)
        return () => {
            window.removeEventListener("mousemove",getPosition)
        }
    },[])

    return pos
}


const PositionWrapper = () => {
    const { clientX,clientY } = usePos()
    return (
        <div style={{border:"1px solid #ccc",width:"100%",height:"max-content",padding:"1em"}} >
            <h1>X <span>{clientX}</span></h1>
            <h1>Y <span>{clientY}</span></h1>
        </div>
    );
}

export default PositionWrapper
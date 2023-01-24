import { useEffect, useRef, useState } from "react";

const Panel = () => {
    const [color,setColor] = useState("tomato")
    const panel = useRef<HTMLDivElement>(null)
    useEffect(()=>{
        let _panel = panel.current 
        function onMouseMove(event:MouseEvent){
            if(event.clientX < (_panel?.clientWidth as number / 2) ){
                setColor("tomato")
            }else{
                setColor("steelblue")
            }
        }
        _panel?.addEventListener("mousemove",onMouseMove)

        return ()=>{
            _panel?.removeEventListener("mousemove",onMouseMove)
        }
    },[])
    // getEventListeners($0)
    return <div ref={panel} style={{ width:"100%",minHeight:"30vh",backgroundColor:color,marginTop:"1em" }}></div>
}

const MouseOverWrapper = () => {
    const [show,setShow] = useState(true)
    return (
        <div>
            <button onClick={()=>setShow(!show)}  className={"btn btn-"+(show ? "danger" : "primary")}  >{ show ? "Hide" : "Show" }</button>
            { show && <Panel />  }
        </div>
    );
}

export default MouseOverWrapper
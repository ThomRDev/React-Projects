import React,{ useState } from "react"
import { useCounter } from "../../hooks/useCounter"

const Small = React.memo(({ value }: any) => {
    console.log("render Small");
    return <div>
        <p>{ value }</p>
    </div>
})


const Memorize = () => {
    
    console.log("render Wrapper");
    const {counter,actions :{ increment }  } = useCounter(1)
    const [show,setShow] = useState(true)
    return <div>
        <button 
        onClick={ ()=>setShow(!show) }
        className="btn btn-outline-primary">Show/hide {JSON.stringify(show)}</button>
        <button 
        onClick={ ()=>increment() }
        className="btn btn-primary" style={{ marginLeft:"1em" }}> +1 </button>
        <Small value={ counter } />
    </div>
}

export default Memorize
import React, { useEffect, useState } from 'react'
import { useCounter } from '../../hooks/useCounter'


const CounterComponent = () => {
    const { counter,actions } = useCounter(0)
    useEffect(()=>{
        document.title = `Counter ${counter}`
        return () =>{
            // cuando se desmonte el componente
            document.title = `Hooks app`
        }
    },[counter])
    return (
        <div>
            <h1>Counter <span>{ counter }</span></h1>
            <button onClick={()=>actions.increment()} className="btn btn-primary" >+1</button>
        </div>
    )
}


const AppTittle = () => {

    const [show,setShow] = useState(true)
    return (
        <div>
            <button onClick={()=>setShow(!show)}  className={"btn btn-"+(show ? "danger" : "primary")}  >{ show ? "Hide" : "Show" }</button>
            { show && <CounterComponent />}
        </div>
    )
}

export default AppTittle
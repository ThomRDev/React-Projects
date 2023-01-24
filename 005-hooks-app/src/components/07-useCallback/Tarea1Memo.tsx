import React, { useState } from "react"
import { useCounter } from "../../hooks/useCounter"
import { useFetch } from "../../hooks/useFetch"

const Quote = React.memo(({ author,quote } : { author?:string,quote?:string }) => {
    console.log("render Quote");
    return  <blockquote className="blockquote text-end"> 
            <p className="mb-3">{quote}</p>
        <footer className="blockquote-footer">{author}</footer>
    </blockquote>
})

const Tarea1Memo = () => {
    console.log("render Tarea1Memo");
    const {actions : { increment },counter} = useCounter(1)
    const [show,setShow] = useState(true)
    const { data ,loading } = useFetch(`https://www.breakingbadapi.com/api/quotes/${counter}`)
    return <div>
        {
            loading ? <div className="alert alert-info text-center">loading ... </div> :
            <Quote {...data[0]} />
        }
        <button className={"btn btn-primary "+(loading?"disabled":"")} onClick={()=> increment()} disabled={loading} >Cambiar</button>
        <button className="btn btn-outline-primary" style={{ marginLeft:"1em" }} onClick={()=>setShow(!show)}>show/hide {JSON.stringify(show)}</button>
    </div>
}

export default Tarea1Memo
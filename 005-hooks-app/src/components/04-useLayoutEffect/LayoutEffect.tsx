

import { useEffect, useLayoutEffect, useRef, useState } from "react"
import { useCounter } from "../../hooks/useCounter"
import { useFetch } from "../../hooks/useFetch"

const Quote = ({ author,quote } : { author?:string,quote?:string }) => {

    const [boxSize,setBoxSize] = useState({})

    const span = useRef<HTMLSpanElement>(null)
    useEffect(()=>{
        console.log("Ejecuto despues de mostrarme en la pantalla - asincrono");
        console.log(span.current?.getBoundingClientRect());
        setBoxSize(span.current?.getBoundingClientRect() as object)
    },[quote])
    useLayoutEffect(()=>{
        console.log("Ejecuto antes de mostrarme en la pantalla - sincrono");
        console.log(span.current?.getBoundingClientRect());
    },[quote])
    console.log("render");
    return  (
        <>
            <blockquote className="blockquote text-end"> 
                    <p className="mb-3 d-flex">
                        <span ref={span}>{quote}</span>
                    </p>
                <footer className="blockquote-footer">{author}</footer>
            </blockquote>
            <div>
                <pre>
                    {JSON.stringify(boxSize,null,3)}
                </pre>
            </div>
        </>
    );
}

const LayoutEffect = () => {
    const {actions : { increment },counter} = useCounter(1)
    const { data,loading } = useFetch(`https://www.breakingbadapi.com/api/quotes/${counter}`)

    const { author,quote } = !!data && data[0]

    return <div>
        <h1>Layout Effect</h1>
        {
            loading && <div className="alert alert-info text-center">Loading ...</div>
        }
        <Quote author={author} quote={quote} />
        <button className={"btn btn-primary "} onClick={()=> increment()}>Cambiar</button>
    </div>
}

export default LayoutEffect
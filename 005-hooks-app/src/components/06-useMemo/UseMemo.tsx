import React,{ useMemo, useState } from "react"
import { useCounter } from "../../hooks/useCounter"

const Small = React.memo(({ value }: any) => {
    console.log("render Small");
    return <div>
        <p>{ value }</p>
    </div>
})

const procesoPesadoConParametro = (iteraciones:number) => {
    for(let i=1;i<iteraciones;i++){
        console.log("loading ...")
    }
    return `${iteraciones} iteraciones completadas`
}

const procesoPesado = () => {
    for(let i =0;i<1000000000 ;i++)
        console.log("loading ...")
    return `${1000000000} iteraciones hechas`
}

const UseMemo = () => {
    
    console.log("render Wrapper");
    const {counter,actions :{ increment }  } = useCounter(1)
    const [show,setShow] = useState(true)

    // solo me ejectará cada ver que cambia el counter, es como el React.memo
    // useMemo memoriza el retorno de la funcion
    // React.memo memoriza el component con sus props
    // normalmente con los props solo memoria el valor mas no la referencia
    // si el prop es una funcion, se volvera a renderizar, para eso de debe de utilizar useCallbacl
    const memoProcesoPesadoParametro = useMemo(()=>procesoPesadoConParametro(counter),[counter])

    // solo se ejecutara una sola vez cuando se rendezice el componente luego no se ejecutará
    const memoProcesoPesado = useMemo(procesoPesado,[])

    return <div>
        <p> { memoProcesoPesadoParametro } </p>
        <p> { memoProcesoPesado } </p>
        <button 
        onClick={ ()=>setShow(!show) }
        className="btn btn-outline-primary">Show/hide {JSON.stringify(show)}</button>
        <button 
        onClick={ ()=>increment() }
        className="btn btn-primary" style={{ marginLeft:"1em" }}> +1 </button>
        <Small value={ counter } />
    </div>
}

export default UseMemo
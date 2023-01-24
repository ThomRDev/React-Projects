import { useEffect, useRef, useState } from "react"


const timer = (delay:number) => new Promise<void>((resolve)=>{
    setTimeout(()=>{
        resolve()
    },delay)
})

async function getData(url:string){
    const result = await fetch(url)
    await timer(2000)
    const data = await result.json()
    return { ...data } 
}

export const useFetch = (url:string) => {
    
    // la idea de esto es mantener una referencia cuando el hook esta vivo o el componente que usa el hook esta montado
    const isMounted = useRef(true)
    const [state,setState] = useState({
        error : null,
        loading : true,
        data : null
    } as { error:null | boolean,data : null | any,loading : boolean})
    
    useEffect(()=>{
        return () => {
            isMounted.current  = false
        }
    },[])
    
    useEffect(()=>{
        isMounted.current = true
        setState({
            data : null,
            loading : true,
            error : false
        })
        getData(url)
        .then(data=>{
            console.log("async");
            if(isMounted.current){
                console.log("async ok");
                setState({
                    data,
                    loading : false,
                    error : false
                })
            }
        })
        .catch(err=>{
            if(isMounted.current){
                setState({
                    data:null,
                    error : true,
                    loading : false
                })
            }
        })

        return () => {
            console.log("desmontando [url]");
            isMounted.current = false
        }
    // eslint-disable-next-line
    },[url])

    return state
}


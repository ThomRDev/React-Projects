import { useState } from "react"

export const useCounter = (initialState = 0) =>{
    const [counter,setCounter] = useState(initialState)
    
    const decrement = (factor = 1)=>{
        setCounter(counter - factor)
    }
    const increment = (factor = 1)=>{
        setCounter(counter + factor)
    }
    const reset = ()=>setCounter(initialState)
    
    return {
        counter,
        actions:{
            "decrement" : decrement,
            "increment" : increment,
            "reset" : reset,
        }
    }
}
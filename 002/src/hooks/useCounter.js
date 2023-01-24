import { useState } from "react"
const useCounter = (initialState) =>{
    const [counter, setCounter] = useState(initialState);
    const increment = (factor = 1) => setCounter(counter + factor)
    const decrement = (factor = 1) => {
        if(counter >= 1) setCounter(counter - factor) 
    }
    const reset = () => setCounter(initialState)


    return {
        counter,
        actions : {
            increment,
            decrement,
            reset
        }
    }

}

export default useCounter
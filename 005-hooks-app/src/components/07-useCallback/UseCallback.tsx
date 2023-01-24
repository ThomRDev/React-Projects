import React, { useCallback, useState } from "react"
type IProps = {
    increment : Function
    valueIncrement?:number
}

const IncrementComponent = React.memo(({ increment,valueIncrement = 1 }:IProps) => {
    console.log("render IncrementComponent");
    return <div>
        <button  onClick={ ()=>{
            increment(valueIncrement)
        }  } > +{valueIncrement} </button>
    </div>
})

const UseCallback = () => {
    console.log("render UseCallback");
    const [state, setState] = useState(1)
    const increment = useCallback((n:number)=>{
        setState(c=>c + n)
    },[setState])
    return <div>
        <p>{state}</p>
        <IncrementComponent increment={increment} valueIncrement={5} />
    </div>
}

export default UseCallback
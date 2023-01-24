import { useCounter } from "../../hooks/useCounter";
import React from "react"

const DepperChild = React.memo(({title}:{title:string}) => {
    console.log("render <DepperChild />");
    return <h1>{title}</h1>
})

const DirectChild = React.memo(({ author }:any) => {
    console.log("render <DirectChild />");
    const { counter,actions :{ increment } } = useCounter(1)
    return <div>
        <p>{counter}</p>
        <p>{author}</p>
        <button onClick={()=>increment()}>+1</button>
        <DepperChild title="Titulo" />
    </div>
})

const MethodMemo = () => {
    const { counter,actions :{ increment } } = useCounter(1)
    console.log("render <MethodMemo />");
    return <div>
        <p>{counter}</p>
        <button onClick={()=>increment()}>+1</button>
        <DirectChild author="Thom" />
    </div>
}

export default React.memo(MethodMemo)
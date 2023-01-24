import React, { useCallback, useMemo, useState } from "react";
import { useCounter } from "../../hooks/useCounter";

type IPropChildComponent = {
    factor?: number
    increment :Function
}

// render por cada child 
// const Child = ({ factor = 1,increment }:IPropChildComponent) => {
//     console.log(`render <Child factor="${factor}" />`);

//     return <button className="btn btn-primary m-2"
//         onClick={ ()=>increment(factor) }
//     >
//         + { factor }
//     </button>
// }

// const Tarea2Memo = () => {
//     const numeros = [1,2,3,4,5]
    
//     const { counter,actions:{ increment } }  = useCounter(0)
    
//     return <div>
//         <p>Counter <span> { counter } </span></p>
//         {
//             numeros.map(num=>{
//                 return <Child increment={ increment } factor={num} key={num} />
//             })
//         }
//     </div>
// }

// user customHook con useCallback
// https://codesandbox.io/s/usecallback-y-react-memo-7wdel?from-embed
// https://latteandcode.medium.com/el-hook-usecallback-y-react-memo-87f761733c35

const Child = React.memo(({ factor = 1,increment }:IPropChildComponent) => {
    console.log(`render <Child factor="${factor}" />`);

    return <button className="btn btn-primary m-2"
        onClick={ ()=>increment(factor) }
    >
        + { factor }
    </button>
})

const Tarea2Memo = () => {
    
    console.log("Render Tarea2Memo");
    // const { counter,actions:{ increment } }  = useCounter(0)
    const [counter,setCounter] = useState(0)

    const numbers = useMemo(()=>[1,2,3,4,5],[])

    const increment = useCallback((factor:number)=>{
        setCounter(counter=>counter + factor)
    },[setCounter])
    
    return <div>
        <p>Counter <span> { counter } </span></p>
        {
            numbers.map(num=>{
                return <Child increment={ increment } factor={num} key={num} />
            })
        }
    </div>
}

export default Tarea2Memo
import { useState } from "react"

export const CounterApp = () => {
  const [counter, setCounter] = useState({
    counter1:10,
    counter2:20,
    counter3:30,
  })
  return (
    <>
      <h2>Counter : { JSON.stringify(counter) }</h2>
      <hr />
      <button className="btn btn-primary" onClick={()=>setCounter({
        ...counter,
        counter1 : counter.counter1 + 1
      })} >+1 Counter1</button>
    </>
  )
}

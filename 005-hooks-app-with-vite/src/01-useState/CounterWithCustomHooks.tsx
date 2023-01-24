import { useCounter } from "../hooks/useCounter"

export const CounterWithCustomHooks = () => {
  const { state,increment,subtract,reset } = useCounter(10)
  return (
    <>
      <h2>Counter : { JSON.stringify(state) }</h2>
      <hr />
      <button className="btn btn-primary" onClick={()=>increment()} >+1</button>
      <button className="btn btn-secondary" onClick={()=>reset()} >Reset</button>
      <button className="btn btn-danger" onClick={()=>subtract()} >-1</button>
    </>
  )
}

import { useCounter } from "../../hooks/useCounter"

// https://bobbyhadz.com/blog/typescript-element-implicitly-has-any-type-expression


const CounterApp = () => {

    const { counter,actions } = useCounter(0)

    const handleActionClick = (event:React.MouseEvent<HTMLButtonElement>) =>{
        event.preventDefault()
        const { action = "" }   = event.currentTarget.dataset
        if(Object.hasOwn(actions,action)){
            actions[action as keyof typeof actions]()
        }
    }

    return (
        <>
            <h2>Counter { counter }</h2>
            <div className="d-flex align-items-center gap-2">
                <button onClick={ handleActionClick } className="btn btn-primary d-grid fs-5" style={{placeItems:"center"}} data-action="increment">+1</button>
                <button onClick={ handleActionClick } className="btn btn-danger d-grid fs-5" style={{placeItems:"center"}} data-action="decrement">-1</button>
                <button onClick={ handleActionClick } className="btn btn-secondary d-grid fs-5" style={{placeItems:"center"}} data-action="reset">Reset</button>
            </div>
        </>
    )
}

CounterApp.propTypes = {}

export default CounterApp
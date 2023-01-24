import React, { useState } from 'react'

const CounterApp = () => {
    const [{ counter1,counter2 }, setCounter] = useState({
        counter1 : 0,
        counter2 : 0
    })

    const handleActionClickCounter1 = (event:React.MouseEvent<HTMLButtonElement>) =>{
        event.preventDefault()
        const {action} = event.currentTarget.dataset
        if(action === "decrement"){
            setCounter(oldValue=>({
                ...oldValue,
                counter1 : counter1 - 1 
            }))
        }
    }
    const handleActionClickCounter2 = (event:React.MouseEvent<HTMLButtonElement>) =>{
        event.preventDefault()
        const {action} = event.currentTarget.dataset
        if(action === "decrement"){
            setCounter(oldValue=>({
                ...oldValue,
                counter2 : counter2 - 1 
            }))
        }
    }
    return (
        <div className='d-flex align-items-center gap-5'>  
            <section>
                <h2>Counter-1 : { counter1 }</h2>
                <div className="d-flex align-items-center gap-2">
                    <button onClick={ handleActionClickCounter1 } className="btn btn-primary d-grid fs-5" style={{placeItems:"center"}} data-action="increment" data-item="counter1">+1</button>
                    <button onClick={ handleActionClickCounter1 } className="btn btn-danger d-grid fs-5" style={{placeItems:"center"}} data-action="decrement" data-item="counter1">-1</button>
                    <button onClick={ handleActionClickCounter1 } className="btn btn-secondary d-grid fs-5" style={{placeItems:"center"}} data-action="reset" data-item="counter1">Reset</button>
                </div>
            </section>
            <section>
                <h2>Counter-2 : { counter2 }</h2>
                <div className="d-flex align-items-center gap-2">
                    <button onClick={ handleActionClickCounter2 } className="btn btn-primary d-grid fs-5" style={{placeItems:"center"}} data-action="increment" data-item="counter2">+1</button>
                    <button onClick={ handleActionClickCounter2 } className="btn btn-danger d-grid fs-5" style={{placeItems:"center"}} data-action="decrement" data-item="counter2">-1</button>
                    <button onClick={ handleActionClickCounter2 } className="btn btn-secondary d-grid fs-5" style={{placeItems:"center"}} data-action="reset" data-item="counter2">Reset</button>
                </div>
            </section>
            
        </div>
    )
}

export default CounterApp
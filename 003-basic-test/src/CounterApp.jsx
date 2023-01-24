import PropTypes from "prop-types"

import { useState } from "react"

const CounterApp = ({ initValue }) => {

    const [counter, setCounter] = useState(initValue)

    console.log("renderizo");
    const handleAdd = (event) => {
        // setCounter(counter + 1)
        setCounter(oldValue => oldValue + 1)
    }
    const handleSubtract = (event) => {
        if (counter <= 0) return
        // setCounter(counter - 1)
        setCounter(oldValue => oldValue - 1)
    }

    const handleReset = (event) => {
        setCounter(initValue)
    }
    return (
        <div className="App">
            <header className="App-header">
                <div className="value">{counter}</div>
                <div className='actions'>
                    <button onClick={handleAdd}>+1</button>
                    <button onClick={handleReset}>Reset</button>
                    <button onClick={handleSubtract}>-1</button>
                </div>
            </header>
        </div>
    );
}

CounterApp.propTypes = {
    initValue: PropTypes.number
}
CounterApp.defaultProps = {
    initValue: 1
}

export default CounterApp;
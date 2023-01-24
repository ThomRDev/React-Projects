import logo from '../logo.svg';
import './../styles/App.css';

import PropTypes from "prop-types"

import {useState} from "react"

const  App = ({ initValue }) => {

  const [counter,setCounter] = useState(initValue)

  console.log("renderizo");
  const handleAdd = (event) =>{
    // setCounter(counter + 1)
    setCounter(oldValue=>oldValue+1)
  }
  const handleSubtract = (event) =>{
    if(counter <= 0) return
    // setCounter(counter - 1)
    setCounter(oldValue=>oldValue-1)
  }

  const handleReset = (event)=>{
    setCounter(0)
  }
  return (
    <div className="App">
      <header className="App-header">
      { "renderizo normal"+(new Date().getTime()) }
        <img src={logo} className="App-logo" alt="logo" />
        <div className="value">{ counter }</div>
        <div className='actions'>
          <button onClick={handleAdd}>+1</button>
          <button onClick={handleReset}>Reset</button>
          <button onClick={handleSubtract}>-1</button>
        </div>
      </header>
    </div>
  );
}

App.propTypes = {
  initValue : PropTypes.number
}
App.defaultProps = {
  initValue : 1
}

export default App;

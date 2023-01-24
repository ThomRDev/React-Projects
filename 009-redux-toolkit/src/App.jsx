import { useState } from 'react'
import logo from './logo.svg'
import './App.css'

import {useDispatch, useSelector} from "react-redux"
import { decrement, increment, incrementByCustom } from './store/slices/counter'
// import { increment,decrement,incrementByCustom } from "./store/slices/counter/counterSlice"

function App() {

  // este hook lo ocupamos para seleccionar o tomar una pieza del state
  // const counter = useSelector(state => state.counter.value)
  const { value } = useSelector(state => state.counter)

  // dispatch para despachar acciones
  const dispatch = useDispatch()

  // const [count, setCount] = useState(0)

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>count is: { value }</p>
        <p>
          {/* <button type="button" onClick={() => setCount((count) => count + 1)}> */}
          <button type="button" onClick={() => dispatch(increment())  }>
            Increment
          </button>
          <button type="button" onClick={() => dispatch(decrement())  }>
            Decrement
          </button>
          <button type="button" onClick={() => dispatch(incrementByCustom(2))  }>
            Increment by 2
          </button>
        </p>
        <p>
          Edit <code>App.jsx</code> and save to test HMR updates.
        </p>
        <p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
          {' | '}
          <a
            className="App-link"
            href="https://vitejs.dev/guide/features.html"
            target="_blank"
            rel="noopener noreferrer"
          >
            Vite Docs
          </a>
        </p>
      </header>
    </div>
  )
}

export default App

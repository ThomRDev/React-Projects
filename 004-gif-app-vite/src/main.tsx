import React from 'react'
import ReactDOM from 'react-dom/client'
import GifApp from './components/GifApp'
// import App from './App'
import "./styles/index.css"

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    {/* <App /> */}
    <GifApp defaultValues={["The Beatles"]} />
  </React.StrictMode>
)

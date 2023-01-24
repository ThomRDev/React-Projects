import React from 'react'
import ReactDOM from 'react-dom/client'
import { CalendarApp } from './CalendarApp'
import './index.css'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  // calendar me obliga a quitar el modo estricto (UNSAFE_componentWillReceiveProps )
  // <React.StrictMode>
    <CalendarApp />
  // </React.StrictMode>
)

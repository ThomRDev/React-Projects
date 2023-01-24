import { useState } from "react"

export const useCounter = (initialValue = 0) => {
  const [state,setState] = useState(initialValue)
  const increment = (factor = 1) => setState(state + factor) 
  const subtract = (factor = 1) => setState(state - factor) 
  const reset = () => setState(initialValue)
  return {
    state,
    increment,
    subtract,
    reset
  } 
}
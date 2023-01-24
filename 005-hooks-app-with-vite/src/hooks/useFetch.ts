import { useEffect, useRef, useState } from "react"

const getData = async (url:string) => {
  const response = await fetch(url)
  const data = await response.json()
  return data 
}


export const useFetch = (url:string) => {
  const ref = useRef(true)

  const [state,setState] = useState({
    // cambiar esto de any
    data : [] as any,
    isLoading : true,
    hasError : false
  })

  useEffect(()=>{
    ref.current = true
    setState({
      data : [],
      isLoading: true,
      hasError : false
    })
    getData(url)
    .then((data) => {
      if(ref.current){
        setState({
          data,
          isLoading: false,
          hasError : false
        })
      }
    }).catch((err) => {
      if(ref.current){
        setState({
          data : [],
          isLoading: false,
          hasError : true
        })
      }
    });

    return () => {
      ref.current = false
    }
  },[url])

  return state
}

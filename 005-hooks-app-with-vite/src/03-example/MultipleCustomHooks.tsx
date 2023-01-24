import { useCounter } from "../hooks/useCounter"
import { useFetch } from "../hooks/useFetch"

export const Quote = ({ author,quote } : { author?:string,quote?:string }) => {
  return  <blockquote className="blockquote text-end"> 
          <p className="mb-3">{quote}</p>
      <footer className="blockquote-footer">{author}</footer>
  </blockquote>
}

export const MultipleCustomHooks = () => {

  const {state,increment} = useCounter(1)
  const {data,isLoading} = useFetch(`https://www.breakingbadapi.com/api/quotes/${state}`)

  // const {author = "",quote = ""} = !!data && data[0]
  return (
    <>
      <h1>MultipleCustomHooks</h1>
      <hr />
      {
        isLoading && <h1 className="alert alert-info text-center">Loading ...</h1>
      }
      {
        !isLoading && <Quote  {...data[0]} />
      }
      <button className={"btn btn-primary "+(isLoading?"disabled":"")} onClick={()=> increment()} disabled={isLoading} >Cambiar</button>
    </>
  )
}

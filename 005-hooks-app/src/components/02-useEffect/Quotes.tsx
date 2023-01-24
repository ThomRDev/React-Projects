import { useCounter } from "../../hooks/useCounter"
import { useFetch } from "../../hooks/useFetch"

const Quote = ({ author,quote } : { author?:string,quote?:string }) => {
    return  <blockquote className="blockquote text-end"> 
            <p className="mb-3">{quote}</p>
        <footer className="blockquote-footer">{author}</footer>
    </blockquote>
}

const QuotesApp = () => {
    const {actions : { increment },counter} = useCounter(1)
    const { data ,loading } = useFetch(`https://www.breakingbadapi.com/api/quotes/${counter}`)
    return <div>
        {
            loading ? <div className="alert alert-info text-center">loading ... </div> :
            <Quote {...data[0]} />
        }
        <button className={"btn btn-primary "+(loading?"disabled":"")} onClick={()=> increment()} disabled={loading} >Cambiar</button>
    </div>
}

export default QuotesApp
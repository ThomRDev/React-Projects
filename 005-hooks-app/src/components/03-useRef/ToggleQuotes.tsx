import { useState } from "react"
import QuotesApp from "../02-useEffect/Quotes"

const ToggleQuotes = () => {
    const [show,setShow] = useState(true)
    return <div>
        <h1>ToggleQuotes</h1>
        <button className="btn btn-secondary"
            onClick={()=>setShow(!show)}
        >{show ? "Ocultar" :"Mostrar"}</button>
        {
            show && <QuotesApp />
        }
    </div>
}
export default ToggleQuotes
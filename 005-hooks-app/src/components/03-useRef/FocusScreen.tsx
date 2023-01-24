import { useRef } from "react"

const FocusScreen = () => {
    const inputRef = useRef<HTMLInputElement>(null)
    return <div>
        <input ref={inputRef} type="text" autoComplete="off" className="form-control" />
        <button className="btn btn-primary" onClick={()=>inputRef.current?.select()}>Select</button>
    </div>
}
export default FocusScreen
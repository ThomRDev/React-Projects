import { useState } from "react"

const Select = ({ country,setCountry} : any) => {
    return <select name={country} onChange={event=>setCountry(event.target.value)}>
        <option value="PE">Peru</option>
        <option value="CO">Colombia</option>
    </select>
}

const Country = ({ country }:any) => {
    return <h1>{country}</h1>
}

const Countries = () => {
    const [country, setCountry] = useState("PE")
    return (
        <div>
            <Select country={country} setCountry={setCountry} />
            <Country country={country} />
        </div>
    );
}

export default Countries
// https://blog.logrocket.com/using-react-children-prop-typescript/
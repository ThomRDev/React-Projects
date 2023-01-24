import { createContext, ReactNode, useContext, useState } from "react";
import { useFetch } from "../../hooks/useFetch";

type Props = {
    children?: ReactNode
}

interface ICountryContext {
    country?: string;
    setCountry?:any;
}
const CountryContext = createContext<ICountryContext>({})

const CountryProvider = ({ children}:Props) => {
    const [country,setCountry] = useState("CA")
    return <CountryContext.Provider value={{ country,setCountry}}>
        { children }
    </CountryContext.Provider>
}

const Country = () => {
    const { country } = useContext(CountryContext)
    return <h1>{country}</h1>
}

const Select = () => {
    const { country,setCountry } = useContext(CountryContext)
    return (
        <select name={country} onChange={ event => setCountry(event.target.value) } >
            <option value="CA">Canada</option>
            <option value="CO">Colombia</option>
        </select>
    );
}

const DataCountry = () => {
    const { country } = useContext(CountryContext)
    const { data , loading, error } = useFetch("https://restcountries.com/v2/alpha/"+country)
    if(loading) return <p>Loading ...</p>
    if(error) return <p>Ops :( error</p>
    return <div>
        <h1>Data Country {data?.name }</h1>
        <h2>Capital name {data?.capital}</h2>
        <img src={data?.flags["svg"]} alt="" width="100" />
    </div>
}



const ContextCountriesComponent = () =>{
    return <CountryProvider>
        <Country />
        <Select />
        <DataCountry />
    </CountryProvider>
}


export default ContextCountriesComponent 
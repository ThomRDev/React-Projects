import { useState } from "react"

const useForm = ({...initFormValues}) => {
    const [formValues,setFormValues] = useState(initFormValues)
    
    const reset = () => setFormValues(initFormValues) 
    
    const handleChangeInput = (event : any) =>{
        event?.preventDefault()
        const { name,value} = event?.target
        setFormValues({
            ...formValues,
            [name] : value
        })
    }

    return { ...formValues,reset,handleChangeInput }
}

export default useForm
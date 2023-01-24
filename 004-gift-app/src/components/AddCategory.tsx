import React, { ChangeEvent,FormEvent, useState } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

interface IPropsAddCategory{
    setValues : Function
}

const FormSearchCategory = styled.form`
    width: 100%;
    margin: 1em auto;
    display: flex;
`

const InputSearch = styled.input`
    width: 100%;
    margin: auto;
    font-size: 1.2em;
    padding: 1em;
    border: none;
    color: #ccc;
    appearance: none;
    background-color: #4A5E6D;
    border-radius: 0.25rem;
    transition: border-color .15s ease-in-out,box-shadow .15s ease-in-out;
    :focus{
        border-color: hsl(215.5deg, 95%, 90%);
        outline: 0;
        box-shadow: 0 0 0 0.2rem #0D161B;
    }
    ::placeholder{
        color: #A1A1A1;
    }
`
InputSearch.displayName="input"
FormSearchCategory.displayName="form"

const AddCategory = ({ setValues } : IPropsAddCategory) => {
    const [inputValue, setInputValue] = useState("")
    const handleSubmit = (event:FormEvent<HTMLFormElement>) =>{
        event.preventDefault()
        const data = inputValue.trim() 
        if(data.length){
            setValues((old:any)=>[data,...old])
            setInputValue("")
        }
    }
    const handleChange = (event:ChangeEvent<HTMLInputElement>) =>{
        event.preventDefault()
        const data = event.target.value
        setInputValue(data)
    }
    return (
        <FormSearchCategory onSubmit={handleSubmit} className="l-container">
            <InputSearch placeholder='Look for what you want, USA, Marines, etc' value={inputValue} onChange={handleChange} type="text" />
        </FormSearchCategory>
    )
}

AddCategory.propTypes = {
    setValues : PropTypes.func.isRequired
}

export default AddCategory
// https://stackoverflow.com/questions/55465673/jest-enzyme-with-styled-components
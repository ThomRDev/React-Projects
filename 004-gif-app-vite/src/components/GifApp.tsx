import { useCallback, useState } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import AddCategory from './AddCategory'
import GiftGrid from './GifGrid'

const TitleApp = styled.h1`
    font-family: monospace;
    font-size: 4em;
`

// https://stackoverflow.com/questions/61285043/react-with-typescript-argument-of-type-never-is-not-assignable-to-parameter
const GifApp = ({defaultValues} : { defaultValues:string[] }) => {
    const [values,setValues] = useState<string[]>([...defaultValues])

    const onNewCategory = useCallback((newCategory:string)=>{
        const possibleOutcome = newCategory.trim() 
        if(possibleOutcome.length <=1) return;
        if(values.includes(possibleOutcome)) return;
        setValues([possibleOutcome,...values])
    },[values])

    return (
        <div >
            <TitleApp className='l-container' style={{color:"#ccc" }}>GifApp</TitleApp>
            <AddCategory addNewCategory={onNewCategory}  />
            <div className='l-container'>
                { values.map(value=>{
                    return <GiftGrid key={value} value={value} /> 
                })}
            </div>
        </div>
    )
}

GifApp.propTypes = {
    defaultValues : PropTypes.arrayOf(PropTypes.string).isRequired
}

export default GifApp

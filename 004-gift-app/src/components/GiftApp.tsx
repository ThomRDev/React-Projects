import { useState } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import AddCategory from './AddCategory'
import GiftGrid from './GiftGrid'

const TitleApp = styled.h1`
    font-family: monospace;
    font-size: 4em;
`

// https://stackoverflow.com/questions/61285043/react-with-typescript-argument-of-type-never-is-not-assignable-to-parameter
const GiftApp = ({defaultValues} : { defaultValues:string[] }) => {
    const [values,setValues] = useState<string[]>([...defaultValues])
    return (
        <div >
            <TitleApp className='l-container' style={{color:"#ccc" }}>GifApp</TitleApp>
            <AddCategory setValues={setValues}  />
            <div className='l-container'>
                { values.map(value=>{
                    // return <p key={idx}>{value}</p>
                    // cuidado con el key, el orden se rendiriza feo
                    // con el key, se verficica que nos e rendice otra vez ?????
                    // o solos los nuevos valores de values se renderizan
                    return <GiftGrid key={value} value={value} /> 
                })}
            </div>
        </div>
    )
}

GiftApp.propTypes = {
    defaultValues : PropTypes.arrayOf(PropTypes.string).isRequired
}

export default GiftApp

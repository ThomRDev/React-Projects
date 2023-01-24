import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

interface IGiftItemProps {
    src : string
    title : string
}

const GiftItemEl = styled.div`
  animation: fadeIn 0.5s ease forwards;
  position: relative;
  h2{
    position: absolute;
    bottom:0 ;
    left: 0;
    width: 100%;
    text-align: center;
    color: white;
    margin: 0;
    padding: 1em;
    font-family: monospace;
    background:linear-gradient(rgba(255,255,255,0),rgba(0,0,0,0.6) 70%,black);
  }
`

GiftItemEl.displayName="div"

const GiftItem = ({ src,title }:IGiftItemProps) => {

  const hanldeLoad = () => {

  }

  return (
    <GiftItemEl className='item'>
      <img src={src} alt={title} onLoad={ hanldeLoad } style={{ width:"100%",height:"100%",objectFit:"cover" }}/>
      <h2>{title}</h2>
    </GiftItemEl>
  )
}

GiftItem.propTypes = {
    src : PropTypes.string.isRequired,
    title : PropTypes.string.isRequired
}

export default GiftItem
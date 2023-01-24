import React from 'react'
import styled from 'styled-components'
import { useFetchGifts } from '../hooks/useFetchGifts'
import GiftItem from './GiftItem'


const Grid = styled.div`
  width: 100%;
  margin: auto;
  display: grid;
  grid-template-columns:repeat(auto-fill,minmax(240px,1fr));
  grid-auto-rows:200px;
  grid-auto-flow:row dense;
  gap: 1em;
  @media screen and (min-width:650px){
    grid-template-columns:repeat(4,1fr);
    .item:nth-child(2n + 1){
      grid-column:span 2;
    }
    .item:nth-child(10n){
      grid-area : span 2 / span 3;
    }
  }
  @media screen and (min-width:800px){
    grid-template-columns:repeat(5,1fr);
    .item:nth-child(n){
      grid-column:initial;
      grid-area : initial;
    }
    .item:nth-child(3n){
      grid-area : span 2 / span 2;
    }
    .item:nth-child(5n){
      grid-area : span 2 / span 1;
    }
  }
`

Grid.displayName = "div"

const GiftGrid = ({ value }: { value:string}) => {
  
  const { data,loading} = useFetchGifts(value)
  return <div style={{ padding:"2em",outline:"1px solid #0D161B",margin:"4em 0",position:"relative" }}>
    { 
    loading ? <div style={{ display:"flex",flexDirection:"column",justifyContent:"center",alignItems:"center",gap:"1em" }}>
        <p style={{margin:0,fontSize:"2em",fontFamily:"monospace",color:"#ccc"}}>Loading</p> 
        <span className="loader"></span> 
      </div> : 
    (data.length ?<>
      <h1 style={{ textTransform:"uppercase",position:"absolute",top:"0",left:"50%",margin:"0",transform:"translate(-50%,-50%)",color:"#ccc",fontFamily:"monospace" }} >{value}</h1>
      <Grid>
        {data.map((gif:{id:number,src:string,title:string})=><GiftItem key={gif.id} {...gif} />)}
      </Grid>
      
    </> : <div style={{ display:"flex",flexDirection:"column",justifyContent:"center",alignItems:"center",gap:"1em" }}>
        <p style={{margin:0,fontSize:"2em",fontFamily:"monospace",color:"#ccc"}}>No se encontro resultado de <span style={{fontWeight:"bold",textDecoration:"underline" }}>{value}</span></p> 
      </div>)
    }
  </div>
}


export default GiftGrid
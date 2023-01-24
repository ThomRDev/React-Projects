import { useEffect, useRef, useState } from "react"
import { ButtonSubmit, Form } from "./LoginConComponentesNoControlados"

import "./Login.scss"

const Field = ({ type,value="",label,name,checked }:any) => (
  <div className="login__control">
    <label>{ label }</label>
    <input 
    className="login__input" type={type} required  autoComplete="off" name={name} id={name} 
    defaultChecked={checked}
    defaultValue={type === "range"? 0 : value} />
  </div>
)

const TextArea = ({ value,label,name }:any) => (
  <div className="login__control">
    <label>{ label }</label>
    <textarea 
    className="login__input" required  autoComplete="off" name={name} id={name} defaultValue={value} />
  </div>
)

const Select = ({ label,name,options=[],defaultValue = "" }:any) => {
  
  return(
  <div className="login__control">
    <label>{ label }</label>
    <select className="login__input" name={name} defaultValue={defaultValue}>
      <option value="" disabled>-seleccionar-</option>
      {
        options.map((option:any)=><option key={option.value} value={option.value}>{option.content}</option>)
      }
    </select>
  </div>
)}


const RealForm = () => {
  const ref = useRef<HTMLFormElement>(null)

  const [user,setUser] = useState({} as any)

  useEffect(()=>{
    fetch(`${process.env.REACT_APP_API_URL}/1`)
    .then(response=>response.json())
      .then((data)=> {
        setUser(data)
      })
  },[])

  const submit = (event:any) => {
    event.preventDefault()
    const f = ref.current
    const data = {
      fullname : f?.fullname?.value,
      email : f?.email.value,
      age :f?.age.value,
      ranking :f?.ranking.value,
      obs :f?.obs.value,
      country :f?.country.value,
      active :f?.active.checked,
    }
    fetch(`${process.env.REACT_APP_API_URL}/1`,{ 
      // method:"POST", 
      method:"PATCH", 
      headers:{ "Content-Type" : "application/json" },
      body: JSON.stringify(data)
    })
      .then(response=>response.json())
      .then((data)=> {
        f?.reset()
        alert("Los datos fueron guardados :)")
      })
      .catch(err=>{
        alert("Error al enviar al servidor "+ err)
      })
  }
  return (
    <Form submitLogin={submit} refForm={ref}>
      <Field type="text" value={user.fullname} label="Nombres" name="fullname" />
      <Field type="email" value={user.email} label="Email" name="email" />
      <Field type="number" value={user.age} label="Edad" name="age" />
      <Field type="range" value={user.ranking} label="Calificación" name="ranking" />
      <TextArea value={user.obs} label="Observaciones" name="obs" />
      <Select 
        label="Paises" 
        name="country" 
        defaultValue={user.country}
        options={[{ value : "PE",content:"Peru" },{ value:"CO",content:"Colombia" }]}  
      />
      <Field type="checkbox" checked={user.active} label="¿Activo?" name="active" />
      <ButtonSubmit value="Guardar" />
    </Form>
  )
}

export default RealForm
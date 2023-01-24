import { ChangeEvent, useState } from "react"

// export function useForm <T>(intialValues : T){
export const useForm = <T extends Object>(intialValues : T) => {
  const [form,setForm] = useState(intialValues)
  
  const onChange = (event:ChangeEvent<HTMLInputElement>) => {
    const {name,value} = event.target
    setForm({
      ...form,
      [name] : value
    })
  }

  const onResetForm = () => {
    setForm(intialValues)
  }

  return {
    form,
    onChange,
    onResetForm
  }
}
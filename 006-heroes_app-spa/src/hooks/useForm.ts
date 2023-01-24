import { useState, ChangeEvent } from 'react';
export const useForm = <T extends Object> (initialState: T) => {
  const [form,setForm] = useState(initialState)
  const handleChange = (event:ChangeEvent<HTMLInputElement>) => {
    const { name,value } = event.target
    setForm({
      ...form,
      [name] : value
    })
  }

  const reset = () => setForm(initialState)
  return {
    ...form,
    handleChange,
    reset
  }
}
import { useState, ChangeEvent, useEffect, useMemo } from 'react';
export const useForm = <T extends Object> (initialState: T,formValidations : any = {}) => {
  const [formState,setForm] = useState(initialState)
  const [formValidation, setFormValidation] = useState<any>({})

  // cada ves que cualquier campo del form cambie, verificará las validaciones
  useEffect(()=>{
    createValidators()
  },[ formState ])

  // si cambia los parametros
  useEffect(()=>{ 
    setForm(initialState)
  },[initialState])

  const onInputChange = (event:ChangeEvent<HTMLInputElement>) => {
    const { name,value } = event.target
    setForm({
      ...formState,
      [name] : value
    })
  }

  const onReset = () => setForm(initialState)

  const createValidators = ()=>{
    const formCheckValues:any = {}
    for (const formField in formValidations) {
      if (Object.prototype.hasOwnProperty.call(formValidations, formField)) {
        const formFieldCapitalize = formField.charAt(0).toUpperCase() + formField.slice(1);
        const [validatorFunction,errorMessage = "This field is required"] = formValidations[formField]
        formCheckValues[`is${formFieldCapitalize}Valid`] = validatorFunction(formState[formField as keyof typeof formState]) ? null : errorMessage
      }
    }
    setFormValidation(formCheckValues)
  }

  const isFormValid = useMemo(()=>{
    for (const formField in formValidation) {
      if (Object.prototype.hasOwnProperty.call(formValidations, formField)) {
        if(formValidation[formField] != null) return false
      }
    }
    return true
  },[formValidation])

  return {
    ...formState,
    formState,
    onInputChange,
    onReset,
    formValidation,
    isFormValid
  }
}
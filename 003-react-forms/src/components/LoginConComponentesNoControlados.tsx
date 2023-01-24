import { FormEvent, useCallback, useRef } from 'react'

export const Field = ({ type,value,label }:any) => (
  <div className="login__control">
    <label>{ label }</label>
    <input 
    className="login__input" type={type} required  autoComplete="off" name={type} defaultValue={value} />
  </div>
)

export const ButtonSubmit = ({ value }:any) => (
  <button type="submit" className="login__action">{ value }</button>
)

export const Form = ({ children,submitLogin,refForm }:any) => {
  return (
    <form className="login" onSubmit={submitLogin} ref={refForm}>
      <div className="login-content">{ children }</div>
    </form>
  );
}


export const useForm = (fields:any) => {

  const ref = useRef()
  const submitLogin = useCallback((event:FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    console.log(event.currentTarget.email.value);
    console.log(event.currentTarget.password.value);
    console.log(ref.current);
  },[])
  return[fields,submitLogin,ref]
}

const LoginConComponentesNoControlados = () => {

  // const submitLogin = useCallback((event:FormEvent<HTMLFormElement>) => {
  //   event.preventDefault()
  //   console.log(event.currentTarget.email.value);
  //   console.log(event.currentTarget.password.value);
  // },[])
  
  const [fields,submit,ref] = useForm({ password : "", email : "" })

  return (
    // <form className="login" onSubmit={submitLogin}>
    //   <div className="login-content">
    //     {/* <div className="login__control">
    //       <label>Correo Electronico</label>
    //       <input placeholder="Email" 
    //       className="login__input" type="email" required  autoComplete="off" name="email" />
    //     </div> */}
    //     <Field type="email" value="" label="Email" />
    //     <Field type="password" value="" label="Password" />
    //     <ButtonSubmit value="Login" />
    //   </div>
    // </form>
    <Form submitLogin={submit} refForm={ref}>
      <Field type="email" value={fields.email} label="Email" />
      <Field type="password" value={fields.password} label="Password" />
      <ButtonSubmit value="Login" />
    </Form>
  )
}

export default LoginConComponentesNoControlados
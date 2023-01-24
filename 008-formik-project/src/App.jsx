import { useState } from 'react'
import './App.css'
import {Formik,Form,Field,ErrorMessage} from "formik"


// function App() {
//   const onSubmit = event => {
//     event.prevelDefualt()
//   }
//   return (
//     <form className='form' onSubmit={onSubmit}>
//       <div className='form__content'>
//         <div className="form__field field">
//           <label htmlFor="" className='field__title'>Nombre</label>
//           <input type="text" className='field__input'/>
//         </div>
//         <div className="form__field field">
//           <label htmlFor=""  className='field__title'>Correo</label>
//           <input type="email" className='field__input' />
//         </div>
//         <button type='submit'>Enviar</button>
//       </div>
//     </form>
//   )
// }

// function App() {
//   const [submittedForm,setSubmittedForm] = useState(false)
//   const onSubmit = (data,{ resetForm }) => {
//     console.log(data);
//     resetForm()
//     setSubmittedForm(true)
//     setTimeout(()=>{
//       setSubmittedForm(false)

//     },3500)
//   }
//   return (
//     <Formik
//       initialValues={{
//         name : "",
//         email  :""
//       }}

//       // keyup
//       validate={(values)=>{
//         let errors = {}
//         if(!values.name.length){
//           errors["name"] = "Name is required"
//         }else if(values.name.match(/^[a-zA-ZÀ-ÿ\s]{1,40}$/) == null){
//           errors["name"] = 'El nombre solo puede contener letras y espacios'
//         }
//         if(!values.email.length){
//           errors["email"] = "Email is required"
//         }else if(values.email.match(/^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/) == null){
//           errors["email"] = "El correo solo puede contener letras, numeros, puntos, guiones y guion bajo."
//         }

//         return errors
//       }}

//       onSubmit={onSubmit}
//     >{
//       // rendered prop
//       (props)=>(
//         <form className='form'  onSubmit={props.handleSubmit}>
//           <div className='form__content'>
//             <div className="form__field field">
//               <label htmlFor="" className='field__title'>Nombre</label>
//               <input type="text" 
//               autoComplete='off'
//               className='field__input' name='name' value={props.values.name} onBlur={props.handleBlur} onChange={props.handleChange} />
//               {props.touched.name && (props.errors.name && <p className='error'>{props.errors.name}</p>)}
//             </div>
//             <div className="form__field field">
//               <label htmlFor=""  className='field__title'>Correo</label>
//               <input type="email" 
//               autoComplete='off'
//               className='field__input' name='email' value={props.values.email} onBlur={props.handleBlur} onChange={props.handleChange} />
//               {props.touched.email && (props.errors.email && <p className='error'>{props.errors.email}</p>)}
//             </div>
//             <button type='submit'>Enviar</button>
//             {submittedForm && <p className='success'>Formulario enviado con exito</p> } 
//           </div>
//         </form>
//       )
//     }</Formik>
//   )
// }


function App() {
  const [submittedForm,setSubmittedForm] = useState(false)
  const onSubmit = (data,{ resetForm }) => {
    console.log(data);
    resetForm()
    setSubmittedForm(true)
    setTimeout(()=>{
      setSubmittedForm(false)

    },3500)
  }
  return (
    <Formik
      initialValues={{
        name : "",
        email  :""
      }}

      // keyup
      validate={(values)=>{
        let errors = {}
        if(!values.name.length){
          errors["name"] = "Name is required"
        }else if(values.name.match(/^[a-zA-ZÀ-ÿ\s]{1,40}$/) == null){
          errors["name"] = 'El nombre solo puede contener letras y espacios'
        }
        if(!values.email.length){
          errors["email"] = "Email is required"
        }else if(values.email.match(/^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/) == null){
          errors["email"] = "El correo solo puede contener letras, numeros, puntos, guiones y guion bajo."
        }

        return errors
      }}

      onSubmit={onSubmit}
    >{
      // rendered prop
      (props)=>(
        <Form className='form'>
          <div className='form__content'>
            <div className="form__field field">
              <label htmlFor="" className='field__title'>Nombre</label>
              <Field type="text" autoComplete='off' className='field__input' name='name'/>
              <ErrorMessage name='name' component={ () => <p className='error'>{props.errors.name}</p>} />
              {/* {props.touched.name && (props.errors.name && <p className='error'>{props.errors.name}</p>)} */}
            </div>
            <div className="form__field field">
              <label htmlFor=""  className='field__title'>Correo</label>
              <Field type="email" autoComplete='off' className='field__input' name='email'  />
              <ErrorMessage name='email' component={ () => <p className='error'>{props.errors.email}</p>} />
              {/* {props.touched.email && (props.errors.email && <p className='error'>{props.errors.email}</p>)} */}
            </div>
            <div className="form__field field">
              <Field name="pais" as="select">
                  <option value="mexico">Mexico</option>
                  <option value="España">España</option>
                  <option value="Argentina">Argentina</option>
              </Field>
            </div>
            <div className="form__field field">
							<label>
								<Field type="radio" name="sexo" value="hombre" /> Hombre
							</label>
							<label>
								<Field type="radio" name="sexo" value="mujer" /> Mujer
							</label>
						</div>
            <div className="form__field field">
							<Field name="mensaje" as="textarea" placeholder="Mensaje" />
						</div>
            <button type='submit'>Enviar</button>
            {submittedForm && <p className='success'>Formulario enviado con exito</p> } 
          </div>
        </Form>
      )
    }</Formik>
  )
}

export default App

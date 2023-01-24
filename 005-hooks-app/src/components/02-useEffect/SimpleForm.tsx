import { FormEvent, useEffect, useState} from "react"

const Message = () => {
    useEffect(()=>{
        console.log("componente montado");
        return () => {
            console.log("componente desmontado");
        }
    },[])
    return <div>
        <h1>123 correcto</h1>
    </div>
}

const SimpleForm = () => {

    const [formValues,setFormValues] = useState ({
        password : "",
        email : "",
        username : ""
    })

    const handlerSubmit = (event : FormEvent<HTMLFormElement>) =>{
        event.preventDefault()
    }

    const handleChangeInput = (event : FormEvent<HTMLInputElement>) => {
        event.preventDefault()
        const { name,value  } = event.target as HTMLInputElement
        setFormValues({
            ...formValues,
            [name] : value
        })
    }

    useEffect(()=>{
        console.log("cambiaron los valores del formValues")
        // unmounted
        return ()=>{
            // cleanup
        }
    },[formValues])

    return <div>
        <div>
            <ul>
                <li>
                    <span>username :</span>&nbsp;<span>{JSON.stringify(formValues.username)}</span>
                </li>
                <li>
                    <span>email :</span>&nbsp;<span>{JSON.stringify(formValues.email)}</span>
                </li>
                <li>
                    <span>password :</span>&nbsp;<span>{JSON.stringify(formValues.password)}</span>
                </li>
            </ul>
        </div>
        <form onSubmit={handlerSubmit}>
            <div className="input-group m-1">
                <div className="input-group-append">
                    <span className="input-group-text">Password</span>
                </div>
                <input type="password" name="password" autoComplete="off" className="form-control" onChange={handleChangeInput} />
            </div>
            <div className="input-group m-1">
                <div className="input-group-append">
                    <span className="input-group-text">Email</span>
                </div>
                <input type="email" name="email" autoComplete="off" className="form-control" onChange={handleChangeInput} />
            </div>
            <div className="input-group m-1">
                <div className="input-group-append">
                    <span className="input-group-text">Username</span>
                </div>
                <input type="text" name="username" autoComplete="off" className="form-control" onChange={handleChangeInput} />
            </div>
        </form>
        { formValues.username === "123" && <Message /> }
    </div>
}

export default SimpleForm
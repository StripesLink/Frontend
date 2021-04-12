import axios from 'axios';
import React, {useState} from 'react'
import {url_createUser} from '../../services/api/apirest'

const CreateUser = ({history}) => {
    const [user, setUser] = useState('')
    const [password, setPassword] = useState('')
    const [msgerror, setMsgerror] = useState(null);

    function handleChange(name, value) {
        if (name === 'user') {
          setUser(value)
        } else {
          setPassword(value)
        }
        setMsgerror(null);
    }

    const createUser = (e) =>{
        e.preventDefault();
        const data = {
            username: user,
            password: password,
        }
        axios.post(url_createUser, data)
        .then(()=> {
            alert('Usuario Creado')
            history.push("/Login");
        })
        .catch((e)=>setMsgerror("Usuario ya existe"));
    }


    return (
        <div className="row mt-5">
            <div className="col"></div>
            <div className="col">
                <h1 className="display-5">Crear usuario</h1>
                <form onSubmit={createUser} className="form-group">
                    <input
                        onChange={(e) => {handleChange('user',e.target.value)}} 
                        placeholder="Nombre usuario" 
                        className="form-control" type="text"/>
                    <input
                        onChange={(e) => {handleChange('pass',e.target.value)}} 
                        placeholder="Contraseña" 
                        className="form-control mt-4" type="password"/>
                    <input type="submit" value="Registrar usuario" 
                        className="btn btn-dark btn-block mt-4"/>
                </form>
                {
                    msgerror!==null ? (<div className="alert alert-danger">{msgerror}</div>) : (<span></span>)
                }
            </div>
            <div className="col"></div>
        </div>
    )
}

export default CreateUser

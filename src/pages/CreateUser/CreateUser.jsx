import axios from 'axios';
import React, { useState } from 'react'
import { url_createUser } from '../../services/api/apirest'
import Input from '../../commons/input/input'
import Label from '../../commons/label/label'
import Title from '../../commons/title/title'
import './CreateUser.css'

const CreateUser = ({ history }) => {
    const [user, setUser] = useState('')
    const [password, setPassword] = useState('')
    const [msgerror, setMsgerror] = useState(null);

    function handleChange(name, value) {
        if (name === 'usuario') {
            setUser(value)
        } else {
            setPassword(value)
        }
        setMsgerror(null);
    }

    const createUser = () => {
        const data = {
            username: user,
            password: password,
        }
        axios.post(url_createUser, data)
            .then(() => {
                alert('Usuario Creado')
                history.push("/Login");
            })
            .catch((e) => setMsgerror("Usuario ya existe"));
    }

    return (
        <div className="auth-wrapper">
            <div className="auth-inner create">
                <Title text="Create User" />
                <div className="form-group">
                    <div class="row align-items-start">
                        <div class="col-3">
                            <Label text="User" />
                        </div>
                        <div class="col">
                            <Input
                                attribute={{
                                    id: 'usuario',
                                    name: 'usuario',
                                    type: 'text',
                                    placeholder: 'Enter the new user',
                                }}
                                handleChange={handleChange}
                            />
                        </div>
                    </div>
                </div>
                <div className="form-group">
                    <div class="row align-items-start">
                        <div class="col-3">
                            <Label text="Password" />
                        </div>
                        <div class="col">
                            <Input
                                attribute={{
                                    id: 'contraseña',
                                    name: 'contraseña',
                                    type: 'password',
                                    placeholder: 'Enter the new password',
                                }}
                                handleChange={handleChange}
                            />
                        </div>
                    </div>

                </div>

                <button onClick={(e) => createUser()} className="btn btn-md btn-block btn-dark" >
                    Create
                </button>

                {
                    msgerror !== null ? (<div className="alert alert-danger">{msgerror}</div>) : (<span></span>)
                }
            </div>
        </div>
    )

}

export default CreateUser

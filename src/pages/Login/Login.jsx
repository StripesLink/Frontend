import React, { useState } from 'react'
import Input from '../../commons/input/input'
import Label from '../../commons/label/label'
import Title from '../../commons/title/title'
import axios from 'axios'
import './Login.css'
import {setToken} from "../../services/Session/Auth"
import {url_login} from "../../services/api/apirest"
import { Link } from 'react-router-dom'

const Login = ({ history }) => {

  const [user, setUser] = useState('')
  const [password, setPassword] = useState('')
  const [hasError, setHasError] = useState(false)


  function handleChange(name, value) {
    if (name === 'usuario') {
      setUser(value)
    } else {
      setPassword(value)
    }
    setHasError(false)
  }

  function ifMatch(param) {
    let data = {
      username: param.user,
      password: param.password,
    }
    axios
      .post(url_login, data)
      .then((response) => {
        sessionStorage.setItem('userID', user);
        setToken(response.data.response);
        history.push('/salas')
      })
      .catch((error) => {
        setHasError(true)
      })
  }

  function handleSubmit() {
    let account = { user, password }
    if (account) {
      ifMatch(account)
    }
  }

  return (
    <div className="auth-wrapper">
      <div className="auth-inner">
        <Title text="StripesLink" />
        {hasError && (
          <label className="label-alert">
            Su usuario o contraseña son incorrectas
          </label>
        )}
        <div className="form-group">
          <Label text="User" />
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
        <div className="form-group">
          <Label text="Password" />
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

        <button onClick={(e) => handleSubmit()} className="btn btn-md btn-block btn-dark" >
          Log In
        </button>
          
        
        <Link className="btn btn-md btn-block btn-dark" to='/CreateUser'>Create User</Link>

      </div>
    </div>
  )
}

export default Login

import React, { useState } from 'react'
import Title from './components/title/title'
import Label from './components/label/label'
import Input from '../../commons/input/input'
import axios from 'axios'
import './Login.css'

const Login = ({ history }) => {
  const [user, setUser] = useState('')
  const [password, setPassword] = useState('')
  const [hasError, setHasError] = useState(false)
  const url = 'http://localhost:8682/'

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
    let urlSend = url + 'login'
    let config = {
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      },
    }
    axios
      .post(urlSend, data, config)
      .then((response) => {
        localStorage.setItem('token', response.data.response)
        history.push('/home')
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
              placeholder: 'Ingrese el usuario',
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
              placeholder: 'Ingrese la contraseña',
            }}
            handleChange={handleChange}
          />
        </div>

        <button onClick={(e) => handleSubmit()} className="btn btn-info btn-md">
          Ingresar
        </button>
      </div>
    </div>
  )
}

export default Login

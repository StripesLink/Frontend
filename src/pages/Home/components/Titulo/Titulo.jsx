import React from 'react'
import axios from 'axios';
import { url_salirSala } from '../../../../services/api/apirest'


const Titulo = ({history, id, callback}) => {


    const salirSala = ()=>{
        axios
          .put(`${url_salirSala}/${id}`)
          .then((response) => {
            callback('Disconnect')
            history.push('/salas')
          })
      }


    return (
        <div className="titulo row">
            <h1 className="col-11">StripesLink</h1>
            <button 
              className="col-1 btn btn-outline-danger"
              onClick={salirSala} 
            >Salir</button>
        </div>
    )
}

export default Titulo

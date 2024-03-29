import React, { useState, useEffect } from 'react'
import Sala from './Components/Sala/Sala'
import axios from 'axios'
import {url_getSalas} from '../../services/api/apirest'

const Salas = ({ history }) => {

  const [listaSalas, setlistaSalas] = useState([]);


  const obtenerUsuario = async()=>{

    await axios
    .get(url_getSalas)
    .then((response) =>{
      setlistaSalas(response.data)}
    ) 
  }


  useEffect(() => {
    obtenerUsuario();
  }, []);
  

  return (
    <div>
      <div className="container">
         <div className="row row-cols-1 row-cols-sm-2 row-cols-md-4">
        {
            listaSalas.map((item, index) =>
                <Sala key={item.idSala} id={item.idSala} numUsers={item.numUsers} numSala={index+1} his={history}/>
            )
        }
         </div>
      </div>
    </div>
  )
}

export default Salas

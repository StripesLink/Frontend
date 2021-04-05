import React, { useState } from 'react'
import Sala from './Components/Sala/Sala'
import axios from 'axios'

const Salas = ({ history }) => {
  const [numSalas, setnumSalas] = useState(0);

  const [listaSalas, setlistaSalas] = useState([]);

  const url = 'http://localhost:8682/';

  const cargar = () => {
    let urlSend = url + 'getAllSalas';
    
    let config = {
        headers: { 
            'Authorization': `Bearer ${localStorage.getItem("token")}`,
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
        }
      }
    axios
      .get(urlSend, config)
      .then((response) => {
        setlistaSalas([response.data]);
      })
  }


  return (
    <div>
        {cargar()}
        {
            listaSalas.map((item, index) =>
                <Sala id={item.id} numUsers={item.numUsers} numSala={index+1}/>
            )
        }
    </div>
  )
}

export default Salas

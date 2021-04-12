import React, {useRef, useEffect, useState} from "react";
import Chat from "./components/chat/chat";
import {useParams} from 'react-router-dom';
import Equipo from './components/Equipo/Equipo';
import axios from 'axios';
import {url_getPointsSala} from '../../services/api/apirest'

function Home(props) {

  const {id, equipo} = useParams();

  const [puntosRojos, setPuntosRojos] = useState([])
  const [puntosAzul, setPuntosAzul] = useState([])

  const obtenerUsuario = async()=>{
    await axios
    .get(url_getPointsSala+`/${id}`)
    .then((response) =>{
      console.log(response.data);
      setPuntosAzul(response.data.azul);
      setPuntosRojos(response.data.rojo)
    })
  }

  useEffect(() => {
    obtenerUsuario();
  }, []);

  return (
    <div className="container mt-4">
      <h1>StripesLink</h1>
      <div className="row row-cols-2 mt-4">
        <Equipo 
          nameTeam="rojo" 
          idSala={id} 
          bloquear={equipo==='Rojo'?false:true} 
          cargarPuntos={puntosRojos}
        />
        <Equipo 
          nameTeam="azul" 
          idSala={id} 
          bloquear={equipo==='Azul'?false:true}
          cargarPuntos={puntosAzul}
        />
      </div>
      <Chat />
    </div>
  );
}

export default Home;

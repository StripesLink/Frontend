import React, {useRef, useEffect, useState} from "react";
import Chat from "./components/chat/chat";
import {useParams} from 'react-router-dom';
import Equipo from './components/Equipo/Equipo';
import axios from 'axios';
import {url_getPointsSala} from '../../services/api/apirest'
import { ShieldFillX } from "react-bootstrap-icons";

function Home(props) {

  const {id, equipo} = useParams();

  const [puntosRojos, setPuntosRojos] = useState([])
  const [puntosAzul, setPuntosAzul] = useState([])
  const [firstRojo, setfirstRojo] = useState(true)
  const [firstAzul, setfirstAzul] = useState(true)

  const obtenerUsuario = async()=>{
    await axios
    .get(url_getPointsSala+`/${id}`)
    .then((response) =>{
      console.log(response.data);
      setPuntosAzul(response.data.azul);
      setPuntosRojos(response.data.rojo);
      console.log(firstRojo)
      console.log(firstAzul)
    })
  }

  useEffect(() => {
    obtenerUsuario();
  }, []);

  const cambiar1 = () =>{
    setfirstAzul(false);
  }
  const cambiar2 = () =>{
    setfirstRojo(false);
  }

  return (
    <div className="container mt-4">
      <h1>StripesLink</h1>
      <div className="row row-cols-2 mt-4">
        <Equipo 
          nameTeam="rojo" 
          idSala={id} 
          bloquear={equipo==='Rojo'?false:true} 
          cargarPuntos={puntosRojos}
          first={firstRojo}
          cambiar={cambiar2}
        />
        <Equipo 
          nameTeam="azul" 
          idSala={id} 
          bloquear={equipo==='Azul'?false:true}
          cargarPuntos={puntosAzul}
          first={firstAzul}
          cambiar={cambiar1}
        />
      </div>
      <Chat />
    </div>
  );
}

export default Home;

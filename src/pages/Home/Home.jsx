import React, { useEffect, useState, useRef } from "react";
import { useParams } from 'react-router-dom';
import Equipo from './components/Equipo/Equipo';
import axios from 'axios';
import SockJsClient from 'react-stomp';
import "./Home.css";
import { url_getPointsSala } from '../../services/api/apirest'
import Tematica from "./components/tematica/Tematica";
import { getToken } from '../../services/Session/Auth'
import { url_websocket } from '../../services/api/apirest';
import Titulo from "./components/Titulo/Titulo";

function Home({history}) {

  const { id, equipo} = useParams();

  let clientRef = useRef(null);
  const [puntosRojos, setPuntosRojos] = useState([])
  const [puntosAzul, setPuntosAzul] = useState([])
  const [firstRojo, setfirstRojo] = useState(true)
  const [firstAzul, setfirstAzul] = useState(true)
  const [datosSala, setdatosSala] = useState({
    idTematica: "",
    nameTematica: "",
    palabra: "",
    esPintor: false
  })

  let limpiar1;
  let limpiar2;

  const obtenerPuntos = async () => {
    await axios
      .get(url_getPointsSala + `/${id}`)
      .then((response) => {
        if (response.data.rojo.length === 0) {
          setfirstRojo(false);
        }
        setPuntosRojos(response.data.rojo);
        if (response.data.azul.length === 0) {
          setfirstAzul(false)
        }
        setPuntosAzul(response.data.azul);
      })
  }

  useEffect(() => {
    obtenerPuntos();
  }, []);

  const cambiar1 = () => {
    setfirstAzul(false);
  }
  const cambiar2 = () => {
    setfirstRojo(false);
  }


  const validarTematica = (data) => {
    const {nameTematica, palabraAzul, palabraRojo, pintorAzul, pintorRojo }
      = data;

    var pintor = false;
    var palabra = (equipo === 'Rojo') ? palabraRojo : palabraAzul;
    if (pintorAzul === sessionStorage.getItem('userID') || pintorRojo === sessionStorage.getItem('userID')) {
      pintor = true;
    }

    setdatosSala({
      nameTematica: nameTematica,
      palabra: palabra,
      esPintor: pintor
    })

  }

  const limp1 = (calLimpiar)=>{
    limpiar1 = calLimpiar
  }
  const limp2 = (calLimpiar)=>{
    limpiar2 = calLimpiar
  }


  const onMessageReceive = (msg, topic) => {
    if(topic===`/topic/Sala.${id}.Ganador`){
      validarTematica(msg.ronda)
      alert("El juego termino!, el ganador es : "+msg.username)
      limpiar1()
      limpiar2()
    }else if(topic === `/topic/Sala.${id}`){
      if(msg!==""){
        validarTematica(msg)
      }else{
        setdatosSala({
          idTematica: "",
          nameTematica: "",
          palabra: "",
          esPintor: false
        })
      }
      
    }
  }

  const handleConnection = (msg) =>{
    clientRef.sendMessage(`/app/users.${id}`, JSON.stringify(msg),
        { 'Authorization': `Bearer ${getToken()}` })
    console.log("enviando ACK...")
  }

  return (
    <div id="home" className="container mt-4">
        <SockJsClient url={url_websocket}
          topics={
            [
              `/topic/Sala.${id}.Ganador`,
              `/topic/Sala.${id}`
            ]
          }
          headers={{ 'Authorization': `Bearer ${getToken()}` }}
          ref={(client) => { clientRef = client }}
          onMessage={onMessageReceive}
          onConnect={() => handleConnection('Connect')}
          onDisconnect={()=>console.log("saliendo...")}
          debug={false}
        />

        <Titulo 
          history = {history}
          id = {id}
          callback = {handleConnection}
        />
          
      <div className="row mt-4">
        <Equipo
          nameTeam="Rojo"
          idSala={id}
          bloquear={equipo === 'Rojo' ? false : true}
          cargarPuntos={puntosRojos}
          first={firstRojo}
          cambiar={cambiar2}
          limpiar={limp1}
        />
        <Tematica
          datos={datosSala}
        />
        <Equipo
          nameTeam="Azul"
          idSala={id}
          bloquear={equipo === 'Azul' ? false : true}
          cargarPuntos={puntosAzul}
          first={firstAzul}
          cambiar={cambiar1}
          limpiar={limp2}
        />
      </div>

    </div>
  );
}

export default Home;

import React, { useRef, useState } from 'react';
import SockJsClient from 'react-stomp';
import Tablero from "../tablero/Tablero";
import './Equipo.css';
import { getToken } from '../../../../services/Session/Auth'
import { url_websocket } from '../../../../services/api/apirest';

const Equipo = (props) => {

  const { nameTeam, idSala, bloquear, cargarPuntos, first, cambiar } = props;

  let clientRef = useRef(null);
  const [newLine, setnewLine] = useState({})
  const [newMessage, setNewMessage] = useState("")

  const onMessageReceive = (msg, topic) => {
    if(topic===`/topic/Sala.${idSala}.${nameTeam}`){
      setnewLine(msg);
      console.log(msg)
    }if(topic===`/topic/Chat.${idSala}.${nameTeam}`){
      setNewMessage(msg);
    }if(topic===`/topic/Sala.${idSala}.Ganador`){
      console.log(msg)
      alert("El juego termino!, el ganador es : "+msg.username)
    }
  }

  const sendMessage = (data, send) => {
    try {
      clientRef.sendMessage(`/app/${send}.${idSala}.${nameTeam}`, JSON.stringify(data),
        { 'Authorization': `Bearer ${getToken()}` })
      console.log("enviando...")
      return true;
    } catch (e) {
      return false;
    }
  }

  const divStyle = {
    background: nameTeam === 'Rojo' ? 'red' : 'blue'
  };


  return (
    <div className="col equipo">
      <div>
        <SockJsClient url={url_websocket}
          topics={
            [`/topic/Sala.${idSala}.${nameTeam}`,
            `/topic/Chat.${idSala}.${nameTeam}`]
          }
          headers={{ 'Authorization': `Bearer ${getToken()}` }}
          onMessage={onMessageReceive}
          ref={(client) => { clientRef = client }}
          onConnect={() => console.log("Connection established!")}
          onDisconnect={() => console.log("Disconnected!")}
          debug={false}
        />

        <h2 style={divStyle}>Equipo {nameTeam}</h2>
        <Tablero
          nombre={nameTeam}
          first={first}
          bloquear={bloquear}
          callback={sendMessage}
          cargarPuntos={cargarPuntos}
          cambiar={cambiar}
          newLine={newLine}
          newMessage={newMessage}
        />
      </div>
    </div>

  )
}

export default Equipo

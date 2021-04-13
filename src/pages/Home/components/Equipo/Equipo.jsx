import React, {useRef} from 'react';
import SockJsClient from 'react-stomp';
import Tablero from "../tablero/Tablero";
import './Equipo.css';
import { getToken } from '../../../../services/Session/Auth'
import {url_websocket, url_getPointsSala} from '../../../../services/api/apirest';

const Equipo = (props) => {

    const {nameTeam, idSala, bloquear, cargarPuntos, first, cambiar} = props;

    let clientRef = useRef(null);

  const onMessageReceive = (msg, topic) => {
    console.log("se dddd");
    console.log(msg);
  }

  const sendMessage = (data) => {
    try {
      console.log(idSala);
      console.log(clientRef);
      console.log(data);
      clientRef.sendMessage(`/app/newPoints.${idSala}.${nameTeam}`, JSON.stringify(data),
      { 'Authorization': `Bearer ${getToken()}`})
      console.log("enviando...")
      return true;
    } catch(e) {
      return false;
    }
  }

  const styl = () =>{
      console.log(nameTeam)
      return 
  }

  const divStyle = {
    background : nameTeam==='rojo' ? 'red':'blue'
  };


    return (
        <div className="equipo">
            <SockJsClient url={url_websocket} 
            topics={[`/topic/Sala.${idSala}.${nameTeam}`]}
            headers={{ 'Authorization': `Bearer ${getToken()}`}}
            onMessage={ onMessageReceive }
            ref={(client) => { clientRef = client}} 
            onConnect={()=>console.log("Connection established!")} 
            onDisconnect={()=>console.log("Disconnected!")}
            debug={ false }
            />
          
            <h2 style={divStyle}>Equipo {nameTeam}</h2>
            <Tablero
            nombre = {nameTeam}
              first={first}
              bloquear={bloquear}
              callback={sendMessage} 
              cargarPuntos={cargarPuntos}
              cambiar={cambiar}
            />
        </div>
    )
}

export default Equipo

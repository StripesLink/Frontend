import React, { useRef, useEffect, useState } from "react";
import CanvasDraw from "react-canvas-draw";
import ChatE from "../chat/chat";
import './Tablero.css'

const Tablero = (props) => {
  const { callback, cargarPuntos, newLine, bloquear, first, cambiar, nombre, newMessage } = props;

  const tablero = useRef(null);

  const [puntos, setPuntos] = useState([])
  var cont = 0;
  var primero = false;

  useEffect(() => {
    if (JSON.stringify(newLine) !== '{}') {
      primero = true;
      puntos.push(newLine);
      let data = { "lines": puntos, "width": 400, "height": 400 }
      tablero.current.loadSaveData(JSON.stringify(data), true);
    }
  }, [newLine])


  useEffect(() => {
    let data = { "lines": cargarPuntos, "width": 400, "height": 400 }
    cargarPuntos.map((linea) => {
      setPuntos([...cargarPuntos, linea])
    })
    setPuntos(cargarPuntos)
    tablero.current.loadSaveData(JSON.stringify(data));
  }, [cargarPuntos])

  const sendPoints = () => {
    if (primero) {
      if (cont === puntos.length - 1) {
        primero = false;
        cont = 0;
      } else {
        cont = cont + 1;
      }
    } else {
      if (!first) {
        const data = JSON.parse(tablero.current.getSaveData());
        const dataSend = data.lines[data.lines.length - 1];
        callback(dataSend,"newPoints")
      } else {
        if (cont === cargarPuntos.length - 1) {
          cambiar();
          cont = 0;
        } else {
          cont = cont + 1;
        }
      }
    }
  }

  return (
    <div >
      <div className="tablero">
        <CanvasDraw
          brushRadius={1}
          style={{ border: "1px solid #000" }}
          ref={tablero}
          disabled={bloquear}
          onChange={sendPoints}
        />
      </div>
      <ChatE 
        newMessage = {newMessage}
        callback = {callback}
        bloquear = {bloquear}
      />
    </div>
  );
}

export default Tablero;

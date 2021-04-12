import React, {useRef, useEffect, useState} from "react";
import CanvasDraw from "react-canvas-draw";

const Tablero = (props) => {
  const {callback, cargarPuntos, nuevosPuntos, bloquear} = props;

  const tablero = useRef(null);

  const [tam, setTam] = useState(400)
  const [estaCargado, setestaCargado] = useState(false);
  const [puntos, setPuntos] = useState([])
  
  useEffect(() => {
    console.log(cargarPuntos)
    let data = {"lines": cargarPuntos}
    setPuntos(data)
    console.log(puntos)
    console.log(data)
    tablero.current.loadSaveData(JSON.stringify(data));
    setestaCargado(true);
  }, [cargarPuntos]);

  /*useEffect(() => {
    const data = getDataString(nuevosPuntos);
    console.log(data)
    tablero.current.loadSaveData(data);
  }, [nuevosPuntos]);*/

  const sendPoints = () =>{
    console.log(estaCargado);
    console.log(tablero.current.getSaveData());
    if(estaCargado){
      const data = JSON.parse(tablero.current.getSaveData());
      console.log(data)
      const dataSend = data.lines[data.lines.length -1];
      callback(dataSend)
    }
    setestaCargado(true);
  }
  
  
  return (
    <div className="col">
      <CanvasDraw
        brushRadius={1}
        style={{ border: "1px solid #000" }}
        ref={tablero}
        disabled={bloquear}
        onChange={sendPoints}
      />
    </div>
  );
}

export default Tablero;

import React, {useRef, useEffect, useState} from "react";
import CanvasDraw from "react-canvas-draw";

const Tablero = (props) => {
  const {callback, cargarPuntos, nuevosPuntos, bloquear, first, cambiar, nombre} = props;

  const tablero = useRef(null);

  const [tam, setTam] = useState(400)
  const [puntos, setPuntos] = useState([{}])
  
  useEffect(() => {
    console.log(nombre)
    console.log(cargarPuntos)
    if(cargarPuntos.length===0){
      console.log("ssss")
      cambiar()
    }else{
      let data = {"lines": cargarPuntos,"width":400,"height":400}
      setPuntos(cargarPuntos) 
      console.log(JSON.stringify(data))
      tablero.current.loadSaveData(JSON.stringify(data));
    }
  }, [cargarPuntos]);

  /*useEffect(() => {
    const data = getDataString(nuevosPuntos);
    console.log(data)
    tablero.current.loadSaveData(data);
  }, [nuevosPuntos]);*/

  const sendPoints = () =>{
    console.log(first);
    console.log(tablero.current.getSaveData());
    if(!first){
      const data = JSON.parse(tablero.current.getSaveData());
      console.log(data)
      const dataSend = data.lines[data.lines.length -1];
      callback(dataSend)
    }else{
      console.log("rrrr")
      cambiar();
    }
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

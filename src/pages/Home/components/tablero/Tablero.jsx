import React, {useRef, useEffect, useState} from "react";
import CanvasDraw from "react-canvas-draw";

const Tablero = (props) => {
  const {callback, cargarPuntos, nuevosPuntos, bloquear, first, cambiar, nombre} = props;

  const tablero = useRef(null);

  const [puntos, setPuntos] = useState([])
  const [cont, setcont] = useState(0);


  useEffect(()=>{
    let data = {"lines": cargarPuntos,"width":400,"height":400}
    setPuntos(cargarPuntos) 
    tablero.current.loadSaveData(JSON.stringify(data));
  },[cargarPuntos])

  const sendPoints = () =>{
    if(!first){
      const data = JSON.parse(tablero.current.getSaveData());
      const dataSend = data.lines[data.lines.length -1];
      callback(dataSend)
    }else{
      if(cont===cargarPuntos.length-1){
        cambiar();
      }else{
        setcont(cont+1);
      }
      
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

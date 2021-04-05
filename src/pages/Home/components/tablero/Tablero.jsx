import { useRef } from "react";
import CanvasDraw from "react-canvas-draw";

function Tablero() {
  const firstCanvas = useRef(null);
  
  const handle = ()=>{
    console.log(firstCanvas.current.getSaveData().lines)
  }
  
  return (
    <div>
      <CanvasDraw
        brushRadius={1}
        style={{ border: "1px solid #000" }}
        ref={firstCanvas}
      />
      <button onClick={handle}>sdfsdfsd</button>
    </div>
  );
}

export default Tablero;

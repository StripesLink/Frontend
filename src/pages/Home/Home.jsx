import React, { useEffect, useState } from "react";
import { useParams } from 'react-router-dom';
import Equipo from './components/Equipo/Equipo';
import axios from 'axios';
import "./Home.css";
import { url_getPointsSala, url_getRonda, url_salirSala } from '../../services/api/apirest'
import Tematica from "./components/tematica/Tematica";

function Home(props) {

  const { id, equipo } = useParams();

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

  const obtenerDatosSala = () => {
    axios
      .get(url_getRonda + `/${id}`)
      .then((response) => {
        validarTematica(response.data)
      })
  }

  useEffect(() => {
    obtenerPuntos();
    obtenerDatosSala();
  }, []);

  const cambiar1 = () => {
    setfirstAzul(false);
  }
  const cambiar2 = () => {
    setfirstRojo(false);
  }


  const validarTematica = (data) => {
    const { idTemtica, nameTematica, palabraAzul, palabraRojo, pintorAzul, pintorRojo }
      = data;

    var pintor = false;
    var palabra = (equipo === 'Rojo') ? palabraRojo : palabraAzul;
    if (pintorAzul === sessionStorage.getItem('userID') || pintorRojo === sessionStorage.getItem('userID')) {
      pintor = true;
    }

    setdatosSala({
      idTematica: idTemtica,
      nameTematica: nameTematica,
      palabra: palabra,
      esPintor: pintor
    })

  }

  const salirSala = ()=>{
    axios
      .put(`${url_salirSala}/${id}`)
      .then((response) => {
        props.history.push('/salas')
      })
  }

  return (
    <div id="home" className="container mt-4">
        <div className="titulo row">
            <h1 className="col-11">StripesLink</h1>
            <button 
              className="col-1 btn btn-outline-danger"
              onClick={salirSala}
            >Salir</button>
        </div>
          
       
     
      <div className="row mt-4">
        <Equipo
          nameTeam="Rojo"
          idSala={id}
          bloquear={equipo === 'Rojo' ? false : true}
          cargarPuntos={puntosRojos}
          first={firstRojo}
          cambiar={cambiar2}
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
        />
      </div>

    </div>
  );
}

export default Home;

import React from 'react';
import './Sala.css';
import { PersonCircle } from 'react-bootstrap-icons'
import axios from 'axios';
import { url_addUserSala } from '../../../../services/api/apirest'


const Sala = (props) => {
    const { id, numUsers, numSala, his } = props;


    const entrarSala = () =>{
        axios
        .put(url_addUserSala+"/"+id)
        .then((response) => {
            his.push(`/home/${id}/${response.data.response}`);
        })
        .catch((error) => {
          alert("Error");
        })
        
    }

    const personas = () =>{
        var rows = [];
        for (var i = 0; i < numUsers; i++) {
        rows.push(<PersonCircle size="30"></PersonCircle>);
        }
        return rows;
    }

    return (
        <div className="col">
            <div id="card" className="card mb-3 mr-3 mt-3 text-center" >
                <div className="card-header">Sala {numSala}</div>
                <div className="card-body">
                    <p className="card-text">Usarios activos: </p>
                    {
                        personas().map((item)=>item)
                    }
                    <div className="numUsers">
                        <p>{numUsers}</p>
                    </div>
                    
                    <button 
                        onClick={entrarSala} 
                        className="btn btn-outline-warning"
                    >Entrar</button>
                </div>
            </div>
        </div>

    );
}

export default Sala;
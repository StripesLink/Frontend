import React,{useEffect, useState} from 'react';
import './Tematica.css';
import {url_tematica} from '../../../../services/api/apirest'
import axios from 'axios';


const Tematica = (props) => {

    const {datos} = props;


    const validarPalabra = () =>{
        if(datos.esPintor){
            return datos.palabra;
        }else{
            let privado = "";
            for(let i=0;i<datos.palabra.length;i++){
                privado = privado+"_ ";
            }
            return privado
        } 
    }

    return (
        <div className="col">
            <div id="tematica" className="card">
                <div className="card-header">{datos.nameTematica}</div>
                <div className="card-body alig">
                    <h2>{
                        validarPalabra()
                        }
                    </h2>
                </div>
            </div>
        </div>
    )
}

export default Tematica

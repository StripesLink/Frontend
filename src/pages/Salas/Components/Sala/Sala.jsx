import React from 'react';


const Sala = (props) => {
    const {id, numUsers, numSala} = props;
    
    return ( 
        <div className="card text-white bg-danger  mb-3" >
            <div className="card-header">{id}</div>
            <div className="card-body">
                <h5 className="card-title">Sala {numSala}</h5>
                <p className="card-text">Usarios activos: {numUsers}</p>
                <button>Entrar</button>
            </div>
        </div>
     );
}
 
export default Sala;
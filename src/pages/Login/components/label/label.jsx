import React from 'react'
import './label.css'

const Label = ({text})=>{

    return(
        <div> 
            <label className='text'>{text}</label>
        </div>
    );
}

export default Label;
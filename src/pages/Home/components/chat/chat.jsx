import React, { useState, useEffect } from 'react';
import './chat.css'


const ChatE = (props) => {

    const { callback, newMessage, bloquear } = props;

    const [messages, setMessages] = useState([]);
    const [message, setMessage] = useState("");
    const [style, setStyle] = useState("mensajes");

    useEffect(() => {
        if (newMessage !== "") {
            console.log(typeof (newMessage));
            setMessages([...messages, newMessage]);
        }
    }, [newMessage])

    useEffect(() =>{
        if(bloquear){
            setStyle('otro')
        }else{
            setStyle('mensajes')
        }

    }, [bloquear])

    function updateMessage(mes, value) {
        if (mes === 'mensaje') {
            setMessage(value);
        }
    }

    function handleSend() {
        callback(message, 'chat')
        setMessage('')
    }

    return (
        <div className="chat">
            <h2>Chatroom</h2>
            <div className={style}>
                <ol>
                    {messages.map((mess) => <ul key={mess}>{mess}</ul>)}
                </ol>
            </div>
            <div>
            <input
                    id="mensaje"
                    name="mensaje"
                    placeholder="Escriba su mensaje"
                    type="text"
                    autocomplete="off"
                    value={message}
                    onChange={(e) => updateMessage(e.target.name, e.target.value)}
                    className='regular-style'
                    disabled={(bloquear) ? "disabled":""}
                />

                <button onClick={(e) => handleSend()}
                    disabled={(bloquear) ? "disabled":""}>
                    Enviar
                </button>
            </div>
        </div>
    );
}

export default ChatE;
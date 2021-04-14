import React, { useState, useEffect } from 'react';
import Input from "../../../../commons/input/input";
import './chat.css'


const ChatE = (props) => {

    const { callback, newMessage } = props;

    const [messages, setMessages] = useState([]);
    const [message, setMessage] = useState("");

    useEffect(() => {
        if (newMessage !== "") {
            console.log(typeof (newMessage));
            setMessages([...messages, newMessage]);
        }
    }, [newMessage])

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
        <div>
            <h2>Chatroom</h2>
            <div className="mensajes">
                <ol>
                    {messages.map((mess) => <ul>{mess}</ul>)}
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
                />

                <button onClick={(e) => handleSend()}>
                    Enviar
                </button>
            </div>
        </div>
    );
}

export default ChatE;
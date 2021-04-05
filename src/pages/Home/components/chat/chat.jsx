import { List } from '@material-ui/core';
import React, { useState } from 'react';
import Input from "../../../../commons/input/input";


const Chat = ()=>{
    const [messages, setMessages] = useState([
        {id:0,text:"prueba1"},
        {id:1,text:"prueba2"}
    ]);
    const [message, setMessage] = useState("");



    function updateMessage(mes, value){
        if(mes==='mensaje'){
            setMessage(value);
        }
    }

    function handleSend(){
        
        const listM = messages;
        const newMessage = {
            id: messages.length,
            text:message
        }
        listM.push(newMessage);
        setMessages([...listM]);
        console.log(messages);
    }

    return (
        <div>
            <h2>Chatroom</h2>
            <ol>
                { messages.map((mess)=><li key={mess.id}>{mess.text}</li>)}
            </ol>
            <div>
                <Input
                 attribute={{
                id: "mensaje",
                name: "mensaje",
                type: "text",
                placeholder: "Mensaje...",
                }}
                handleChange={updateMessage}/>
                <button onClick={(e) => handleSend()}>
                    Enviar
                </button>
            </div>
    </div>
    );
}

export default Chat;
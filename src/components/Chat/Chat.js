import React, { useState, useEffect } from "react";
import queryString from 'query-string';
import io from "socket.io-client";
import { Redirect } from "react-router-dom";

import TextContainer from '../TextContainer/TextContainer';
import Messages from '../Messages/Messages';
import InfoBar from '../InfoBar/InfoBar';
import Input from '../Input/Input';

import './Chat.css';

let socket; //  Empty socket

const Chat = ({ location }) => {  // pass location as a prop
  const [redirect, setRedirect] = useState(false);
  const [name, setName] = useState('');
  const [room, setRoom] = useState('');
  const [pass, setPass] = useState('');
  const [create, setCreate] = useState('');
  const [users, setUsers] = useState('');
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const ENDPOINT = 'https://chat-application-server.herokuapp.com/';

  useEffect(() => {
    const { create, name, room, pass } = queryString.parse(location.search); // loction.serach return parametes fro URL and queryString.parse() converts it into object

    socket = io(ENDPOINT);

    setRoom(room);
    setName(name);
    setPass(pass);
    setCreate(create);
    // console.log(create);

    socket.emit('join', { create, name, room, pass }, (error) => {
      if(error) {
        alert(error);
        setRedirect(true);
      }
    });
  }, [ENDPOINT, location.search]); // useEffect will run iff ENDPOINT or location.search chandge
  
  useEffect(() => {
    socket.on('message', message => {
      setMessages(messages => [ ...messages, message ]);
    });
    
    socket.on("roomData", ({ users }) => {
      setUsers(users);
    });
}, []);

  const sendMessage = (event) => {
    event.preventDefault();

    if(message) {
      socket.emit('sendMessage', message, () => setMessage(''));
    }
  }

  if (redirect) {
    if(create.localeCompare('true')) {
      return <Redirect to="/" />
    }
    return <Redirect to="/new" />
  }

  return (
    <div className="outerContainer">
      <div className="container">
          <InfoBar room={room} />
          <Messages messages={messages} name={name} />
          <Input message={message} setMessage={setMessage} sendMessage={sendMessage} />
      </div>
      <TextContainer users={users}/>
    </div>
  );
}

export default Chat;